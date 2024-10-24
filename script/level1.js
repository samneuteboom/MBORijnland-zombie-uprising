const bulletImage = document.getElementById('bullet1'); 
const playerImage = document.getElementById('player');
const zombieImage = document.getElementById('zombieImage');
let y = 100;
let x = -530;
let zombieY = 100;
let zombieX = 1000;
const shootSound = document.getElementById('shoot');
const gravity = 0.5;
const jumpStrength = 12;
const maxSpeed = 6;
const groundLevel = window.innerHeight - 650;
const moveSpeed = 4;
const healthBar = document.getElementById('healthBar');

let zombieSpeed = 2;
let playerHealth = 100; // Gezondheid van de speler
let speed = maxSpeed;
let moveLeft = false;
let moveRight = false;
let isJumping = false;
let verticalSpeed = 0;
let image = "./img/Anton Prajo 2.png";
let idle = "./img/Anton Prajo 1.png";
let gif = "./img/anton animatie laatste 0.gif";
let gifRotate = "./img/anton animatie laatste.gif";
const backgroundMusic = document.getElementById('backgroundMusic');
const backgroundMusic1 = document.getElementById('backgroundMusic1');
const jumpSound = document.getElementById('jump');
const walkSound = document.getElementById('walkingPlayer');

// You can control the music here if needed
function playMusic() {
    backgroundMusic.play();
    backgroundMusic1.play();
}

function pauseMusic() {
    backgroundMusic.pause();
    backgroundMusic1.play();
}

// Example of adjusting volume
backgroundMusic.volume = 0.4;
backgroundMusic1.volume = 0.7;

let damageCooldown = false; // Cooldown variabele voor schade
const damageInterval = 500; // 500 ms cooldown

function update() {
    if (isJumping) {
        y -= verticalSpeed; 
        verticalSpeed -= gravity; 
    }

    if (y >= groundLevel) {
        y = groundLevel; 
        verticalSpeed = 0; 
        isJumping = false; 
    }

    if (moveLeft) {
        x -= moveSpeed; 
        playerImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
    }
    
    if (moveRight) {
        x += moveSpeed; 
        playerImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
    }

    if (x < -670) x = -670; 
    if (x > window.innerWidth - -500) x = window.innerWidth - -500; 

    playerImage.style.transform = `translate(${x}px, ${y}px)`;
    zombieImage.style.transform = `translate(${zombieX}px, ${y}px)`;

    const leftOffset = window.innerWidth / 8;
    window.scrollTo(x + leftOffset, window.scrollY);
    
    requestAnimationFrame(update);
}

function moveImage(event) {
    console.log('test');
    switch (event.key) {
        case 'a':
            moveLeft = true;
            playerImage.setAttribute("src", gifRotate);
            walkSound.currentTime = 0; // Zet de tijd terug naar het begin
            walkSound.play(); // Speel het geluid af
            walkSound.volume = 1;
            break;
        case 'd':
            moveRight = true;
            playerImage.setAttribute("src", gif);
            walkSound.currentTime = 0; // Zet de tijd terug naar het begin
            walkSound.play(); // Speel het geluid af
            walkSound.volume = 1;
            break;
        case ' ':
            if (!isJumping) {
                isJumping = true;
                verticalSpeed = jumpStrength;
                jumpSound.currentTime = 0; // Zet de tijd terug naar het begin
                jumpSound.play(); // Speel het geluid af
                jumpSound.volume = 1;
            }
            break;
    }
}

function stopImage(event) {
    switch (event.key) {
        case 'a':
            moveLeft = false;
            playerImage.setAttribute("src", idle);
            break;
        case 'd':
            moveRight = false; 
            playerImage.setAttribute("src", idle); 
            break;
    }
}

// Kogel schieten met de linkermuisklik
window.addEventListener('click', shoot);
var canshoot = true;
var timeout = false;
function shoot() {
    if (canshoot) {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet'); 
        bullet.style.position = 'absolute'; 
        bullet.style.left = `${x + 720}px`; // Startpositie van de kogel
        bullet.style.top = `${y - -300}px`; // Y-positie van de kogel
        document.body.appendChild(bullet); // Voeg de kogel toe aan de body

        const bulletSpeed = 10; // Snelheid van de kogel
        shootSound.currentTime = 0; // Zet de tijd terug naar het begin
        shootSound.play(); // Speel het geluid af

        function moveBullet() {
            bullet.style.left = `${parseFloat(bullet.style.left) + bulletSpeed}px`; // Beweeg naar rechts
            
            // Controleert of de kogel buiten het scherm is
            if (parseFloat(bullet.style.left) > window.innerWidth + '-1px') { 
                bullet.remove(); // Verwijder de kogel als deze ver buiten het scherm gaat
            } else {
                requestAnimationFrame(moveBullet); // Blijf de kogel bewegen
            }
        }
        canshoot = false;
        moveBullet(); // Start de beweging van de kogel
    } else if (!timeout) {
        timeout = setTimeout(function(){
            canshoot = true;
            timeout = false;
        }, 1000);
    }
}

// Botsingsdetectie functie
function isColliding(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

// Damage-functie en gezondheidslogica
function applyDamage(damage) {
    if (!damageCooldown) { // Controleer of de cooldown actief is
        playerHealth -= damage; // Verminder de gezondheid van de speler
        console.log(`Speler schade! Gezondheid: ${playerHealth}`);
        damageCooldown = true; // Zet cooldown aan
        setTimeout(() => {
            damageCooldown = false; // Zet cooldown uit na 0,5 seconden
        }, damageInterval);

        if (playerHealth <= 0) {
            console.log('Speler is dood!');
            // Voeg hier logica voor het einde van het spel toe
        }
    }
}

// Game loop voor botsingen
function gameLoop() {
    const playerRect = playerImage.getBoundingClientRect(); // Verkrijg de bounding box van de speler
    const zombieRect = zombieImage.getBoundingClientRect(); // Verkrijg de bounding box van de zombie

    // Controleer botsingen tussen de speler en de zombie
    if (isColliding(playerRect, zombieRect)) {
        applyDamage(10); // Pas 10 schade toe aan de speler
    }

    requestAnimationFrame(gameLoop); // Houd de loop draaiende
}

function moveZombie() {
    // Laat de zombie de speler volgen
    if (zombieX < x) {
        zombieX += zombieSpeed; // Zombie beweegt naar rechts
    } else if (zombieX > x) {
        zombieX -= zombieSpeed; // Zombie beweegt naar links
    }

    zombieImage.style.transform = `translate(${zombieX}px, ${y}px)`; // Update zombie positie
    requestAnimationFrame(moveZombie); // Blijf de zombie bewegen
}

moveZombie(); // Start de beweging van de zombie
// Start de game loop voor botsingen
gameLoop();
window.addEventListener('keydown', moveImage);
window.addEventListener('keyup', stopImage);
update();

function exitGame() {
    if (confirm('Do you really want to exit the game?')) {
        window.close();
    }
}

function saveGame() {
    if (confirm('Do you really want to save the game?')) {
        window.save();
    }
}