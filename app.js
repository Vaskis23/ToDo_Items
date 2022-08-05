//возьмем весь наш стол, который содержит все наши продукты
let groceryList = document.querySelector('#grocery-list ul');

// ****** ДОБАВЛЯЕМ ПОИСКОВЫЙ ФИЛЬТР ******
const SEARCH = document.forms['search-item'].querySelector('input');
SEARCH.addEventListener('keyup', (event) => {
    // преобразоваем введенный текст в нижний регистр, используя метод JavaScript toLowerCase()
    let text = event.target.value.toLowerCase();
    //захватываем каждый тег li
    let groceries = groceryList.getElementsByTagName('li');
    // Необходимо преобразовать HTMLCollection в массив, чтобы мы могли использовать метод forEach (мы можем видеть, что мы не можем найти его в __proto__)
    let groceryArray = Array.from(groceries);
    // цикл по каждому продукту
    groceryArray.forEach((grocery) => {
        let groceryName = grocery.firstElementChild.textContent;
        // преобразовываем весь наш текст в нижний регистр
        groceryNameLower = groceryName.toLowerCase();
        // теперь мы можем использовать indexOf, чтобы увидеть, можно ли найти наш текст в названии нашего продуктового магазина. Если ничего не найдено, возвращается значение -1.
        // примечание: мы оформляем его таким образом, потому что если мы этого не сделаем, то имена не вернутся после того, как мы удалим наше поле ввода

        if(groceryNameLower.indexOf(text) == -1) {
            grocery.style.display = 'none';
        } else {
            grocery.style.display = 'block';
        }


    })

})

// ****** СКРЫТЬ ПРОДУКТЫ ******
let hideCheckbox = document.querySelector('#hide');
hideCheckbox.addEventListener('change', () => {
    // подтверждаем, что флажок установлен
    let hideParent = document.getElementById('grocery-list');
    if(hideCheckbox.checked) {
        hideParent.style.display = 'none';
    } else {
        hideParent.style.display = 'block';
    }
})

// ****** ADD GROCERY ITEMS ******
const formAdd = document.getElementById('add-item');
// прикрепляем прослушиватель событий
formAdd.addEventListener('submit', (event) => {
    // запрещаем обновление страницы
    event.preventDefault();
    // захватываем введенный пользователем текст
    let text = formAdd.querySelector('input').value;
    // теперь очищаем наше поле ввода
    formAdd.querySelector('input').value = null;

    // сейчас создаем элементы
    let li = document.createElement('li');
    const groceryName = document.createElement('span');
    const deleteButton = document.createElement('span');
    // теги span вложены в li, поэтому давайте добавим их к li
    li.appendChild(groceryName);
    li.appendChild(deleteButton);
    // добавляем li в DOM   
    groceryList.appendChild(li);

    // добавить контент
    deleteButton.textContent = 'delete';
    groceryName.textContent = text;

    // добавляем классы
    groceryName.classList.add('name');
    deleteButton.classList.add('delete');


})

// ****** УДАЛИТЬ ПРОДУКТЫ ******

groceryList.addEventListener('click', (event) => {
    // мы хотим удалить только элемент списка, на который щелкнул пользователь
    // нужно найти элемент, на который кликнул пользователь
    if(event.target.className == 'delete') {
        // давайте найдем li элемента, на который нажали
        const LI = event.target.parentElement;
        LI.remove();
    }
})

// ****** ВКЛАДКИ ******

// давайте возьмем наши заголовки - наш родительский тег UL
let headings = document.querySelector('.heading');
let panels = document.querySelectorAll('.panel');
// определяем переменную selectedItem для переключения между классами
let selectedPanel = null; 

// воспользовавшись всплывающими окнами событий, давайте прикрепим прослушиватель событий к родительскому элементу ul
headings.addEventListener('click', (event) => {
// позволяет узнать, какой тег <li> вызвал событие
let target = event.target; 
// давайте используем набор данных, чтобы получить значение наших данных... мы назвали наш clicked, но вы можете называть его как хотите
let dataAttribute = event.target.dataset.clicked;
     
if(target.tagName == 'LI') {
// удалить текущий выбранный элемент
if(selectedPanel != null) {
    selectedPanel.classList.toggle('selected');
} 
selectedPanel = target;
selectedPanel.classList.toggle('selected');

// теперь давайте найдем панель, которую мы хотим показать
let targetPanel = document.querySelector(dataAttribute);

// теперь нам нужно определить, является ли панель, выбранная в данный момент, отображаемой. Мы можем использовать функцию forEach, потому что querySelectorAll возвращает NodeList.
panels.forEach((panel) => {
    if(panel == targetPanel) {
        panel.classList.add('active');
    } else {
        panel.classList.remove('active');
    }
})
}
});


let answerButton = document.getElementById('showAnswer');
answerButton.addEventListener('click', answer);

function answer(e) {
    document.getElementById('answer').classList.add('show');
    document.getElementById('answer').textContent = "AN IMPASTA";
    answerButton.style.display = 'none';
};