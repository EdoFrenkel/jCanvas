/**
 * @projectDescription Manipulate HTML5 Canavas with jQuery
 *
 * @version 1.0
 * @author Edo Frenkel
 *	
 * Example on 
 * Date : 25/05/2012
 * Copyright ©2012 Edo Frenkel <http://www.lightapps.co.il/>
 *
 * Released under the MIT licence:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Known issues:
 * - above certain width || height the roundCorners && circle won't work (if someone know's why please let me know)
 */

(function($) {
	
    var options = {
        width: 400,
        height: 320,
        canvasId: 'c',
        shape: 'square',
        roundCorners: null,
        controls: true,
        autoplay: false,
        jCanvasFolder: 'jcanvas'
    }
    var videoNum = 0;
    $.fn.jCanvas = function (pOptions) {
	videoNum++;

        $.extend(options,pOptions);               
        
        options.videoId = $(this).attr('id');
        
        var v = document.getElementById(options.videoId);
        var canvas = document.getElementById(options.canvasId);
        var context = canvas.getContext('2d');
        var cw = options.width;
        var ch = options.height;
        canvas.width = cw;
        canvas.height = ch;
        
        $(this).css('display', 'none');
        
        if (options.roundCorners != null) {
            setRoundCorners();
        }
        setShape();
        setControls();
        if (options.autoPlay) {
            document.getElementById(options.videoId).play();
        }
        
        
        v.addEventListener('play', function(){
            draw(this,context,cw,ch);
        },false);
    
    }
    this.setRoundCorners = function() {
        $('#' + options.canvasId).css('border-radius', options.roundCorners + 'px');
        $('#' + options.canvasId).css('-webkit-border-radius', options.roundCorners + 'px');
        $('#' + options.canvasId).css('-moz-border-radius', options.roundCorners + 'px');
    }
    this.setShape = function() {
        $('#' + options.canvasId).wrap('<div id="cContainer' + videoNum +'" />');
        $('#cContainer' + videoNum).css({
            "background-color":"#EDEDED",
            "border":"2px solid #666666",
            "padding":"10px",
            "position":"relative",
            "text-align":"center",
            "width": (options.width + 10) +"px",
            "-moz-border-radius": options.roundCorners || "0px",
            "-webkit-border-radius": options.roundCorners || "0px",
            "-moz-box-shadow":"0 0 5px #888888",
            "-webkit-box-shadow":"0 0 5px #888888",
            "-webkit-box-shadow": "0px 10px 10px 0px #666",
            "box-shadow": "0px 10px 10px 0px #666"
        });
        switch(options.shape) {
            case 'circle':
                $('#' + options.canvasId).css('border-radius', '50%');
                $('#' + options.canvasId).css('-webkit-border-radius', '50%');
                $('#' + options.canvasId).css('-moz-border-radius', '50%');
                $('#cContainer' + videoNum).css({
                    "border-radius": "50%",
                    "-webkit-border-radius": "50%",
                    "-moz-border-radius": "50%"
                });
                break;
            case 'chat':
                $('#cContainer' + videoNum).append('<div id="chatBubbleArrowBorder' + videoNum + '"></div>');
                $('#cContainer' + videoNum).append(' <div id="chatBubbleArrow' + videoNum + '"></div>');                
                $('#chatBubbleArrowBorder' + videoNum).css({
                    "border-color": "#666666 transparent transparent transparent",
                    "border-style": "solid",
                    "border-width": "10px",
                    "height":"0",
                    "width":"0",
                    "position":"absolute",
                    "bottom":"-22px",
                    "left":"30px"
                });
                $('#chatBubbleArrow' + videoNum).css({
                    "border-color": "#EDEDED transparent transparent transparent",
                    "border-style": "solid",
                    "border-width": "10px",
                    "height":"0",
                    "width":"0",
                    "position":"absolute",
                    "bottom":"-19px",
                    "left":"30px"
                });                
                break;
            default:
                break;
        }
    }
    this.setControls = function() {
        if (options.controls) {
            var buttons = '<div id="bContainer' + videoNum + '" style="position:absolute; left:' + (options.width + 35) + 'px; top:0px; display: none;">';
            buttons += '<div id="btnPlay' + videoNum + '" onclick="document.getElementById(\'' + options.videoId + '\').play()"></div>';
            buttons += '<div id="btnPause' + videoNum + '" onclick="document.getElementById(\'' + options.videoId + '\').pause()"></div>';
            buttons += '<div id="btnStart' + videoNum + '" onclick="document.getElementById(\'' + options.videoId + '\').currentTime =0"></div>';
            buttons += '</div>';
            $('#cContainer' + videoNum).append(buttons);
            $('#btnPlay' + videoNum).css({
                "width": "32px", 
                "height":"32px", 
                "background-image": "url(" + options.jCanvasFolder + "/images/btnPlay.png)", 
                "margin-bottom": "2px", 
                "cursor": "pointer"
            });
            $('#btnPause' + videoNum).css({
                "width": "32px", 
                "height":"32px", 
                "background-image": "url(" + options.jCanvasFolder + "/images/btnPause.png)",
                "margin-bottom": "2px",
                "cursor": "pointer"
            });
            $('#btnStart'+ videoNum).css({
                "width": "32px", 
                "height":"32px", 
                "background-image": "url(" + options.jCanvasFolder + "/images/btnStart.png)", 
                "cursor": "pointer"
            });
            $('#bContainer' + videoNum).fadeIn(500);
        }
    }
    this.draw = function(v,c,w,h) {
        if(v.paused || v.ended) return false;        
        c.drawImage(v,0,0,w,h);
        setTimeout(draw,20,v,c,w,h);
    }
})(jQuery);