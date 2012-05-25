jCanvas
=======

A jQuery plugin that lets you manipulate the shape of video on canvas (requiere html5).

How to use
==========
copy the jcanvas folder which include also images folder. don't change this structure.

in your HTML file insert the canvas tag and the video tag:

<canvas id="c"></canvas>
<video id="v">
    <source src="video.mp4" type="video/mp4" />
    <source src="video.ogg" type="video/ogg" />
</video>

before the </body> tag:

    <script src="jcanvas/jquery.jcanvas.js"></script>
    <script>
        $(document).ready(function() {
            $('#v').jCanvas();
        });
    </script>

and...that's it, 
the plugin will copy the video from the video tag to the canvas.

API
===
    $('#videoId').jCanvas({
        width: int, //the default is 400px
        height: int, //the default is 320px
        canvasId: 'string', // the default is 'c'
        shape: 'string', // the default is 'square'. another shapes you can use are: circle, chat
        roundCorners: int, // the default is null
        controls: boolean, // the default is true
        autoplay: boolean, // the default is false
        jCanvasFolder: 'string' // the default is 'jcanvas'. change it if you save the plugin in diffrent folder
    });

STYLE
=====
you can overide every id style:

    #cContainer{videoNum} - the container of the canvas. 
      Notice{videoNum}: if you want to change the canvas position you should change the #cContainer position
              if you want to change the canvas width&height you should do it only through the API
    #bContainer{videoNum} - the container of the buttons
    #btnPlay{videoNum} - the play button
    #btnPause{videoNum} - the pause btutton
    #btnStart{videoNum} - the 'back to start' button
    
    {videoNum} - every call for the jCanvas() increase the videoNum value, so if you have one call for one video
                you will call #cContainer1. this way you can set multipile number of videos and canvas at the same page.
                look at the index.html example.
                
the overiding is done like so:

    $('#idName').css({
        "property": "value",
        "property", "value"
    });
    
Known Issues
============
- above certain width || height the roundCorners && circle won't work (if someone know's why please let me know)