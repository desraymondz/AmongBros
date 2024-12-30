// Variable declaration: Introducing all the variable name that we will use
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var mountains;
var trees_x;
var clouds;
var collectables;
var canyons;
var stars = [];
var cameraPos_x;
var flagPole;
var livesCounter;
var lives;
var healthKits;
var winTextPos_y;
var sound;
var backgroundMusic;
var jumpSound;
var fallSound;
var winSound;
var loseSound;
var collectSound;
var drinkSound;
var hasWinSoundPlayed;
var hasFallSoundPlayed;
var hasLoseSoundPlayed;
var rockets = [];
var rocketHitted;
var platformsProperties;
var platforms = [];
var sparklers = [];

// to finished load all sound files before anything else
var soundFileLoadingCounter = 0;
var totalSoundFile = 7;

function preload() {
    soundFormats("mp3", "wav");

    backgroundMusic = loadSound("assets/backgroundMusic.mp3", loadSoundFile); // source: https://youtu.be/K8E_zMLCRNg
    backgroundMusic.setVolume(0.05);

    jumpSound = loadSound("assets/jump.mp3", loadSoundFile); // source: https://freesound.org/search/?q=350901
    jumpSound.setVolume(0.5);

    fallSound = loadSound("assets/fall.mp3", loadSoundFile); // source: https://mixkit.co/free-sound-effects/falling/
    fallSound.setVolume(0.1);

    winSound = loadSound("assets/win.mp3", loadSoundFile); // source: https://youtu.be/rr5CMS2GtCY
    winSound.setVolume(0.1);

    loseSound = loadSound("assets/lose.mp3", loadSoundFile); // source: https://www.youtube.com/watch?v=o7OgJWmxV3k
    loseSound.setVolume(0.1);

    collectSound = loadSound("assets/collect.mp3", loadSoundFile); // source: https://freesound.org/people/Xiko__/sounds/711128/
    collectSound.setVolume(0.1);

    drinkSound = loadSound("assets/drink.mp3", loadSoundFile); // source: https://pixabay.com/sound-effects/heavy-swallowwav-14682/
    drinkSound.setVolume(1);
}

function loadSoundFile() {
    // increment after a sound file finished loads
    soundFileLoadingCounter ++;
}

function setup() {
    createCanvas(1024, 576);

    // looping background music (cricket sound)
    backgroundMusic.loop();

    // Variable initialization: assigning value to the variable
    floorPos_y = height * 3 / 4;
    livesCounter = 3;
    gameScore = 0;

    mountains = [
        {pos_x: -500, pos_y: 350, width: 300, height: 300},
        {pos_x: -300, pos_y: 350, width: 250, height: 200},
        {pos_x: 0, pos_y: 350, width: 400, height: 300},
        {pos_x: -100, pos_y: 350, width: 300, height: 200},
        {pos_x: 1000, pos_y: 350, width: 300, height: 200},
        {pos_x: 2000, pos_y: 350, width: 500, height: 400},
        {pos_x: 2500, pos_y: 350, width: 300, height: 300},
        {pos_x: 2800, pos_y: 350, width: 250, height: 200},
        {pos_x: 3000, pos_y: 350, width: 400, height: 300},
        {pos_x: 3100, pos_y: 350, width: 300, height: 200},
        {pos_x: 3500, pos_y: 350, width: 300, height: 200},
    ];

    collectables = [
        {pos_x: 600, pos_y: floorPos_y - 29, size: 8, isCollectableFound: false},
        {pos_x: 925, pos_y: floorPos_y - 70, size: 15, isCollectableFound: false},
        {pos_x: 1150, pos_y: floorPos_y - 59, size: 8, isCollectableFound: false},
        {pos_x: 1450, pos_y: floorPos_y - 29, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 329, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 280, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 220, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 170, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 120, size: 8, isCollectableFound: false},
        {pos_x: 1550, pos_y: floorPos_y - 70, size: 8, isCollectableFound: false},
        {pos_x: 1700, pos_y: floorPos_y - 250, size: 8, isCollectableFound: false},
        {pos_x: 2700, pos_y: floorPos_y - 29, size: 8, isCollectableFound: false},
        {pos_x: 3050, pos_y: floorPos_y - 70, size: 8, isCollectableFound: false},
        {pos_x: 3120, pos_y: floorPos_y - 250, size: 8, isCollectableFound: false},
        {pos_x: 3197, pos_y: floorPos_y - 120, size: 8, isCollectableFound: false},
        {pos_x: 3347, pos_y: floorPos_y - 170, size: 8, isCollectableFound: false},
    ];

    healthKits = [
        {pos_x: 1300, pos_y: floorPos_y - 229, livesAdded: 1, isHealthKitFound: false},
        {pos_x: 10, pos_y: floorPos_y - 55, livesAdded: 1, isHealthKitFound: false},
        {pos_x: 2500, pos_y: floorPos_y - 29, livesAdded: 1, isHealthKitFound: false},
    ];

    // stars background
    for (var i = 0; i < 2000 ; i++){
        const star = {
            x : random(-width * 2, 2 * width),
            y : random(-height * 2, 2 * height),
            width : random(2, 3)
        };
        stars.push(star);
    }

    // start game
    startGame();

    // falling rockets (enemies)
    for (var i = 0; i < 6; i++) {
        rockets.push(new RocketFall(width + random(0,1800), random(3,10), random(20,30)));
    }

    // platforms properties
    for (var i = 0; i < platformsProperties.length; i++) {
        platforms.push(new createPlatforms(platformsProperties[i].x, platformsProperties[i].level, platformsProperties[i].length));
    }

    // sparklers when game wins
    sparklers.push(new Sparkler(width / 5, 500, 5 , 10, 6, 100));
    sparklers.push(new Sparkler(width * 4 / 5, 500, 5 , 10, 6, 100));
}

