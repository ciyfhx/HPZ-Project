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
        g.strokeStyle = this.color;
        g.arc(this.data.x, this.data.y, ringRadius, 0, Math.PI*2);
        g.stroke();

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
        }

        ringRadius = Math.clamp(ringRadius+0.5, minRingRadius, targetRingRadius);
        if(ringRadius===targetRingRadius){
          ringRadius = minRingRadius;
        }
        alpha = 1 - ringRadius / targetRingRadius;

      }

      this.click = function(){
        if(inside)this.data.selected = !this.data.selected;
      }


  }

}





module.exports = BookingMapCanvas;
