var $score = 0;
var $ballX = 0;
var $gameOver;
var $height;
var $width = window.innerWidth;
var $height = window.innerHeight;
var $loopRan = false;
var c;
var $adcount = 0; 
var $relativeY;
var highscore;
var color; 
var $start = new Date();
var $elapsed = new Date();
var gameStarted = true;
ballColor();
showBanner(false);

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

function simulate(){
    $elem = $('#ball');
    $mX = event.clientX;
    $angle = ($elem.offset().left+($elem.width()/2)) - c;
    var foo = new ui.Simulate({
        values: {
            y: {
                velocity: -$height*2.1,
                //max: $height/2 -25 - ($elem.width()/2),
                acceleration: ($height*2)*1.65,
                bounce: .8       
            },
            x: {
                velocity: $angle*52, //angle,
                min: -($width/2)+($elem.width()/2),
                max: $width/2 - ($elem.width()/2),
                bounce: .8,
                friction: 0.000
            }
        }
    });
    return foo;
}

function start() {
    ball = new ui.Actor('.ball');
    ballColor();
    getHighScore();
    var moveUp = new ui.Tween({
        values: {
            y: 0,
        },
        duration: 1000
    });
    moveDown = new ui.Tween({
        values: {
            y: 350,
        },
        duration: 1000
    });
    ball.start(moveUp);
    var width =  100; 
    document.getElementById('score').innerHTML = $score;
	
    moveBack = new ui.Tween({
        values: {
            x: 0,
        },
        duration: 1000
    });
    var $scoreDiv = document.getElementById('score');
	$('body').on('mousedown touchstart', '#restart', function (e) {
        e.preventDefault();
        $('.score').animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300, function() {
                $('.score').delay(400).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 500); 
                $('.ball').delay(400).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 500); 
                $scoreDiv.style.fontSize = "60vh";
                $('.scorediv').css({"top": '43.8%'});
        });
        $("#balls").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#restartholder").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#restartimg").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#restartimg").delay(300).hide(0);
        $("#gameover").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#gameover").delay(300).hide(0);
        $("#restart").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#highscore").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#leaderboard_button").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#leaderboard_button").delay(300).hide(0);
        $("#hint_button").animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300);
        $("#hint_button").delay(300).hide(0);
        $("#restart").hide();
        ball.pause();
        ballColor();
        
        $score = 0;
        function bannerDelay() {
            showBanner(false);
            $scoreDiv.innerHTML = $score;
        } 
        setTimeout(bannerDelay, 400);
        ball.start(moveBack);
        ball.start(moveUp);
        stopFader();
        $gameOver = false;
        $loopRan = false;

    });
    
	$('body').on('mousedown touchstart', '.ball', function (e) {
		e.preventDefault();
        checkCollision();
        if($gameOver==false){
             pointerCoord();
             ball.start(simulate());
             $score++;
             if($score<100){
                $scoreDiv.style.fontSize = "60vh";
             } else if($score>99&$score<1000){
                $('.scorediv').css({"top": '40%'});
                $scoreDiv.style.fontSize = "40vh";
             } else if ($score>999&$score<10000){
                $scoreDiv.style.fontSize = "30vh";
                $('.scorediv').css({"top": '40%'});
             } else if ($score>9999){
                $scoreDiv.style.fontSize = "20vh";
                $('.scorediv').css({"top": '38%'});
             }
             $scoreDiv.innerHTML = $score;
        } 
	});
}
var ballsCheck = false;
function showBalls(){
    if (ballsCheck==false){
        $('#score').animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300, function(){
            $('#balls').animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 300);
        });
        ballsCheck=true;
    }else if (ballsCheck){
        $('#balls').animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 300, function(){
            $('#score').animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 300);
        });
        ballsCheck=false;
    } 
}

function random(){
    return Math.floor(Math.random()*500-500);
}

function showFullAd(){
    if (window.plugins && window.plugins.AdMob) {
        var admob_key = device.platform == "Android" ? "ca-app-pub-7114598022404805/3990958173" : "ca-app-pub-7114598022404805/3990958173";
        var admob = window.plugins.AdMob;
        var options = {
            interstitialAdId: admob_key,
            autoShow: true
        };
        admob.createInterstitialView(options, function() {
            admob.requestInterstitialAd({
                    'isTesting': false
                },
                function() {
                    admob.showAd(true);
                },
                function(error) {
                    console.log('failed to request ad ' + error);
                }
            );
        },
        function() {
            console.log('failed to create Interstitial view');
        });
    } else {
        console.log("Admob plugin not available");
    }
}

function showBanner(yesorno){
    if(window.plugins && window.plugins.AdMob) {
        var admob_key = device.platform == "Android" ? "ca-app-pub-7114598022404805/6989306978" : "ca-app-pub-7114598022404805/6989306978";
        var admob = window.plugins.AdMob;
        admob.createBannerView( 
            {
                'publisherId': admob_key,
                'adSize': admob.AD_SIZE.BANNER,
                'bannerAtTop': false
            }, 
            function() {
                admob.requestAd(
                    { 'isTesting': false }, 
                    function() {
                        admob.showAd(yesorno);
                    }, 
                    function() { console.log('failed to request ad'); }
                );
            }, 
            function() { console.log('failed to create banner view'); }
        );
    }
}
var touches;
var e;
function pointerCoord() {
    //This method can get coordinates for both a mouse click
    //or a touch depending on the given event
    c = 0;   
    touches = event.touches && event.touches.length ? event.touches : [event];
    e = (event.changedTouches && event.changedTouches[0]) || touches[0];
    if (e) {
        c = e.clientX || e.pageX || 0;
    } 
}

