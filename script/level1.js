// Verkrijg het HTML-element met id 'lopen' en sla het op in de variabele fallingImage
const fallingImage = document.getElementById('lopen');

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
        x -= moveSpeed; // Verminder de x-positie om naar links te bewegen
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`; // Verplaats en spiegel het object horizontaal naar links
    }

    // Verplaats het object naar rechts als de 'moveRight'-variabele waar is
    if (moveRight) {
        x += moveSpeed; // Verhoog de x-positie om naar rechts te bewegen
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`; // Verplaats het object naar rechts zonder te spiegelen
    }

    // Houd de x-positie binnen de linker grens van -670 pixels
    if (x < -670) x = -670; 

    // Houd de x-positie binnen de rechter grens, afhankelijk van de breedte van het venster
    if (x > window.innerWidth - -360) x = window.innerWidth - -360; 

    // Als het object niet beweegt, update alleen de positie zonder spiegeling
    if (!moveLeft && !moveRight) {
        fallingImage.style.transform = `translate(${x}px, ${y}px)`;
    }

    // Stel de hoeveelheid horizontale scroll in zodat het object in het midden van het scherm blijft
    const leftOffset = window.innerWidth / 4; // Bepaal de offset voor centrering
    window.scrollTo(x + leftOffset, window.scrollY); // Scroll het venster zodat het object in beeld blijft

    // Roep de update-functie opnieuw aan voor de volgende frame-update
    requestAnimationFrame(update);
}

// Functie om bewegingen te starten op basis van toetsaanslagen
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

// Functie om bewegingen te stoppen op basis van toetsaanslagen
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

// Voeg een event listener toe voor toetsaanslagen om bewegingen te starten
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

// Functie om het spel op te slaan met een bevestigingsprompt (placeholder)
function saveGame() {
    if (confirm('Do you really want to save the game?')) { // Vraag om bevestiging
        window.save(); // Deze functie bestaat niet en dient vervangen te worden
    }
}