function draw() {
    if (soundFileLoadingCounter != totalSoundFile) { // only runs the game after all sound files are loaded
        return;
    }

    ///////////DRAWING CODE//////////

    // Scrolling effect: set the camera fixed to the game character position
    cameraPos_x = gameChar_x - width / 2;

    // BACKGROUND COLOR
    background(8, 6, 9);

    // DRAW STARS
    drawStars();

    push();
    translate(-cameraPos_x, 0); // To translate or move the scenes while the game character is moving

    // DRAW MOUNTAINS
    drawMountains();

    // DRAW TREES
    drawTrees();

    // DRAW ROCKETS
    for (var i = 0; i < rockets.length; i++){
        if (gameChar_x > rockets[i].x - width){ // draw the rocket only if gameChar is near
            rockets[i].drawFallingRocket();
        }
    }
    pop();

    // DRAW GREEN GROUND
    fill(0, 105, 0);
    noStroke();
    rect(0, floorPos_y, width, height - floorPos_y); 

    push();
    translate(-cameraPos_x, 0); // To translate or move the scenes while the game character is moving

    // DRAW CLOUDS
    drawClouds();
    loopClouds();

    // DRAW CANYON
    for (var i = 0; i < canyons.length; i++){
        drawCanyon(canyons[i]);
    }
    checkIfGameCharIsInAnyCanyonRange();

    // DRAW COLLECTABLES
    drawCollectables();

    // DRAW HEALTH KITS
    drawHealthKits();

    // DRAW FLAGPOLE
    drawFlag();
    checkIfGameCharReachedFlagPole(); // to check if game char reached flag pole
    raiseFlag();

    // DRAW PLATFORM
    for (var i = 0; i < platforms.length; i++){
        platforms[i].drawPlatform();
    }

    // DRAW GAME CHARACTER
    drawGameChar();

    // DRAW GUIDE or HINTS TEXT
    guideTexts();
    pop();

    // DRAW LIVES BAR
    drawLives();

    // DRAW WIN SCREEN
    checkGameCharDies();
    winChecker();

    // DRAW SCORE COUNTER
    strokeWeight(1.5);
    fill(255);
    text("Score: " + gameScore, 20, 60);

    // DRAW GAME OVER SCREEN & DISABLE GAME CHAR MOVEMENT
    if (livesCounter == 0) {
        gameOverScreen();
        if (!hasLoseSoundPlayed) {
            loseSound.play();
            hasLoseSoundPlayed = true;
        }
        return;
    }

    ///////////INTERACTION CODE///////////

    if (!flagPole.isReached) {
        if(isLeft == true) { // walk left
            gameChar_x -= 5;
        }
        if(isRight == true) { // walk right
            gameChar_x += 5;
        }
    }

    if(isPlummeting == true) { // pulls game char down
        gameChar_y += 10;
        isLeft = false;
        isRight = false;
        if(!hasFallSoundPlayed) {
            fallSound.play();
            hasFallSoundPlayed = true;
        }
    }

    if (gameChar_y < floorPos_y && !checkGameCharOnAnyPlatform()){
        gameChar_y += 1; // gravity
        isFalling = true;
    } else {
        isFalling = false;
    }
}

function keyPressed() {
    // stop game char movement when game over or level completed
    if (livesCounter == 0 || flagPole.isReached){
        if (keyCode == 32) { // 32 keycode = space bar
            startGame();
            livesCounter = 3;
            gameScore = 0;

            // reset the Collectables when game start
            for (var i = 0; i < collectables.length; i++) {
                collectables[i].isCollectableFound = false;
            }
            // reset the Health Kits when game start
            for (var i = 0; i < healthKits.length; i++) {
                healthKits[i].isHealthKitFound = false;
            }
        }
        return;
    }

    /* movement game character when key pressed
	37 keycode = left arrow
	38 keycode = up arrow
	39 keycode = right arrow */
    if (!isPlummeting) {
        if (keyCode == 37) {
            isLeft = true;
        } else if (keyCode == 39) {
            isRight = true;
        } else if (keyCode == 38 && checkGameCharOnAnyPlatform()){
            gameChar_y -= 70; // jump
            jumpSound.play();
        } else if (keyCode == 38 && gameChar_y == floorPos_y) { // prevent double jump
            gameChar_y -= 70; // jump
            jumpSound.play();
        }
    }
}

