/**
 * Created by Administrator on 2014/8/20.
 */

var container = document.createElement('div'),
    layer1 = document.createElement('div'),
    layer2 = document.createElement('div'),

    SCREEN_WIDTH = 640,
    SCREEN_HEIGHT = 768,
    HALF_WIDTH = SCREEN_WIDTH /2,
    HALF_HEIGHT = SCREEN_HEIGHT /2,

    fishes = [],
    spareFishes = [],

    counter = 0,
    burstSound,
    emitter = new Emitter(container);

layer1.className = 'parallax';
layer1.style.background = 'url(resource/parallaxBack.jpg) ';
document.body.appendChild(layer1);

layer2.className = 'parallax';
layer2.style.background = 'url(resource/parallaxFront.png) transparent';
document.body.appendChild(layer2);

container.className = "container";
container.style.webkitPerspective= "200";
//container.style.webkitPerspectiveOrigin= HALF_WIDTH+"px "+HALF_HEIGHT+"px";
container.style.webkitPerspectiveOrigin= "0% 0%";
container.style.width = SCREEN_WIDTH+"px";
container.style.height = SCREEN_HEIGHT+"px";

document.body.appendChild(container);
window.addEventListener("load", init);


function init(){
    initSounds();
    initMouseListeners();
    //setInterval(gameLoop, 1000/60);
    requestAnimationFrame(gameLoop);
}

function initMouseListeners() {
    document.addEventListener('mousemove', preventDefault, false);
    document.addEventListener( 'mousedown', preventDefault, false );
    document.addEventListener( 'mouseup', preventDefault, false );
    document.addEventListener( 'touchstart', preventDefault, false );
    document.addEventListener( 'touchmove', preventDefault, false );
    document.addEventListener( 'touchend', preventDefault, false );
}

function preventDefault(event) {
    event.preventDefault();
}

function gameLoop() {
    if(counter++ % 20 == 0) makeFish();

    layer1.style.webkitTransform = "translate3d(0px, "+(-768 +((counter*5)%768))+"px, -999px) scale(4)";
    layer2.style.webkitTransform  = "translate3d(0px, "+(-768 +((counter*10)%768))+"px, -998px) scale(4)";

    for( var i=0; i<fishes.length; i++ ){
        var fish = fishes[i];
        if(!fish.enabled) continue;

        fish.update();

        fish.render();

        if(fish.posY <-200) removeFish(fish);
    }

    emitter.update();
    requestAnimationFrame(gameLoop);
}


function makeFish(){
    var fish;
    if(spareFishes.length>0){
        fish = spareFishes.pop();
        fish.enabled = true;
        fish.domElement.style.visibility = 'visible';
    }else{
        var fishImageURL = 'resource/orangefish0'+ ( (fishes.length%4) + 1 )+'.png';
        fish = new Fish( 0,0,0, fishImageURL, 128, 128 );
        fishes.push(fish);

        fish.domElement.addEventListener('mouseover', fishMouseOver, true);
        fish.domElement.addEventListener('touchstart', fishTouched,true);

        container.appendChild(fish.domElement);
    }

    fish.posX = HALF_WIDTH + randomRange(-250,250);
    fish.posY = SCREEN_HEIGHT +100;
    fish.posZ = randomRange(-250,250);

    fish.velX = randomRange(-1,1);
    fish.velY = randomRange(-1,-2);
    fish.velZ = randomRange(-1,1);

    fish.size = 1;
    fish.gravity = -0.05;
}

function fishMouseOver( event ){
    event.preventDefault();
    var fish = getFishFromElement(event.target);
    if(fish) explodeFish(fish);
}

function fishTouched(event){
    event.preventDefault();
    for(var i=0;i<event.changedTouches.length;i++){
        var fish = getFishFromElement(event.target);
        if(fish) explodeFish(fish);
    }
}

function getFishFromElement(domElement){
    for(var i=0; i<fishes.length;i++){
        if(fishes[i].domElement == domElement) return fishes[i];
    }
    return false;
}

function explodeFish(fish) {
    playBurst();
    emitter.makeExplosion(fish.posX, fish.posY, fish.posZ);
    removeFish(fish);

}

//对象池 回收小鱼
function removeFish(fish) {
    fish.enabled = false;

    fish.domElement.style.visibility = 'hidden';
    spareFishes.push(fish);
}

function Fish(posx, posy, posz, imageSRC, imageWidth, imageHeight) {
    var TO_RADIANS = Math.PI/180;

    this.domElement = document.createElement('div');
    this.domElement.style.background = 'url('+imageSRC+') transparent';

    this.domElement.style.position = 'absolute';
    this.domElement.style.display = 'block';
    this.domElement.style.width = imageWidth + 'px';
    this.domElement.style.height = imageHeight + 'px';
    this.domElement.style.webkitTransformOrigin = (imageWidth/2)+"px "+(imageHeight/2)+"px";
    this.domElement.style.pointerEvents = 'auto';

    this.posX = posx;
    this.posY = posy;
    this.posZ = posz;

    this.velX = 0;
    this.velY = 0;
    this.velZ = 0;

    this.size = 1;
    this.enabled = true;

    this.gravity = 0;
    var counter = 0;

    this.update = function () {
        this.velY += this.gravity;

        this.posX += this.velX;
        this.posY += this.velY;
        this.posZ += this.velZ;

        counter++;
        this.rotate(2);
    };

    this.render = function(){
        var dom = this.domElement,
            styleStr,
            sx = Math.sin(counter*0.4)*0.04 + this.size,
            sy = Math.sin(Math.PI + counter*0.4)*0.04 + this.size;

        dom.style.webkitTransform = "translate3d("+this.posX+"px, "+this.posY+"px, "+this.posZ+"px) scale("+sx+","+sy+") rotate("+Math.sin(counter*0.05)*20+"deg)";

    };

    this.rotate = function(angle, useRadians){
        var cosRY = Math.cos(angle * (useRadians ? 1 : TO_RADIANS));
        var sinRY = Math.sin(angle * (useRadians ? 1 : TO_RADIANS));

        var tempx = this.posX-HALF_WIDTH;
        this.posX = (tempx*cosRY)-(this.posZ*sinRY)+HALF_WIDTH;
        this.posZ = (tempx*sinRY)+(this.posZ*cosRY);

        tempx = this.velX;
        this.velX = (tempx*cosRY)-(this.velZ*sinRY);
        this.velZ = (tempx*sinRY)+(this.velZ*cosRY);
    };

}


function randomRange(min, max){
    return (Math.random()*(max-min))+min;
}


function initSounds() {
    burstSound = new Audio("sounds/burstsml2.aif");
    burstSound.load();
    // you have to play the sound to make sure it's loaded, otherwise you get
    // a glitch the first time you play it
    burstSound.volume = 0;
    burstSound.play();

}

function playBurst() {
    burstSound.volume = 1;
    burstSound.play();
}

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());