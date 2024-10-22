const fallingImage = document.getElementById('lopen');
let y = 0; // Startpositie Y
let x = 0; // Startpositie X (gecentreerd)
const gravity = 0.5;
const maxSpeed = 3; // Maximale snelheid
const groundLevel = window.innerHeight - 600; // Hoogte van de onderkant van het scherm
const moveSpeed = 3; // Snelheid van beweging naar links/rechts

// Stel de snelheid in op de maximale snelheid
let speed = maxSpeed; // Begin snelheid is nu max snelheid
let moveLeft = false; // Beweging naar links
function update() {
    // Update de verticale positie van de afbeelding
    y += speed;
    // Controleer of de afbeelding de grond heeft bereikt
    if (y >= groundLevel) {
        y = groundLevel; // Zet de afbeelding op de grond
        speed = 0; // Stop de snelheid
    }
    // Update de horizontale positie
    if (moveLeft) {
        x -= moveSpeed; // Beweeg naar links
    }
      // Pas de positie van de afbeelding toe
      fallingImage.style.transform = `translate(${x}px, ${y}px)`;
      const leftOffset = window.innerWidth / 4; // een kwart van de breedte van het scherm
    window.scrollTo(x + leftOffset, window.scrollY); // zorgt ervoor dat de window alleen horizontaal beweegt en niet verticaal kan bewegen
     // Vraag de volgende frame aan
     requestAnimationFrame(update);
    }
    
function moveImage(event) {
    switch (event.key) {
        case 'a':
            moveLeft = true; // Start bewegen naar links
            break;
    }
}
function stopImage(event) {
    switch (event.key) { // heeft keuze uit meerdere variabale
        case 'a':
            moveLeft = false; // Stop met bewegen naar links
            break;
        }
    }
    // Voeg event listeners toe
window.addEventListener('keydown', moveImage);
window.addEventListener('keyup', stopImage);

// Start de simulatie
update();s