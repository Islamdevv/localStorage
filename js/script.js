let text = document.querySelector(".text");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");
let modal_window = document.querySelector(".modal-window");
readProduct();

btn.addEventListener("click", () => {
  if (!text.value.trim()) {
    alert("Заполните пусты поля!!!");
    return;
  }
  let obj = {
    text: text.value,
  };
  let data = JSON.parse(localStorage.getItem("test")) || [];
  data.push(obj);
  localStorage.setItem("test", JSON.stringify(data));
  readProduct();
});

function readProduct() {
  let data = JSON.parse(localStorage.getItem("test")) || [];
  list.innerHTML = "";
  data.forEach((el, index) => {
    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let addToBag = document.createElement("button");

    li.innerText = el.text;
    deleteBtn.innerText = "delete";
    editBtn.innerText = "edit";
    addToBag.innerText = "buy";

    list.append(li);
    list.append(deleteBtn);
    list.append(editBtn);
    list.append(addToBag);

    //? action
    deleteBtn.addEventListener("click", () => {
      deleteProduct(index);
    });

    editBtn.addEventListener("click", () => {
      modal_window.style.display = "flex";
      updateProduct(index);
    });

    addToBag.addEventListener("click", () => {
      let data_bag = JSON.parse(localStorage.getItem("bag")) || [];
      if (data_bag.some((item, idx) => idx === index)) {
        alert("Этот продукт уже добавлен!!!");
      } else {
        let findObject = data.find((item, idx) => idx === index);
        data_bag.push(findObject);
        localStorage.setItem("bag", JSON.stringify(data_bag));
      }
    });
  });
}

function deleteProduct(id) {
  let data = JSON.parse(localStorage.getItem("test")) || [];
  data.splice(id, 1);
  localStorage.setItem("test", JSON.stringify(data));
  readProduct();
}

// ? MODAL WINDOW
window.addEventListener("click", (e) => {
  if (e.target === modal_window) {
    modal_window.style.display = "none";
  }
});
// ? MODAL WINDOW

let edit_text = document.querySelector(".edit-text");
let btn_save = document.querySelector(".btn-save");

function updateProduct(index) {
  let data = JSON.parse(localStorage.getItem("test")) || [];
  edit_text.value = data[index].text;
  edit_text.setAttribute("id", index);
}

btn_save.addEventListener("click", () => {
  let newObj = {
    text: edit_text.value,
  };
  let data = JSON.parse(localStorage.getItem("test")) || [];
  let textID = edit_text.id;
  data.splice(textID, 1, newObj);
  localStorage.setItem("test", JSON.stringify(data));
  readProduct();
  modal_window.style.display = "none";
});

// CRUD - CREATE, READ, UPDATE, DELETE
