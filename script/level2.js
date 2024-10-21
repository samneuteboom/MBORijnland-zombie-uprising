const fallingImage = document.getElementById('lopen');
let y = 100;
let x = -530;
const gravity = 0.5;
const jumpStrength = 1
2;
const maxSpeed = 6;
const groundLevel = window.innerHeight - 650;
const moveSpeed = 6;

let speed = maxSpeed;
let moveLeft = false;
let moveRight = false;
let isJumping = false;
let verticalSpeed = 0;

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
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(-1)`;
    }
    if (moveRight) {
        x += moveSpeed; 
        fallingImage.style.transform = `translate(${x}px, ${y}px) scaleX(1)`;
    }

    if (x < -670) x = -670; 
    if (x > window.innerWidth - -4060) x = window.innerWidth - -4060; 

    if (!moveLeft && !moveRight) {
        fallingImage.style.transform = `translate(${x}px, ${y}px)`;
    }

    const leftOffset = window.innerWidth / 4;
    window.scrollTo(x + leftOffset, window.scrollY);

    requestAnimationFrame(update);
}
function moveImage(event) {
    switch (event.key) {
       case 'a':
          moveLeft = true;
          break;
       case 'd':
          moveRight = true;
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
          break;
       case 'd':
          moveRight = false;  
          break;
    }
 }
 

window.addEventListener('keydown', moveImage);
window.addEventListener('keyup', stopImage);
update();