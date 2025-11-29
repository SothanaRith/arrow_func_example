import { localStorageUtils } from "./localStorageUtils.js";
import {fetchMockUsers} from "./fetchMock";

let data = {
    users: [
        {
            id: 1,
            firstName: "Emily",
            lastName: "Johnson",
            email: "emily.johnson@x.dummyjson.com",
            role: "admin",
            image: "https://i.pravatar.cc/150?img=1"
        },
        {
            id: 2,
            firstName: "Mark",
            lastName: "Davidson",
            email: "mark@demo.com",
            role: "user",
            image: "https://i.pravatar.cc/150?img=5"
        }
    ]
};

const userData = await fetchMockUsers()

console.log(userData)

const userList = document.getElementById("userList");
const modal = document.getElementById("editModal");

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

        card.querySelector(".delete-btn").addEventListener("click", () => {
            const confirmed = confirm(`Delete ${user.firstName}?`);
            if (!confirmed) return;

            data.users = data.users.filter(u => u.id !== user.id);
            renderUsers();
        });

        userList.appendChild(card);
    });
}

document.getElementById("cancelEdit").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("saveEdit").onclick = () => {
    editingUser.firstName = document.getElementById("editFirstName").value;
    editingUser.lastName = document.getElementById("editLastName").value;
    editingUser.email = document.getElementById("editEmail").value;
    editingUser.role = document.getElementById("editRole").value;

    modal.style.display = "none";
    renderUsers();
};

renderUsers();