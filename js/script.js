// Random Machine script
// By: VETGOED CREATIEF AGENTSCHAP
// Author: Peter van der West

PIXI.utils._saidHello = true;

var renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true, transparent: true });
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var pixelSize = 15;
drawPixels();


requestAnimationFrame( animate );

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

var pixelTimer1 = setInterval(function(){ getRandomPixel(); }, 300);
var pixelTimer2 = setInterval(function(){ getRandomPixel(); }, 300);

window.onresize = function (event){
    var w = window.innerWidth;
    var h = window.innerHeight;

    renderer.view.style.width = w + "px";
    renderer.view.style.height = h + "px";
    renderer.resize(w,h);

    drawPixels();
}

function drawPixels() {
    for(var x = 0; x <= renderer.view.width / pixelSize; x++) {
        for (var y = 0; y <= renderer.view.height / pixelSize ; y++) {
            createPixel(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
        }
    }
}

function createPixel(x, y, width, height) {
    var pixel = new PIXI.Graphics();

    pixel.beginFill('0x'+Math.floor(Math.random()*16777215).toString(16));
    pixel.drawRect(x, y, width, height);

    pixel.endFill();

    pixel.interactive = true;

    pixel
        .on('mousedown', onpixelHover)
        .on('touchstart', onpixelHover)
        .on('mouseover', onpixelHover);

    stage.addChild(pixel);
}

function onpixelHover() {
    if(!this.hoverstate) {
        var newPixel = createPixel(this.getLocalBounds().x, this.getLocalBounds().y, pixelSize, pixelSize);
        this.hoverstate = true;
        this.destroy();
    }
}

function getRandomPixel() {
    var randomPixel = stage.getChildAt(Math.floor((Math.random() * stage.children.length) + 0));
    createPixel(randomPixel.graphicsData[0].shape.x, randomPixel.graphicsData[0].shape.y, pixelSize, pixelSize);
    randomPixel.destroy();

}
