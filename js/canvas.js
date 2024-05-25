/*
*********************************************
Subject:  WST 155: Web Page Development & Scripting II (Spring 2024) 
Author: Edilvan E. Falcon
Instructor: David Kazaryan
Date Created: 2024.05.25
Description: Assignment No. 5
- MyVersion of ballBounce
*********************************************
*/

// 4 Pillars of OOP

//Abstraction - hiding the details
//Encapsulation - Grouping the data and functions that manipulate the data
//Inheritance - Reuse the code
//Polymorphism - Many forms


let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let canvas = document.getElementById('canvas');

let speedNormBtn   = document.getElementById('speedNormBtn'); // EF: additional button added
let speedUpBtn     = document.getElementById('speedUpdBtn'); // EF: additional button added
let speedDownBtn   = document.getElementById('speedDownBtn'); // EF: additional button added

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 200;
let ctx = canvas.getContext('2d');

let circles = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 200;
});

startBtn.addEventListener('click', () => {
    startAnimation();
    startBtn.disabled = true;
    stopBtn.disabled = false;

     // speed btns enable if start
     speedNormBtn.disabled = false;
     speedUpBtn.disabled = false;
     speedDownBtn.disabled = false;

    
});
stopBtn.addEventListener('click', () => {
    stopAnimation();
    startBtn.disabled = false;
    stopBtn.disabled = true;

    // speed btns disabled if stop
    speedNormBtn.disabled = true;
    speedUpBtn.disabled = true;
    speedDownBtn.disabled = true;
})


// EF: event handling added for speed buttons
speedNormBtn.addEventListener('click', () => {
    changeSpeed();
    startAnimation();
});

speedUpBtn.addEventListener('click', () => {
    changeSpeed(100);
    startAnimation(); 
});
speedDownBtn.addEventListener('click', () => {
    changeSpeed(10);
    startAnimation();
});

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getDistance(vector1, vector2) {
        return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
    }
}

class Shape {
    constructor(x, y, dx, dy, color) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(dx, dy);
        this.color = color;
        this.originalColor = color;
    }
}

class Circle extends Shape {
    constructor(x, y, r, dx, dy, color) {
        super(x, y, dx, dy, color);
        this.r = r;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2);
        ctx.fill();
    }

    checkCollision() {
        circles.find(circle => {
            if (circle != this) {
                let distance = new Vector().getDistance(this.pos, circle.pos);
                if (distance < this.r + circle.r) {
                    this.color = 'red';
                    return true;
                }
                if (distance > this.r + circle.r) {
                    this.color = this.originalColor;
                }
            }
        });
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        this.checkCollision();

        if (this.pos.x + this.r > canvas.width || this.pos.x - this.r < 0) {
            if (this.pos.x + this.r > canvas.width) {
                this.pos.x = canvas.width - this.r;
            } else {
                this.pos.x = this.r;
            }
            this.vel.x *= -1;
        }
        if (this.pos.y + this.r > canvas.height || this.pos.y - this.r < 0) {
            if (this.pos.y + this.r > canvas.height) {
                this.pos.y = canvas.height - this.r;
            } else {
                this.pos.y = this.r;
            }
            this.vel.y *= -1;
        }
    }
}

for (let i = 0; i < 20; i++) {
    let xPos = (Math.random() * canvas.width);
    let yPos = (Math.random() * canvas.height);
    let r = Math.random() * 40 + 10;
    let dx = (Math.random() - 0.5) * 20;
    let dy = (Math.random() - 0.5) * 20;
    let shadeOfGrey = Math.random() * 240;
    let color = `rgba(${shadeOfGrey}, ${shadeOfGrey}, ${shadeOfGrey}, ${Math.random()})`;
    circles.push(new Circle(xPos, yPos, r, dx, dy, color));
}


let lastTime = 0;
let fps = 1000 / 30;
let animation;

// EF: additional function to define animation speed
function changeSpeed(fps_update = 30) {
    fps = 1000 / fps_update;
}


function startAnimation(deltaTime = 0) {
    if (deltaTime - lastTime > fps) {
        lastTime = deltaTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            circle.draw();
            circle.update();
        });
    }
    cancelAnimationFrame(animation); // EF: added to avoid multiple instance of animations
    animation = requestAnimationFrame(startAnimation);
}

function stopAnimation() {
    cancelAnimationFrame(animation);
}

// function startAnimation() {
//     animation = setInterval(
//         function(){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         circles.forEach(circle => {
//             circle.draw();
//             circle.update();
//         });
//     }, 1000/60);
// }

// function stopAnimation() {
//    clearInterval(animation);
// }