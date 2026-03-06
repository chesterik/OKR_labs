let currentArt = {};

document.querySelector("#location").onclick = () => {
   window.location.href = '/html/location.html';
};

function openPainting(imgSrc, title) {
   currentArt = { src: imgSrc, title: title };

   if (document.getElementById('gallery-modal')) return;

   const styles = `
      <style id="gallery-styles">
         .overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(5, 5, 5, 0.95); 
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            opacity: 0; transition: opacity 0.2s ease;
         }
         .overlay.open { opacity: 1; }
         .img-container {
            position: relative; max-width: 90%; max-height: 70vh;
            display: flex; justify-content: center; margin-bottom: 40px;
         }
         .img-container img {
            max-width: 100%; max-height: 70vh;
            border-radius: 8px;
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.05);
            display: block;
         }
         .modal-title {
            color: #fff; font-family: 'Georgia', serif; font-size: 24px;
            letter-spacing: 1px; margin-bottom: 20px; text-align: center;
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
            background: #023020; color: #fff; border: none;
            padding: 12px 30px; border-radius: 50px;
            font-weight: 700; cursor: pointer; transition: 0.3s;
            display: flex; align-items: center; gap: 8px;
         }
         .btn-add:hover {
            background: #fff; color: #000;
            box-shadow: 0 0 20px rgba(255,255,255,0.4);
         }
      </style>
   `;

   const randomLikes = Math.floor(Math.random() * 50) + 1;

   const html = `
      <div id="gallery-modal" class="overlay" onclick="if(event.target === this) closeModal()">
         <h2 class="modal-title">${title}</h2>
         
         <div class="img-container">
            <img src="${imgSrc}" alt="${title}">
         </div>

         <div class="controls-bar">
            <button class="btn-like" data-behavior="like" data-count="${randomLikes}">
               ❤️ <span class="like-text">Like</span> <span class="count">${randomLikes}</span>
            </button>
            
            <div style="width: 1px; height: 20px; background: rgba(255,255,255,0.2);"></div>

            <button class="btn-close" onclick="closeModal()">Закрити</button>
            <button class="btn-add" onclick="addToProfile()">
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
         const s = document.getElementById('gallery-styles');
         if (s) s.remove();
      }, 200);
   }
};

window.addToProfile = () => {
   let collection = JSON.parse(localStorage.getItem('nobleCollection')) || [];
   const exists = collection.some(item => item.src === currentArt.src);

   if (!exists) {
      currentArt.date = new Date().toLocaleDateString();
      currentArt.desc = "Додано з головної галереї";
      collection.push(currentArt);
      localStorage.setItem('nobleCollection', JSON.stringify(collection));
      alert('Успішно збережено в колекцію!');
   } else {
      alert('Ця картина вже є у вашій колекції.');
   }
   closeModal();
};

function showDeveloperInfo(name) {
   alert(`Розробник: ${name}`);
}

function sendMessage(user) {
   const ta = document.getElementById(user === 1 ? 'msg1' : 'msg2');
   const text = ta.value.trim();
   if (!text) return;

   const chatBox = document.getElementById('chat');
   const msg = document.createElement('div');
   msg.classList.add('msg', user === 1 ? 'user1' : 'user2');
   msg.innerText = text;

   chatBox.append(msg);
   ta.value = '';
   chatBox.scrollTop = chatBox.scrollHeight;
}

function searchPainting() {
   const query = prompt("Пошук картини:");
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
      if (!found) alert("Не знайдено.");
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


function clearChat() {
   const chatBox = document.getElementById('chat');
   const btn = document.getElementById('clear-btn');

   chatBox.innerHTML = '';

   const statusMsg = document.createElement('span');
   statusMsg.textContent = "Очищено!";
   statusMsg.style.color = "green";
   statusMsg.style.fontWeight = "bold";
   statusMsg.style.padding = "5px 10px";
   btn.replaceWith(statusMsg);

   setTimeout(() => {
      statusMsg.replaceWith(btn);
   }, 2000);
}

document.addEventListener('click', (event) => {

   const btn = event.target.closest('[data-behavior="like"]');

   if (btn) {
      let countSpan = btn.querySelector('.count');
      let currentCount = parseInt(btn.dataset.count);

      if (!btn.classList.contains('liked')) {

         currentCount++;
         btn.classList.add('liked');
         btn.querySelector('.like-text').innerText = "Liked";
      } else {

         currentCount--;
         btn.classList.remove('liked');
         btn.querySelector('.like-text').innerText = "Like";
      }

      btn.dataset.count = currentCount;
      countSpan.innerText = currentCount;
   }
});

const MouseTracker = {
   panel: document.getElementById('tracker-panel'),
   coordsDisplay: document.getElementById('tracker-coords'),
   clickDisplay: document.getElementById('tracker-click'),
   isEnabled: false,

   handleEvent(event) {
      console.log("Обробник спрацював на елементі (currentTarget):", event.currentTarget);

      switch (event.type) {
         case 'mousemove':
            this.updateCoords(event);
            break;
         case 'click':
            this.logClick(event);
            break;
      }
   },

   updateCoords(event) {
      this.coordsDisplay.innerText = `X: ${event.clientX} | Y: ${event.clientY}`;
   },

   logClick(event) {
      this.clickDisplay.innerHTML = `Клік по: <b>${event.target.tagName}</b>`;
      this.clickDisplay.style.color = "#fff";
      setTimeout(() => {
         this.clickDisplay.style.color = "#c5a059";
      }, 500);
   },

   toggle() {
      if (this.isEnabled) {
         document.removeEventListener('mousemove', this);
         document.removeEventListener('click', this);

         this.panel.classList.remove('active');
         this.isEnabled = false;
         return false;
      } else {
         document.addEventListener('mousemove', this);
         document.addEventListener('click', this);

         this.panel.classList.add('active');
         this.isEnabled = true;
         return true;
      }
   }
};
const footerCategories = document.getElementById('footer-categories');
if (footerCategories) {
   footerCategories.onclick = function (event) {
      const item = event.target.closest('li');

      if (item && this.contains(item)) {

         for (let child of this.children) {
            child.style.color = "";
            child.style.fontWeight = "normal";
         }

         item.style.color = "#c5a059";
         item.style.fontWeight = "bold";
         console.log(`Обрано категорію: ${item.innerText}`);
      }
   };
}

document.addEventListener('click', function (event) {
   const target = event.target.closest('[data-action]');

   if (target) {
      const action = target.dataset.action;
      runCommand(action, target);
   }
});

function runCommand(action, btnElement) {
   const statusBox = document.getElementById('cmd-status');

   switch (action) {
      case 'save':
         alert("Системний лог збережено (Demo)");
         if (statusBox) {
            statusBox.innerText = "Система: Налаштування збережено!";
            statusBox.style.color = "green";
         }
         break;

      case 'theme':
         document.body.classList.toggle('dark-mode');
         const isDark = document.body.classList.contains('dark-mode');

         if (btnElement) {
            btnElement.innerText = isDark ? "☀️" : "🌙";
         }

         if (statusBox) {
            statusBox.innerText = isDark ? "Режим: Темний 🌙" : "Режим: Світлий ☀️";
            statusBox.style.color = isDark ? "#fff" : "#c5a059";
         }
         break;

      case 'toggleTracker':
         const isTracking = MouseTracker.toggle();

         if (btnElement) {
            btnElement.innerText = isTracking ? "Вимкнути трекер" : "Увімкнути трекер миші";
            btnElement.style.color = isTracking ? "red" : "";
         }

         if (statusBox) {
            statusBox.innerText = isTracking ? "Трекер: УВІМКНЕНО" : "Трекер: ВИМКНЕНО";
         }
         break;

      default:
         console.log("Невідома команда:", action);
   }
}