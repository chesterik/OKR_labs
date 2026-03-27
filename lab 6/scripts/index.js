window.onload = function () {
   // 1. Зміна фону на 30 секунд (як на скріншоті)
   document.body.style.backgroundColor = "#34495e";
   setTimeout(() => {
      document.body.style.backgroundColor = ""; // Поверне колір з CSS вар --bg-color
   }, 30);

   // 2. Зміна заголовка
   const title = document.getElementById("main-title");
   if (title) {
      title.innerHTML = "Оновлена Експозиція";
   }

   // 3. Додавання тексту до назв картин
   const artNames = document.querySelectorAll(".pin-content b");
   artNames.forEach(name => {
      name.textContent += " (Перевірено)";
   });

   // 4. Додавання нового елемента в кінець контейнера
   const container = document.querySelector(".container");
   const infoNode = document.createElement("p");
   infoNode.style.padding = "20px";
   infoNode.textContent = "Новий зал сучасного мистецтва відкриється незабаром!";
   container.after(infoNode);
};