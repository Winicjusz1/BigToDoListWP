'use strict'

let $todoInput; //miejsce wpisania  zadania przez użytkownika 
let $alertInfo; // info o braku zadań lub konieczośco dodania zadania  
let $addBtn; // przycisk ADD do dodania nowych elementów do listy
let $ulList; //lista zadań  tagi <ul></ul> 
let $newTask; //  nowo dodane li , nowe zadanie 
let $popup; //pobrany popup
let $popupInfo; //alertw popupie, gdy się doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput; // tekst wpisywany w ionputa w popupie
let $addPopupBtn; // przycisk zatwierdź w popupie
let $closeTodoBtn; // przycisk do zamykania popupa
let $idNumber = 0; // numeracja Id todo-Id nadawana każdemu li - zadaniu
let $allTasks; // wszystkie li  na liście zadań 




const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};


// pobieramy nasze elementy: 
const prepareDOMElements = () => {

    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = $ulList.getElementsByTagName('li');  /* odwołanie do "żywej kolekcji" !!!!!! zamieszczonej tylko w naszej ulLiście !!!!!!! */
};

//nadajemy nasłuchiwanie:
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
    $todoInput.addEventListener('keyup', enterCheck);
};

/*poniżej funkcja addNewTask tworzaca nowe li i umieszczajaca w nim tekst z inputa  a w przypadku braku tekstu czyli gdy value inPuta jest pustym stringiem  to wyśwetla tekst 'Wpisz treśc zadania1' - czyli dodajemy nowy element tj. li do listy  */

const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);

        $todoInput.value = ''
        $alertInfo.innerText = ''
        createToolsArea();

    } else {
        $alertInfo.innerText = 'Wpisz treśc zadania!';
    }
};

//sprawdzenie czy użytkownik wcisnął enter
const enterCheck = () => {
    if (event.keyCode === 13) {
        addNewTask();
    }
};


// tworzenie przycisków edycji, usuwania i "gotowe", po prawej stronie każdego zadania 
const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);

};

// zarządzanie kiknięciami w przyciski toolsów 
const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('button').classList.toggle('completed');
    }
    else if (e.target.closest('button').className === 'edit') {
        editTask(e);

    } else if (e.target.closest('button').className === 'delete') {
        deleteTask(e);

    }

};

// edycja treści zadania w popupie
const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
};

// edycja zadania czyli zmiana treści zadania w popupie
const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none';
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'Musisz podać jakąś treść zadania!!!';
    };

};


// poniżej zamknięcie popupa - Anuluj
const closePopup = () => {
    $popup.style.display = 'none'
    $popupInfo.innerText = '';
};

//poniżej kasowanie zadania  Taska za pomocą krzyżyka 

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length === 0) {
        $alertInfo.innerText = 'Brak jakichkolwiek zadań na liście. ';
    }

}


document.addEventListener('DOMContentLoaded', main); /* wywołanie funkcji main dopiero po załadowaniu całej strony */