function saveHighScore(){
    var oldhighscore = window.localStorage['highscore'];
    if(oldhighscore==null){
        oldhighscore = 0;
    }
    if($score>oldhighscore){
        window.localStorage['highscore'] = $score;
    }    
}

function getHighScore(){
    if(highscore=!null){
        highscore = window.localStorage['highscore'];
    } else {
        window.localStorage['highscore'] = $score;
        highscore = 0;
    }
    document.getElementById('highscore').innerHTML = 'HIGHSCORE: '+ highscore;
}


var i = 1;
function scoreAnimation(){
    
    setTimeout(function () {        
         
        document.getElementById('score').innerHTML = i;
        i++;               
        if (i <= $score) {           
            scoreAnimation();           
        }                        
    }, ((500/($score-i+1))^(2)) )   
}
    

var currentColor;
function ballColor(){
    var previousColor = window.localStorage['achievement'];
    if(highscore>=1000){
        currentColor = '#663300';
        color = '#000000';
        window.localStorage['achievement'] = "Black_Ball";
    } else if(highscore>=750) {
        currentColor = '#b000d2';
        color = '#663300';
        window.localStorage['achievement'] = "Brown_Ball";
    }else if(highscore>=500) {
        currentColor = '#0004d2';
        color = '#b000d2';
        window.localStorage['achievement'] = "Purple_Ball";
    }else if(highscore>=250) {
        currentColor = '#ff007f';
        color = '#0004d2';
        window.localStorage['achievement'] = "Blue_Ball";
    }else if(highscore>=150) {
        currentColor = '#008000';
        color = '#ff007f';
        window.localStorage['achievement'] = "Pink_Ball";
    }else if(highscore>=100) {
        currentColor = '#a52a2a';
        color = '#008000';
        window.localStorage['achievement'] = "Green_Ball";
    }else if(highscore>=50) {
        currentColor = '#FFA500';
        color = '#a52a2a';
        window.localStorage['achievement'] = "Maroon_Ball";
    }else if(highscore>=25) {
        currentColor = '#FF0000';
        color = '#FFA500';
        window.localStorage['achievement'] = "Orange_Ball";
    }else {
        currentColor = '#FF0000';
        color = '#FF0000';
        window.localStorage['achievement'] = "Red_Ball";
    }
    if(gameStarted){
        $('.ball').css({'background':color});
        gameStarted = false;
    }else if(previousColor!=window.localStorage['achievement']){
        colorAnimate(currentColor,color);
    }
}

function colorAnimate(oldcolor,newcolor){
    //TODO
    var ballActor = new ui.Actor({
        element: '#ball',
        values: {
            backgroundColor: oldcolor,
        }
    });
    var colorChange = new ui.Tween({values: {backgroundColor: newcolor,},duration: 1000});
    ballActor.start(colorChange);    
}

function FullDelay() {
    showFullAd();
    
} 
function bannerDelay() {
    showBanner(true);  
} 
function noTap(){
    $("#notap").hide();
}

var timerId = 0;

function startFader() {
    timerId = setInterval(function () {
        var $element = $('#restartimg');
        $element.animate({opacity: "100", leaveTransforms:false, useTranslate3d:true }, 700);
        $element.delay(1400).animate({opacity: "0", leaveTransforms:false, useTranslate3d:true }, 700); 

    }, 2100);
}
  
function stopFader() {
    clearInterval(timerId);
}


var $mili;

function checkCollision(){
    setTimeout(function () { 
        $relativeY = $(".ball").offset().top;
        if($relativeY > ($height)){
            $gameOver = true;
        } else {
            $gameOver = false;
        }
        if($gameOver == false){
            checkCollision();
            saveHighScore();
            getHighScore();
            ballColor();
        } else {
            if(!$loopRan){
                $mili = 800;
                var $delayTime = 10;
                i = 1;
                $("#notap").show();
                //fade($('.score'),false,400,400);
                $("#restart").show();
                $adcount++;
                
                $('.score').animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 400, function() {
                    $(this).delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 550, function() {
                         
                    });
                    
                    document.getElementById('score').innerHTML = 0;    
                    setTimeout(scoreAnimation,50);
                    
                    $("#gameover").show();
                    $("#gameover").delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 550);
                    $("#restartimg").show();
                    $("#restartholder").delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 550);
                    $("#restartimg").animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 550);
                    $('#highscore').delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 400);
                    $("#leaderboard_button").show();
                    $("#leaderboard_button").delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 300);
                    $("#hint_button").show();
                    $("#hint_button").delay(300).animate({opacity: "100", leaveTransforms:true, useTranslate3d:true }, 300);
                    $('.ball').animate({opacity: "0", leaveTransforms:true, useTranslate3d:true }, 400); 
                });
                $elapsed = new Date() - $start;
                if (($elapsed >= 100000)&&($adcount>=3)) {
                   setTimeout(FullDelay, 400);
                   $start = new Date();
                   $delayTime = 500; 
                   $adcount = 0;   
                }
                
                ball.pause();
                setTimeout(startFader,$delayTime);
                setTimeout(bannerDelay, 400);
                
                setTimeout(noTap, $mili);
                ball.start(moveDown);
                ball.start(moveBack);
                $loopRan = true;
            }
        }
    }, 200)
}










