(function () {
    'use strict';

    const form = document.getElementById('reviewForm');
    const message = document.getElementById('reviewFormMessage');
    const submitButton = document.getElementById('reviewSubmitButton');
    const publishedGrid = document.getElementById('reviewPageReviewsGrid');
    const publishedTemplate = document.getElementById('reviewPageCardTemplate');
    const config = window.VELORA_SUPABASE || {};
    const supabaseUrl = String(config.url || '').replace(/\/$/, '');
    const supabaseKey = String(config.publishableKey || '');
    const isReady = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl) && supabaseKey.length > 20;
    const likedReviewsKey = 'velora-liked-reviews';
    const reviewVisitorKey = 'velora-review-visitor';
    const messages = {
        bg: { unavailable: 'Формата ще бъде активна скоро.', sending: 'Изпращане…', submit: 'Изпрати мнение', success: 'Благодарим! Мнението ти е изпратено за одобрение.', error: 'Не успяхме да изпратим мнението. Опитай отново.', published: 'КЛИЕНТСКИ ОТЗИВ', like: 'Харесай отзива с 6 звезди', liked: 'Вече харесан отзив' },
        en: { unavailable: 'The form will be available soon.', sending: 'Sending…', submit: 'Send review', success: 'Thank you! Your review has been submitted for approval.', error: 'We could not send your review. Please try again.', published: 'CUSTOMER REVIEW', like: 'Like this review with 6 stars', liked: 'Review already liked' }
    };

    const language = () => document.documentElement.lang === 'en' ? 'en' : 'bg';
    const buttonLabel = () => submitButton.querySelector('span:first-child');
    const headers = (extra = {}) => {
        const result = { apikey: supabaseKey, ...extra };
        if (supabaseKey.startsWith('eyJ')) result.Authorization = `Bearer ${supabaseKey}`;
        return result;
    };

    function showUnavailableMessage() {
        if (isReady) return;
        message.textContent = messages[language()].unavailable;
    }

    let publishedReviews = [];

    function readLikedReviews() {
        try {
            return new Set(JSON.parse(localStorage.getItem(likedReviewsKey) || '[]').map(String));
        } catch (error) {
            return new Set();
        }
    }

    function createVisitorToken() {
        if (crypto.randomUUID) return crypto.randomUUID();
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 15) | 64;
        bytes[8] = (bytes[8] & 63) | 128;
        const hex = [...bytes].map(byte => byte.toString(16).padStart(2, '0'));
        return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
    }

    function getVisitorToken() {
        try {
            let token = localStorage.getItem(reviewVisitorKey);
            if (!token) {
                token = createVisitorToken();
                localStorage.setItem(reviewVisitorKey, token);
            }
            return token;
        } catch (error) {
            return createVisitorToken();
        }
    }

    async function likePublishedReview(review, button) {
        if (!isReady || button.disabled) return;
        button.disabled = true;
        try {
            const response = await fetch(`${supabaseUrl}/rest/v1/rpc/like_review`, {
                method: 'POST',
                headers: headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ p_review_id: review.id, p_visitor_token: getVisitorToken() })
            });
            if (!response.ok) throw new Error('Like could not be saved');
            review.likes_count = Number(await response.json()) || 0;
            button.querySelector('span').textContent = '★★★★★★';
            button.querySelector('b').textContent = review.likes_count;
            button.classList.add('is-liked');
            button.setAttribute('aria-label', messages[language()].liked);
            const likedReviews = readLikedReviews();
            likedReviews.add(String(review.id));
            try {
                localStorage.setItem(likedReviewsKey, JSON.stringify([...likedReviews]));
            } catch (error) {
                // Supabase remains the source of truth if local storage is unavailable.
            }
        } catch (error) {
            console.error(error);
            button.disabled = false;
        }
    }

    function renderPublishedReviews() {
        if (!publishedGrid || !publishedTemplate) return;
        publishedGrid.querySelectorAll('.user-review').forEach(card => card.remove());
        publishedReviews.slice().reverse().forEach(review => {
            const fragment = publishedTemplate.content.cloneNode(true);
            const card = fragment.querySelector('.review-card');
            const likeButton = card.querySelector('.review-like');
            const isLiked = readLikedReviews().has(String(review.id));
            card.querySelector('.review-label').textContent = messages[language()].published;
            card.querySelector('blockquote').textContent = review.comment;
            card.querySelector('.review-avatar').textContent = review.name.trim().charAt(0).toLocaleUpperCase(language());
            card.querySelector('.review-profile b').textContent = review.name;
            card.querySelector('.review-profile span').textContent = review.project_type;
            likeButton.querySelector('span').textContent = isLiked ? '★★★★★★' : '☆☆☆☆☆☆';
            likeButton.querySelector('b').textContent = Number(review.likes_count) || 0;
            likeButton.classList.toggle('is-liked', isLiked);
            likeButton.disabled = isLiked;
            likeButton.setAttribute('aria-label', messages[language()][isLiked ? 'liked' : 'like']);
            likeButton.addEventListener('click', () => likePublishedReview(review, likeButton));
            publishedGrid.prepend(fragment);
        });
    }

    async function loadPublishedReviews() {
        if (!isReady || !publishedGrid || !publishedTemplate) return;
        try {
            const query = 'select=id,name,project_type,comment,likes_count,created_at&order=created_at.desc&limit=12';
            const response = await fetch(`${supabaseUrl}/rest/v1/reviews?${query}`, { headers: headers() });
            if (!response.ok) throw new Error('Reviews could not be loaded');
            publishedReviews = await response.json();
            renderPublishedReviews();
        } catch (error) {
            console.error(error);
        }
    }

    if (!isReady) {
        submitButton.disabled = true;
        showUnavailableMessage();
    }

    document.getElementById('languageToggle')?.addEventListener('click', () => {
        showUnavailableMessage();
        renderPublishedReviews();
    });

    loadPublishedReviews();

    form.addEventListener('submit', async event => {
        event.preventDefault();
        const copy = messages[language()];
        message.classList.remove('is-error');

        if (!isReady) {
            showUnavailableMessage();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        if (form.elements.website.value) {
            form.reset();
            message.textContent = copy.success;
            return;
        }

        submitButton.disabled = true;
        buttonLabel().textContent = copy.sending;
        try {
            const response = await fetch(`${supabaseUrl}/rest/v1/reviews`, {
                method: 'POST',
                headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
                body: JSON.stringify({
                    name: form.elements.name.value.trim(),
                    project_type: form.elements.projectType.value.trim(),
                    comment: form.elements.comment.value.trim()
                })
            });
            if (!response.ok) throw new Error('Review submission failed');
            form.reset();
            message.textContent = copy.success;
        } catch (error) {
            console.error(error);
            message.textContent = copy.error;
            message.classList.add('is-error');
        } finally {
            submitButton.disabled = false;
            buttonLabel().textContent = copy.submit;
        }
    });
}());
