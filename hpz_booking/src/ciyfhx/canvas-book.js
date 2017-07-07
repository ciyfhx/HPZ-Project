"use strict"

function BookingMapCanvas(canvas, data){
  this.canvas = canvas;
  this.data = data;

  Math.clamp=function(val,min,max){return Math.min(Math.max(min, val), max);}

  var g = canvas.getContext("2d");

  var mouse = {
      x:undefined,
      y:undefined
  };


  var bookLocations = [];

  this.update = function update(paramData){
    console.log(paramData)
    data = paramData;
    var i;
    bookLocations = [];
    for(i = 0; i < data.length; i++){
      bookLocations.push(new BookLocation(data[i]));
    }

  }

  this.init = function init(canvas){
    canvas.width = 768;//window.innerWidth*0.4
    canvas.height = 475;//window.innerHeight*0.5

    var rect = canvas.getBoundingClientRect();
    var scaleX = rect.width / window.innerWidth;
    var scaleY = rect.height / window.innerHeight;



    window.addEventListener('mousemove', function(event){
          rect = canvas.getBoundingClientRect();
          mouse.x = event.clientX - rect.left;
          mouse.y = event.clientY - rect.top;
    });

    window.addEventListener('click', function(event){
      var i;
      for(i = 0; i < bookLocations.length; i++){
        var bookLocation = bookLocations[i];
        bookLocation.click();
      }
    });




    var img = new Image();
    img.src = 'http://www.conceptdraw.com/solution-park/resource/images/solutions/office-layout-plans/Building-Plans-Office-Layout-Plan-Office-floor-plan.png';


    function render(){
      //Request to call render
      requestAnimationFrame(render);
      //Clear canvas
      g.clearRect(0,0, rect.width, rect.height);
      g.drawImage(img, 0, 0, canvas.width, canvas.height);

      //Draw our Stuffs
      var i;
      for(i = 0; i < bookLocations.length; i++){
        var bookLocation = bookLocations[i];
        bookLocation.update();
        bookLocation.draw();
      }

      //Watermark
      g.font="14px Georgia";
      g.fillStyle = 'grey';
      g.fillText('HPZ Inc.', canvas.width*0.75,canvas.height*0.9);


    }

    render();

  }

  this.init(this.canvas);

  function BookLocation(data){
      this.data = data;
      var radius = 15;
      var color = '';
      var inside = false;

      var alpha = 1;
      var minRingRadius = 15;
      var ringRadius = minRingRadius;
      var targetRingRadius = 40;
      var percentageDrop = 0.0;

      this.draw = function(){
        g.save();
        g.beginPath();
        if(this.data.selected)g.fillStyle = '#DD4D5E';
        else g.fillStyle = this.color;
        g.arc(this.data.x, this.data.y, radius, 0, Math.PI*2);
        g.fill();

        //Draw ring
        g.beginPath();
        g.globalAlpha = alpha;
        g.strokeStyle = g.fillStyle;
        g.arc(this.data.x, this.data.y, ringRadius, 0, Math.PI*2);
        g.stroke();

        //Draw popup
        if(inside){
          g.globalAlpha = 1.0*percentageDrop;

          g.lineWidth= 2;
          var rectWidth = 200;
          var rectHeight = 100;

          var locX = Math.clamp(this.data.x-rectWidth/2, 0, canvas.width-rectWidth);
          var locY = Math.clamp(this.data.y+(rectHeight/2*percentageDrop), 0, canvas.height);
          if(locY>=canvas.height-rectHeight)locY = this.data.y-(rectHeight/2*percentageDrop)-rectHeight

          //Fill Rectangle
          g.fillStyle = 'white'
          roundRect(g, locX, locY, rectWidth, rectHeight, 5, true, false);
          //Draw border
          g.strokeStyle = '#135C7F'
          roundRect(g, locX, locY, rectWidth, rectHeight, 5, false, true);

          //Resouces Details
          g.fillStyle = "black"
          g.font = "12px Arial";
          g.textAlign = "center";
          g.fillText(this.data.name,locX+(rectWidth/2),locY+(rectHeight*0.2));

        }


        g.restore();
      }

      this.update = function(){
        //Check collision
        var xDist = mouse.x - this.data.x;
        var yDist = mouse.y - this.data.y;
        var dist = Math.sqrt((xDist*xDist)+(yDist*yDist));
        if(dist<=radius){
          inside = true;
          this.color = '#135C7F';

        }else{
          inside = false;
          this.color = '#339BCC';

          //Reset popup percentageDrop
          percentageDrop = 0.0;
        }

        ringRadius = Math.clamp(ringRadius+0.5, minRingRadius, targetRingRadius);
        if(ringRadius===targetRingRadius){
          ringRadius = minRingRadius;
        }
        alpha = 1 - ringRadius / targetRingRadius;

        //Update popup
        percentageDrop = Math.clamp(percentageDrop+0.1, 0.0, 1.0);


      }

      this.click = function(){
        if(inside)this.data.selected = !this.data.selected;
      }


  }

}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}



module.exports = BookingMapCanvas;
