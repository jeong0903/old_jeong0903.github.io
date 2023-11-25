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

// 총알 3. 발사된 총알들은 총알 배열에 저장
let bulletList = [];  
function Bullet(){
  this.x = 0;
  this.y = 0;

  // 총알 2. 발사 -> 총알 Y값은 --, 총알 X 값은 우주선의 X값
  this.init = function(){
    this.x = jetX + 20;
    this.y = jetY;

    bulletList.push(this);
  }
  this.update = function(){
    this.y -= 7;
  }
}

function loadImage(){
  bgImg = new Image();
  bgImg.onload = function(){
    console.log("Background image loaded!");
    // 다른 이미지들도 유사하게 처리
  };
  bgImg.src = "/assets/img/game_BG.png";

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

// 우주선 1. 방향키를 누르면,
function setupKeyboardListener(){
  document.addEventListener("keydown", function(event){
    console.log("keyboard", event.key);
    keysDown[event.key] = true;
  });
  document.addEventListener("keyup", function(event){
    delete keysDown[event.key];

    // 총알 1. 스페이스바 -> 총알 발사
    if(event.key == 'keyboard' in keysDown){
      createBullet();  // 총알 생성
    }
  })
}

function createBullet(){
  console.log("총알생성");
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("총알리스트", bulletList);
}

// 우주선 2. 우주선의 X, Y 좌표가 바뀌고,
function update(){
  if( 'ArrowRight' in keysDown) {
    jetX += 3;
  } else if('ArrowLeft' in keysDown) {
    jetX -= 3;
  };
  // 우주선 좌표값 제한(캔버스 안에서만 무빙)
  if(jetX <= 0){
    jetX = 0;
  } else if (jetX >= canvas.width - 64){
    jetX = canvas.width - 64;
  };

  // 총알의 y 좌표 업데이트 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
    
  }
}

function render(){
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  // 우주선 3. 다시 RENDER 그려준다.
  ctx.drawImage(jetImg, jetX, jetY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y, 25, 25)
    
  }
}

function main(){
  update();
  render();
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();




// 총알 4. 모든 총알들은 X, Y 좌표값을 가짐
// 총알 5. 총알 배열을 가지고 렌더
