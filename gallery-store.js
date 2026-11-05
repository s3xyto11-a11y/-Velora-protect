(function () {
    'use strict';

    const DB_NAME = 'velora-protect-gallery';
    const STORE_NAME = 'projects';
    const FOLDER_STORE = 'folders';
    const DB_VERSION = 2;

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
                if (!database.objectStoreNames.contains(FOLDER_STORE)) {
                    database.createObjectStore(FOLDER_STORE, { keyPath: 'id' });
                }
            };
            request.onsuccess = () => {
                request.result.onversionchange = () => request.result.close();
                resolve(request.result);
            };
            request.onerror = () => reject(request.error || new Error('Галерията не може да бъде отворена.'));
        });
    }

    async function withStore(mode, operation, storeName = STORE_NAME) {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(storeName, mode);
            const store = transaction.objectStore(storeName);
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

    async function getAll(storeName = STORE_NAME) {
        const database = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction(storeName, 'readonly');
            const request = transaction.objectStore(storeName).getAll();
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

    function getFolders() {
        return getAll(FOLDER_STORE);
    }

    async function addFolder(name, parentId = null) {
        name = String(name || '').trim();
        if (!name || name.length > 80) throw new Error('Името на папката трябва да е между 1 и 80 знака.');
        const folders = await getFolders();
        if (parentId && !folders.some(folder => folder.id === parentId)) {
            throw new Error('Родителската папка не съществува.');
        }
        if (folders.some(folder => (folder.parentId || null) === parentId && folder.name.toLocaleLowerCase('bg') === name.toLocaleLowerCase('bg'))) {
            throw new Error('Вече има папка с това име тук.');
        }
        const record = {
            id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
            name, parentId, createdAt: Date.now()
        };
        await withStore('readwrite', store => store.add(record), FOLDER_STORE);
        return record;
    }

    window.VeloraGallery = { getAll, add, remove, getFolders, addFolder };
}());
