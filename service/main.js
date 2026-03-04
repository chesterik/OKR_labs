document.querySelector("#location").onclick = () => {
   window.location.href = '/html/location.html';
};

function openPainting(imgSrc, title) {
   if (document.getElementById('gallery-modal')) return;

   const styles = `
        <style id="gallery-styles">
            .overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(5, 5, 5, 0.95); 
                backdrop-filter: blur(10px);
                z-index: 10000;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                opacity: 0; 
                transition: opacity 0.2s ease;
            }
            
            .overlay.open {
                opacity: 1;
            }

            .img-container {
                position: relative;
                max-width: 90%; max-height: 70vh;
                display: flex; justify-content: center;
                margin-bottom: 40px;
            }
            
            .img-container img {
                max-width: 100%; max-height: 70vh;
                border-radius: 8px;
                box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
                display: block;
            }

            .modal-title {
                color: #fff;
                font-family: 'Georgia', serif;
                font-size: 24px;
                letter-spacing: 1px;
                margin-bottom: 20px;
                text-align: center;
            }

            .controls-bar {
                position: absolute; bottom: 40px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 10px 10px 10px 20px;
                border-radius: 100px;
                display: flex; gap: 15px; align-items: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            }

            .btn-close {
                background: transparent; border: none; color: #aaa;
                font-size: 14px; font-weight: 600; cursor: pointer;
                padding: 10px 20px; transition: 0.3s;
            }
            .btn-close:hover { color: #fff; }

            .btn-add {
                background: cornflowerblue; 
                color: #fff; border: none;
                padding: 12px 30px; border-radius: 50px;
                font-weight: 700; cursor: pointer;
                transition: 0.3s;
                display: flex; align-items: center; gap: 8px;
            }
            .btn-add:hover {
                background: #fff; color: #000;
                box-shadow: 0 0 20px rgba(255,255,255,0.4);
            }
        </style>
    `;

   const html = `
        <div id="gallery-modal" class="overlay" onclick="if(event.target === this) closeModal()">
            <h2 class="modal-title">${title}</h2>
            
            <div class="img-container">
                <img src="${imgSrc}" alt="${title}">
            </div>

            <div class="controls-bar">
                <button class="btn-close" onclick="closeModal()">Закрити</button>
                <button class="btn-add" onclick="alert('Додано!'); closeModal()">
                    <span>+</span> Додати в колекцію
                </button>
            </div>
        </div>
    `;

   document.body.insertAdjacentHTML('beforeend', styles + html);

   setTimeout(() => {
      document.getElementById('gallery-modal').classList.add('open');
   }, 10);
}

window.closeModal = () => {
   const modal = document.getElementById('gallery-modal');
   if (modal) {
      modal.classList.remove('open');
      setTimeout(() => {
         modal.remove();
         const styleElement = document.getElementById('gallery-styles');
         if (styleElement) styleElement.remove();
      }, 200);
   }
};

function showDeveloperInfo(name, position = "Owner") {
   const metaAuthor = document.querySelector('meta[name="author"]').content;
   alert(`Автор: ${name} \nПосада: ${position}\nMeta-Author: ${metaAuthor}`);
}

function sendMessage(user) {
   const ta = document.getElementById(user === 1 ? 'msg1' : 'msg2');
   const text = ta.value.trim();
   if (!text) return;

   const chatBox = document.getElementById('chat');
   const msg = document.createElement('div');
   msg.classList.add('msg', user === 1 ? 'user1' : 'user2');
   msg.innerHTML = `<span class="user-label" style="font-size:10px; display:block; opacity:0.6;">USER ${user}</span>${text}`;

   chatBox.append(msg);
   ta.value = '';
   chatBox.scrollTop = chatBox.scrollHeight;
}

function searchPainting() {
   const query = prompt("Введіть назву картини, яку шукаєте:");

   if (query) {
      const cards = document.querySelectorAll('.pin-item');
      let found = false;

      cards.forEach(card => {
         const title = card.querySelector('b').innerText.toLowerCase();
         if (title.includes(query.toLowerCase())) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.outline = "5px solid cornflowerblue";
            setTimeout(() => card.style.outline = "none", 3000);
            found = true;
         }
      });

      if (!found) {
         alert("Картину '" + query + "' не знайдено.");
      }
   }
}

function userDialog() {

   const isReady = confirm("Бажаєте дізнатися кількість картин у галереї?");

   if (!isReady) {
      alert("Діалог скасовано.");
      return;
   }

   const titles = document.querySelectorAll('.pin-content b');

   if (titles.length === 0) {
      alert("У галереї наразі немає картин.");
      return;
   }

   let count = prompt(
      `Скільки картин ви хочете проаналізувати? (1 - ${titles.length})`,
      "3"
   );

   if (count === null) {
      alert("Введення скасовано.");
      return;
   }

   count = Number(count);

   if (isNaN(count)) {
      alert("Будь ласка, введіть числове значення.");
      return;
   }

   if (!Number.isInteger(count)) {
      alert("Потрібно ввести ціле число.");
      return;
   }

   if (count <= 0) {
      alert("Кількість має бути більшою за 0.");
      return;
   }

   if (count > titles.length) {
      alert(`У галереї лише ${titles.length} картин.`);
      return;
   }

   let result = `Ось назви перших ${count} картин:\n\n`;

   for (let i = 0; i < count; i++) {
      result += `${i + 1}. ${titles[i].textContent}\n`;
   }

   alert(result);
}





