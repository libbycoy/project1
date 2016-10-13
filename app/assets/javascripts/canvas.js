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

$(document).ready (function() {
  // if($('#canvas').length > 0 ) {
    var canvas = $("#canvas");
    var canvasTwo = $("#canvas2");
    var context = canvasTwo[0].getContext("2d");
    var contextTwo = canvas[0].getContext("2d");

    var radius = 10;
    var dragging = false;

    context.lineWidth = radius*2;

    var color = "rgb(255,0,0)";

    function change(e){
      color = this.value;
    }

    $("#bunny").on('change', change);

    function start(e){
      var mouseX = e.pageX - canvasTwo.offsetLeft;
      var mouseY = e.pageY - canvasTwo.offsetTop;
      paint = true;
      context.beginPath();
      context.moveTo(mouseX,mouseY);
      points[points.length]=[mouseX,mouseY];
    };

    function setSwatch(e) {
      var swatch = $(e.target);
      setColor( swatch.css('background-color') );
      $('.active').removeClass('active');
      swatch.addClass('active');
    }

    function setColor(color){
      context.fillStyle = color;
      context.strokeStyle = color;
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
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      context.strokeStyle = color;
      context.fillStyle = color;
      context.beginPath();
      context.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
      }
    };

    // dragging and holding down the mouse to record
    var engage = function(e){
      dragging = true;
      putPoint(e);
    };

    var disengage = function() {
      dragging = false;
      context.beginPath();
    };

    canvas.on('mousedown', engage);
    canvas.on('mousemove', putPoint);
    canvas.on('mouseup', disengage);

    // navbar
    var setRadius = function(newRadius) {

      if(newRadius < minRad)
        newRadius = minRad;
      else if(newRadius > maxRad)
        newRadius = maxRad;
        radius = newRadius;
        context.lineWidth = radius*2;
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



        var colors = ['black', 'grey', 'white', 'red', 'orange', 'blue', 'indigo', 'violet', pattern];

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
        //   context.fillStyle = color;
        //   context.strokeStyle = color;
        //   var active = $('.active');
        //   if (active) {
        //     // reset color to swatch
        //     active.addClass('swatch');
        //   }
        // }

        // var imageObj = new Image();
        // var pattern = context.createPattern(imageObj, 'repeat');
        //
        // // identify swatch that's been clicked, set color, give active colors
        // $('#gradient').on('click', function() {
        //   context.fillStyle = pattern;
        //   context.strokeStyle = pattern;
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
        //   context.fillStyle = pattern;
        //   context.strokeStyle = pattern;
        //   $(e.target).css('background-color')
        // });

        // var imageObj = new Image();
        // var pattern = context.createPattern(imageObj, 'repeat');
        // imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
        //
        // function setPattern(pattern){
        //   context.fillStyle = pattern;
        //   context.strokeStyle = pattern;
        // }

        // $('#gradient').on('click', function() {
        //   context.fillStyle = pattern;
        //   context.strokeStyle = pattern;
        // });

        var gradient = context.createLinearGradient(0,0,170,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        $('#gradient').on('click', function(e) {
          var grad = $(e.target);
          setColor( grad.css('background-color') );
          context.strokeStyle = gradient;
          context.lineWidth = 5;
          context.strokeRect(20,20,150,100);
        });

        $('.swatch:first').trigger('click');

        // save button to save image
        var saveButton = $('#go');

        saveButton.on('click', function() {
          var dataURL = ($('#canvas')[0]).toDataURL('image/png');
          // window.location = dataURL;
          // blob = dataURLtoBlob( dataURL );
          // var fd = new FormData( $('#new_painting') );
          // fd.append("painting_file", blob, "painting.png")
          $("#upload").val(dataURL);
        });

        var duckButton = $('#duck');
        var background = new Image();

        duckButton.on('click', function() {
          contextTwo.drawImage(background, 0, 0);
        });

        background.src = '/assets/watermelon-duck-outline.png';

        var textureButton = $('#texture');
        var background2 = new Image();

        textureButton.on('click', function() {
          contextTwo.drawImage(background2, 0, 0);
        });

        background2.src = '/assets/crayon-texture-01.png';

        $('#clear').on('click', function() {
        contextTwo.clearRect(0, 0, 600, 600);
        context.clearRect(0, 0, 600, 600);
        });

      // create radial gradient
      // var imageObj = new Image();
      // imageObj.onload = function() {
      //
      //   var pattern = context.createPattern(imageObj, 'repeat');
      //   context.fillStyle = pattern;
      //
      // $('#gradient').on('click', function() {
      //   contextTwo.fillStyle = contextTwo.createRadialGradient(238, 50, 10, 238, 50, 300);
      // });
});
