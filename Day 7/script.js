const addButton = document.getElementById("addButton");
const titleInput = document.getElementById("title");
const prioritySelect = document.getElementById("priority");
const listItems = document.getElementById("list-items");

const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
storedItems.forEach(item => {
    createListItem(item.title, item.priority);
});

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const priority = prioritySelect.value;

    if (title && priority) {
        createListItem(title, priority);

        saveToLocalStorage();

        titleInput.value = "";
        prioritySelect.value = "";
    }
});

function createListItem(title, priority) {
    const listItem = document.createElement('div');
    listItem.classList.add("list-item");
    listItem.innerHTML = `
        <div>
            <p>${title}</p>
            <span class="${priority}">${priority}</span>
        </div>
        <div>
            <button class="edit"><img src="clarity_edit-line.png"></button>
            <button class="delete"><img src="fluent_delete-20-regular.png"></button>
        </div>
    `;
    listItems.appendChild(listItem);
    storedItems.push({ title, priority });
    addEditDeleteListeners(listItem, storedItems.length - 1);
}

function saveToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(storedItems));
}

function addEditDeleteListeners(listItem, index) {
    const editButton = listItem.querySelector('.edit');
    const deleteButton = listItem.querySelector('.delete');
    const titleElement = listItem.querySelector('p');

    editButton.addEventListener('click', () => {
        const newTitle = prompt('Edit the title:', titleElement.textContent);
        if (newTitle) {
            titleElement.textContent = newTitle;
            storedItems[index].title = newTitle;
            saveToLocalStorage();
        }
    });

    deleteButton.addEventListener('click', () => {
        listItems.removeChild(listItem);
        storedItems.splice(index, 1);
        saveToLocalStorage();
        localStorage.removeItem('todoItems');
    });
}