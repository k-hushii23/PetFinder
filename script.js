const loading = document.getElementById("loading");
const message = document.getElementById("message");
const petsContainer = document.getElementById("petsContainer");

const searchInput = document.getElementById("searchInput");
const breedFilter = document.getElementById("breedFilter");
const sortOption = document.getElementById("sortOption");
const themeToggle = document.getElementById("themeToggle");

let petsData = [];
let petImages = [];

// 🐶 Fetch multiple dog images
async function getDogImages(count) {
  try {
    const res = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    const data = await res.json();
    return data.message;
  } catch {
    return [];
  }
}

// 🐾 Fallback data (NOW MANY PETS)
const fallbackData = [
  { id:1, name:"Buddy", username:"Golden Retriever", address:{city:"Delhi"}, company:{name:"Happy Tails"} },
  { id:2, name:"Luna", username:"Husky", address:{city:"Mumbai"}, company:{name:"Paws Rescue"} },
  { id:3, name:"Charlie", username:"Beagle", address:{city:"Bangalore"}, company:{name:"Safe Haven"} },
  { id:4, name:"Max", username:"German Shepherd", address:{city:"Chandigarh"}, company:{name:"Pet Care"} },
  { id:5, name:"Rocky", username:"Labrador", address:{city:"Pune"}, company:{name:"Happy Homes"} },
  { id:6, name:"Bella", username:"Pug", address:{city:"Jaipur"}, company:{name:"Pet Rescue"} },
  { id:7, name:"Milo", username:"Shih Tzu", address:{city:"Delhi"}, company:{name:"Urban Pets"} },
  { id:8, name:"Daisy", username:"Spaniel", address:{city:"Lucknow"}, company:{name:"Pet World"} },
  { id:9, name:"Simba", username:"Indie", address:{city:"Hyderabad"}, company:{name:"Stray Care"} },
  { id:10, name:"Coco", username:"Poodle", address:{city:"Kolkata"}, company:{name:"Happy Paws"} }
];

// 🚀 Fetch pets
async function fetchPets() {
  try {
    loading.classList.remove("hidden");

    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) throw new Error();

    const data = await res.json();
    petsData = data;

  } catch {
    petsData = fallbackData;
  }

  // 🔥 fetch images equal to pets
  petImages = await getDogImages(petsData.length);

  populateFilter();
  renderPets(petsData);

  loading.classList.add("hidden");
}

// 🎨 Render cards
function renderPets(data) {
  petsContainer.innerHTML = "";

  if (data.length === 0) {
    message.classList.remove("hidden");
    message.textContent = "No pets found";
    return;
  }

  message.classList.add("hidden");

  data.forEach((pet, index) => {
    const img = petImages[index] || "https://placehold.co/300x300";

    const card = document.createElement("div");
    card.className = "pet-card";

    card.innerHTML = `
      <button class="fav-btn">🤍</button>
      <img src="${img}" alt="${pet.name}">
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <p>Breed: ${pet.username}</p>
        <p>City: ${pet.address.city}</p>
        <p>Shelter: ${pet.company.name}</p>
      </div>
    `;

    petsContainer.appendChild(card);
  });

  // ❤️ Favorite toggle
  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = btn.textContent === "🤍" ? "❤️" : "🤍";
    });
  });
}

// 🔍 Populate filter
function populateFilter() {
  breedFilter.innerHTML = `<option value="all">All Shelters</option>`;

  const companies = [...new Set(petsData.map(p => p.company.name))];

  companies.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    breedFilter.appendChild(option);
  });
}

// 🔎 Apply filters
function applyFilters() {
  let filtered = [...petsData];

  const search = searchInput.value.toLowerCase();
  const filter = breedFilter.value;
  const sort = sortOption.value;

  // Search
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search) ||
    p.username.toLowerCase().includes(search)
  );

  // Filter
  if (filter !== "all") {
    filtered = filtered.filter(p => p.company.name === filter);
  }

  // Sort
  if (sort === "az") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "za") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  renderPets(filtered);
}

// 🌙 Dark mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

// 🎯 Events
searchInput.addEventListener("input", applyFilters);
breedFilter.addEventListener("change", applyFilters);
sortOption.addEventListener("change", applyFilters);

// 🚀 Start
fetchPets();