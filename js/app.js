import { localStorageUtils } from "./localStorageUtils.js";
import {startUp, updateUserById, deleteUserById, getUserById, addUser} from "./crud.js";
let data = await startUp()

const userList = document.getElementById("userList");
const modal = document.getElementById("editModal");
const addModal = document.getElementById("addModal");

let editingUser = null;

function renderUsers() {
    userList.innerHTML = "";

    data.users.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";

        card.innerHTML = `
          <div class="top">
            <div class="avatar">
              <img src="${user.image}" alt="">
            </div>

            <div>
              <div class="name">${user.firstName} ${user.lastName}</div>
              <div class="email">${user.email}</div>
              <span class="role ${user.role}">${user.role}</span>
            </div>
          </div>

          <div class="actions">
            <button class="edit-btn">✏️ Edit</button>
            <button class="delete-btn">Delete</button>
          </div>
        `;

        card.querySelector(".edit-btn").addEventListener("click", () => {
            editingUser = user;

            document.getElementById("editFirstName").value = user.firstName;
            document.getElementById("editLastName").value = user.lastName;
            document.getElementById("editEmail").value = user.email;
            document.getElementById("editRole").value = user.role;

            modal.style.display = "flex";
        });

        card.querySelector(".delete-btn").addEventListener("click", async () => {
            deleteUserById(user.id, data.users)
            data = await startUp()
            renderUsers();
        });

        userList.appendChild(card);
    });
}

document.getElementById("cancelEdit").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("saveEdit").onclick = async () => {

    editingUser.firstName = document.getElementById("editFirstName").value;
    editingUser.lastName = document.getElementById("editLastName").value;
    editingUser.email = document.getElementById("editEmail").value;
    editingUser.role = document.getElementById("editRole").value;

    await updateUserById(editingUser)
    data = await startUp()
    modal.style.display = "none";
    renderUsers();
};

document.getElementById("addUserBtn").onclick = () => {
    addModal.style.display = "flex";
};

document.getElementById("cancelAdd").onclick = () => {
    addModal.style.display = "none";
};

document.getElementById("saveAdd").onclick = async () => {
    const newUser = {
        id: Date.now(), // simple auto-ID
        firstName: document.getElementById("newFirstName").value,
        lastName: document.getElementById("newLastName").value,
        email: document.getElementById("newEmail").value,
        role: document.getElementById("newRole").value,
        image: document.getElementById("newImage").value || "default.png"
    };

    data.users.push(newUser);

    await addUser(newUser)

    addModal.style.display = "none";
    data = await startUp()
    renderUsers();
};

renderUsers();