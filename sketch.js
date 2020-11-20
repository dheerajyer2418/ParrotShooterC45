var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var backgroundImg;
var gunImg;
var scenery;
var gun;
var parrotImg,parrot, parrotGroup;
var bullet, bulletImg, bulletGroup;
var start, startImg;
var score = 0;

function preload(){
  backgroundImg = loadImage("background.jpg");
  gunImg = loadImage("gun.png");
  parrotImg = loadAnimation("parrot.jpg","parrot1.jpg","parrot1.jpg","parrotflip.png","parrotflip1.png");
  bulletImg = loadImage("bullet.jpg");
  startImg = loadImage("start.png")
}
function setup() {
  var canvas = createCanvas(displayWidth, displayHeight-130);
  parrotGroup = new Group();
  bulletGroup = new Group();

  if(gameState === PLAY){
    //background image
    gun1(); 

  }

  //start button
  start = createSprite(displayWidth/2, displayHeight/1.5,displayWidth,displayHeight);
  start.addImage(startImg);
  start.scale = 0.5;
}

function draw() {
  //background(backgroundImg);
  //console.log(gameState);
  if(gameState === START){
    background("green");
    textSize(30);
    fill("white");
    text("Welcome To Parrot Shooter Game", displayWidth/3, displayHeight/4);
    textSize(20);
    fill("lightblue");
    text("Press 'S' to shoot the bullet.", displayWidth/3.5+150, displayHeight/2)

    if(mousePressedOver(start)){
      gameState = PLAY;
    }
    drawSprites();
  }
  else if(gameState === PLAY){
    console.log(gameState);
    //scenery1();
    scenery = createSprite(displayWidth/2,displayHeight/4,displayWidth,displayHeight-130);
    scenery.addImage(backgroundImg);
    scenery.scale = 0.375;
    //scenery.x = displayWidth/2;
    scenery.velocityX = -4;

    if(scenery.x < 0){
      console.log("test");
      scenery.x = displayWidth/2;
    }
    background(backgroundImg);

    spawnParrots();
    if(keyDown("s")){
      bullets();
      if(bullet.isTouching(parrot)){
        parrotGroup.destroyEach();
        score = score + 1;
      }
    }
    drawSprites();
    textSize(30);
    fill("black")
    text("Score: " + score,displayWidth/2,displayHeight/10); 
}

}

function spawnParrots(){

  if(frameCount % 10 === 0){
    //parrot with animation
    parrot = createSprite(displayWidth/4,Math.round(random (displayHeight/5, displayHeight/2)), displayWidth, displayHeight);
    parrot.addAnimation("running", parrotImg);
    parrot.scale = 0.1;
    parrot.velocityX = 2;
    parrot.depth = scenery.depth;
    parrot.depth = parrot.depth + 1;
    parrot.lifetime = Math.round(displayWidth/2);
    console.log(parrot.lifetime);
    parrotGroup.add(parrot);

    return parrot;
  }

  
}

function bullets(){
  bullet = createSprite(displayWidth/2, displayHeight/1.8,displayWidth,displayHeight);
  bullet.addImage(bulletImg);
  bullet.scale = 0.1;
  bullet.velocityY = -4;
  bullet.lifetime = Math.round(displayWidth/4);

  bulletGroup.add(bullet);
  return bullet;
}
function scenery1(){
    scenery = createSprite(displayWidth/2,displayHeight/4,displayWidth,displayHeight-130);
    scenery.addImage(backgroundImg);
    scenery.scale = 0.375;
    //scenery.x = displayWidth/2;
    scenery.velocityX = -4;
    return scenery;
}

function gun1(){
  //gun
  //gun = createSprite(displayWidth/2, displayHeight/1.5,displayWidth,displayHeight);
  gun = createSprite(500,500);
  gun.addImage(gunImg);
  gun.scale = 0.5;
  scenery1();
  gun.depth = scenery.depth;
  gun.depth = gun.depth + 1;
}