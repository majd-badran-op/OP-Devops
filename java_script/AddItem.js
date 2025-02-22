import ItemList from "./ItemList.js";

window.add = function () {
    let title = document.getElementById("new_title").value.trim();
    let description = document.getElementById("description").value.trim();
    let id = generateUniqueId();
    if (!title) {
        window.alert("Enter at least a title");
        return;
    }
    const itemData = { title, description, stat: false, id};
    ItemList.addItem(itemData);
}

window.show = function () {
    document.getElementById("new").classList.add("show");
}

window.cancel = function () {
    document.getElementById("new").classList.remove("show");

}

window.cancel_update = function () {
    document.getElementById("update_div").classList.remove("show");
    document.getElementById("update_div").classList.add("cancel");

};

window.show_update = function (a) {
    let id = a.parentElement.parentElement.getAttribute("data-id");
    document.getElementById("update_div").setAttribute("data_id", id);
    console.log(id);
    document.getElementById("update_div").classList.remove("cancel");
    document.getElementById("update_div").classList.add("show");
    ItemList.show_edit(a);
};

window.updateUI = function() {
    ItemList.getAll();
}
window.get_pending = function () {
    ItemList.getPending();
};

window.get_completed = function () {
    ItemList.getCompleted();
}

window.update_data = function () {
    ItemList.updateData();
}

function generateUniqueId() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');  // Day of the month, padded with leading zero
    const hour = now.getHours().toString().padStart(2, '0'); // Hour (24-hour format), padded
    const minute = now.getMinutes().toString().padStart(2, '0'); // Minutes, padded
    const second = now.getSeconds().toString().padStart(2, '0'); // Seconds, padded
    const randomNum = Math.floor(Math.random() * 1000); // Random number for extra uniqueness
    return `id-${now.getFullYear()}-${now.getMonth() + 1}-${day}-${hour}-${minute}-${second}-${randomNum}`;
  }