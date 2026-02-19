document.querySelector("#location").onclick = () => {
   window.location.href = '../html/location.html';
};

function openPainting(imgSrc, title) {
   alert("Картина: " + title);

   document.open();
   document.write(`
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { 
                    margin: 0; 
                    background: #121212; 
                    color: white; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100vh; 
                    font-family: 'Segoe UI', sans-serif; 
                }
                img { 
                    max-height: 75vh; 
                    max-width: 90%; 
                    border-radius: 10px; 
                    box-shadow: 0 0 30px rgba(0,0,0,0.7); 
                }
                h1 { margin-bottom: 20px; font-weight: 300; }
                button { 
                    margin-top: 30px; 
                    padding: 12px 30px; 
                    background: #817b0b; 
                    color: white; 
                    border: none; 
                    border-radius: 25px; 
                    cursor: pointer; 
                    font-size: 16px; 
                    transition: 0.3s;
                }
                button:hover { background: #a39c0d; transform: scale(1.05); }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <img src="${imgSrc}" alt="${title}">
            <button onclick="location.reload()">Повернутися в галерею</button>
        </body>
        </html>
    `);
   document.close();

   console.log(document.documentElement.outerHTML);

}

function showDeveloperInfo(surname, name, position = "Owner") {
   const metaAuthor = document.querySelector('meta[name="author"]').content;
   alert(`Автор: ${name} ${surname}\nПосада: ${position}\nMeta-Author: ${metaAuthor}`);
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
            card.style.outline = "5px solid yellow";
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





