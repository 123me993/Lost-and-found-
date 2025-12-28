const API = "https://lost-found-backend-1vba.onrender.com/items";

const pass = prompt("Enter admin password:");
if (pass !== "admin123") {
  alert("Access denied");
  window.location.href = "index.html";
}

async function loadItems() {
  const res = await fetch(API);
  const items = await res.json();

  const container = document.getElementById("items");
  container.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p>${item.category} | ${item.location}</p>

      <div class="status ${item.status}">
        ${item.status.toUpperCase()}
      </div>

      <button onclick="markRecovered(${item.id})">Mark Recovered</button>
      <button onclick="deleteItem(${item.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

async function markRecovered(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "recovered" })
  });
  loadItems();
}

async function deleteItem(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadItems();
}

loadItems();