const API = "https://lost-found-backend-1vba.onrender.com/items";

document.getElementById("addForm").addEventListener("submit", async e => {
  e.preventDefault();

  const file = document.getElementById("image").files[0];

  if (!file) {
    alert("Please select an image");
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {

    const data = {
      name: document.getElementById("itemName").value.trim(),
      location: document.getElementById("location").value.trim(),
      category: document.getElementById("category").value,
      desc: document.getElementById("desc").value.trim(),
      image: reader.result
    };

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const text = await res.text(); // 👈 SEE SERVER MESSAGE

      if (!res.ok) {
        alert("Server error: " + text);
        return;
      }

      alert("Item added successfully!");
      window.location.href = "index.html";

    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  reader.readAsDataURL(file);
});
