angular
	.module('tttApp')
	.controller('TTTController', TTTController);

TTTController.$inject = ['$firebaseArray'];

function TTTController($firebaseArray) {
	var self = this;
    self.gameInfo = gameInfo();
    self.letsPlay = letsPlay();
    self.clickedBox = clickedBox;
    self.table = gameInfo();
    self.restart = restart;
    self.getWinner = getWinner;


	//linking to firebase	
	function gameInfo() {
		var ref = new Firebase("https://tictactoby.firebaseio.com/Table");
		var game = $firebaseArray(ref);
		return game;
	}
	function letsPlay() {
		var ref = new Firebase("https://tictactoby.firebaseio.com/GameBoard");
		var boxes = $firebaseArray(ref);
		return boxes;
	}
//determine player's turn, marking box, switching players
	function clickedBox(c) { 
		// console.log(self.gameInfo[0].turn)
		if (self.letsPlay[c].box == '' && self.gameInfo[0].turn == "o") {
		 	self.letsPlay[c].box = "x";
		 	self.gameInfo[0].turn = "x";
		 	self.letsPlay.$save(c);
		 	self.gameInfo.$save(self.gameInfo[0]);
		 	console.log(self.gameInfo[0].turn);
		} else if (self.letsPlay[c].box == '' && self.gameInfo[0].turn == "x") {
			self.letsPlay[c].box = "o";
			self.gameInfo[0].turn = "o";
			self.letsPlay.$save(c);
			self.gameInfo.$save(self.gameInfo[0]);
			console.log(self.gameInfo[0].turn);
		}  	
		getWinner()
	}

		function getWinner() {
		// console.log("getWinner function is running")
		var tokens = ["x", "o"]
		var winners = [
		    [0, 1, 2],
		    [3, 4, 5],
		    [6, 7, 8],
		    [0, 3, 6],
		    [1, 4, 7],
		    [2, 5, 8],
		    [0, 4, 8],
		    [2, 4, 6]
		]

		for(var i = 0; i < tokens.length; i++) {
		    var t = tokens[i];
		    for(var j = 0; j < winners.length; j++) {
		        var w = winners[j];
		        // console.log("check for " + t + " as winner on " + w)

		        if (self.letsPlay[ w[0] ].box === t && self.letsPlay[ w[1] ].box === t 
		        	&& self.letsPlay[ w[2] ].box === t) {
					console.log(t + " won");
					winner = t;
					if (t == "x") {
						self.table[0].player1score++;
						self.table.$save(self.table[0]);
					} else if (t == "o") {
						self.table[0].player2score++;
						self.table.$save(self.table[0]);
					}
					restart();
				}

		    }

		}

	 
	} 
	
	function restart() {
		// console.log("running")
			for(var i = 0; i < 9; i++) {
				self.letsPlay[i].box = "";
				self.letsPlay.$save(self.letsPlay[i]);
			}
		}
	function clearScore() {
		
	}
}
