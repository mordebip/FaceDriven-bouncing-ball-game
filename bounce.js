        var mCanvas, cotx;
        var sx = 1,
            sy = 1,
            tx = 250,
            ty = 250,
            angle = 0;
        var ball = {
            x: 100,
            y: 100,
            r: 21,
            colr: "black",
            vx: 0,
            vy: 1,
        }
        var coefX;
        var coefY;
        var score = 0;
        var best = 0;
        var bulubulu = {
            sx: 0.5,
            sy: 0.5,
            tx: 250,
            rx: 250,
            angle: 0
        };
var spritesheet;
        window.onload = function init() {
            mCanvas = document.querySelector("#myCanvas");
            cotx = mCanvas.getContext("2d");
            document.addEventListener("keydown", traiteKeyDown);
            document.addEventListener("keyup", traiteKeyUp);
            document.addEventListener("mousedown", traiteMouseDown);
            document.addEventListener("mouseup", traiteMouseUp);
            document.addEventListener("mousemove", traiteMouseMove);
            // load the spritesheet
            spritesheet = new Image();
            spritesheet.src = "pokeballs_sprite.png";
            spritesheet.onload = function () {
                var SPRITE_WIDTH = 64;
                var SPRITE_HEIGHT = 64;
                var NB_DIRECTIONS = 1;
                var NB_FRAMES_PER_POSTURE = 48;
                initSpritesBall(spritesheet, SPRITE_WIDTH, SPRITE_HEIGHT,
                    NB_DIRECTIONS, NB_FRAMES_PER_POSTURE)
                requestAnimationFrame(mainLoop);
            };
            Animer();
            App.init();
            console.log("init");
        };
        function traiteKeyDown(evt) {
            console.log("keydown " + evt.keyCode);
            if (evt.keyCode == 40)
                bulubulu.ty += 5;
            else if (evt.keyCode == 37)
                bulubulu.tx -= 5;
            else if (evt.keyCode == 39)
                bulubulu.tx += 5;
            else if (evt.keyCode == 38)
                bulubulu.ty -= 5;
        }
        function traiteKeyUp(evt) {
            console.log("keyUp");
        }
        function traiteMouseDown(evt) {
            var rect = mCanvas.getBoundingClientRect();
            console.log("mousedown x: " + evt.clientX + "y : " + evt.clientY);
            console.log(mCanvas.getBoundingClientRect());
            bulubulu.angle += 45;
            ball.x = rect.top + evt.clientX;
            ball.y = rect.left + evt.clientY;
        }
        function traiteMouseUp(evt) {
            console.log("mouseup");
        }
        function traiteMouseMove(evt) {
            var rect = mCanvas.getBoundingClientRect();
            //console.log("mousemove");
            //bulubulu.tx = rect.top + evt.clientX;
            //bulubulu.ty = rect.left + evt.clientY;
        }
        function Animer() {
            //takeSnapshot();
            cotx.clearRect(0, 0, mCanvas.width, mCanvas.height);
            var background = new Image();
            background.src = "background.jpg";
            cotx.drawImage(background, 0, 0);
            tx = bulubulu.tx;
            ty = bulubulu.ty;
            /* Mouvement progressif
                if(bulubulu.tx-tx > 6 || bulubulu.tx - tx < -6)
                    if(bulubulu.tx> tx)
                        tx+=12;
                    else if(bulubulu.tx< tx)
                        tx-=12;
                if(bulubulu.ty-ty > 6 || bulubulu.ty - ty < -6)
                    if(bulubulu.ty> ty) 
                        ty+=12;
                    else if(bulubulu.ty< ty)
                        ty-=12;
                */
            if (bulubulu.angle > angle)
                angle++;
            else if (bulubulu.angle < angle)
                angle--;
            Ball();
            Clown(sx, sy, tx, ty, angle);
            cotx.fillStyle = "Black";
            cotx.strokeStyle = "white";
            cotx.lineWidth = 2;
            cotx.font = "bold 30px Arial";
            cotx.fillText("Score : " + score, 10, 30);
            cotx.strokeText("Score : " + score, 10, 30);
            if (best > 0) {
                cotx.fillStyle = "Red";
                cotx.strokeStyle = "White";
                cotx.lineWidth = 2;
                cotx.font = "bold 30px Arial";
                cotx.fillText("Best : " + best, 200, 30);
                cotx.strokeText("Best : " + best, 200, 30);
            }
            requestAnimationFrame(Animer);
        }
         // t => translation.
         // angle => obvious.
         // s => scale (Hard coded because of a strange behaviour)
        function Clown(sx, sy, tx, ty, angle) {
            cotx.save();
            cotx.beginPath();
            cotx.translate(tx, ty);
            cotx.rotate(angle * Math.PI / 180);
            cotx.scale(0.6, 0.6);
            Chevelure(0, 0);
            DrawCircle(0, 0, 100, "lightblue");
            Bouche(0, 40, 30);
            Nez(4, 0);
            Yeux(0, -30, 20);
            Pupille(0, -30, 3);
            cotx.restore();
        }
        function Chevelure(x, y) {
            Cheveux((170 - 250) + x, (172 - 250) + y, 10);
            Cheveux((175 - 250) + x, (165 - 250) + y, 10);
            Cheveux((185 - 250) + x, (160 - 250) + y, 10);
            Cheveux((190 - 250) + x, (155 - 250) + y, 10);
            Cheveux((195 - 250) + x, (150 - 250) + y, 10);
            Cheveux((203 - 250) + x, (146 - 250) + y, 10);
            Cheveux((210 - 250) + x, (143 - 250) + y, 10);
        }
        function DrawCircle(x, y, s) {
            cotx.save();
            cotx.arc(x, y, s, 2 * Math.PI, 0, true);
            cotx.lineWidth = 10;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = "lightblue";
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function DrawCircle(x, y, s, bColor) {
            cotx.save();
            cotx.arc(x, y, s, 2 * Math.PI, 0, true);
            cotx.lineWidth = 10;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = bColor;
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function Bouche(x, y, s) {
            cotx.save();
            cotx.arc(x, y, s, Math.PI, 0, true);
            cotx.closePath();
            cotx.lineWidth = 10;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = "white";
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function Nez(x, y) {
            cotx.save();
            cotx.translate(x, y);
            cotx.bezierCurveTo(240 - 250 + x, 240 - 250 + y, 250 - 250 + x, 250 - 250 + y, 240 - 250 + x, 260 - 250 + y);
            cotx.bezierCurveTo(260 - 250 + x, 260 - 250 + y, 250 - 250 + x, 250 - 250 + y, 250 - 250 + x, 250 - 250 + y);
            cotx.bezierCurveTo(250 - 250 + x, 250 - 250 + y, 250 - 250 + x, 250 - 250 + y, 250 - 250 + x, 250 - 250 + y);
            //cotx.arc(x, y, s, Math.PI,0, true);
            cotx.closePath();
            cotx.lineWidth = 5;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = "red";
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function Yeux(x, y, s) {
            cotx.save();
            cotx.arc(x + 37, y, s, 2 * Math.PI, 0, true);
            cotx.lineWidth = 10;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = "white";
            cotx.fill();
            cotx.beginPath();
            cotx.arc(x - 37, y, s, 2 * Math.PI, 0, true);
            cotx.lineWidth = 10;
            cotx.strokeStyle = "black";
            cotx.shadowColor = "black";
            cotx.shadowBlur = 7;
            cotx.shadowOffsetX = 0;
            cotx.shadowOffsetY = 0;
            cotx.stroke();
            cotx.fillStyle = "white";
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function Pupille(x, y, s) {
            cotx.save();
            cotx.arc(x + 37, y, s, 2 * Math.PI, 0, true);
            cotx.fillStyle = "black";
            cotx.fill();
            cotx.beginPath();
            cotx.arc(x - 37, y, s, 2 * Math.PI, 0, true);
            cotx.arc(x - 37, y, s, 0, Math.PI, true);
            cotx.fillStyle = "black";
            cotx.fill();
            cotx.beginPath();
            cotx.restore();
        }
        function Cheveux(x, y, s) {
            cotx.save();
            cotx.arc(x, y, s, 5 * Math.PI / 3, Math.PI / 2, false);
            cotx.lineWidth = 1;
            cotx.strokeStyle = "black";
            cotx.stroke();
            cotx.beginPath();
            cotx.restore();
        }
         //Webcam
        var App = {
            start: function (stream) {
                App.video.addEventListener('canplay', function () {
                    App.video.removeEventListener('canplay');
                    setTimeout(function () {
                        App.video.play();
                        App.canvas.style.display = 'inline';
                        //App.info.style.display = 'none';
                        App.canvas.width = App.video.videoWidth;
                        App.canvas.height = App.video.videoHeight;
                        App.backCanvas.width = App.video.videoWidth / 2;
                        App.backCanvas.height = App.video.videoHeight / 2;
                        App.backContext = App.backCanvas.getContext('2d');
                        //App.context.translate(mCanvas.width * 1.5, 0);
                        //App.context.scale(-0.5, 0.5);
                        coefX = mCanvas.width / App.backCanvas.width;
                        coefY = mCanvas.height / (App.backCanvas.height * 4);
                        var w = 300 / 4 * 0.8,
                            h = 270 / 4 * 0.8;
                        App.comp = [{
                            x: (App.video.videoWidth / 4 - w) / 2,
                            y: (App.video.videoHeight / 4 - h) / 2,
                            width: w,
                            height: h,
                        }];
                        App.drawToCanvas();
                    }, 200);
                }, true);
                var domURL = window.URL || window.webkitURL;
                App.video.src = domURL ? domURL.createObjectURL(stream) : stream;
            },
            denied: function () {
                //App.info.innerHTML = 'Camera access denied!<br>Please reload and try again.';
            },
            error: function (e) {
                if (e) {
                    console.error(e);
                }
                //App.info.innerHTML = 'Please go to about:flags in Google Chrome and enable the &quot;MediaStream&quot; flag.';
            },
            drawToCanvas: function () {
                requestAnimationFrame(App.drawToCanvas);
                var video = App.video,
                    ctx = App.context,
                    backCtx = App.backContext,
                    m = 4,
                    w = 4,
                    i,
                    comp;
                ctx.drawImage(video, 0, 0, App.canvas.width, App.canvas.height);
                backCtx.drawImage(video, 0, 0, App.backCanvas.width, App.backCanvas.height);
                comp = ccv.detect_objects(App.ccv = App.ccv || {
                    canvas: App.backCanvas,
                    cascade: cascade,
                    interval: 2,
                    min_neighbors: 1
                });
                if (comp.length) {
                    console.log("coord x: " + comp[0].x + " y: " + comp[0].y);
                    bulubulu.tx = mCanvas.width - (comp[0].x * coefX) - 10;
                    bulubulu.ty = comp[0].y * coefY + 3 * (mCanvas.height / 4);
                } else
                    console.log("No face detected");
                //for (i = App.comp.length; i--; ) {
                //	ctx.drawImage(App.glasses, (App.comp[i].x - w / 2) * m, (App.comp[i].y - w / 2) * m, (App.comp[i].width + w) * m, (App.comp[i].height + w) * m);
                //}
            }
        };
         //App.glasses = new Image();
         //App.glasses.src = 'glasses.png';
        App.init = function () {
            App.video = document.createElement('video');
            App.backCanvas = document.createElement('canvas');
            App.canvas = document.querySelector('#output');
            App.canvas.style.display = 'none';
            App.context = App.canvas.getContext('2d');
            App.info = document.querySelector('#info');
            navigator.getUserMedia_ = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            try {
                navigator.getUserMedia_({
                    video: true,
                    audio: false
                }, App.start, App.denied);
            } catch (e) {
                try {
                    navigator.getUserMedia_('video', App.start, App.denied);
                } catch (e) {
                    App.error(e);
                }
            }
            App.video.loop = App.video.muted = true;
            App.video.load();
        };
         //collisions
         // Collisions between circle and circle
        function circlCirclOverlap(px, py, pr, cx, cy, cr) {
            var dx = (px + pr) - (cx + cr);
            var dy = (py + pr) - (cy + cr);
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < pr + cr) {
                console.log("Collision");
                colr = "red";
                return true;
            } else {
                colr = "black";
                return false;
            }
        }
         // Ball bounce
        function Ball() {
            cotx.save();
            cotx.beginPath();
            Bounce()
            DrawCircle(ball.x - ball.r / 2, ball.y - ball.r / 2, ball.r, ball.colr);
            cotx.restore();
        }
        function Bounce() {
            ball.y += ball.vy;
            ball.x += ball.vx;
            ball.vy += 0.9;
            //headbounce
            if (circlCirclOverlap(tx-50, ty, 90, ball.x, ball.y, ball.r+10)) {
                ball.y = ty - 60 - ball.r;
                ball.vy *= -0.95;
                ball.vx = (ball.x - tx) / 4;
                score++;
                //ballVx *= -0.9;
            }
            //Floor bounce
            if (ball.y + ball.r > mCanvas.height) {
                ball.y = mCanvas.height - ball.r;
                ball.vy *= -0.9;
                ball.vx *= 0.9;
                best = score > best ? score : best;
                score = 0;
            }
            //Top bounce
            if (ball.y + ball.r < 0) {
                ball.y = 0 - ball.r;
                ball.vy *= -0.95;
                ball.vx *= 0.9;
            }
            //Right wall bounce
            if (ball.x + ball.r > mCanvas.width) {
                ball.x = mCanvas.width - ball.r;
                ball.vx *= -1;
            }
            //Left wall bounce
            if (ball.x - ball.r < 0) {
                ball.x = 0 + ball.r;
                ball.vx *= -1;
            }
        }
         //sprite
        var spriteBall;
        
        function mainLoop(timestamp) {
            //cotx.clearRect(0, 0, mCanvas.width, mCanvas.height);
            //scale = 1 + 2 * (y / canvas.height);
            spriteBall.renderMoving(ball.x-2*ball.r, ball.y-2*ball.r);
            // recall mainLoop every 1/60th of second
            requestAnimationFrame(mainLoop);
        }
        function SpriteImage(img, x, y, width, height) {
            this.img = img;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            // xPos et yPos = position où dessiner le sprite,
            // scale = s'il faut rescaler.
            this.render = function (xPos, yPos) {
                cotx.drawImage(this.img, this.x, this.y, this.width, this.height, xPos, yPos,this.width, this.height);
            };
        }
        function Sprite(spritesheet, x, y, width, height, nbImages, nbFramesOfAnimationBetweenRedraws) {
            this.spriteImages = [];
            this.currentFrame = 0;
            this.nbFrames = nbImages;
            this.nbTicksBetweenRedraws = nbFramesOfAnimationBetweenRedraws;
            this.nbCurrentTicks = 0;
            // on parcour la ligne de l'image où se trouve les imagettes
            // d'animation
            var currentColonne = 0;
            for (var i = 0; i < nbImages; i++) {
                console.log(i);
                // we extract the subimage
                var xStartOfImgInSpriteSheet = x + currentColonne * width;
                if ((xStartOfImgInSpriteSheet + width) > spritesheet.width) {
                    // we reached end of line of the sprite sheet, let's go
                    // to the next line
                    y += height;
                    currentColonne = 0;
                    i--;
                    console.log("passage à la ligne");
                } else {
                    currentColonne++;
                    console.log("j'extrait img en (" + xStartOfImgInSpriteSheet + ", " + y + ")");
                    this.spriteImages[i] = new SpriteImage(spritesheet,
                        xStartOfImgInSpriteSheet, y,
                        width, height);
                }
            }
            this.renderMoving = function (x, y) {
                // renders animated sprite, changed every nbTicksBetweenRedraws
                // the frame number
                // draw the sprite with the current image
                this.spriteImages[this.currentFrame].render(x, y);
                // increment the number of ticks of animation 
                this.nbCurrentTicks++;
                if (this.nbCurrentTicks > this.nbTicksBetweenRedraws) {
                    // enough time elapsed, let's go to the next image
                    this.currentFrame++;
                    if (this.currentFrame == this.nbFrames) {
                        this.currentFrame = 0;
                    }
                    this.nbCurrentTicks = 0;
                }
            };
            this.render = function (x, y) {
                // draws always frame 0, static position
                this.spriteImages[0].render(x, y, scale);
            };
        }
        function initSpritesBall(img, spriteWidth, spriteHeight, nbLinesOfSprites,
            nbSpritesPerLine) {
            // on parcour l'image et pour chaque ligne (correspondant à une direction)
            // on extrait un sprite
            var sprite = new Sprite(img, 0, 0,
                spriteWidth, spriteHeight,
                nbSpritesPerLine,
                1); // draw every 1s
            spriteBall = sprite;
        }