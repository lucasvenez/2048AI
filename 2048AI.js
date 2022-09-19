/**
 * It aims at solving 2048 game using the
 * tree search technique.
 * 
 * @author Lucas Venezian Povoa
 * 
 */
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

	switch (direction) {
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

Player2048.prototype.simulateUp = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), 0, this.boardSize, 1,
				this.boardSize, function(o, p) {
					return o <= p;
				}, function(o, p) {
					return o >= p;
				});

	return this.simulate(current.slice(), 0, this.boardSize, 1, this.boardSize,
			function(o, p) {
				return o <= p;
			}, function(o, p) {
				return o >= p;
			})[i];
}

Player2048.prototype.simulateDown = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), this.boardSize
				* (this.boardSize - 1), this.boardSize * this.boardSize, 1, -1
				* this.boardSize, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		});

	return this.simulate(current.slice(),
			this.boardSize * (this.boardSize - 1), this.boardSize
					* this.boardSize, 1, -1 * this.boardSize, function(o, p) {
				return o >= p;
			}, function(o, p) {
				return o <= p;
			})[i];
}

Player2048.prototype.simulateLeft = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), 0, this.boardSize
				* (this.boardSize - 1) + 1, this.boardSize, 1, function(o, p) {
			return o <= p;
		}, function(o, p) {
			return o >= p;
		});

	return this.simulate(current.slice(), 0, this.boardSize
			* (this.boardSize - 1) + 1, this.boardSize, 1, function(o, p) {
		return o <= p;
	}, function(o, p) {
		return o >= p;
	})[i];
}

Player2048.prototype.simulateRight = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), this.boardSize - 1, Math.pow(
				this.boardSize, 2), this.boardSize, -1, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		});
	else
		return this.simulate(current.slice(), this.boardSize - 1, Math.pow(
				this.boardSize, 2), this.boardSize, -1, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		})[i];
}

Player2048.prototype.simulateScore = function(current, move) {

	switch (move) {
	case 1:
		return this.simulateUp(current, 3); // TOP
		break;
	case 2:
		return this.simulateLeft(current, 3); // LEFT
		break;
	case 3:
		return this.simulateDown(current, 3); // DOWN
		break;
	case 4:
		return this.simulateRight(current, 3); // RIGHT
		break;
	default:
		console.log("invalid move");
	}
}

Player2048.prototype.simulate = function(c, initial, end, increment, shift, F1,
		F2) {

	var current = c.slice();

	var availableCells = [];

	var totalMerged = 0;

	for (var o = 0; o < 3; o++) {

		for (var i = initial; i < end; i += increment) {

			for (var j = i + shift; F1(j, i + shift * (this.boardSize - 1)); j += shift) {

				var tmp = j;

				var summed = false;

				for (var n = j - shift; F2(n, i); n -= shift) {

					if (o % 2 == 0) {

						if (current[n] == 0 && current[tmp] != 0) {
							current[n] = current[tmp];
							current[tmp] = 0;
						}

						tmp = n;
					} else {

						if (current[j - shift] == current[j] && !summed) {
							current[j - shift] *= 2;
							totalMerged += current[j - shift]
							current[j] = 0;
							summed = true;
						}
					}
				}
			}
		}
	}

	if (!this.isEquals(current, c)) {
		for (var i = 0; i < current.length; i++)
			if (current[i] == 0)
				availableCells.push(i)

		if (availableCells.length)
			current[availableCells[Math.floor(Math.random()
					* availableCells.length)]] = this.getNumber();
	}

	return [current.slice(0), totalMerged];
};

Player2048.prototype.getNumber = function() {
	if (Math.random() <= .75)
		return 2;
	return 4;
};

Player2048.prototype.estimateState = function(current, move) {

	var sim = this.simulateScore(current, move);
	
	var value = sim[1];
	
	var emptyCells = this.getFrequency(0, sim[0]);
	
	return value + emptyCells;
};

Player2048.prototype.estimateStateInDepth = function(current, depth) {

	var up    = this.simulateUp(current.slice(0));
	
	var left  = this.simulateLeft(current.slice(0));
	
	var down  = this.simulateDown(current.slice(0));
	
	var right = this.simulateRight(current.slice(0));

	if (depth <= 1) {

		var r = [!this.isEquals(up, current)    ? this.estimateState(current, 1) : -8196,
				 !this.isEquals(left, current)  ? this.estimateState(current, 2) : -8196, 
				 !this.isEquals(down, current)  ? this.estimateState(current, 3) : -8196,
				 !this.isEquals(right, current) ? this.estimateState(current, 4) : -8196];

		return r;

	} else {
		
		var r = [
				(!this.isEquals(up, current) ? 
						this.estimateState(current, 1) * depth
						+ Math.max.apply(Math, this.estimateStateInDepth(up,
								depth - 1)) : -8196 * depth),

				(!this.isEquals(left, current) ? 
						this.estimateState(current, 2) * depth
						+ Math.max.apply(Math, this.estimateStateInDepth(left,
								depth - 1)) : -8196 * depth),

				(!this.isEquals(down, current) ? 
						this.estimateState(current, 3) * depth
						+ Math.max.apply(Math, this.estimateStateInDepth(down,
								depth - 1)) : -8196 * depth),

				(!this.isEquals(right, current) ? 
						this.estimateState(current, 4) * depth
						+ Math.max.apply(Math, this.estimateStateInDepth(right,
								depth - 1)) : -8196 * depth) ];
		
		return r;
	}
};

Player2048.prototype.play = function() {

	var self = this;

	setTimeout(function() {

		var values = self.estimateStateInDepth(self.getCurrentState(), 7);

		var max = Math.max.apply(Math, values);
		
		console.log(values);
		
		self.move(values.indexOf(max) + 1);
		
		if (self.hasPossibleMoves(self.getCurrentState()) && 
				self.getCurrentState().indexOf(2048) < 0)
			self.play();

	}, 100);
};

Player2048.prototype.hasPossibleMoves = function(current) {

	var a = [this.simulateUp(current),   this.simulateLeft(current),
			 this.simulateDown(current), this.simulateRight(current)];

	for (var i = 0; i < a.length; i++) {

		for (var j = 0; j < a[i].length; j++)

			if (a[i][j] != current[j])
				return true;
	}

	return false;
};

Player2048.prototype.isEquals = function(a1, a2) {

	if (a1.length != a2.length)
		return false;

	for (var i = 0; i < a1.length; i++)
		if (a1[i] != a2[i])
			return false;

	return true;
};

Player2048.prototype.getFrequency = function(e, a) {

	var f = 0;

	for (var i = 0; i < a.length; i++)
		if (a[i] == e)
			f = f + 1;

	return f;
};

var player = new Player2048(4);

player.play();