function keyReleased() {
    // disables movement for game character after key released
    if (keyCode == 37) {
        isLeft = false;
    } else if (keyCode == 39) {
        isRight = false;
    }
}

// Draw scenery function
function drawStars() {
    push();
    translate(width / 2, height * 2)
    angleMode(DEGREES);
    rotate(gameChar_x / 200); // rotate the stars when Game Char move right or left
    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        fill(255, 255, 255);
        ellipse(star.x, star.y, star.width);
    }
    pop();
}

function drawMountains(t_mountain) {
    for(var i = 0; i < mountains.length; i++) {
        // Mountain body
        fill(150);
        triangle(mountains[i].pos_x + (-mountains[i].width / 2), floorPos_y, mountains[i].pos_x, floorPos_y - mountains[i].height, mountains[i].pos_x + mountains[i].width / 2, floorPos_y);

        // Snow
        var mountainSnowBase_x = 0.3 * mountains[i].width / 2;
        var mountainSnowBase_y = 0.3 * mountains[i].height + floorPos_y - mountains[i].pos_y - mountains[i].height;
        fill(255);
        beginShape();
        vertex(mountains[i].pos_x, floorPos_y - mountains[i].height); // peak
        vertex(mountains[i].pos_x - mountainSnowBase_x, mountains[i].pos_y + mountainSnowBase_y);
        vertex(mountains[i].pos_x - mountainSnowBase_x + mountainSnowBase_x / 3, mountains[i].pos_y + mountainSnowBase_y - 10);
        vertex(mountains[i].pos_x - mountainSnowBase_x + 2 * mountainSnowBase_x / 3, mountains[i].pos_y + mountainSnowBase_y - 0);
        vertex(mountains[i].pos_x, mountains[i].pos_y + mountainSnowBase_y - 15);
        vertex(mountains[i].pos_x - mountainSnowBase_x + 4 * mountainSnowBase_x / 3, mountains[i].pos_y + mountainSnowBase_y - 0);
        vertex(mountains[i].pos_x - mountainSnowBase_x + 5 * mountainSnowBase_x / 3, mountains[i].pos_y + mountainSnowBase_y - 10);
        vertex(mountains[i].pos_x + mountainSnowBase_x, mountains[i].pos_y + mountainSnowBase_y);
        endShape();
    }
}

function drawTrees(t_tree) {
    for(var i = 0; i < trees_x.length; i++) {
        // trunk
        fill(139, 69, 19);
        rect(trees_x[i] - 15, floorPos_y - 60, 30, 60);

        beginShape();
        vertex(trees_x[i] - 6, floorPos_y - 15);
        vertex(trees_x[i] - 6 * -5, floorPos_y - 50);
        vertex(trees_x[i] - 6 * -7.5, floorPos_y - 50);
        vertex(trees_x[i] + 6, floorPos_y - 110);
        endShape();

        // big leaf
        var treeLeavesPos_y = floorPos_y - 85;
        fill(0, 200, 0);
        ellipse(trees_x[i] - 40, treeLeavesPos_y, 50);
        ellipse(trees_x[i] - 10, treeLeavesPos_y - 10, 70);
        ellipse(trees_x[i] + 0.25 * 60, treeLeavesPos_y - 5, 60);
        ellipse(trees_x[i] + 0.75 * 60, treeLeavesPos_y + 5, 40);
        rect(trees_x[i] - 40, treeLeavesPos_y + 15, 88, 10);

        // branch leaf
        fill(0, 170, 0);
        ellipse(trees_x[i] + 20, treeLeavesPos_y + 25, 50 * 0.7);
        ellipse(trees_x[i] + 50 * 0.8, treeLeavesPos_y + 20, 50 * 0.8);
        ellipse(trees_x[i] + 50 * 0.8, treeLeavesPos_y + 30, 50 * 0.8);
        ellipse(trees_x[i] + 60, treeLeavesPos_y + 25, 50 * 0.7);
    }
}

function drawClouds(t_cloud) {
    for(var i = 0; i < clouds.length; i++) {
        fill(255);
        ellipse(clouds[i].pos_x - 60, clouds[i].pos_y, clouds[i].radius);
        ellipse(clouds[i].pos_x - 30, clouds[i].pos_y - 10, clouds[i].radius + 20);
        ellipse(clouds[i].pos_x + 0.25 * clouds[i].radius + 10, clouds[i].pos_y - 5, clouds[i].radius + 10);
        ellipse(clouds[i].pos_x + 0.75 * clouds[i].radius + 10, clouds[i].pos_y + 5, clouds[i].radius - 10);
        clouds[i].pos_x += clouds[i].speed;
    }
}

function loopClouds() {
    for (var i = 0; i < clouds.length; i++) {
        // move back to the left side if the camera if the clouds go beyond the right side of the camera
        if (clouds[i].pos_x > cameraPos_x + width + 300) {
            clouds[i].pos_x = clouds[i].pos_x - width - 600;
        } else if (clouds[i].pos_x < cameraPos_x - 300) { // move forward to the right side if the camera if the clouds go beyond the left side of the camera
            clouds[i].pos_x = clouds[i].pos_x + width + 500;
        }
    }
}

