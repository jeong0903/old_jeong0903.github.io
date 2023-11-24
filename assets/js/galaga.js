// canvas 세팅
let canvas;
let ctx;
const galagaMain = document.querySelector('.galagaMain');
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
galagaMain.appendChild(canvas);

let bgImg, jetImg, bulletImg, enemyImg, ggImg;

// 우주선 좌표 (유동적)
let jetX = canvas.width/2-32;
let jetY = canvas.height-70;

function loadImage(){
  bgImg = new Image();
  bgImg.src = "/assets/img/game_BG.jpg";

  jetImg = new Image();
  jetImg.src = "/assets/img/game_jet.png"

  bulletImg = new Image();
  bulletImg.src = "/assets/img/game_bullet.png"

  enemyImg = new Image();
  enemyImg.src = "/assets/img/game_virus.png"

  ggImg = new Image();
  ggImg.src = "/assets/img/game_gameover.png"
}

function render(){
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(jetImg, jetX, jetY);
}

function main(){
  render()
  requestAnimationFrame(main)
}

loadImage();
main();