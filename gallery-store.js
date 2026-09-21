(function () {
    'use strict';

    const DB_NAME = 'velora-protect-gallery';
    const STORE_NAME = 'projects';
    const DB_VERSION = 1;

    function openDatabase() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                reject(new Error('Този браузър не поддържа локално съхранение на снимки.'));
                return;
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = () => {
                const database = request.result;
                if (!database.objectStoreNames.contains(STORE_NAME)) {
                    const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' });
                    store.createIndex('createdAt', 'createdAt');
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error('Галерията не може да бъде отворена.'));
        });
    }

    async function withStore(mode, operation) {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(STORE_NAME, mode);
            const store = transaction.objectStore(STORE_NAME);
            let result;

            try {
                result = operation(store);
            } catch (error) {
                database.close();
                reject(error);
                return;
            }

            transaction.oncomplete = () => {
                database.close();
                resolve(result);
            };
            transaction.onerror = () => {
                database.close();
                reject(transaction.error || new Error('Промяната не може да бъде запазена.'));
            };
            transaction.onabort = transaction.onerror;
        });
    }

    async function getAll() {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(STORE_NAME, 'readonly');
            const request = transaction.objectStore(STORE_NAME).getAll();
            request.onsuccess = () => {
                database.close();
                resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
            };
            request.onerror = () => {
                database.close();
                reject(request.error || new Error('Снимките не могат да бъдат заредени.'));
            };
        });
    }

    function add(project) {
        const record = {
            ...project,
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            createdAt: Date.now()
        };
        return withStore('readwrite', store => store.add(record));
    }

    function remove(id) {
        return withStore('readwrite', store => store.delete(id));
    }

    window.VeloraGallery = { getAll, add, remove };
}());