function drawCanyon(t_canyon) {
    // Lava
    fill(255, 0, 0);
    var rightCanyonPos_X = t_canyon.pos_x + t_canyon.width;
    beginShape();
    vertex(t_canyon.pos_x, floorPos_y);
    vertex(t_canyon.pos_x + 20, height);
    vertex(rightCanyonPos_X - 20, height);
    vertex(rightCanyonPos_X, floorPos_y);
    endShape();

    // Canyon background
    fill(0, 0, 0);
    beginShape();
    vertex(t_canyon.pos_x, floorPos_y);
    vertex(20 * 0.7 + t_canyon.pos_x, floorPos_y + (height - floorPos_y) * 0.7);
    vertex(20 * 0.3 + rightCanyonPos_X - 20, floorPos_y + (height - floorPos_y) * 0.7);
    vertex(rightCanyonPos_X, floorPos_y);
    endShape();
}

function checkIfGameCharIsInAnyCanyonRange() {
    for (var i = 0; i < canyons.length; i++) {
        // Check if Game Character is in any of the Canyons range
        if (gameChar_y >= floorPos_y && gameChar_x - (25 / 2) > (canyons[i].pos_x) && gameChar_x + (25 / 2) < (canyons[i].pos_x + canyons[i].width)){ // will plummet if game character is within the canyon range
            isPlummeting = true;
        }
    }
}

function drawCollectables(t_collectables) {
    for(var i = 0; i < collectables.length; i++){
        if (collectables[i].isCollectableFound == false){
            fill(220, 20, 60);
            stroke(235, 92, 92);
            strokeWeight (2);

            // whole gem
            beginShape();
            vertex(collectables[i].pos_x, collectables[i].pos_y - collectables[i].size - collectables[i].size);
            vertex(collectables[i].pos_x - collectables[i].size * 2, collectables[i].pos_y - collectables[i].size);
            vertex(collectables[i].pos_x - collectables[i].size * 2, collectables[i].pos_y + collectables[i].size);
            vertex(collectables[i].pos_x, collectables[i].pos_y + 2 * collectables[i].size);
            vertex(collectables[i].pos_x + collectables[i].size * 2, collectables[i].pos_y + collectables[i].size);
            vertex(collectables[i].pos_x + collectables[i].size * 2, collectables[i].pos_y - collectables[i].size);
            endShape(CLOSE);

            // inner gem
            fill(139, 0, 0);
            beginShape();
            vertex(collectables[i].pos_x, collectables[i].pos_y - collectables[i].size);
            vertex(collectables[i].pos_x - collectables[i].size, collectables[i].pos_y - collectables[i].size / 2);
            vertex(collectables[i].pos_x - collectables[i].size, collectables[i].pos_y + collectables[i].size / 2);
            vertex(collectables[i].pos_x, collectables[i].pos_y + collectables[i].size);
            vertex(collectables[i].pos_x + collectables[i].size, collectables[i].pos_y + collectables[i].size / 2);
            vertex(collectables[i].pos_x + collectables[i].size, collectables[i].pos_y - collectables[i].size / 2);
            endShape(CLOSE);

            // whole and inner seperator
            line(collectables[i].pos_x, collectables[i].pos_y - collectables[i].size - collectables[i].size, collectables[i].pos_x, collectables[i].pos_y - collectables[i].size);
            line(collectables[i].pos_x - collectables[i].size * 2, collectables[i].pos_y - collectables[i].size, collectables[i].pos_x - collectables[i].size, collectables[i].pos_y - collectables[i].size / 2);
            line(collectables[i].pos_x - collectables[i].size * 2, collectables[i].pos_y + collectables[i].size, collectables[i].pos_x - collectables[i].size, collectables[i].pos_y + collectables[i].size / 2);
            line(collectables[i].pos_x, collectables[i].pos_y + 2 * collectables[i].size, collectables[i].pos_x, collectables[i].pos_y + collectables[i].size);
            line(collectables[i].pos_x + collectables[i].size * 2, collectables[i].pos_y + collectables[i].size, collectables[i].pos_x + collectables[i].size, collectables[i].pos_y + collectables[i].size / 2);
            line(collectables[i].pos_x + collectables[i].size * 2, collectables[i].pos_y - collectables[i].size, collectables[i].pos_x + collectables[i].size, collectables[i].pos_y - collectables[i].size / 2);

            // Collect distance increase when size increases
            if(dist(gameChar_x, gameChar_y, collectables[i].pos_x, collectables[i].pos_y) < (collectables[i].size * 3.8)) {
                collectables[i].isCollectableFound = true;
                gameScore = gameScore + 100; // add 100 everytime gameChar collects a collectable
                collectSound.play();
            }
        }
    }
}

