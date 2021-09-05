const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rtg = 0.0174533;
var arr = [];
var sunAr = [];
const imArr = ["chrome", "firefox", "git", "wp", "yt", "zoom"];
//настройка солнца
const SunRadius = 100;

Resize();
window.addEventListener("resize", Resize);
window.addEventListener("mousedown", function (e) { KeyDown(e); })


function KeyDown(k) {
    if (k.which == 1){
            let Y = k.clientY;
            let X = k.clientX;
            arr.push(new boll(X, Y));
    }
    if (k.which == 2){
        arr.pop();
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
    for(let i = 0; i < sunAr.length; i++){
        sunAr[i].update();
    }
}
function Resize()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("width=", canvas.width, " height=",canvas.height);
}

class boll
{
    constructor(x, y)
    {
        //this.x = Math.random()*GWight;
        this.y = y;
        this.x = x;
        this.speed=Math.floor(Math.random() * 20)-10;
        let num = Math.floor(Math.random() * imArr.length);
        this.image = new Image();
        this.image.src = "img/"+imArr[num]+".png";
    };

    update()
    {

        if (this.x >= (canvas.width-48) || this.x <= 0){
            this.speed=-this.speed
        }
        this.x += this.speed;

    }
}


class sunMain{
    constructor(r) {

        this.r=r;
    }
    update(){
        ctx.beginPath();
        ctx.ellipse(
            canvas.width/2,
            canvas.height/2,
            this.r,
            this.r,
            0*rtg,
            0,
            360*rtg
        );
        ctx.fillStyle = 'yellow';
        ctx.fill()
    }
}
sunAr.push(new sunMain(SunRadius));

