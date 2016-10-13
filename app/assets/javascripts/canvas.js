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
    debugger;
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
      // $('#radval').innerHTML = radius;

      if(newRadius < minRad)
        newRadius = minRad;
      else if(newRadius > maxRad)
        newRadius = maxRad;
        radius = newRadius;
        frontcontext.lineWidth = radius*2;
      }

    var minRad = 0.5,
        maxRad = 100,
        defaultRad = 10,
        interval = 2,
        // radSpan = $('#radval'),
        decRad = $('#decRad'),
        incRad = $('#incRad');

        decRad.on('click', function(){
          setRadius(radius-interval);
        })

        incRad.on('click', function(){
          setRadius(radius+interval);
        })

        setRadius(defaultRad);


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

          var dataURL = ($('#canvas2')[0]).toDataURL('image/png');
          $("#upload").val(dataURL);

        });

        var mandala1 = $('#mandala1');
        var background = new Image();

        mandala1.on('click', function() {
          backdrop.drawImage(background, 0, 0);
          background.src = '/assets/mandalas-01.png';
        });

        var mandala2 = $('#mandala2');
        var background2 = new Image();

        mandala2.on('click', function() {
          backdrop.drawImage(background2, 0, 0);
        });

        background2.src = '/assets/mandalas-02.png';

        var mandala3 = $('#mandala3');
        var background3 = new Image();

        mandala3.on('click', function() {
          backdrop.drawImage(background3, 0, 0);
        });

        background3.src = '/assets/mandalas-03.png';

        var mandala4 = $('#mandala4');
        var background4 = new Image();

        mandala4.on('click', function() {
          backdrop.drawImage(background4, 0, 0);
        });

        background4.src = '/assets/mandalas-04.png';

        var mandala5 = $('#mandala5');
        var background5 = new Image();

        mandala5.on('click', function() {
          backdrop.drawImage(background5, 0, 0);
        });

        background5.src = '/assets/mandalas-05.png';

        var mandala6 = $('#mandala6');
        var background6 = new Image();

        mandala6.on('click', function() {
          backdrop.drawImage(background6, 0, 0);
        });

        background6.src = '/assets/mandalas-06.png';


        var textureButton = $('#texture');
        var backgroundtext = new Image();

        textureButton.on('click', function() {
          backdrop.drawImage(backgroundtext, 0, 0);
        });

        backgroundtext.src = '/assets/crayon-texture-01.png';

        var texture2 = $('#texture2');
        var backgroundtext2 = new Image();

        texture2.on('click', function() {
          backdrop.drawImage(backgroundtext2, 0, 0);
        });

        backgroundtext2.src = '/assets/mandalas-07.png';

        var texture3 = $('#texture3');
        var backgroundtext3 = new Image();

        texture3.on('click', function() {
          backdrop.drawImage(backgroundtext3, 0, 0);
        });

        backgroundtext3.src = '/assets/mandalas-08.png';

        $('#clear').on('click', function() {
        backdrop.clearRect(0, 0, 600, 600);
        frontcontext.clearRect(0, 0, 600, 600);
        });


});
