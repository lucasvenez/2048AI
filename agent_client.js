function Player2048(n) {

	var TOP = 1, BOTTON = 2, LEFT = 3, RIGHT = 4;

	this.boardSize = n;

	KeyboardInputManager.prototype.targetIsInput = function(event) {
		return false;
	};
}

Player2048.prototype.getCurrentState = function() {

	var currentState = [];

	for (var j = 0; j < this.boardSize; j++) {

		for (var i = 0; i < this.boardSize; i++) {

			var e = document.body.getElementsByClassName("tile-position-"
					+ (i + 1) + "-" + (j + 1))[document.body
					.getElementsByClassName("tile-position-" + (i + 1) + "-"
							+ (j + 1)).length - 1];

			/*
			 * Getting element i,j value
			 */
			var value = e != undefined ? parseInt(e
					.getElementsByClassName("tile-inner")[0].textContent) : 0;

			currentState[i + j * this.boardSize] = value;
		}
	}

	return currentState;
};

/**
 * @param direction is the direction of the move, which can be TOP, BOTTON, LEFT, or RIGHT.
 */
Player2048.prototype.move = function(direction) {

	switch (parseInt(direction)) {
	case 1:
		this.simulateKeyEvent(38); // TOP
		break;
	case 2:
		this.simulateKeyEvent(37); // LEFT
		break;
	case 3:
		this.simulateKeyEvent(40); // DOWN
		break;
	case 4:
		this.simulateKeyEvent(39); // RIGHT
		break;
	default:
		console.log("invalid move");
	}
};

Player2048.prototype.simulateKeyEvent = function(key) {

	var e = new Event("keydown");

	e.which = key;

	document.dispatchEvent(e);
};

player = new Player2048(4)

const xhr = new XMLHttpRequest();

var listener_on_load = function(d) {
    move = parseInt(xhr.response)
    if move > -1 && move < 5 {
        console.log(move)
        player.move(move)
        play()
    }
}

var play = function() {
    const url = "http://localhost:9092/agent/next-move";

    xhr.onload = listener_on_load;

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    console.log(JSON.stringify(player.getCurrentState()))
    xhr.send(JSON.stringify(player.getCurrentState()));
}

play()