// Sélectionne les éléments nécessaires
const image = document.getElementById('image');
const scrollBtn = document.getElementById('scroll-btn');
const infoButtons = document.querySelectorAll('.info-button'); // Tous les boutons cliquables

// État initial : partie basse affichée
let isBottom = true;

// Gestionnaire de clic sur le bouton de défilement
scrollBtn.addEventListener('click', () => {
  const containerHeight = document.getElementById('image-container').clientHeight; // Hauteur visible
  const imageHeight = image.clientHeight; // Hauteur totale de l'image

  if (isBottom) {
    // Défilement vers le haut (partie haute de l'image)
    image.style.top = '0';
    scrollBtn.textContent = '↓'; // Met à jour le texte du bouton

    // Réactiver les boutons et montrer leurs images
    infoButtons.forEach((button) => {
      button.disabled = false; // Active les boutons
      button.querySelector('img').style.display = 'block'; // Affiche les images des boutons
    });
  } else {
    // Défilement vers le bas (partie basse de l'image)
    image.style.top = `${-((imageHeight - containerHeight))}px`; // Calcul dynamique
    scrollBtn.textContent = '↑';

    // Désactiver les boutons et cacher leurs images
    infoButtons.forEach((button) => {
      button.disabled = true; // Désactive les boutons
      button.querySelector('img').style.display = 'none'; // Cache les images des boutons
    });
  }

  isBottom = !isBottom; // Alterne l'état
});

// Fonction pour afficher la boîte d'informations
function showInfoBox(event, message) {
  const infoBox = document.getElementById('info-box');
  const overlay = document.getElementById('overlay');

  // Positionner la boîte près de l'image cliquée
  const rect = event.target.getBoundingClientRect();
  infoBox.style.top = `${rect.bottom + window.scrollY + 10}px`; // Position juste en dessous
  infoBox.style.left = `${rect.left + window.scrollX}px`;

  // Ajouter le message
  infoBox.textContent = message;

  // Afficher la boîte et l'overlay
  infoBox.style.display = 'block';
  overlay.style.display = 'block';
}

// Fonction pour cacher la boîte d'informations
function hideInfoBox() {
  const infoBox = document.getElementById('info-box');
  const overlay = document.getElementById('overlay');
  infoBox.style.display = 'none';
  overlay.style.display = 'none';
}