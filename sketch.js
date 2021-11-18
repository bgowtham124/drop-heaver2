const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, carnage,destructive, muckspout, strinker, lecherous;
var backgroundImg,platform;
var speedo, wiz, blaster, slingshot;

var gameState = "onSling";
var bg = "images/background.jpg";
var score = 0;

function preload() {
    getBackgroundImg();
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    platform = new Platform(150, 305, 300, 135);
    ground = new Ground(600,height,1200,100);
    

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    carnage = new Carnage(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    destructive= new Destructive (810, 220);
strinker = new Strinker(700, 220);
muckspout = new Muckspout(800,220);
lecherous = new Lecherous(930, 220);
    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    speedo = new Speedo(200,50);
   
    

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(speedo.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(30);
        textFont("Comic Sans MS");
        fill("lightpink");
        text("Score : " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    carnage.display();
    carnage.score();
    log1.display();
  strinker.display();
  muckspout.display();
  lecherous.display();
    box3.display();
    box4.display();
    destructive.display();
    destructive.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    speedo.display();
    
    platform.display();
    //log6.display();
    slingshot.display();
    console.log(speedo.body.speed);    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(speedo.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && speedo.body.speed < 1){
       bird.trajectory = [];
       Matter.Body.setPosition(speedo.body,{x:200, y:50});
       slingshot.attach(speedo.body);
       gameState ="onSling";
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "images/background.jpg";
    }
    else{
        bg = "images/background2.png";
      //bg = "images/background.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}