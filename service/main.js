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

window.closeModal = function () {
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

window.addToProfile = function () {
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
   alert("Функціонал діалогу тимчасово відключено.");
}

function clearChat() {
   document.getElementById('chat').innerHTML = '';
}



document.addEventListener('click', function (event) {

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
   enabled: false,


   handleEvent(event) {
      switch (event.type) {
         case 'mousemove':
            this.updateCoords(event);
            break;
         case 'click':
            this.logClick(event);
            break;
      }
   },

   updateCoords(e) {
      this.coordsDisplay.innerText = `X: ${e.clientX} | Y: ${e.clientY}`;
   },

   logClick(e) {
      this.clickDisplay.innerText = `Клік по: <${e.target.tagName.toLowerCase()}>`;
      this.clickDisplay.style.color = "#fff";
      setTimeout(() => this.clickDisplay.style.color = "#c5a059", 500);
   },

   toggle() {
      if (!this.enabled) {
         document.addEventListener('mousemove', this);
         document.addEventListener('click', this);
         this.panel.classList.add('active');
         this.enabled = true;
         return true;
      } else {
         document.removeEventListener('mousemove', this);
         document.removeEventListener('click', this);
         this.panel.classList.remove('active');
         this.enabled = false;
         return false;
      }
   }
};

const trackerBtn = document.getElementById('toggle-tracker-btn');
if (trackerBtn) {
   trackerBtn.onclick = () => {
      const isOn = MouseTracker.toggle();
      trackerBtn.innerText = isOn ? "Вимкнути трекер" : "Увімкнути трекер миші";
      trackerBtn.style.color = isOn ? "red" : "";
   };
}


const footerCategories = document.getElementById('footer-categories');
if (footerCategories) {
   footerCategories.onclick = function (event) {
      if (event.target.tagName === 'LI') {
         alert(`Фільтр по категорії: ${event.target.innerText} (Demo)`);
      }
   };
}


const commandPanel = document.getElementById('footer-commands');
const statusBox = document.getElementById('cmd-status');

if (commandPanel) {
   commandPanel.onclick = function (event) {
      const action = event.target.dataset.action;

      if (action) {
         runCommand(action);
      }
   };
}

function runCommand(action) {
   switch (action) {
      case 'save':
         statusBox.innerText = "Система: Збереження логів...";
         console.log("Saving...");
         break;
   }
   setTimeout(() => statusBox.innerText = "", 2000);
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

      case 'report':
         alert("Скаргу відправлено адміністратору.");
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
   }
}