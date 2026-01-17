// DOM selectors
const addNoteBtn = document.querySelector("#addBtn");
const formContainer = document.querySelector("#formContainer");
const form = document.querySelector("#callForm");
const imageUrl = document.querySelector("#imageUrl");
const fullName = document.querySelector("#fullName");
const homeTown = document.querySelector("#homeTown");
const purpose = document.querySelector("#purpose");
const stack = document.querySelector(".stack");
const up = document.querySelector("#up");
const down = document.querySelector("#down");
const categoryRadios = document.querySelectorAll("input[name='category']");
const closeBtn = document.querySelector("#closeBtn");

// Show form
addNoteBtn.addEventListener("click", () => {
  formContainer.classList.add("show");
});

// Close form
closeBtn.addEventListener("click", () => {
  formContainer.classList.remove("show");
});

// Save array to localStorage (helper)
function saveToLocal(obj) {
  const tasksStr = localStorage.getItem("tasks");
  const tasks = tasksStr ? JSON.parse(tasksStr) : [];
  tasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to create a single card element
function createCard(data) {
  // Main card div
  const card = document.createElement("div");
  card.className = `call-card ${data.selected || "norush"}`;

  // Avatar image
  const img = document.createElement("img");
  img.className = "avatar";
  img.src = data.imageUrl;
  img.alt = "Avatar";

  // Right side wrapper
  const details = document.createElement("div");
  details.className = "call-details";

  // Name (h2)
  const name = document.createElement("h2");
  name.textContent = data.fullName;

  // Row 1 — Home Town
  const row1 = document.createElement("div");
  row1.className = "row";
  const r1_label = document.createElement("span");
  r1_label.textContent = "Home town";
  const r1_value = document.createElement("span");
  r1_value.textContent = data.homeTown;
  row1.appendChild(r1_label);
  row1.appendChild(r1_value);

  // Row 2 — Purpose
  const row2 = document.createElement("div");
  row2.className = "row";
  const r2_label = document.createElement("span");
  r2_label.textContent = "Purpose";
  const r2_value = document.createElement("span");
  r2_value.textContent = data.purpose || "Not specified";
  row2.appendChild(r2_label);
  row2.appendChild(r2_value);

  // Buttons
  const actions = document.createElement("div");
  actions.className = "actions";
  const callBtn = document.createElement("button");
  callBtn.className = "call-btn";
  callBtn.innerHTML = "📞 Call";
  const msgBtn = document.createElement("button");
  msgBtn.className = "msg-btn";
  msgBtn.textContent = "Message";
  actions.appendChild(callBtn);
  actions.appendChild(msgBtn);

  // Assemble everything
  details.appendChild(name);
  details.appendChild(row1);
  details.appendChild(row2);
  details.appendChild(actions);
  card.appendChild(img);
  card.appendChild(details);

  return card;
}

// Load and display all cards from localStorage
function loadCards() {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  stack.innerHTML = ""; // Clear existing cards
  allTasks.forEach((data) => {
    const card = createCard(data);
    stack.appendChild(card);
  });
  updateStack();
}

// Update stack styles for layering effect
function updateStack() {
  const cards = document.querySelectorAll(".stack .call-card");
  cards.forEach((card, index) => {
    if (index < 5) {
      // Limit visible layers to 5 for performance
      card.style.zIndex = 5 - index;
      card.style.transform = `translateY(${index * 10}px) scale(${
        1 - index * 0.02
      })`;
      card.style.opacity = `${1 - index * 0.1}`;
    } else {
      card.style.display = "none"; // Hide excess cards
    }
  });
}

// Form submit
form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // Validate text fields
  if (
    imageUrl.value.trim() === "" ||
    fullName.value.trim() === "" ||
    homeTown.value.trim() === "" ||
    purpose.value.trim() === ""
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Get selected category
  let selectedCategory = null;
  categoryRadios.forEach((r) => {
    if (r.checked) selectedCategory = r.value;
  });

  if (!selectedCategory) {
    alert("Choose a category.");
    return;
  }

  // Build object
  const noteObj = {
    imageUrl: imageUrl.value.trim(),
    fullName: fullName.value.trim(),
    homeTown: homeTown.value.trim(),
    purpose: purpose.value.trim(),
    selected: selectedCategory,
  };

  // Save to localStorage
  saveToLocal(noteObj);

  // Create and add new card to bottom
  const newCard = createCard(noteObj);
  stack.appendChild(newCard);
  updateStack();

  // Reset and hide form
  form.reset();
  formContainer.classList.remove("show");

  console.log("Saved:", noteObj);
});

// Up button: Move bottom card to top
up.addEventListener("click", function () {
  const lastChild = stack.lastElementChild;
  if (lastChild && stack.children.length > 1) {
    stack.insertBefore(lastChild, stack.firstElementChild);
    updateStack();
  }
});

// Down button: Move top card to bottom
down.addEventListener("click", function () {
  const firstChild = stack.firstElementChild;
  if (firstChild && stack.children.length > 1) {
    stack.appendChild(firstChild);
    updateStack();
  }
});

// Initial load
loadCards();
