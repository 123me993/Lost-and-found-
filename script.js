const API = "https://lost-found-backend-1vba.onrender.com/items";

let allItems = [];

async function loadItems() {
  try {
    const res = await fetch(API, { cache: "no-store" });
    allItems = await res.json();
    displayItems(allItems);
  } catch (err) {
    document.getElementById("items").innerHTML =
      "<p>Error loading items.</p>";
  }
}

function displayItems(items) {
  const container = document.getElementById("items");
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = "<p>No lost items yet.</p>";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item-card";

    div.innerHTML = `
      <img src="${item.image}">
      <h3>${item.name}</h3>
      <p><b>Category:</b> ${item.category}</p>
      <p><b>Location:</b> ${item.location}</p>
      <p>${item.desc || ""}</p>
      <div class="status ${item.status}">
        ${item.status.toUpperCase()}
      </div>
    `;

    container.appendChild(div);
  });
}

// Search & filter
document.getElementById("search").addEventListener("input", filterItems);
document.getElementById("filter").addEventListener("change", filterItems);

function filterItems() {
  const text = search.value.toLowerCase();
  const category = filter.value;

  const filtered = allItems.filter(item => {
    const matchText =
      item.name.toLowerCase().includes(text) ||
      item.location.toLowerCase().includes(text);

    const matchCategory =
      category === "all" || item.category === category;

    return matchText && matchCategory;
  });

  displayItems(filtered);
}

loadItems();