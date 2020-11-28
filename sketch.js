var monk;
var monkey;
var fruitGrp;
var banana
var scene;
var obsGrp;
var rock1;
var gst;
var reset;
var gameover;
var ground;
var food;
var obs;
var invground

function preload(){
  
  rock1=loadImage("stone.png");
  
  banana1=loadImage("banana.png")
  
  reset1=loadImage("restart2.png") 
  monk = loadAnimation("monkey 1.png","monkey 2.png","monkey 3.png","monkey 4.png","monkey 5.png","monkey 6.png","monkey 7.png","monkey 8.png","monkey 9.png");
  
  gameover1=loadImage("gameover.png")
}


function setup() {
  createCanvas(400, 400);
  
  //monkey creation and animation
  monkey=createSprite(50,325);
  monkey.addAnimation("run",monk);
  monkey.scale=0.8

  //ground creation and animation
  ground=createSprite(200,350,400,5);
  
  //invground creation and animation
  invground=createSprite(200,355,400,5);
  invground.visible=false;


  //score creation
  score=0;

  //groups creation
  fruitGrp=createGroup();
  obsGrp=createGroup();

  //gamestate creation
  gst="play";

  //gameover sign creation and animation
  gameover=createSprite(200,100);
  gameover.addImage(gameover1);
  gameover.scale=0.95;
  
  //reset button creation and animation
  reset=createSprite(200,300);
  reset.addImage(reset1);
}  

function draw(){
  background("green");
  drawSprites();
  
  monkey.collide(invground);
  
  //gravity
  monkey.velocityY=monkey.velocityY+0.9;
  
  if(gst==="play"){
    //monkey jump controls
    if(keyWentDown("space") && monkey.y>306 ){
      monkey.velocityY=-20;
    }
    
    //hiding game over sign and reset button
    reset.visible=false;
    gameover.visible=false;
    
    //showing monkey
    monkey.visible=true;
    
    //score increasing
    if(monkey.isTouching(fruitGrp)){
      score=score+100;
      fruitGrp.destroyEach();
    }
    if(World.frameCount%3===0){
      score=score+1;
    }
    
    //calling the functions
    food();
    obs();
    
    //ending the game
    if(monkey.isTouching(obsGrp)){
      gst="end";
    }
    
    //displaying score
    text("Survival time:"+score,5,380,textSize(20));
    
  }else if(gst==="end"){
    //destroying sprites
    fruitGrp.destroyEach();
    obsGrp.destroyEach();
    
    //showing game over sign and reset button
    reset.visible=true;
    gameover.visible=true;
    
    //hiding monkey
    monkey.visible=false;
    
    //diplaying final score
    text("Survival time:"+score,75,200,textSize(35));
    
    if(mousePressedOver(reset)){
      score=0;
      gst="play";
    }
  }  
}

function food(){
  if(World.frameCount%80===0){
    //fruit creation and animation
    var fruit=createSprite(400,Math.round(random(120,200)));
    fruit.addImage(banana1);
    fruit.scale=0.05;
    
    //fruit motion
    fruit.velocityX=-5;
    
    //fruit lifetime
    fruit.lifetime=100;
    
    fruitGrp.add(fruit);
  }
}

function obs(){
  if(World.frameCount%300===0){
    //obstacle creation and animation
    var obstacle
    obstacle=createSprite(400,320);
    obstacle.addImage(rock1);
    obstacle.scale=0.15;
    
    //obstacle motion
    obstacle.velocityX=-5;
    
    //obstacle lifetime
    obstacle.lifetime=100;
    
    obsGrp.add(obstacle);
  }
}