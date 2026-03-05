document.addEventListener('DOMContentLoaded', () => {
   renderCollection();
});

function renderCollection() {
   const tbody = document.getElementById('collectionBody');
   tbody.innerHTML = '';

   let collection = JSON.parse(localStorage.getItem('nobleCollection')) || [];
   console.log(collection)

   if (collection.length === 0) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding: 20px;">Ваша колекція поки що пуста.</td></tr>';
      return;
   }

   collection.forEach((art, index) => {
      const row = document.createElement('tr');

      row.innerHTML = `
                  <td>
                      <div class="art-item">
                          <img src="${art.src}" width="150" alt="Картина" style="border-radius: 8px;">
                          <span>${art.title}</span>
                      </div>
                  </td>
                  <td>${art.desc || "Немає опису"}</td>
                  <td style="text-align: center;">
                      <button class="delete-btn" onclick="removeFromCollection(${index})" title="Видалити">×</button>
                  </td>
              `;

      tbody.appendChild(row);
   });
}

window.removeFromCollection = function (index) {
   if (confirm('Видалити цю картину з колекції?')) {
      let collection = JSON.parse(localStorage.getItem('nobleCollection')) || [];
      collection.splice(index, 1);
      localStorage.setItem('nobleCollection', JSON.stringify(collection));
      renderCollection();
   }
};

window.searchTable = () => {
   const filter = document.getElementById('searchInput').value.toLowerCase().trim();
   const rows = document.querySelectorAll('#collectionBody tr');

   rows.forEach(row => {
      const span = row.querySelector('.art-item span');
      const text = span ? span.textContent.toLowerCase() : '';
      const isMatch = text.includes(filter);

      row.style.display = isMatch ? '' : 'none';

      if (isMatch && filter && span) {
         span.classList.add('highlight-anim');
         setTimeout(() => span.classList.remove('highlight-anim'), 300);
      }
   });
};

