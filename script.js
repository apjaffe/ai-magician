//var WID = 1000;
//var HEI = 750;


var WID  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
var HEI = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;
var CENTER_X = WID/2;
var CENTER_Y = HEI/2;
var HALF_WID = WID*0.5;
var HALF_HEI = HEI*0.5;
var CARD_WID = WID*0.8;
var CARD_HEI = 725/500*CARD_WID; 

function ImageData(src) {
    var that = this;
    that.onload = null;
    that.img = null;
    var img = new Image(src);
    img.src = src;
    img.onload = function(){
        that.loaded = true;
        that.img = img;
        //that.width = 500;
        //that.height = 726;
    }
}

// https://stackoverflow.com/a/12646864/2744663
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

var body = document.getElementById("body");
var canvas = document.getElementById("mycanvas");
canvas.width=WID;
canvas.height=HEI;
var EFF_ROT = 0;
var EFF_WID=WID;
var EFF_HEI=HEI;
var EFF_COORD="pageX";
/*if(HEI > WID) {
    EFF_ROT = Math.PI*0.5;
    EFF_WID = HEI;
    EFF_HEI = WID;
    EFF_COORD="pageY";
}*/
var ctx = canvas.getContext('2d');
var cards = {};
var suits = ["spades","clubs","hearts","diamonds"];
var shuffle = [];
var pos = 26;
var velocity = 0;
for(var num = 1; num <= 13; num++) {
    for(var suit = 0; suit < suits.length; suit++) {
        var card = suits[suit]+num;
        cards[card] = new ImageData("img/cards/"+num+"_of_"+suits[suit]+".png");
        shuffle.push(card);
    }
}
shuffleArray(shuffle);

function clamp(x, mins, maxs){
    return Math.min(Math.max(x, mins), maxs);
}
function sign(x){
    return x>0?1:-1;
}

var touchesById = {};
function handleStart(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for(var i = 0; i < touches.length; i++) {
        touchesById[touches[i].identifier] = {"x":touches[i][EFF_COORD], "pos":pos, "time": +new Date()};
    }
}
function handleEnd(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for(var i = 0; i < touches.length; i++) {
        touchesById[touches[i].identifier] = null;
    }
}
function handleCancel(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for(var i = 0; i < touches.length; i++) {
        touchesById[touches[i].identifier] = null;
    }
}
function handleMove(evt) {
    evt.preventDefault();
    const touches = evt.changedTouches;
    for(var i = 0; i < touches.length; i++) {
        var prevCoord = touchesById[touches[i].identifier];
        var now = +new Date();
        if(prevCoord) {
            var prevPos = prevCoord.pos;
            var prevX = prevCoord.x;
            var prevTime = prevCoord.time;
            pos = clamp((touches[i][EFF_COORD] - prevX)*-0.02 + prevPos, 0, shuffle.length-1); 
            velocity = (pos-prevPos)/(now-prevTime);
            break;
        }
        touchesById[touches[i].identifier] = {"x":touches[i][EFF_COORD], "pos":pos, "time": now};
    }
}


function startup() {
    canvas.addEventListener("touchstart", handleStart);
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleCancel);
    canvas.addEventListener("touchmove", handleMove);
    setInterval(function() {
        //pos = clamp(pos+velocity/60, 0, shuffle.length-1);
        //velocity *= 0.99;
        
        function renderCard(i) {
            var img = cards[shuffle[i]];
            var offset = Math.pow(Math.max(Math.abs(i-pos)-0.4,0), 0.3)*sign(i-pos);
            
            var x = offset*CARD_WID*0.8+0.5*EFF_WID-CARD_WID/2;
            var y=0.5*EFF_HEI-CARD_HEI/2;
            var angle=clamp(-offset*Math.PI*0.1, Math.PI*-0.5, Math.PI*0.5);
            if (img.img) {
                ctx.translate(x+CARD_WID/2,y);
                ctx.rotate(-angle);
                ctx.drawImage(img.img,-CARD_WID/2,0,CARD_WID,CARD_HEI);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0,0,WID,HEI);
        //for(var i = clamp(Math.round(pos)-8,0,51); i < clamp(Math.round(pos)+8,0,52); i++) {
        var rpos = Math.round(pos);
        for(var i = 0; i < rpos; i++) {
            renderCard(i);
        }
        for(var i = shuffle.length-1; i >= rpos; i--) {
            renderCard(i);
        }
    }, 16);
}
startup();


            /*if(i>=pos) {
                offset = Math.pow(Math.abs(i-pos-0.5),2)*sign(i-pos-0.5);
            } else {
                offset = -Math.pow(Math.abs(pos-i-0.5),0.2)*sign(pos-i-0.5);
            }*/

