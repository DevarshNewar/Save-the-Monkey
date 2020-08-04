//Global Variables
var monkey, monkeyimage, banana, bananaimage, stone, stoneimage, back, backimage, ground, stonegroup, bananagroup, score, lives, gamestate, PLAY, END;


function preload() {
  monkeyimage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  backimage = loadImage("jungle.jpg");

  bananaimage = loadImage("banana.png");
  stoneimage = loadImage("stone.png");
}


function setup() {
  createCanvas(600, 300);

  back = createSprite(50, 250, 100, 100);
  back.addImage("back", backimage);
  back.scale = 1.2;
  back.x = back.width / 2;
  back.y = 150;

  monkey = createSprite(70, 200, 10, 10);
  monkey.addAnimation("monkey", monkeyimage);
  monkey.scale = 0.1;

  ground = createSprite(300, 275, 600, 5);
  ground.visible = false;

  bananagroup = new Group();
  stonegroup = new Group();

  score = 0;
  lives = 2;

  gamestate = 1;
  PLAY = 1
  END = 0;
}

function draw() {
  background(255);
  monkey.collide(ground)
  //console.log(monkey.y);

  if (gamestate === PLAY) {

    back.velocityX = -5;


    if (back.x < 0) {
      back.x = ground.width / 2;
    }

    //creating food
    food();

    //creatingstones
    obstacles();

    if (bananagroup.isTouching(monkey)) {
      bananagroup.destroyEach();
      score = score + 2;
    }

    if (stonegroup.isTouching(monkey)) {
      stonegroup.destroyEach();
      //stonegroup.setVelocityXEach(0);
      lives = lives - 1;
      score = 0;
    }

    if (lives === 0) {
      gamestate = END;
    }

    switch (score) {
      case 10:
        monkey.scale = 0.12;
      break;
      
      case 20:
        monkey.scale = 0.14;
      break;
      
      case 30:
        monkey.scale = 0.16;
      break;
      
      case 40:
        monkey.scale = 0.18;
      break;
      
      default:
      break;
    }

  } else if (gamestate === END) {
    bananagroup.destroyEach();
    stonegroup.destroyEach();
    back.velocityX = 0;
  }

  if (keyDown("space") && monkey.y >= 241.79999999999998) {
    monkey.velocityY = -20;
  }
  monkey.velocityY = monkey.velocityY + 1;

  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score, 400, 50);
  text("Lives left :" + lives, 50, 50);
}


function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(600, 0);
    banana.y = random(50, 200);
    banana.addImage("Banana", bananaimage);
    bananagroup.add(banana);
    banana.scale = 0.05;
    banana.velocityX = -8;
    //banana.debug = true;
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    stone = createSprite(400, 250);
    stone.velocityX = back.velocityX;
    stone.addImage("Stone", stoneimage);
    stonegroup.add(stone);
    stone.scale = 0.15;
  }
}