function drawHealthKits() {
    for(var i = 0; i < healthKits.length; i++){
        if (healthKits[i].isHealthKitFound == false) {
            stroke(125);
            strokeWeight(1);
            // health kit body
            fill(250);
            rect(healthKits[i].pos_x - 16, healthKits[i].pos_y - 15, 32, 32);

            // handle
            fill(50);
            strokeWeight(0.5);
            rect(healthKits[i].pos_x - 12, healthKits[i].pos_y - 18, 24, 4);

            // cross sign
            strokeWeight(0);
            fill(240, 0, 0);
            rect(healthKits[i].pos_x - 12, healthKits[i].pos_y - 3, 24, 8);
            rect(healthKits[i].pos_x - 4, healthKits[i].pos_y - 11, 8, 24);

            // check if Game Char found the Health Kit, then add lives to lives counter
            if(dist(gameChar_x, gameChar_y - 40, healthKits[i].pos_x, healthKits[i].pos_y) < 40) {
                healthKits[i].isHealthKitFound = true;
                livesCounter = livesCounter + healthKits[i].livesAdded; // add 1 lives everytime gameChar collects a Health Kit
                drinkSound.play();
            }
        }
    }
}

function drawGameChar() {
    if(isLeft && isFalling) {
        // outer flame
        noStroke();
        fill(255, 140, 0);
        beginShape();
        vertex(gameChar_x + 12.5, gameChar_y - 20.5);
        vertex(gameChar_x + 11, gameChar_y - 23 + 41 * 0.5);
        vertex(gameChar_x + 11 + 6 * 0.5, gameChar_y - 23 + 38 * 0.5);
        vertex(gameChar_x + 11 + 9 * 0.5, gameChar_y - 23 + 48 * 0.5);
        vertex(gameChar_x + 11 + 12 * 0.5, gameChar_y - 23 + 38 * 0.5);
        vertex(gameChar_x + 11 + 18 * 0.5, gameChar_y - 23 + 41 * 0.5);
        vertex(gameChar_x + 11 + 15 * 0.5, gameChar_y - 25);
        endShape();

        // inner flame
        fill(255, 215, 0);
        beginShape();
        vertex(gameChar_x + 11 + 5 * 0.5, gameChar_y - 23 + -2.5 * 0.5);
        vertex(gameChar_x + 12, gameChar_y - 9);
        vertex(gameChar_x + 14, gameChar_y - 11);
        vertex(gameChar_x + 11 + 9 * 0.5, gameChar_y - 5);
        vertex(gameChar_x + 11 + 12 * 0.5, gameChar_y - 11);
        vertex(gameChar_x + 11 + 16 * 0.5, gameChar_y - 9);
        vertex(gameChar_x + 11 + 13 * 0.5, gameChar_y - 25);
        endShape();

        // jetpack
        strokeWeight(1.5);
        stroke(0);
        fill(218, 0, 0);
        rect(gameChar_x + 10, gameChar_y - 54, 10, 30, 50);

        // left leg
        push();
        translate(gameChar_x - 11, gameChar_y - 24); // set a new starting point for X and Y coordinate within push() and pop()
        angleMode(DEGREES); // change the trigonometric function from RADIANS to DEGREE Reference: https://p5js.org/reference/#/p5/angleMode and rotate it 
        rotate(35); // rotate with degree value Reference: https://p5js.org/reference/#/p5/rotate
        rect(0, 0, 9, 10, 3, 0, 3, 3);
        pop(); // revert back to the X and Y cordinate before the previous push()

        // right leg
        push();
        translate(gameChar_x + 2, gameChar_y - 19);
        angleMode(DEGREES);
        rotate(-35);
        rect(0, 0, 9, 10, 0, 3, 3, 3);
        pop();

        // body
        rect(gameChar_x - 17, gameChar_y - 64, 30, 45, 15, 10, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 22, gameChar_y - 54, 25, 14, 50);
    } else if(isRight && isFalling) {
        // outer flame
        noStroke();
        fill(255, 140, 0);
        beginShape();
        vertex(gameChar_x - 18.5, gameChar_y - 25.5);
        vertex(gameChar_x - 20, gameChar_y - 23 + 41 * 0.5);
        vertex(gameChar_x - 20 + 6 * 0.5, gameChar_y - 23 + 38 * 0.5);
        vertex(gameChar_x - 20 + 9 * 0.5, gameChar_y - 23 + 48 * 0.5);
        vertex(gameChar_x - 20 + 12 * 0.5, gameChar_y - 23 + 38 * 0.5);
        vertex(gameChar_x - 20 + 18 * 0.5, gameChar_y - 23 + 41 * 0.5);
        vertex(gameChar_x - 20 + 15 * 0.5, gameChar_y - 25);
        endShape();

        // inner flame
        fill(255, 215, 0);
        beginShape();
        vertex(gameChar_x - 20 + 5 * 0.5, gameChar_y - 23 + -2.5 * 0.5);
        vertex(gameChar_x - 19, gameChar_y - 9);
        vertex(gameChar_x - 17, gameChar_y - 11);
        vertex(gameChar_x - 20 + 9 * 0.5, gameChar_y - 5);
        vertex(gameChar_x - 20 + 12 * 0.5, gameChar_y - 11);
        vertex(gameChar_x - 20 + 16 * 0.5, gameChar_y - 9);
        vertex(gameChar_x - 20 + 13 * 0.5, gameChar_y - 25);
        endShape();

        // jetpack
        strokeWeight(1.5);
        stroke(0);
        fill(218, 0, 0);
        rect(gameChar_x - 20, gameChar_y - 54, 10, 30, 50);

        // left leg
        push();
        translate(gameChar_x - 8, gameChar_y - 24);
        angleMode(DEGREES);
        rotate(35);
        rect(0, 0, 9, 10, 3, 0, 3, 3);
        pop();

        // right leg
        push();
        translate(gameChar_x + 3, gameChar_y - 19);
        angleMode(DEGREES);
        rotate(-35);
        rect(0, 0, 9, 10, 0, 3, 3, 3);
        pop();

        // body
        rect(gameChar_x - 13, gameChar_y - 64, 30, 45, 10, 15, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 3, gameChar_y - 54, 25, 14, 50);
    } else if(isLeft){
        strokeWeight(1.5);
        stroke(0);
        fill(218, 0, 0);
        // left leg
        push();
        translate(gameChar_x - 11, gameChar_y - 10);
        angleMode(DEGREES);
        rotate(35);
        rect(0, 0, 9, 10, 3, 0, 3, 3);
        pop();

        // right leg
        push();
        translate(gameChar_x + 2, gameChar_y - 5);
        angleMode(DEGREES);
        rotate(-35);
        rect(0, 0, 9, 10, 0, 3, 3, 3);
        pop();

        // jetpack
        rect(gameChar_x + 10, gameChar_y - 40, 10, 30, 50);

        // body
        rect(gameChar_x - 17, gameChar_y - 50, 30, 45, 15, 10, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 22, gameChar_y - 40, 25, 14, 50);
    } else if(isRight) {
        strokeWeight(1.5);
        stroke(0);
        fill(218, 0, 0);
        // left leg
        push();
        translate(gameChar_x - 8, gameChar_y - 10);
        angleMode(DEGREES);
        rotate(35);
        rect(0, 0, 9, 10, 3, 0, 3, 3);
        pop();

        // right leg
        push();
        translate(gameChar_x + 3, gameChar_y - 5);
        angleMode(DEGREES);
        rotate(-35);
        rect(0, 0, 9, 10, 0, 3, 3, 3);
        pop();

        // jetpack without flame
        rect(gameChar_x - 20, gameChar_y - 40, 10, 30, 50);

        //body
        rect(gameChar_x - 13, gameChar_y - 50, 30, 45, 10, 15, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 3, gameChar_y - 40, 25, 14, 50)
    } else if(isFalling || isPlummeting) {
        // outer flame
        fill(255, 140, 0);
        noStroke();
        beginShape();
        vertex(gameChar_x - 6, gameChar_y - 19);
        vertex(gameChar_x - 9, gameChar_y - 6);
        vertex(gameChar_x - 3, gameChar_y - 9);
        vertex(gameChar_x, gameChar_y + 1);
        vertex(gameChar_x + 3, gameChar_y - 9);
        vertex(gameChar_x + 9, gameChar_y - 6);
        vertex(gameChar_x + 6, gameChar_y - 19);
        endShape();

        // inner flame
        fill(255, 215, 0);
        beginShape();
        vertex(gameChar_x - 4, gameChar_y - 19);
        vertex(gameChar_x - 6, gameChar_y - 10);
        vertex(gameChar_x - 2, gameChar_y - 12);
        vertex(gameChar_x, gameChar_y - 5);
        vertex(gameChar_x + 2, gameChar_y - 12);
        vertex(gameChar_x + 6, gameChar_y - 10);
        vertex(gameChar_x + 4, gameChar_y - 19);
        endShape();

        // left leg
        strokeWeight(1.5);
        stroke(0);
        fill(218, 0, 0);
        push();
        translate(gameChar_x - 9, gameChar_y - 24);
        angleMode(DEGREES);
        rotate(35);
        rect(0, 0, 9, 10, 3, 0, 3, 3);
        pop();

        // right leg
        push();
        translate(gameChar_x, gameChar_y - 19);
        angleMode(DEGREES);
        rotate(-35);
        rect(0, 0, 9, 10, 0, 3, 3, 3);
        pop();

        // body
        fill(218, 0, 0);
        rect(gameChar_x - 14, gameChar_y - 64, 28, 45, 10, 10, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 20, gameChar_y - 54, 40, 14, 50);
    } else {
        strokeWeight(1.5);
        stroke(0);
        // legs
        fill(218, 0, 0);
        rect(gameChar_x - 10, gameChar_y - 8, 9, 10, 3);
        rect(gameChar_x + 1, gameChar_y - 8, 9, 10, 3);

        // body
        rect(gameChar_x - 14, gameChar_y - 50, 28, 45, 10, 10, 5, 5);

        // eye
        fill(134, 203, 223);
        rect(gameChar_x - 20, gameChar_y - 40, 40, 14, 50);
    }
}

