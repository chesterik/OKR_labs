const STORAGE_KEY = 'nobleCollection';

function getCollection() {
   try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
   } catch (error) {
      console.error('Не вдалося зчитати колекцію:', error);
      return [];
   }
}

function saveCollection(collection) {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
}

function buildArtCell(item) {
   const safeTitle = item.title || 'Без назви';
   const safeSrc = item.src || '';

   return `
      <div class="art-item">
         <img src="${safeSrc}" alt="${safeTitle}">
         <span>${safeTitle}</span>
      </div>
   `;
}

function buildDescription(item) {
   const parts = [];

   if (item.desc) {
      parts.push(item.desc);
   }

   if (item.date) {
      parts.push(`Дата додавання: ${item.date}`);
   }

   return parts.length > 0 ? parts.join('<br>') : 'Опис відсутній.';
}

function renderCollection(filterText = '') {
   const body = document.getElementById('collectionBody');
   if (!body) return;

   const query = filterText.trim().toLowerCase();
   const collection = getCollection();
   const filtered = collection
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
         if (!query) return true;

         const haystack = [
            item.title || '',
            item.desc || '',
            item.date || ''
         ].join(' ').toLowerCase();

         return haystack.includes(query);
      });

   if (filtered.length === 0) {
      const message = collection.length === 0
         ? 'Колекція порожня. Додайте картини з головної сторінки.'
         : 'За вашим запитом нічого не знайдено.';

      body.innerHTML = `
         <tr>
            <td colspan="3">${message}</td>
         </tr>
      `;
      return;
   }

   body.innerHTML = filtered.map(({ item, index }) => `
      <tr>
         <td>${buildArtCell(item)}</td>
         <td>${buildDescription(item)}</td>
         <td style="text-align: center;">
            <button
               type="button"
               class="delete-btn"
               onclick="removeFromCollection(${index})"
               aria-label="Видалити ${item.title || 'картину'}"
               title="Видалити"
            >
               ×
            </button>
         </td>
      </tr>
   `).join('');
}

window.searchTable = function searchTable() {
   const input = document.getElementById('searchInput');
   renderCollection(input ? input.value : '');
};

window.removeFromCollection = function removeFromCollection(index) {
   const collection = getCollection();
   const item = collection[index];

   if (!item) {
      renderCollection();
      return;
   }

   const isConfirmed = window.confirm(`Видалити "${item.title || 'цю картину'}" з колекції?`);
   if (!isConfirmed) {
      return;
   }

   collection.splice(index, 1);
   saveCollection(collection);
   searchTable();
};

document.addEventListener('DOMContentLoaded', () => {
   renderCollection();
});
