const bulletImage = document.getElementById('bullet1'); 
const playerImage = document.getElementById('player'); 
let y = 100;
let x = -530;
const gravity = 0.5;
const jumpStrength = 12;
const maxSpeed = 6;
const groundLevel = window.innerHeight - 650;
const moveSpeed = 6;

let speed = maxSpeed;
let moveLeft = false;
let moveRight = false;
let isJumping = false;
let verticalSpeed = 0;
let image = "./img/Anton Prajo 2.png";
let idle = "./img/Anton Prajo 1.png";
let gif = "./img/Anton hoofd gif.gif"
let gifRotate = "./img/anton hoofd rotate.gif"

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
      //   playerImage.setAttribute("src", gif);
    }
    
   if (moveRight) {
      x += moveSpeed; 
      playerImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
      // playerImage.setAttribute("src", gif);
    }

   if (x < -670) x = -670; 
   if (x > window.innerWidth - -500) x = window.innerWidth - -500; 

   playerImage.style.transform = `translate(${x}px, ${y}px)`;

   const leftOffset = window.innerWidth / 8;
   window.scrollTo(x + leftOffset, window.scrollY);
    
    requestAnimationFrame(update);
}

function moveImage(event) {
   switch (event.key) {
      case 'a':
         moveLeft = true;
         playerImage.setAttribute("src", gifRotate);
         break;
      case 'd':
         moveRight = true;
         playerImage.setAttribute("src", gif);
         break;
      case ' ':
         if (!isJumping) {
            isJumping = true;
            verticalSpeed = jumpStrength;
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