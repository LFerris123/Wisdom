var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var reset = document.getElementById("reset");
var start = document.getElementById("start");

// 规格
var spacs = 150;
var size = canvas.width/spacs;
var numOfIteration = 0;

// 记录当前各个位置的占据情况
// 1：红占据
// -1：蓝占据
// 0：当前位置为空
var hasPut;

class piece{
    constructor(x,y,type){
        this.x = x;
        this.y = y;
        this.type = type;
        this.color = type==1 ? "red":"blue";
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x*size,this.y*size,size,size);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
function RamdomPlace(){
    let x = Math.floor(Math.random()*spacs)
    let y = Math.floor(Math.random()*spacs);
    let place = {
        x,y
    } 
    if(hasPut[x][y]!=0){
        place = RamdomPlace();
    }
    return place;
}

// 红蓝群各有100*100个
var count = 10000;
var Reds = null;
var Blues = null;

function init(){
    hasPut = new Array(spacs);
    for(let i=0;i<spacs;i++){
        hasPut[i] = new Array(spacs).fill(0);
    }
    Reds = new Array(count);
    for(let i=0;i<count;i++){
        let place = RamdomPlace();
        Reds[i] = new piece(place.x,place.y,1);
        hasPut[place.x][place.y] = 1;
    }
    Blues = new Array(count);
    for(let i=0;i<count;i++){
        let place = RamdomPlace();
        Blues[i] = new piece(place.x,place.y,-1);
        hasPut[place.x][place.y] = -1;
    }
    drawPiece();
}
init();
function drawPiece(){
    for(let i=0;i<count;i++){
        Reds[i].draw();
        Blues[i].draw();
    }
}
function is_satisfied(onePiece){
    let neighborCount = 0;
    let x = onePiece.x;
    let y = onePiece.y;
    let type = onePiece.type;
    if(x-1 >= 0){
        if(y-1 >= 0 && hasPut[x-1][y-1] == type){
            neighborCount++;
        }
        if(hasPut[x-1][y] == type){
            neighborCount++;
        }
    }
    if(y+1 <= spacs-1){
        if(x-1 >= 0 && hasPut[x-1][y+1] == type){
            neighborCount++;
        }
        if(hasPut[x][y+1] == type){
            neighborCount++;
        }
    }
    if(x+1 <= spacs-1){
        if(y+1 <= spacs-1 && hasPut[x+1][y+1] == type){
            neighborCount++;
        }
        if(hasPut[x+1][y] == type){
            neighborCount++;
        }
    }
    if(y-1 >= 0){
        if(x+1 <= spacs-1 && hasPut[x+1][y-1] == type){
            neighborCount++;
        }
        if(hasPut[x][y-1] == type){
            neighborCount++;
        }
    }
    return neighborCount>=4;
}

function iterate(){
    let place;
    let is_ok = true;
    for(let i=0;i<count;i++){
        if(!is_satisfied(Reds[i])){
            place = RamdomPlace();
            let x = Reds[i].x;
            let y = Reds[i].y;
            hasPut[x][y] = 0;
            Reds[i].x = place.x;
            Reds[i].y = place.y;
            hasPut[place.x][place.y] = 1;
            is_ok = false;
        }
        if(!is_satisfied(Blues[i])){
            place = RamdomPlace();
            let x = Blues[i].x;
            let y = Blues[i].y;
            hasPut[x][y] = 0;
            Blues[i].x = place.x;
            Blues[i].y = place.y;
            hasPut[place.x][place.y] = -1;
            is_ok = false;
        }
    }
    return is_ok;
}

function End(){
    clearInterval(Circulator);
    alert(`运行完毕！共迭代了${numOfIteration}次！`);
}

var Circulator = null;

reset.addEventListener("click",function(){
    clearInterval(Circulator);
    numOfIteration = 0;
    init();
})
start.addEventListener("click",function(){
    Circulator = setInterval(function run(){
        let is_ok = iterate();
        if(is_ok){
            End();
            return;
        }
        numOfIteration++;
        ctx.clearRect(0,0,spacs*size,spacs*size);
        drawPiece();
    },100);
})