function drawFlag() {
    fill(200);
    stroke(0);
    strokeWeight(1);
    rect(flagPole.pos_x, floorPos_y - 300, 10, 300); // pole

    // pink flag
    push();
    translate(0, flagPole.flagPos_y);
    fill(255, 192, 203);
    rect(flagPole.pos_x, floorPos_y - 80, 10, 50);
    triangle(flagPole.pos_x + 10, floorPos_y - 80, flagPole.pos_x + 10, floorPos_y - 30, flagPole.pos_x + 10 + 80, floorPos_y - 55);
    noStroke();
    rect(flagPole.pos_x + 4, floorPos_y - 80 + 1, 8, 48.2); // to cover the stroke
    pop();

    fill(240, 240, 0);
    ellipse(flagPole.pos_x + 5.5, floorPos_y - 300, 16); // yellow top pole

    fill(200);
    rect(flagPole.pos_x - 20, floorPos_y - 30, 50, 20); // taller block
    rect(flagPole.pos_x - 35, floorPos_y - 20, 80, 20); // foundation block
}

function checkIfGameCharReachedFlagPole() {
    if (abs(gameChar_x - flagPole.pos_x) < 10) {
        flagPole.isReached = true;
        flagPole.isRaised = true;
    }
}

function raiseFlag() {
    if (flagPole.isRaised && flagPole.flagPos_y > -215) {
        flagPole.flagPos_y -= 3;
    }
}

