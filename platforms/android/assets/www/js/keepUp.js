
        var $score = 0;
        var $ballX = 0;
        var $gameOver;
        var $height;
        var $width;
        var $adcount = 0;
        var $loopRan = false;
        var c;
        function simulate(){
            $elem = $('#ball');
            $mX = event.clientX;
            $angle = ($elem.offset().left+($elem.width()/2)) - c;
            $height = window.innerHeight;
            $width = window.innerWidth;
            var foo = new ui.Simulate({
                values: {
                    y: {
                        velocity: -1000,
                        //max: $height/2 -25 - ($elem.width()/2),
                        acceleration: 1800,
                        bounce: .8       
                    },
                    x: {
                        velocity: $angle*50, //angle,
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



        
            var ball = new ui.Actor('.ball');
            ballColor();
            var $scoreelement = $('.scorediv');
            getHighScore();
            var moveUp = new ui.Tween({
                values: {
                    y: -250,
                },
                duration: 1000
            });
            ball.start(moveUp);
            $scoreelement.fadeIn();
            var width =  100; 

            document.getElementById('score').innerHTML = $score;

            

			
			var trackPointer = new ui.Track({
    			values: {
        			x: {},
        			y: {}
    			}
			});
            
            

            var moveBack = new ui.Tween({
                values: {
                    x: 0,
                },
                duration: 1000
            });


			$('body').on('mousedown touchstart', '#restart', function (e) {
                e.preventDefault();
                $("#gameover").fadeOut();
                $("#restart").fadeOut();
                $("#highscore").fadeOut();
                ball.pause();
                ballColor();
                ball.start(moveBack);
                ball.start(moveUp);
                $gameOver = false;
                
                $score = 0;
                $loopRan = false;
                document.getElementById('score').innerHTML = $score;
            });

			$('body').on('mousedown touchstart', '.ball', function (e) {
    			e.preventDefault();
                checkCollision();
                if($gameOver==false){
    			     //ball.start(trackPointer, e);
                     pointerCoord();
                     ball.start(simulate());
                     $score++;
                     document.getElementById('score').innerHTML = $score;

                } 
    		});

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

        function pointerCoord() {
            //This method can get coordinates for both a mouse click
            //or a touch depending on the given event
            c = 0;
                
                  var touches = event.touches && event.touches.length ? event.touches : [event];
                  var e = (event.changedTouches && event.changedTouches[0]) || touches[0];
                  if (e) {
                    c = e.clientX || e.pageX || 0;
                  }
              
        }

        function fadeRestart(){
            var $element = $('#restartimg');
            setInterval(function () {
                if($gameOver){
                    $element.fadeOut(500).delay(500);
                    $element.fadeIn(1000).fadeOut(1000);
                } 
            }, 500);
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
                var highscore = window.localStorage['highscore'];
            } else {
                window.localStorage['highscore'] = $score;
                var highscore = 0;
            }
            document.getElementById('highscore').innerHTML = 'HIGHSCORE: '+ highscore;
        }



        function ballColor(){
            var color; 
            var highscore = window.localStorage['highscore'];
            if(highscore>=1000){
                color = 'black';
            } else if(highscore>=750) {
                color = 'brown';
            }else if(highscore>=500) {
                color = 'purple';
            }else if(highscore>=250) {
                color = 'blue';
            }else if(highscore>=150) {
                color = '#ADD8E6';
            }else if(highscore>=100) {
                color = 'green';
            }else if(highscore>=50) {
                color = 'yellow';
            }else if(highscore>=25) {
                color = 'orange';
            }else {
                color = 'red';
            }
            
            $(".ball").css({background: color});
        }


        function checkCollision(){
            var $elem = $(".ball");

            setTimeout(function () { 

                var $relativeY = $(".ball").offset().top;
                if($relativeY > ($height)-50){
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
                        $adcount++;
                        if ($adcount == 3){
                            showFullAd();
                            $adcount = 0;
                        }

                        $("#gameover").delay(300).fadeIn(550);
                        $("#restart").fadeIn();
                        $("#highscore").fadeIn();
                        fadeRestart();

                        $loopRan = true;
                    }
                }
            }, 200)
        }





