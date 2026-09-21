(function () {
    'use strict';

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
}());
