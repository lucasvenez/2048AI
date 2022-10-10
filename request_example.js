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

player = new Player2048(4)

const xhr = new XMLHttpRequest();
const url = "http://localhost:9092/persist";

xhr.open("POST", url);

var listener_on_load = function(d) {
    console.log(xhr.response)
}

xhr.onload = listener_on_load;
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
xhr.send(JSON.stringify(player.getCurrentState()));