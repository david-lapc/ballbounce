// 4 Pillars of OOP

//Abstraction - hiding the details
//Encapsulation - Grouping the data and functions that manipulate the data
//Inheritance - Reuse the code
//Polymorphism - Many forms


let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let circles = [];

startBtn.addEventListener('click', ()=>{
    startAnimation();
    startBtn.disabled = true;
    stopBtn.disabled = false;
});
stopBtn.addEventListener('click', ()=>{
    stopAnimation();
    startBtn.disabled = false;
    stopBtn.disabled = true;
})

class Shape {
    constructor(x, y, dx, dy, color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }
}

class Circle extends Shape {
    constructor(x, y, r, dx, dy, color){
        super(x, y, dx, dy, color);
        this.r = r;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
    }
    update(){
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
            if(this.x + this.r > canvas.width){
                this.x = canvas.width - this.r;
            }else{
                this.x = this.r;
            }
            this.dx *= -1;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
            if(this.y + this.r > canvas.height){
                this.y = canvas.height - this.r;
            }else{
                this.y = this.r;
            }
            this.dy *= -1;
        }
    }
}

for(let i = 0; i < 10; i++){
    let xPos = (Math.random() * canvas.width);
    let yPos = (Math.random() * canvas.height);
    let r = Math.random() * 40 + 10;
    let dx = (Math.random() - 0.5) * 10;
    let dy = (Math.random() - 0.5) * 10;
    let color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    circles.push(new Circle(xPos, yPos, r, dx, dy, color));
}

let lastTime = 0;
let fps = 1000 / 60;
let animation;

function startAnimation(deltaTime = 0) {
    if(deltaTime - lastTime > fps) {
        lastTime = deltaTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        circles.forEach(circle => {
            circle.draw();
            circle.update();
        });
    }
    animation = requestAnimationFrame(startAnimation);
}

function stopAnimation() {
    cancelAnimationFrame(animation);
}