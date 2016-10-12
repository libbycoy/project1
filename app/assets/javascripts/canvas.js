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
    var context = canvas[0].getContext("2d");

    var radius = 10;
    var dragging = false;

    context.lineWidth = radius*2;

    // makes brush a circle at a given point
    var putPoint = function(e) {
      if (dragging) {
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
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
        interval = 5,
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

        for (var i = 0, n = colors.length; i<n; i++) {
          var swatch = $('<div/>').addClass('swatch');
          swatch.css('background-color', colors[i]);
          swatch.on('click', setSwatch);
          $('#colors').append(swatch);
        }

        // identify swatch that's been clicked, set color, give active colors
        function setColor(color){
          context.fillStyle = color;
          context.strokeStyle = color;
          var active = $('.active');
          if (active) {
            // reset color to swatch
            active.addClass('swatch');
          }
        }
        // $("#colors2").CanvasColorPicker();

        function setSwatch(e) {
          var swatch = $(e.target);
          setColor( swatch.css('background-color') );
          $('.active').removeClass('active');
          swatch.addClass('active');
        }

        // setSwatch(swatch[0]);
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

        var duckButton = $('#clear');
        var background = new Image();

        duckButton.on('click', function() {
          context.drawImage(background, 0, 0);
        });

        background.src = '/assets/watermelon-duck-outline.png';
});
