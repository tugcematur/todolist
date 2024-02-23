const add = document.querySelector('.add');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('btn-clr');
const itemFilter = document.getElementById('filter');

let isEditMode = false;

function onClickItem(e) {


    if (e.target.parentElement.classList.contains('remove-item')) {
        //console.log(e.target.parentElement.parentElement);
        removeItem(e.target.parentElement.parentElement)
        btn.innerHTML = '<i class="fa-solid fa-plus"></i>'
        btn.style.backgroundColor = '#9fd3c7'
    }

    else {

        setitemToEdit(e.target)
        console.log(isEditMode);
        //  console.log(e.target);
    }

}

function setitemToEdit(item) {

    isEditMode = true;

    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));

    item.classList.add('edit-mode');
    add.classList.add('active');
    btn.innerHTML = '<i class="fa-solid fa-pencil"></i> '
    btn.style.backgroundColor = 'green';

    input.value = item.textContent;
}

function removeItem(item) {

    console.log(item);
   
    if(confirm('Are you sure ?')){
        item.remove();
        removeitemFromStorage(item.textContent);
        checkUI();

    }

   
}


function getItemsFromStorage() {
    let itemFromStorage;

    if (localStorage.getItem('items') === null) {
        itemFromStorage = [];
    } else {

        itemFromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemFromStorage;

}

function additemToStorage(item) {

    let itemFromStorage = getItemsFromStorage();

    itemFromStorage.push(item);

    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function removeitemFromStorage(item) {

    let itemFromStorage = getItemsFromStorage();

    itemFromStorage = itemFromStorage.filter(i => i !== item)

    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}


function additemToDom(item) {

    const li = document.createElement('li');
    const text = document.createTextNode(item);

    li.appendChild(text);

    const button = createButton('remove-item  btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');

    button.appendChild(icon);


    li.appendChild(button);

    itemList.appendChild(li)
}


function createButton(classess) {

    const button = document.createElement('button');
    button.className = classess;

    return button;
}

function createIcon(classess) {

    const icon = document.createElement('i');
    icon.className = classess;

    return icon;
}


function displayItems() {

    //localstoragedekileri doma ekleme
    let itemFromStorage = getItemsFromStorage();

    itemFromStorage.forEach(item => additemToDom(item))
}

function checkIfItemExist(item) {

    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);
}

function checkUI() {
    input.value = '';

    isEditMode = false;
}


function clearAll(){

   while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
   }

   localStorage.removeItem('items');

}


function filterItems(e){

    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
    console.log(text);

    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();


        if(itemName.indexOf(text) !== -1){
            item.style.display = 'flex';
        }
        else{
            item.style.display= 'none'
        }
      
    })
}


btn.addEventListener('click', () => {

    const newItem = input.value;

    if (newItem !== '') {

        if (isEditMode) {

            const itemToEdit = itemList.querySelector('.edit-mode');

            removeitemFromStorage(itemToEdit.textContent);
            itemToEdit.classList.remove('edit-mode');
            itemToEdit.remove();

            additemToDom(newItem);
            additemToStorage(newItem);
            

            isEditMode = false;
            input.value = '';

            btn.innerHTML = '<i class="fa-solid fa-plus"></i>'
            btn.style.backgroundColor = '#9fd3c7'

        }
        else if (checkIfItemExist(newItem)) {

            alert("already exists")
            return;
        }

        else {
            additemToDom(newItem);
            additemToStorage(newItem);

            input.value = '';
        }


    }
    else {
        add.classList.toggle('active')

      
            btn.innerHTML = '<i class="fa-solid fa-plus"></i>'
            btn.style.backgroundColor = '#9fd3c7'
    

    }
    input.focus()

    console.log(isEditMode);

})





itemList.addEventListener('click', onClickItem);
document.addEventListener('DOMContentLoaded', displayItems);
clearBtn.addEventListener('click',clearAll);
itemFilter.addEventListener('input', filterItems);