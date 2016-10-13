function dataURLtoBlob(dataURL) {
    // Decode the dataURL
    var binary = atob(dataURL.split(',')[1]);
    // Create 8-bit unsigned array
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    // Return our Blob object
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

var blob;

function vc(w, c){
  // var win = w.open();
  // console.log(w, win);
  open().document.write('<img src="' + c[0].toDataURL('image/png') + '"/>');
}

var canvasFront;
var canvasBack;
var frontcontext;
var backdrop;


$(document).ready (function() {
  // if($('#canvasBack').length > 0 ) {
    canvasFront = $("#canvas2");
    canvasBack = $("#canvas");
    frontcontext = canvasFront[0].getContext("2d");
    backdrop = canvasBack[0].getContext("2d");

    var radius = 10;
    var dragging = false;

    frontcontext.lineWidth = radius*2;

    var color = "rgb(255,0,0)";

    function change(e){
      color = this.value;
    }

    $("#bunny").on('change', change);

    function start(e){
      var mouseX = e.pageX - canvasFront.offsetLeft;
      var mouseY = e.pageY - canvasFront.offsetTop;
      paint = true;
      frontcontext.beginPath();
      frontcontext.moveTo(mouseX,mouseY);
      points[points.length]=[mouseX,mouseY];
    };

    function setSwatch(e) {
      var swatch = $(e.target);
      setColor( swatch.css('background-color') );
      $('.active').removeClass('active');
      swatch.addClass('active');
    }

    function setColor(color){
      frontcontext.fillStyle = color;
      frontcontext.strokeStyle = color;
      var active = $('.active');
      if (active) {
        // reset color to swatch
        active.addClass('swatch');
      }
    }

    $('#kitten').on('click', function() {
      var swatch = $('<div/>').addClass('swatch');
      swatch.css('background-color', color);
      swatch.on('click', function(){
        color = swatch.css('background-color');
      });
      swatch.on('click', setSwatch);
      $('#colors').append(swatch);
    });

    // makes brush a circle at a given point
    var putPoint = function(e) {
      if (dragging) {
      frontcontext.lineTo(e.offsetX, e.offsetY);
      frontcontext.stroke();
      frontcontext.strokeStyle = color;
      frontcontext.fillStyle = color;
      frontcontext.beginPath();
      frontcontext.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      frontcontext.fill();
      frontcontext.beginPath();
      frontcontext.moveTo(e.offsetX, e.offsetY);
      }
    };

    // dragging and holding down the mouse to record
    var engage = function(e){
      dragging = true;
      putPoint(e);
    };

    var disengage = function() {
      dragging = false;
      frontcontext.beginPath();
    };

    canvasBack.on('mousedown', engage);
    canvasBack.on('mousemove', putPoint);
    canvasBack.on('mouseup', disengage);

    // navbar
    var setRadius = function(newRadius) {

      if(newRadius < minRad)
        newRadius = minRad;
      else if(newRadius > maxRad)
        newRadius = maxRad;
        radius = newRadius;
        frontcontext.lineWidth = radius*2;
        radSpan.innerHTML = radius;
    }

    var minRad = 0.5,
        maxRad = 100,
        defaultRad = 10,
        interval = 2,
        radSpan = $('#radval'),
        decRad = $('#decRad'),
        incRad = $('#incRad');

        decRad.on('click', function(){
          setRadius(radius-interval);
        })

        incRad.on('click', function(){
          setRadius(radius+interval);
        })

        setRadius(defaultRad);

        // colors



        var colors = ['black', 'grey', 'white', 'red', 'orange', 'blue', 'indigo', 'violet'];

        // for (var i = 0, n = colors.length; i<n; i++) {
        //   var swatch = $('<div/>').addClass('swatch');
        //   swatch.css('background-color', colors[i]);
        //   swatch.on('click', setSwatch);
        //   $('#kitten').on('click', function() {
        //     $('#colors').append(swatch);
        //   });
        // }


        // identify swatch that's been clicked, set color, give active colors
        // function setColor(color){
        //   frontcontext.fillStyle = color;
        //   frontcontext.strokeStyle = color;
        //   var active = $('.active');
        //   if (active) {
        //     // reset color to swatch
        //     active.addClass('swatch');
        //   }
        // }

        // var imageObj = new Image();
        // var pattern = frontcontext.createPattern(imageObj, 'repeat');
        //
        // // identify swatch that's been clicked, set color, give active colors
        // $('#gradient').on('click', function() {
        //   frontcontext.fillStyle = pattern;
        //   frontcontext.strokeStyle = pattern;
        // });
        //
        // imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
        // // $("#colors2").CanvasColorPicker();

        // function setSwatch(e) {
        //   var swatch = $(e.target);
        //   setColor( swatch.css('background-color') );
        //   $('.active').removeClass('active');
        //   swatch.addClass('active');
        // }
        // on click, set the stroke style to pattern variable.
        // //
        // $('#gradient').on('click', function(e) {
        //   frontcontext.fillStyle = pattern;
        //   frontcontext.strokeStyle = pattern;
        //   $(e.target).css('background-color')
        // });

        // var imageObj = new Image();
        // var pattern = frontcontext.createPattern(imageObj, 'repeat');
        // imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
        //
        // function setPattern(pattern){
        //   frontcontext.fillStyle = pattern;
        //   frontcontext.strokeStyle = pattern;
        // }

        // $('#gradient').on('click', function() {
        //   frontcontext.fillStyle = pattern;
        //   frontcontext.strokeStyle = pattern;
        // });

        var gradient = frontcontext.createLinearGradient(0,0,170,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        $('#gradient').on('click', function(e) {
          var grad = $(e.target);
          setColor( grad.css('background-color') );
          frontcontext.strokeStyle = gradient;
          frontcontext.lineWidth = 5;
          frontcontext.strokeRect(20,20,150,100);
        });

        $('.swatch:first').trigger('click');

        // save button to save image
        var saveButton = $('#go');

        saveButton.on('click', function(e) {

          frontcontext.drawImage($("#canvas")[0], 0, 0);

          // debugger;

          var dataURL = ($('#canvas2')[0]).toDataURL('image/png');
          // var dataURL = bg_frontcontext.toDataURL('image/png');

          // console.log(bg_frontcontext, dataURL);

          // window.location = dataURL;
          // blob = dataURLtoBlob( dataURL );
          // var fd = new FormData( $('#new_painting') );
          // fd.append("painting_file", blob, "painting.png")
          $("#upload").val(dataURL);

          // debugger;

        });

        var duckButton = $('#duck');
        var background = new Image();

        duckButton.on('click', function() {
          backdrop.drawImage(background, 0, 0);
        });

        background.src = '/assets/watermelon-duck-outline.png';

        var textureButton = $('#texture');
        var background2 = new Image();

        textureButton.on('click', function() {
          backdrop.drawImage(background2, 0, 0);
        });

        background2.src = '/assets/crayon-texture-01.png';

        $('#clear').on('click', function() {
        backdrop.clearRect(0, 0, 600, 600);
        frontcontext.clearRect(0, 0, 600, 600);
        });

      // create radial gradient
      // var imageObj = new Image();
      // imageObj.onload = function() {
      //
      //   var pattern = frontcontext.createPattern(imageObj, 'repeat');
      //   frontcontext.fillStyle = pattern;
      //
      // $('#gradient').on('click', function() {
      //   backdrop.fillStyle = backdrop.createRadialGradient(238, 50, 10, 238, 50, 300);
      // });
});