function checkGameCharDies() {
    if ((livesCounter > 0 && gameChar_y > height + 400) || (livesCounter > 0 && rocketHitted)) {
        livesCounter --;
        if (livesCounter > 0) {
            startGame(); // if Game Char still have lives, it will respawn
        } else {
            gameOverScreen(); // if Game Char have no more lives, it will draw game over screen
        }
    }
}

function gameOverScreen() {
    fill(0, 0, 0, 180);
    rect(0, 0, width, height);
    push();
    fill(255, 0, 0);
    strokeWeight(4.5);
    stroke(0);
    textAlign(CENTER);
    textSize(100);
    text("GAME OVER!", width / 2, height * 0.45 );
    fill(255);
    noStroke(0);
    textSize(20)
    text('press "SPACE" to continue...', width / 2, floorPos_y + 40);
    pop();
}

function winChecker() {
    if (livesCounter > 0 && flagPole.flagPos_y < -215) { // when the flag is raised to the peak
        winScreen();
        if (!hasWinSoundPlayed){
            winSound.play();
            hasWinSoundPlayed = true;
        }
    }
}

function winScreen() {
    // DRAW SPARKLER
    for (var i = 0; i < sparklers.length; i++){
        sparklers[i].drawSparkler();
    }

    // pull "YOU WIN!" text down
    if (winTextPos_y < height * 0.45) {
        winTextPos_y += 4;
    } else {
        push();
        fill(0);
        textAlign(CENTER);
        noStroke(0);
        textSize(20);
        text('press "SPACE" to continue...', width / 2, floorPos_y + 40);
        pop();
    }

    // "YOU WIN!" text
    push();
    fill(255, 0, 0);
    strokeWeight(4.5);
    stroke(0);
    textAlign(CENTER);
    textSize(140);
    text("YOU WIN!", width / 2, winTextPos_y);
    pop();
}

function drawLives() {
    // draw lives (hearts)
    var livesPos_x = 30;
    var livesPos_y = 20;
    for (var i = 0; i < livesCounter; i++) {
        var heartsPos_x = livesPos_x + i * livesPos_x;
        fill(255, 0, 0);
        noStroke();
        ellipse(heartsPos_x - 6, livesPos_y, 15);
        ellipse(heartsPos_x + 6, livesPos_y, 15);
        triangle(
            heartsPos_x - 13.8, livesPos_y + 2,
            heartsPos_x, livesPos_y + 18,
            heartsPos_x + 13.8, livesPos_y + 2
        );
    }
}

function startGame() {
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    cameraPos_x = 0;
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    winTextPos_y = -20;
    hasWinSoundPlayed = false;
    hasFallSoundPlayed = false;
    hasLoseSoundPlayed = false;
    rocketHitted = false;
    platformsProperties = [
        {x: 1500, level: 1, length: 100}, 
        {x: 1500, level: 2, length: 100}, 
        {x: 1500, level: 3, length: 100}, 
        {x: 1500, level: 4, length: 100}, 
        {x: 1500, level: 5, length: 100}, 
        {x: 3000, level: 1, length: 100}, 
        {x: 3150, level: 2, length: 90}, 
        {x: 3300, level: 3, length: 90}, 
        {x: 3150, level: 4, length: 90}
    ];

    trees_x = [300, 700, 1420, 2800, 3750, 3900];

    clouds = [
        {pos_x: -100, pos_y: 100, radius: random(60, 80), speed: 1},
        {pos_x: -1000, pos_y: 200, radius: random(60, 80), speed: 1.5},
        {pos_x: -600, pos_y: 210, radius: random(60, 80), speed: 1},
        {pos_x: -1600, pos_y: 120, radius: random(60, 80), speed: 0.5},
    ];

    canyons = [
        {pos_x: 200 - width * 2, width: width * 2},
        {pos_x: 800, width: 250},
        {pos_x: 1200, width: 200},
        {pos_x: 1700, width: width - 200},
        {pos_x: 3000, width: 600},
    ];

    flagPole = {isReached: false, isRaised: false, pos_x: 4000, flagPos_y: 0};
}

