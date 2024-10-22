// Verkrijg het HTML-element met id 'lopen' en sla het op in de variabele fallingImage
const bulletImage = document.getElementById('bullet1'); // Zorg ervoor dat dit de juiste ID is van je kogel
const playerImage = document.getElementById('player'); // Zorg ervoor dat dit de juiste ID is van je speler

// Initialiseer de startpositie van het object op de y-as en x-as
let y = 100;
let x = -530;

// Stel de zwaartekracht in op 0.5, die de snelheid van dalen bepaalt
const gravity = 0.5;

// Stel de kracht van de sprong in op 12, bepaalt hoe hoog het object springt
const jumpStrength = 12;

// Stel de maximale horizontale snelheid in op 6 pixels per frame
const maxSpeed = 6;

// Definieer het grondniveau op basis van de hoogte van het venster minus 650 pixels
const groundLevel = window.innerHeight - 650;

// Stel de beweegsnelheid in op 6 pixels per frame
const moveSpeed = 6; 

// Variabele voor de huidige horizontale snelheid van het object
let speed = maxSpeed;

// Booleans om bij te houden of de gebruiker naar links of rechts beweegt
let moveLeft = false;
let moveRight = false;

// Boolean om bij te houden of het object springt
let isJumping = false;

// Variabele voor de snelheid op de y-as bij het springen of vallen
let verticalSpeed = 0;

// Functie die de positie en bewegingen van het object bijwerkt
function update() {
    // Controleer of het object springt en werk de y-positie en snelheid bij
    if (isJumping) {
        y -= verticalSpeed; // Verplaats het object omhoog op basis van de huidige snelheid
        verticalSpeed -= gravity; // Verminder de verticale snelheid door zwaartekracht
    }

    // Controleer of het object op de grond is en reset de springstatus
    if (y >= groundLevel) {
        y = groundLevel; // Zet het object op het grondniveau
        verticalSpeed = 0; // Reset de verticale snelheid naar 0
        isJumping = false; // Zet de springstatus terug naar false
    }

    // Verplaats het object naar links als de 'moveLeft'-variabele waar is
    if (moveLeft) {
        x -= moveSpeed; 
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
    }

    // Verplaats het object naar rechts als de 'moveRight'-variabele waar is
    if (moveRight) {
        x += moveSpeed; 
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
    }

    // Houd de x-positie binnen de linker grens van -670 pixels
    if (x < -670) x = -670; 
    if (x > window.innerWidth - -360) x = window.innerWidth - -360; 

    playerImage.style.transform = `translate(${x}px, ${y}px)`;

    const leftOffset = window.innerWidth / 8;
    window.scrollTo(x + leftOffset, window.scrollY);
    
    // Bullet position update
    bulletImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;

    // Roep de update-functie opnieuw aan voor de volgende frame-update
    requestAnimationFrame(update);
}

function moveImage(event) {
    switch (event.key) {
        // Start bewegen naar links als 'a' wordt ingedrukt
        case 'a':
            moveLeft = true;
            break;
        // Start bewegen naar rechts als 'd' wordt ingedrukt
        case 'd':
            moveRight = true;
            break;
        // Start springen als de spatiebalk wordt ingedrukt en het object niet al springt
        case ' ':
            if (!isJumping) {
                isJumping = true; // Zet de springstatus op true
                verticalSpeed = jumpStrength; // Stel de verticale snelheid in op de sprongkracht
            }
            break;
    }
}

function stopImage(event) {
    switch (event.key) {
        // Stop met bewegen naar links als 'a' wordt losgelaten
        case 'a':
            moveLeft = false;
            break;
        // Stop met bewegen naar rechts als 'd' wordt losgelaten
        case 'd':
            moveRight = false;  
            break;
    }
}

// Kogel schieten met de linkermuisklik
window.addEventListener('click', shoot);

function shoot() {
   const bullet = document.createElement('div');
   bullet.classList.add('bullet'); // Zorg ervoor dat je deze klasse in je CSS hebt
   bullet.style.position = 'absolute'; // Zorg ervoor dat de kogel absoluut gepositioneerd is
   bullet.style.left = `${x + 720}px`; // Startpositie van de kogel, iets rechts van de speler
   bullet.style.top = `${y - -300}px`; // Y-positie van de kogel
   document.body.appendChild(bullet); // Voeg de kogel toe aan de body

   const bulletSpeed = 10; // Snelheid van de kogel

   function moveBullet() {
      bullet.style.left = `${parseFloat(bullet.style.left) + bulletSpeed}px`; // Beweeg naar rechts
  
      // Controleer of de kogel buiten het scherm is
      if (parseFloat(bullet.style.left) > window.innerWidth + '-1px') { // +50 zorgt ervoor dat het verder gaat
         bullet.remove(); // Verwijder de kogel als deze ver buiten het scherm gaat
     } else {
         requestAnimationFrame(moveBullet); // Blijf de kogel bewegen
     }
 }

 moveBullet(); // Start de beweging van de kogel
}

window.addEventListener('keydown', moveImage);

// Voeg een event listener toe voor het loslaten van toetsen om bewegingen te stoppen
window.addEventListener('keyup', stopImage);

// Start de update-lus
update();

// Functie om het spel af te sluiten met een bevestigingsprompt
function exitGame() {
    if (confirm('Do you really want to exit the game?')) { // Vraag om bevestiging
        window.close(); // Sluit het venster als de gebruiker bevestigt
    }
}

function saveGame() {
    if (confirm('Do you really want to save the game?')) { // Vraag om bevestiging
        window.save(); // Deze functie bestaat niet en dient vervangen te worden
    }
}