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
let moveRight = false; // Beweging naar rechts

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
    if (moveRight) {
        x += moveSpeed; // Beweeg naar rechts
    }

    // Beperk de beweging binnen de schermgrenzen
    if (x < -670) x = -670; // Links
    if (x > window.innerWidth - -360) x = window.innerWidth - -360; // Rechts

    // Pas de positie van de afbeelding toe
    fallingImage.style.transform = `translate(${x}px, ${y}px)`;

    // Scroll de window om de afbeelding in het midden te houden (constant)
    const leftOffset = window.innerWidth / 4;
    window.scrollTo(x + leftOffset, window.scrollY);

    // Vraag de volgende frame aan
    requestAnimationFrame(update);
}

// Functie om de afbeelding te verplaatsen
function moveImage(event) {
    switch (event.key) {
        case 'a':
            moveLeft = true; // Start bewegen naar links
            break;
        case 'd':
            moveRight = true; // Start bewegen naar rechts
            break;
    }
}

// Functie om de afbeelding te stoppen
function stopImage(event) {
    switch (event.key) {
        case 'a':
            moveLeft = false; // Stop met bewegen naar links
            break;
        case 'd':
            moveRight = false; // Stop met bewegen naar rechts
            break;
    }
}

// Voeg event listeners toe
window.addEventListener('keydown', moveImage);
window.addEventListener('keyup', stopImage);

// Start de simulatie
update();s