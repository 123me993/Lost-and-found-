alert("add.js loaded");

const API = "https://lost-found-backend-1vba.onrender.com/items";

document.getElementById("addForm").addEventListener("submit", async e => {
  e.preventDefault();
  alert("Form submitted");

  const file = document.getElementById("image").files[0];

  if (!file) {
    alert("No image selected");
    return;
  }

  alert("Image selected");

  const reader = new FileReader();

  reader.onload = async () => {
    alert("Image converted");

    const data = {
      name: itemName.value,
      location: location.value,
      category: category.value,
      desc: desc.value,
      image: reader.result
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      alert("Request sent");

      if (!res.ok) {
        alert("Server rejected request");
        return;
      }

      alert("SUCCESS: Item added");
      window.location.href = "index.html";

    } catch (err) {
      alert("NETWORK ERROR");
      console.error(err);
    }
  };

  reader.readAsDataURL(file);
});