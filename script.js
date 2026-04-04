const loading = document.getElementById("loading");
const message = document.getElementById("message");
const petsContainer = document.getElementById("petsContainer");

const searchInput = document.getElementById("searchInput");
const breedFilter = document.getElementById("breedFilter");
const sortOption = document.getElementById("sortOption");
const themeToggle = document.getElementById("themeToggle");

// Modal Elements
const petModal = document.getElementById("petModal");
const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalBreed = document.getElementById("modalBreed");
const modalLocation = document.getElementById("modalLocation");
const modalShelter = document.getElementById("modalShelter");
const modalEmail = document.getElementById("modalEmail");
const modalPhone = document.getElementById("modalPhone");
const modalWebsite = document.getElementById("modalWebsite");

let petsData = [];

// Fallback data with REAL IMAGES
const fallbackData = [
  {
    id: 1,
    name: "Buddy",
    username: "Golden Retriever",
    email: "buddy@shelter.com",
    phone: "9876543210",
    website: "www.buddyadopt.com",
    address: { city: "Delhi" },
    company: { name: "Happy Tails Shelter" },
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Luna",
    username: "Husky",
    email: "luna@shelter.com",
    phone: "9123456780",
    website: "www.lunaadopt.com",
    address: { city: "Mumbai" },
    company: { name: "Paws Rescue" },
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Charlie",
    username: "Beagle",
    email: "charlie@shelter.com",
    phone: "9988776655",
    website: "www.charliepets.com",
    address: { city: "Bangalore" },
    company: { name: "Safe Haven Pets" },
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Max",
    username: "German Shepherd",
    email: "max@shelter.com",
    phone: "9012345678",
    website: "www.maxcare.com",
    address: { city: "Chandigarh" },
    company: { name: "Pet Care Society" },
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Bella",
    username: "Labrador",
    email: "bella@shelter.com",
    phone: "9090909090",
    website: "www.bellaadopt.com",
    address: { city: "Jaipur" },
    company: { name: "Love Paws Home" },
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Milo",
    username: "Persian Cat",
    email: "milo@shelter.com",
    phone: "9876501234",
    website: "www.milocats.com",
    address: { city: "Pune" },
    company: { name: "Furry Friends Care" },
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80"
  }
];

async function fetchPets() {
  try {
    loading.classList.remove("hidden");
    message.classList.add("hidden");

    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("API failed");
    }

    const data = await response.json();

    // Add random pet images to API data
    const petImages = [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80"
    ];

    petsData = data.map((pet, index) => ({
      ...pet,
      image: petImages[index % petImages.length]
    }));

  } catch (error) {
    console.error("API failed, using fallback data");
    petsData = fallbackData;
  }

  populateFilterOptions(petsData);
  renderPets(petsData);
  loading.classList.add("hidden");
}

function renderPets(data) {
  petsContainer.innerHTML = "";

  if (data.length === 0) {
    message.classList.remove("hidden");
    message.innerHTML = `<p>No pets found.</p>`;
    return;
  } else {
    message.classList.add("hidden");
  }

  data.forEach((pet) => {
    const card = document.createElement("div");
    card.classList.add("pet-card");

    card.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}" class="pet-image">
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <p><strong>Breed:</strong> ${pet.username}</p>
        <p><strong>Location:</strong> ${pet.address.city}</p>
        <p><strong>Shelter:</strong> ${pet.company.name}</p>
        <button class="view-more-btn" data-id="${pet.id}">View More</button>
      </div>
    `;

    petsContainer.appendChild(card);
  });

  attachViewMoreEvents();
}

function populateFilterOptions(data) {
  breedFilter.innerHTML = `<option value="all">All Breeds</option>`;

  const breeds = [...new Set(data.map((pet) => pet.username))];

  breeds.forEach((breed) => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedFilter.appendChild(option);
  });
}

function applyFiltersAndRender() {
  let filteredData = [...petsData];

  const searchValue = searchInput.value.toLowerCase();
  const selectedBreed = breedFilter.value;
  const selectedSort = sortOption.value;

  // Search
  filteredData = filteredData.filter((pet) =>
    pet.name.toLowerCase().includes(searchValue) ||
    pet.username.toLowerCase().includes(searchValue)
  );

  // Filter
  if (selectedBreed !== "all") {
    filteredData = filteredData.filter(
      (pet) => pet.username === selectedBreed
    );
  }

  // Sort
  if (selectedSort === "az") {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === "za") {
    filteredData.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderPets(filteredData);
}

function attachViewMoreEvents() {
  const buttons = document.querySelectorAll(".view-more-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const petId = Number(button.dataset.id);
      const selectedPet = petsData.find((pet) => pet.id === petId);

      openModal(selectedPet);
    });
  });
}

function openModal(pet) {
  modalImage.src = pet.image;
  modalImage.alt = pet.name;
  modalName.textContent = pet.name;
  modalBreed.textContent = `Breed: ${pet.username}`;
  modalLocation.textContent = `Location: ${pet.address.city}`;
  modalShelter.textContent = `Shelter: ${pet.company.name}`;
  modalEmail.textContent = `Email: ${pet.email}`;
  modalPhone.textContent = `Phone: ${pet.phone}`;
  modalWebsite.innerHTML = `Website: <a href="https://${pet.website}" target="_blank">${pet.website}</a>`;;

  petModal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  petModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === petModal) {
    petModal.classList.add("hidden");
  }
});

// Dark Mode Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// Event Listeners
searchInput.addEventListener("input", applyFiltersAndRender);
breedFilter.addEventListener("change", applyFiltersAndRender);
sortOption.addEventListener("change", applyFiltersAndRender);

// Initial fetch
fetchPets();