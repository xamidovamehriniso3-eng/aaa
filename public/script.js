const form = document.getElementById("adForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const adData = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: Number(document.getElementById("price").value),
    category: document.getElementById("category").value,
    location: document.getElementById("location").value,
  };

  try {
    const response = await fetch("/api/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adData),
    });

    const data = await response.json();

    if (response.ok) {
      message.textContent = "✅ E'lon muvaffaqiyatli qo'shildi!";
      message.className = "success";

      form.reset();
    } else {
      message.textContent = "❌ " + data.message;
      message.className = "error";
    }
  } catch (error) {
    message.textContent = "❌ Server bilan bog'lanishda xatolik";
    message.className = "error";
  }
});