// playground canvas
let playground = document.querySelector("#playground");
let ctx = playground.getContext("2d");

// playground pointer changing color value
let hslVal = 0;

// Extra Memory to store previous state of playground before resizing screen
let playgroundMem = document.createElement('canvas');
let ctxMem = playgroundMem.getContext('2d');
let lineJoin;
let lineCap;
let strokeStyle;
let lineWidth;

// init playground dimensions
playground.width = window.innerWidth;
playground.height = window.innerHeight;
ctx.strokeStyle = "hsl(0, 100%, 50%, 1)";
ctx.lineWidth = 5;
ctx.lineJoin = "round";
ctx.lineCap = "round";

// Set Playground to maximize screen area
function setPlayground(){
    // saving old state in memory canvas
    lineJoin = ctx.lineJoin;
    lineCap = ctx.lineCap;
    strokeStyle = ctx.strokeStyle;
    lineWidth = ctx.lineWidth;
        // console.log(lineJoin, lineCap, strokeStyle);

    playgroundMem.width = playground.width;
    playgroundMem.height = playground.height;
    ctxMem.drawImage(playground, 0, 0);

    //resizing actual canvas and retrieving memory canvas
    playground.width = window.innerWidth;
    playground.height = window.innerHeight;
    ctx.strokeStyle = strokeStyle;
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
        // console.log(ctx.lineJoin, ctx.lineCap, ctx.strokeStyle);
    ctx.drawImage(playgroundMem, 0, 0);    
    
}
window.addEventListener("resize", setPlayground);
// -------------------------------------------------------------------------


// Drawing Constraints
let startX = 0;
let startY = 0;
let isDrawing = false;
let isIncWidth = true;
// Functions made drawing possible
function startDrawing(x,y){
    // console.log(e);
    isDrawing = true;
    startX = x;
    startY = y;
}
function stopDrawing(){
    isDrawing = false;
}
function drawing(x,y){
    if(!isDrawing) return;
    
    // change playground pointer color
    ctx.strokeStyle = `hsl(${hslVal++}, 100%, 50%, 1)`;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(x, y);
    ctx.stroke();

    startX = x;
    startY = y;

    //check if pencil pointer width become 100
    if(ctx.lineWidth > 100 || ctx.lineWidth < 5){
        isIncWidth = !isIncWidth;
    }
    // increase/decrease pencil pointer width
    if(isIncWidth){
        ctx.lineWidth += 0.5;
    }else{
        ctx.lineWidth -= 0.5;
    }

    // resolve hsl value in the range
    if(hslVal > 360){
        hslVal = 0;
    }
}

// Mouse Events over playground
playground.addEventListener('mousedown', (e) => startDrawing(e.offsetX, e.offsetY));
playground.addEventListener('touchstart', (e) => startDrawing(e.touches[0].clientX, e.touches[0].clientY));

playground.addEventListener('mousemove', (e) => drawing(e.offsetX, e.offsetY));
playground.addEventListener('touchmove', (e) => drawing(e.touches[0].clientX, e.touches[0].clientY));

playground.addEventListener('mouseup', stopDrawing);
playground.addEventListener('mouseout', stopDrawing);
playground.addEventListener('touchcancel', stopDrawing);
playground.addEventListener('touchend', stopDrawing);

