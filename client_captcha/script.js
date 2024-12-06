const marineLife = ["🐢", "🐟", "🐬", "🐠", "🦀", "🦑", "🦞", "🐋", "🐳"];
const trash = ["🍼", "🍾", "🛒", "🧴", "🎈", "📦", "🥤", "🔋", "🚬"];
const totalItems = 10;
let items = [];
let score = 0;
let lives = 3;

const itemsContainer = document.getElementById('items-container');
const trashBin = document.getElementById('trash-bin');
const safeZone = document.getElementById('safe-zone');
const livesDisplay = document.getElementById('lives');
const resultDisplay = document.getElementById('result');

// Initialize the game
function initGame() {
    generateItems();
    updateLives();
}

// Generate 10 random items: 5 marine life and 5 trash
function generateItems() {
    const selectedMarine = marineLife.sort(() => 0.5 - Math.random()).slice(0, 5);
    const selectedTrash = trash.sort(() => 0.5 - Math.random()).slice(0, 5);
    items = [...selectedMarine.map((e) => ({ type: "marine", emoji: e })), ...selectedTrash.map((e) => ({ type: "trash", emoji: e }))];

    // Shuffle the items
    items = items.sort(() => 0.5 - Math.random());

    // Render items
    itemsContainer.innerHTML = "";
    items.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.setAttribute("draggable", "true");
        div.setAttribute("data-type", item.type);
        div.setAttribute("data-id", index);
        div.textContent = item.emoji;

        div.addEventListener("dragstart", handleDragStart);
        div.addEventListener("dragend", handleDragEnd);

        itemsContainer.appendChild(div);
    });
}

// Drag Handlers
function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.type);
    e.target.classList.add("dragging");
}

function handleDragEnd(e) {
    e.target.classList.remove("dragging");
}

// Drop Zone Handlers
[trashBin, safeZone].forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());
    zone.addEventListener("drop", handleDrop);
});

function handleDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("text/plain");
    const draggedItem = document.querySelector(".dragging");

    if ((e.target.id === "trash-bin" && type === "trash") || (e.target.id === "safe-zone" && type === "marine")) {
        score++;
        draggedItem.classList.add("hidden");
        checkWinCondition();
    } else {
        lives--;
        updateLives();
        draggedItem.classList.add("hidden");
        checkLoseCondition();
    }
}

// Update lives display
function updateLives() {
    const hearts = "❤️ ".repeat(lives) + "🖤 ".repeat(3 - lives);
    livesDisplay.innerHTML = hearts.trim();
}

// Check for win condition
function checkWinCondition() {
    if (score === 5) {
        resultDisplay.textContent = "🎉 Félicitations! Vous avez sauvé l'ocean! 🎉";
        resultDisplay.classList.remove("hidden");
        disableGame();
    }
}

// Check for lose condition
function checkLoseCondition() {
    if (lives <= 0) {
        resultDisplay.textContent = "❌ Vous avez fait trop d'erreurs. Accès refusé! ❌";
        resultDisplay.classList.remove("hidden");
        disableGame();
    }
}

// Disable the game
function disableGame() {
    const allItems = document.querySelectorAll(".item");
    allItems.forEach((item) => item.setAttribute("draggable", "false"));
}

// Initialize the game
initGame();
