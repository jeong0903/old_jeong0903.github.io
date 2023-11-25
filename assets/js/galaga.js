// canvas 세팅
let canvas;
let ctx;
const galagaMain = document.querySelector('.galagaMain');
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 600;
galagaMain.appendChild(canvas);

let bgImg, jetImg, bulletImg, enemyImg, ggImg, bombImg;
let gameOver = false;
let score = 0;

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
    this.alive = true;  // true면 살아있는 총알, false면 죽은 총알
    // 총알 4. 모든 총알들은 각각의 X, Y 좌표값을 가짐
    bulletList.push(this);  // push(this) : this.x, this.y, this.init
  };
  this.update = function(){
    this.y -= 7;
  };

  this.checkHit = function(){
    // 총알.y <= 적군.y and
    // 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
    for (let i = 0; i < enemyList.length; i++) {
      if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x+50 ){
        score += 10;
        this.alive = false;   // 죽은 총알
        enemyList.splice(i, 1);
      }
    }
  }
}

function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random()*(max-min+1)) + min;
  return randomNum;
}

// 적군 생성
let enemyList = [];
function Enemy(){
  this.x = 0;
  this.y = 0;
  this.init = function(){
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width-58);

    enemyList.push(this);  
  }
  this.update = function(){
    this.y += 3;

    if(this.y >= canvas.height-40){
      gameOver = true;
    }
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

function createEnemy(){
  const interval = setInterval(function(){
    let e = new Enemy();  // 적군 하나 생성
    e.init();
    console.log("적군리스트", enemyList);
  }, 1000)
}

function update(){
  // 우주선 2. 우주선의 X, Y 좌표가 바뀌고,
  if( 'ArrowRight' in keysDown) {
    jetX += 4;
  } else if('ArrowLeft' in keysDown) {
    jetX -= 4;
  };
  // 우주선 좌표값 제한(캔버스 안에서만 무빙)
  if(jetX <= 0){
    jetX = 0;
  } else if (jetX >= canvas.width - 64){
    jetX = canvas.width - 64;
  };

  // 총알의 y 좌표 업데이트 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive){
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render(){
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
  // 우주선 3. 다시 RENDER 그려준다.
  ctx.drawImage(jetImg, jetX, jetY);

  ctx.fillText(`SCORE:${score}`, 20, 40);
  ctx.fillStyle =   "white";
  ctx.font = "30px bold S-CoreDream-3Light";

  // 총알 5. 총알 배열을 가지고 렌더
  for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive){
      ctx.drawImage(bulletImg, bulletList[i].x, bulletList[i].y, 25, 25)
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImg, enemyList[i].x, enemyList[i].y, 50, 50)
  }

}

function main(){
  if(!gameOver){
  update();
  render();
  requestAnimationFrame(main);
}else{
  ctx.drawImage(ggImg, canvas.width/2-100, 100, 200, 180);
}
}

loadImage();
setupKeyboardListener();
createEnemy();
main();



// 적군 1. 위치가 랜덤
// 적군 2. 밑으로 내려감
// 적군 3. 주기적으로 나타남
// 적군 4. 바닥에 닿으면 게임 끝
// 적군 5. 총알이 닿으면 bomb, score += 1