const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var arr = [];
Resize();
window.addEventListener("resize", Resize);
window.addEventListener("mousedown", function (e) { KeyDown(e); })


function KeyDown(k) {
    if (k.which == 1){
            let Y = k.clientY;
            let X = k.clientX;
            console.log("X=",X," Y=", Y);
            arr.push(new boll(X, Y));
    }
}

setInterval(Update, 1000 / 60); //Состояние игры будет обновляться 60 раз в секунду — при такой частоте обновление происходящего будет казаться очень плавным


function Update() //Обновление игры
{

    for(let i = 0; i < arr.length; i++)
    {
        arr[i].update();
    }
    Draw();
}

function Draw() //Работа с графикой
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Очистка холста от предыдущего кадра

    for(let i = 0; i < arr.length; i++)
    {
        ctx.drawImage
        (
            arr[i].image, //Изображение для отрисовки
            arr[i].x,
            arr[i].y
        );
    }
}

class boll
{
    constructor(x, y)
    {
        //this.x = Math.random()*GWight;
        this.y = y;
        this.x = x;
        this.speed=Math.random()*19+1-10;

        this.image = new Image();
        this.image.src = "chrome.png";
    };

    update()
    {

        if (this.x >= (window.innerWidth-48) || this.x <= 0){
            this.speed=-this.speed
        }
        this.x += this.speed;

    }
}
function Resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}