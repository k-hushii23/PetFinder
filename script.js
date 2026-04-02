const loading = document.getElementById("loading");
const message = document.getElementById("message");
const petsContainer = document.getElementById("petsContainer");

let petsData = [];

async function fetchPets() {
  try {
    loading.classList.remove("hidden");
    message.classList.add("hidden");

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch pet data");
    }

    const data = await response.json();
    petsData = data;

    console.log("Fetched Data:", petsData);

    renderPets(petsData);

    loading.classList.add("hidden");
  } catch (error) {
    console.error("Error:", error);

    loading.classList.add("hidden");
    message.classList.remove("hidden");
    message.innerHTML = `<p>Something went wrong while loading pets.</p>`;
  }
}

function renderPets(data) {
  petsContainer.innerHTML = "";

  data.forEach((pet) => {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    card.innerHTML = `
      <img src="https://place-puppy.com/300x300?random=${pet.id}" alt="${pet.name}">
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <p><strong>Breed:</strong> ${pet.username}</p>
        <p><strong>Location:</strong> ${pet.address.city}</p>
        <p><strong>Shelter:</strong> ${pet.company.name}</p>
        <button>View More</button>
      </div>
    `;

    petsContainer.appendChild(card);
  });
}

fetchPets();