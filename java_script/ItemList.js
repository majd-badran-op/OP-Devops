class ItemList {
    static addItem(item = {}) {
        let storedTasks = JSON.parse(localStorage.getItem("items") || "[]");
        if (!Array.isArray(storedTasks)) {
            storedTasks = [];
        }
        storedTasks.push(item);
        localStorage.setItem("items", JSON.stringify(storedTasks));
        location.reload();
    }

    static getAll() {
        var storedTasks = JSON.parse(localStorage.getItem("items"));
        if (storedTasks.length === 0) {
            document.getElementById("list").innerHTML = "";
            document.getElementById("to_do_placeholder").innerText = "No Items Found";
            return;
        }
        else{
        document.getElementById("to_do_placeholder").innerText = "";
        document.getElementById("list").innerHTML = "";
        storedTasks.forEach(task => ItemList.list(task));
        this.addEventListeners();}
    }

    static getPending() {
        let storedTasks = JSON.parse(localStorage.getItem("items"));
        if (storedTasks.filter(task => task.stat === false).length === 0) {
            document.getElementById("list").innerHTML = "";
            document.getElementById("to_do_placeholder").innerText = "Nos Pending task Found";
            return;
        }
        else{
        document.getElementById("to_do_placeholder").innerText = "";
        document.getElementById("list").innerHTML = "";
        storedTasks.forEach(task => {
            if (task.stat === false) {
                ItemList.list(task);
            }
        });}
        this.addEventListeners();
    }

    static getCompleted() {
        let storedTasks = JSON.parse(localStorage.getItem("items"));
        if (storedTasks.filter(task => task.stat === true).length === 0) {
            document.getElementById("list").innerHTML = "";
            document.getElementById("to_do_placeholder").innerText = "No Completed task Found";
            return;
        }
        else{
        document.getElementById("to_do_placeholder").innerText = "";
        document.getElementById("list").innerHTML = "";
        storedTasks.forEach(task => {
            if (task.stat === true) {
                ItemList.list(task);
            }
        });}
        this.addEventListeners();
    }
    static updateData() {
        let id = document.getElementById("update_div").getAttribute("data_id");
        let storedTasks = JSON.parse(localStorage.getItem("items") || "[]");
        storedTasks = storedTasks.map(task => {
            if (task.id === id) {
                task.title = document.getElementById("update_title").value;
                task.description = document.getElementById("update_description").value;
            }
            return task;
        });
        localStorage.setItem("items", JSON.stringify(storedTasks));
        console.log(id);
        location.reload();
    }

    static list(element = {}) {
        let list = document.getElementById("list");
        let div = document.createElement("div");
        div.classList.add("list_item");
        let id = element.id;
        div.setAttribute("data-id", id);
        if (element.stat === true) {
        div.innerHTML = `
        <div class="check_div check">
            <a href="#"><i class="fa-solid fa-check"></i></a>
        </div>
        <div class="item_title">
            <p>${element["title"]}</p>
        </div>
        <div class="item_inspect">
            <a href="#"><i class="fa-regular fa-eye"></i></a>
        </div>
        <div class="item_update">
            <a href="#" onclick="show_update(this)"><i class="fa-solid fa-pen"></i></a>
        </div>
        <div class="delete_item">
            <a href="#"><i class="fa-solid fa-trash"></i></a>
        </div>
        `;}
        else {
            div.innerHTML = `
        <div class="check_div uncheck">
            <a href="#"><i class="fa-solid fa-check"></i></a>
        </div>
        <div class="item_title">
            <p>${element["title"]}</p>
        </div>
        <div class="item_inspect">
            <a href="#"><i class="fa-regular fa-eye"></i></a>
        </div>
        <div class="item_update">
            <a href="#" onclick="show_update(this)"><i class="fa-solid fa-pen"></i></a>
        </div>
        <div class="delete_item">
            <a href="#"><i class="fa-solid fa-trash"></i></a>
        </div>
        `;
        }
        list.appendChild(div);
    }

    static addEventListeners() {
        const checkButtons = document.querySelectorAll('.check_div a');
        const deleteButtons = document.querySelectorAll('.delete_item a');
        const inspectButtons = document.querySelectorAll('.item_inspect a');
        const updateButtons = document.querySelectorAll('.item_update a');

        checkButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                ItemList.check_child(button);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                ItemList.delete_child(button);
            });
        });
        inspectButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                ItemList.show_inspect(button);
            });
        });

        updateButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                ItemList.show_edit(button);
            });
        });
    }

    static check_child(button) {
        const itemTitle = button.closest('.list_item').querySelector('.item_title p').textContent;
        let storedTasks = JSON.parse(localStorage.getItem("items") || "[]");
        storedTasks = storedTasks.map(task => {
            if (task.title === itemTitle) {
                task.stat = !task.stat;
            }
            return task;
        });
        localStorage.setItem("items", JSON.stringify(storedTasks));
        const checkElement = button.closest('.list_item').querySelector('.check_div');
        if (checkElement.classList.contains('uncheck')) {
            checkElement.classList.remove("uncheck");
            checkElement.classList.add("check");
        } else {
            checkElement.classList.remove("check");
            checkElement.classList.add("uncheck");
        }
    }

    static delete_child(button) {
        const itemTitle = button.closest('.list_item').querySelector('.item_title p').textContent;
        let storedTasks = JSON.parse(localStorage.getItem("items") || "[]");
        storedTasks = storedTasks.filter(task => task.title !== itemTitle);
        localStorage.setItem("items", JSON.stringify(storedTasks));
        button.closest('.list_item').remove();
        if(storedTasks.length === 0){
            document.getElementById("to_do_placeholder").innerText = "No Items Found";
        }
    }

    static show_inspect(button) {
        console.log('Inspect button clicked');
    }

    static show_edit(button) {
        const itemTitle = button.closest('.list_item').querySelector('.item_title p').textContent;
        let storedTasks = JSON.parse(localStorage.getItem("items") || "[]");
        const itemToEdit = storedTasks.find(task => task.title === itemTitle);
        if (itemToEdit) {
            document.getElementById("update_title").value = itemToEdit.title;
            document.getElementById("update_description").value = itemToEdit.description;
        }
    }
}

export default ItemList;
