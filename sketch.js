var tower, towerImg;
var ghost, ghostImg;
var climber, climberImg, climber_Group;
var door, doorImg, door_Group;
var invisibleWall, invisibleWall_Group;
var sound;
var gameState = "Play";

function preload(){
  
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png")
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  sound = loadSound ("spooky.wav");
  
}

function setup(){
  
  createCanvas(600,600);
  
  tower = createSprite(300,300,10,10);
  tower.addImage("towerImg",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage("ghostImg",ghostImg);
  ghost.scale = 0.38;
  
  door_Group = new Group();
  climber_Group = new Group();
  invisibleWall_Group = new Group();
  
}

function draw(){
  
  if(gameState === "Play"){
    
    createEdgeSprites();
  
  if(invisibleWall_Group.isTouching(ghost)||ghost.y>600||ghost.y<0){
    
    gameState = "End";
    
  }
  
  doors_climbers_and_invisible_walls();
  
  if(keyDown("space")){
    
    ghost.velocityY = -10;
    
  }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
  
  if(climber_Group.isTouching(ghost)){
    
    ghost.velocityY = 0; 
    
  }
  
  
  if(keyDown("right_arrow")){
    
    ghost.x = ghost.x + 5;
    
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x = ghost.x - 5;
    
  }
  
  
  if(tower.y>400){
    
    tower.y = 300;
    
  }
  
  drawSprites();
  
  }
  
  if(gameState === "End"){
    
    background("black");
    
    textAlign(CENTER);
    fill("yellow");
    textSize(40);
    text("Game Over",300,300);
    
  }
  
}

function doors_climbers_and_invisible_walls(){
  
  if(frameCount % 300 === 0){
    
  door = createSprite(200,-50,10,10);
  climber = createSprite(200,10,10,10);
  invisibleWall = createSprite(200,15,10,2);
    
  door.addImage("doorImg",doorImg);
  climber.addImage("climberImg",climberImg);

  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleWall.velocityY = 1;
  
  door.lifetime = 700;
  climber.lifetime = 700;
  invisibleWall.lifetime = 700;
    
  door_Group.add(door);
  climber_Group.add(climber);
  invisibleWall_Group.add(invisibleWall);
    
  door.x = Math.round(random(200,400));
  climber.x = door.x;
  invisibleWall.x = door.x;
    
  invisibleWall.width = climber.width;
  invisibleWall.visible = false;
    
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
    
  climber.depth = door.depth;
    
    
  }
  
  
}