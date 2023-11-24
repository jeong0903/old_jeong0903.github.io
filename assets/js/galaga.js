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

let keysDown={}

// 1. 방향키를 누르면,
function setupKeyboardListener(){
  document.addEventListener("keydown", function(event){
    console.log("keyboard", event.key);
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function(event){
    delete keysDown[event.key];
  })
}

function update(){
  if( 'ArrowRight' in keysDown) {
    jetX += 3;
  } else if('ArrowLeft' in keysDown) {
    jetX -= 3;
  };
  // 우주선 좌표값 제한
  if(jetX <= 0){
    jetX = 0;
  } else if (jetX >= canvas.width - 64){
    jetX = canvas.width - 64;
  };
}

function render(){
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(jetImg, jetX, jetY);
}

function main(){
  update();
  render();
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();

// 2. 우주선의 X, Y 좌표가 바뀌고,
// 3. 다시 RENDER 그려준다.