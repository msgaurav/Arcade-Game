// Enemies our player must avoid
var Enemy = function (x, y, speed) {

    this.x = x;     // Determine X-axis
    this.y = y;     // Determine Y-axis
    this.speed = speed;     // Determine the speed of enemy

    // Image of the enemy
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt, player) {

    // Multiplies the speed by the dt parameter on the X-axis
    this.x += this.speed * dt;

    // Once enemies are off the canvas then reset the position of the enemies & they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    };

    // Collisions between the player and the enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    };
};

// Render the enemy's image into the game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class focusing on X & Y-axis
var Player = function (x, y) {

    // Variables for the player to move along X and Y-axis 
    this.x = x;
    this.y = y;

    // Image of the player
    this.player = 'images/char-boy.png';
};

Player.prototype.update = function (dt) {

};

// Renders the player's image into the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

// Handling the player's movement by arrow keys
Player.prototype.handleInput = function (keyPress) {

    switch(keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= 102
            }
            break;
        case 'right':
            if (this.x < 405) {
                this.x += 102
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83
            }
            break;
        case 'down':
            if(this.y < 405) {
                this.y += 83
            }
            break;
    }

    // Once the player reaches the water level then reset the game to the starting position
    if (this.y < 0) {
        setTimeout(() => {
            this.x = 202;
            this.y = 405;
        }, 900);
    };
};


// Place all enemy objects in an array
var allEnemies = [];

// Location of the 3 enemies on the Y-axis located on the stone road
var enemyLocation = [65, 147, 235];


// For each enemy located on the Y-axis from 0 on the x axis move at a speed of 180 
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 190);
    allEnemies.push(enemy);
});

// The starting location of the player is located at X=200, Y=405
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your Player.handleInput() method.
// Event Listener for mapping keystroke event with their codes.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