/*
window.onmousedown = function(e)
{
    mx = e.pageX;
    my = e.pageY;
}

function ImageData(src, wid, hei)
{
    var that = this;
    that.onload = null;
    
    var result = [];
    
    var runningSum = [];

    var img = new Image(src);
    img.src = src;
    img.onload = function(){

        for(var i = 0; i < hei; i++)
        {
            result.push([]);
            runningSum.push([]);
        }
    
        var cv = document.createElement('canvas');
        var cx = cv.getContext('2d');
        
        cv.width = wid;
        cv.height = hei;
        
        cx.drawImage(img,0,0,wid,hei);
        
        var id = cx.getImageData(0,0,wid,hei);
        var px = id.data;
        var n =    px.length;
        
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        for (var i = 0; i < n; i += 4) {
            var x = (i/4) % wid;
            var y = Math.floor(i / 4 / wid);
            if(x === 0)
            {
                sumR = 0;
                sumG = 0;
                sumB = 0;
            }
            sumR += px[i];
            sumG += px[i+1];
            sumB += px[i+2];
            result[y][x] = [px[i], px[i+1], px[i+2]];
            runningSum[y][x] = [sumR, sumG, sumB];
        }
        if(that.onload) {
            that.onload();
        }
        that.loaded = true;
    }
    this.getPixels = function(x,y,rad)
    {
        if(rad === 0)
            return this.getPixel(x,y);
    
        if(!runningSum.length)
            return null;
            
        var minX = Math.max(0,x-rad);
        var maxX = Math.min(wid-1, x+rad);
        var minY = Math.max(0,y-rad);
        var maxY = Math.min(hei-1, y+rad);
        
        var sumR = 0;
        var sumG = 0;
        var sumB = 0;
        for(var yy = minY; yy <= maxY; yy++)
        {
            sumR += runningSum[yy][maxX][0] - runningSum[yy][minX][0];
            sumG += runningSum[yy][maxX][1] - runningSum[yy][minX][1];
            sumB += runningSum[yy][maxX][2] - runningSum[yy][minX][2];
        }
        var area = (maxX-minX)*(maxY-minY+1);
        var result = [Math.round(sumR/area), Math.round(sumG/area), Math.round(sumB/area)];
        return result;
    }
    this.getPixel = function(x,y)
    {
        if(result.length > 0)
        {
            return result[y][x];
        }
        else
        {
            return null;
        }
    }
}

function drawCircle(c, x, y, radius1)
{
    c.translate(x,y);
    c.rotate(Math.random()*Math.PI*2);
    c.beginPath();
    c.roundRect(0,0,radius1*4, radius1, radius1*0.5);
    //c.arc(x,y,Math.max(Math.abs(radius1),2),0,Math.PI*2);
    c.fill();
    c.setTransform(1, 0, 0, 1, 0, 0);
}

function sq(x){return x*x};
function avg(rgb) {
    return (rgb[0]+rgb[1]+rgb[2])/3;
}


//var idata = new ImageData("PXL_20231218_041026729.jpg", WID, HEI);
//var idata = new ImageData("PXL_20231126_224103299.MP.jpg", WID, HEI);
//var idata = new ImageData("PXL_20231120_183155990.MP.jpg", WID, HEI);
var idata = new ImageData("OIG._79CoPCp8IAPzbua7G.jpg", WID, HEI);






function drawPencil(x, y) {
    var rgb1 = idata.getPixels(x, y, 1);
    var rgb2 = idata.getPixels(x, y, 5);
    var delta = 255-3*(avg(rgb1)-avg(rgb2));
    var rgb = clamp(Math.round(delta), 0, 255);
    ctx.fillStyle = 'rgb('+rgb+','+rgb+','+rgb+')';
    ctx.fillRect(x, y, 1, 1);
}
function drawBrushstroke(x, y) {
    var rgb = idata.getPixels(x,y, PIXEL_RADIUS);
    var radius = RADIUS;
    var alpha = ALPHA;
    ctx.fillStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+alpha+')';
    drawCircle(ctx, x, y, radius);
}
function drawNull(){
}

var counter = 0;
var coords = [];

idata.onload = function() {
    for(var x = 0; x < WID; x++) {
        for(var y = 0; y < HEI; y++) {
            coords.push([x,y]);
        }
    }
    shuffleArray(coords);

    setInterval(function(){
        if(!idata.loaded) {
            return;
        }
        
        var speed_boost = 0;
        var drawFn = drawNull;
        if(counter < coords.length) {
            drawFn = drawPencil;
            speed_boost = 5000;
        } else if (counter < coords.length*2) {
            drawFn = drawBrushstroke;
            speed_boost = 500;
        }
        for(var i = 0; i < speed_boost; i++)
        {
            counter++;
            var coord = coords[counter%coords.length];
            //var x = Math.floor(Math.random()*WID);
            //var y = Math.floor(Math.random()*HEI);
            drawFn(coord[0], coord[1]);
        }
    }, DELAY);
}*/