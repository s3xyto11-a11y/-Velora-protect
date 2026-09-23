(function () {
    'use strict';

    const ADMIN_PASSWORD = 'VeloraP';
    const login = document.getElementById('adminLogin');
    const loginForm = document.getElementById('adminLoginForm');
    const passwordInput = document.getElementById('adminPassword');
    const loginMessage = document.getElementById('adminLoginMessage');
    let adminInitialized = false;
    let activeAdminPassword = '';

    function unlockAdmin() {
        document.body.classList.remove('is-locked');
        login.hidden = true;
        if (!adminInitialized) {
            adminInitialized = true;
            initializeAdmin();
        }
    }

    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        if (passwordInput.value !== ADMIN_PASSWORD) {
            loginMessage.textContent = 'Грешна парола. Опитай отново.';
            passwordInput.value = '';
            passwordInput.focus();
            passwordInput.setAttribute('aria-invalid', 'true');
            return;
        }

        activeAdminPassword = passwordInput.value;
        passwordInput.value = '';
        passwordInput.removeAttribute('aria-invalid');
        loginMessage.textContent = '';
        unlockAdmin();
    });

    passwordInput.focus();

    function initializeAdmin() {
    const MAX_SIZE = 8 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const form = document.getElementById('uploadForm');
    const input = document.getElementById('imageInput');
    const dropZone = document.getElementById('dropZone');
    const preview = document.getElementById('imagePreview');
    const changeImage = document.getElementById('changeImage');
    const message = document.getElementById('formMessage');
    const submitButton = document.getElementById('submitButton');
    const projectsContainer = document.getElementById('adminProjects');
    const emptyState = document.getElementById('adminEmpty');
    const projectCount = document.getElementById('projectCount');
    const template = document.getElementById('adminProjectTemplate');
    const adminReviews = document.getElementById('adminReviews');
    const adminReviewsEmpty = document.getElementById('adminReviewsEmpty');
    const adminReviewMessage = document.getElementById('adminReviewMessage');
    const adminReviewTemplate = document.getElementById('adminReviewTemplate');
    const reviewCount = document.getElementById('reviewCount');
    const supabaseConfig = window.VELORA_SUPABASE || {};
    const supabaseUrl = String(supabaseConfig.url || '').replace(/\/$/, '');
    const supabaseKey = String(supabaseConfig.publishableKey || '');
    const supabaseReady = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) && supabaseKey.length > 20;
    let selectedFile = null;
    let previewUrl = null;
    let renderedUrls = [];

    function showMessage(text, isError = false) {
        message.textContent = text;
        message.classList.toggle('is-error', isError);
    }

    function clearPreview() {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        previewUrl = null;
        selectedFile = null;
        input.value = '';
        preview.removeAttribute('src');
        dropZone.classList.remove('has-image');
        changeImage.hidden = true;
    }

    function selectFile(file) {
        showMessage('');
        if (!file) return;
        if (!allowedTypes.includes(file.type)) {
            showMessage('Избери JPG, PNG или WebP снимка.', true);
            return;
        }
        if (file.size > MAX_SIZE) {
            showMessage('Снимката е по-голяма от 8 MB.', true);
            return;
        }
        clearPreview();
        selectedFile = file;
        previewUrl = URL.createObjectURL(file);
        preview.src = previewUrl;
        dropZone.classList.add('has-image');
        changeImage.hidden = false;
    }

    input.addEventListener('change', () => selectFile(input.files[0]));
    changeImage.addEventListener('click', event => {
        event.preventDefault();
        input.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        dropZone.classList.add('is-dragging');
    }));
    ['dragleave', 'drop'].forEach(eventName => dropZone.addEventListener(eventName, event => {
        event.preventDefault();
        dropZone.classList.remove('is-dragging');
    }));
    dropZone.addEventListener('drop', event => selectFile(event.dataTransfer.files[0]));

    function formatDate(timestamp) {
        return new Intl.DateTimeFormat('bg-BG', { day: '2-digit', month: 'short', year: 'numeric' }).format(timestamp);
    }

    function supabaseHeaders(extra = {}) {
        const headers = { apikey: supabaseKey, ...extra };
        if (supabaseKey.startsWith('eyJ')) headers.Authorization = `Bearer ${supabaseKey}`;
        return headers;
    }

    async function callReviewRpc(functionName, body) {
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${functionName}`, {
            method: 'POST',
            headers: supabaseHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(body)
        });
        if (!response.ok) throw new Error('Supabase не успя да изпълни заявката.');
        return response.json();
    }

    function showReviewMessage(text, isError = false) {
        adminReviewMessage.textContent = text;
        adminReviewMessage.classList.toggle('is-error', isError);
    }

    async function moderateReview(reviewId, action, article) {
        if (action === 'delete' && !window.confirm('Да изтрия ли този отзив окончателно?')) return;
        article.querySelectorAll('button').forEach(button => { button.disabled = true; });
        showReviewMessage('Запазване…');

        try {
            await callReviewRpc('moderate_review', {
                p_review_id: reviewId,
                p_action: action,
                p_admin_password: activeAdminPassword
            });
            await loadReviewModeration();
            showReviewMessage(action === 'approve' ? 'Отзивът е публикуван.' : action === 'hide' ? 'Отзивът е скрит.' : 'Отзивът е изтрит.');
        } catch (error) {
            showReviewMessage(error.message, true);
            article.querySelectorAll('button').forEach(button => { button.disabled = false; });
        }
    }

    async function loadReviewModeration() {
        if (!supabaseReady) {
            reviewCount.textContent = '0';
            adminReviewsEmpty.hidden = true;
            showReviewMessage('Добави Supabase URL и Publishable key, за да управляваш мненията.', true);
            return;
        }

        showReviewMessage('Зареждане на мненията…');
        adminReviews.replaceChildren();
        try {
            const reviews = await callReviewRpc('get_reviews_for_moderation', { p_admin_password: activeAdminPassword });
            reviewCount.textContent = reviews.length;
            adminReviewsEmpty.hidden = reviews.length > 0;

            reviews.forEach(review => {
                const fragment = adminReviewTemplate.content.cloneNode(true);
                const article = fragment.querySelector('.admin-review');
                const status = fragment.querySelector('.admin-review-status');
                const time = fragment.querySelector('time');
                const approveButton = fragment.querySelector('.approve-review');
                const hideButton = fragment.querySelector('.hide-review');
                const removeButton = fragment.querySelector('.remove-review');

                status.textContent = review.approved ? 'ПУБЛИКУВАН' : 'ЧАКА ОДОБРЕНИЕ';
                status.classList.toggle('is-approved', review.approved);
                time.dateTime = new Date(review.created_at).toISOString();
                time.textContent = formatDate(new Date(review.created_at));
                fragment.querySelector('blockquote').textContent = review.comment;
                fragment.querySelector('.admin-review-avatar').textContent = review.name.trim().charAt(0).toLocaleUpperCase('bg');
                fragment.querySelector('.admin-review-person b').textContent = review.name;
                fragment.querySelector('.admin-review-person span').textContent = review.project_type;
                fragment.querySelector('.admin-review-likes b').textContent = Number(review.likes_count) || 0;
                approveButton.hidden = review.approved;
                hideButton.hidden = !review.approved;
                approveButton.addEventListener('click', () => moderateReview(review.id, 'approve', article));
                hideButton.addEventListener('click', () => moderateReview(review.id, 'hide', article));
                removeButton.addEventListener('click', () => moderateReview(review.id, 'delete', article));
                adminReviews.appendChild(fragment);
            });
            showReviewMessage('');
        } catch (error) {
            adminReviewsEmpty.hidden = true;
            showReviewMessage(error.message, true);
        }
    }

    async function renderProjects() {
        renderedUrls.forEach(url => URL.revokeObjectURL(url));
        renderedUrls = [];
        projectsContainer.replaceChildren();

        try {
            const projects = await window.VeloraGallery.getAll();
            projectCount.textContent = projects.length;
            emptyState.hidden = projects.length > 0;

            projects.forEach(project => {
                const fragment = template.content.cloneNode(true);
                const article = fragment.querySelector('.admin-project');
                const image = fragment.querySelector('img');
                const category = fragment.querySelector('span');
                const title = fragment.querySelector('h3');
                const time = fragment.querySelector('time');
                const deleteButton = fragment.querySelector('.delete-project');
                const imageUrl = URL.createObjectURL(project.image);
                renderedUrls.push(imageUrl);

                image.src = imageUrl;
                image.alt = project.alt || project.title;
                category.textContent = project.category;
                title.textContent = project.title;
                time.dateTime = new Date(project.createdAt).toISOString();
                time.textContent = formatDate(project.createdAt);
                deleteButton.addEventListener('click', async () => {
                    const confirmed = window.confirm(`Да изтрия ли „${project.title}“ от галерията?`);
                    if (!confirmed) return;
                    deleteButton.disabled = true;
                    try {
                        await window.VeloraGallery.remove(project.id);
                        article.remove();
                        await renderProjects();
                        showMessage('Проектът беше изтрит.');
                    } catch (error) {
                        showMessage(error.message, true);
                    }
                });
                projectsContainer.appendChild(fragment);
            });
        } catch (error) {
            showMessage(error.message, true);
        }
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const title = form.elements.title.value.trim();
        const category = form.elements.category.value.trim();
        const alt = form.elements.alt.value.trim();

        if (!selectedFile) {
            showMessage('Първо избери снимка.', true);
            return;
        }
        if (!title || !category) {
            showMessage('Добави заглавие и категория.', true);
            return;
        }

        submitButton.disabled = true;
        showMessage('Снимката се добавя…');
        try {
            await window.VeloraGallery.add({ image: selectedFile, title, category, alt });
            form.reset();
            clearPreview();
            await renderProjects();
            showMessage('Готово — проектът вече е в галерията.');
        } catch (error) {
            showMessage(error.message, true);
        } finally {
            submitButton.disabled = false;
        }
    });

    window.addEventListener('beforeunload', () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        renderedUrls.forEach(url => URL.revokeObjectURL(url));
    });

    renderProjects();
    loadReviewModeration();
    }
}());