function RocketFall(pos_x, fallSpeed, width) {
    // Enemy (rocket rain)
    this.x = pos_x;
    this.y = -80;
    this.fallSpeed = fallSpeed;
    this.width = width;

    // Rocket behavior and interaction with Game Char
    this.drawFallingRocket = function () {
        // Draw Rocket
        strokeWeight(1);
        stroke(0);
        fill(200);
        rect(this.x - this.width/2, this.y - this.width/2, this.width, this.width);
        fill(240, 0, 0);
        triangle(
            this.x - this.width/2, this.y + this.width/2, 
            this.x + this.width/2, this.y + this.width/2, 
            this.x, this.y + this.width/2 + this.width * 0.35
        );
        triangle(
            this.x - this.width/2 + this.width * 0.3, this.y - this.width/2 + this.width * 0.35,
            this.x - this.width/2 - this.width * 0.1, this.y - this.width/2 + this.width * 0.1,
            this.x - this.width/2 - this.width * 0.1, this.y - this.width/2 - this.width * 0.4
        );
        triangle(
            this.x + this.width/2 - this.width * 0.3, this.y - this.width/2 + this.width * 0.35,
            this.x + this.width/2 + this.width * 0.1, this.y - this.width/2 + this.width * 0.1,
            this.x + this.width/2 + this.width * 0.1, this.y - this.width/2 - this.width * 0.4
        );

        // Reset the rocket y when out of the screen
        if (this.y < height + 100 && !rocketHitted && livesCounter > 0){
            this.y = this.y + this.fallSpeed;
        } else if (this.y > height + 80) {
            this.y = -80;
        }

        // check if game char is hitted by the rocket
        if (dist(this.x, this.y, gameChar_x, gameChar_y - 40) < this.width){
            rocketHitted = true;
        }
    }
}

function createPlatforms (x, y_level, length) {
    // create platform with factory pattern
    var p = {
        x_start: x,
        y: floorPos_y - y_level * 50,
        length: length,
        x_end: x + length,
        drawPlatform : function () { // draw platform
            strokeWeight(1);
            fill(0, 155, 0);
            rect(this.x_start, this.y, this.length, 8);
        },
        checkGameCharOnPlatform: function () { // check if Game Char is on platform
            if (gameChar_x >= this.x_start && gameChar_x <= this.x_end && gameChar_y == this.y) {
                return true;
            } else {
                return false;
            }
        }
    }
    return p;
}

function checkGameCharOnAnyPlatform() {
    // Check if Game Char is on platform
    var onPlatform = false;
    for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].checkGameCharOnPlatform()) {
            onPlatform = true;
            break;
        }
    }
    return onPlatform;
}

function guideTexts() {
    // Hint or guide texts
    textSize(18);
    fill(255);
    strokeWeight(1);
    text("there's nothing here...", -400, 200);
    text("use Arrow UP, LEFT, RIGHT to move", 300, 200);
}

function Sparkler (pos_x, pos_y, x_speed, y_speed, size, amount) {
    this.x = pos_x;
    this.y = pos_y;
    this.x_speed = x_speed;
    this.y_speed = y_speed;
    this.size = size;
    this.amount = amount;
    this.particles = [];
    for (var i = 0; i < this.amount; i++) { // generate particles properties value and push it to particles array
        var p = {
            x: this.x,
            y: this.y,
            x_speed: random(-x_speed, x_speed),
            y_speed: random(-y_speed, -y_speed * 2),
            color: color(255, random(0, 255), 0),
            size: random(this.size / 2, this.size * 2),
            life: random(0, 90),
        }
        this.particles.push(p);
    }
    this.drawSparkler = function () {
        // draw particles and its behavior
        for (var i = 0; i < this.particles.length; i++) {
            fill(this.particles[i].color);
            this.particles[i].x += this.particles[i].x_speed;
            this.particles[i].y += this.particles[i].y_speed;
            this.particles[i].life += random(1, 10);
            if (this.particles[i].life > random(100, 150)) { // when particles lifetime is dead
                // reset particles' x, y, and life
                this.particles[i].x = this.x;
                this.particles[i].y = this.y;
                this.particles[i].life = 0;
            }
            ellipse(this.particles[i].x, this.particles[i].y, this.particles[i].size);
        }
        // draw sparkler machine
        fill(255);
        rect(this.x - this.size , this.y - this.size, this.size * 2,this.size * 5);
    }
}