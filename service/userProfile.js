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

window.searchTable = function () {
   const input = document.getElementById('searchInput');
   const filter = input.value.toLowerCase();
   const rows = document.getElementById('collectionBody').getElementsByTagName('tr');

   for (let i = 0; i < rows.length; i++) {
      const titleCell = rows[i].getElementsByTagName('td')[0];
      if (titleCell) {
         const textValue = titleCell.textContent || titleCell.innerText;
         if (textValue.toLowerCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
            const textSpan = rows[i].querySelector('.art-item span');

            if (textSpan) {
               const oldBg = textSpan.style.backgroundColor;
               const oldColor = textSpan.style.color;

               textSpan.style.backgroundColor = "yellow";
               textSpan.style.color = "black";
               textSpan.style.borderRadius = "4px";

               setTimeout(() => {
                  textSpan.style.backgroundColor = oldBg;
                  textSpan.style.color = oldColor;
                  textSpan.style.borderRadius = "";
               }, 300);
            }

         } else {
            rows[i].style.display = "none";
         }
      }
   }
}

