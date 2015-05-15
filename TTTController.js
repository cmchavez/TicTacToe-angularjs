angular
	.module('tttApp')
	.controller('TTTController', TTTController);

TTTController.$inject = ['$firebaseArray'];

function TTTController($firebaseArray) {
	var self = this;
	self.clickedBox = clickedBox;
	self.player1 = "x";
	self.player2 = "o";
	self.turn = "o";
	self.addBox = getBox();
	self.restart = restart;
	self.getWinner = getWinner;
	
	self.addBox.$loaded( function() {
		if (self.addBox.length < 9) {
			for (var i = 0; i < 9; i++) {
		self.addBox.$add({box: ''});
		}
	}	
	});
	//linking to firebase	
	function getBox() {
		var ref = new Firebase("https://tictactoby.firebaseio.com/");
		var box = $firebaseArray(ref);
		return box;
	}
	//allowing box to be clicked by player if empty. 
	//also switching player and saving
	function clickedBox(c) {
		if (self.addBox[c].box == '' && self.turn == "o") {
		 self.addBox[c].box = "x";
		 self.turn = "x";
		 self.addBox.$save(c);
		}	else if (self.addBox[c].box == '' && self.turn == "x") {
		self.addBox[c].box = "o";
		self.turn = "o";
		self.addBox.$save(c);
		}  	else {
	

		}
		getWinner()
	}
	//this code block will determine winner
	function getWinner() {
		console.log("getWinner function is running")
		if ((self.addBox[0].box === "x" && self.addBox[1].box === "x" && self.addBox[2].box === "x") 
			|| (self.addBox[0].box === "o" && self.addBox[1].box === "o" && self.addBox[2].box === "o")) {
			console.log(self.addBox[0].box + "won"); 
		} else if ((self.addBox[3].box === "x" && self.addBox[4].box === "x" && self.addBox[5].box === "x") 
			|| (self.addBox[3].box === "o" && self.addBox[4].box === "o" && self.addBox[5].box === "o")) {
			console.log(self.addBox[3].box + "won"); 
		} else if ((self.addBox[6].box === "x" && self.addBox[7].box === "x" && self.addBox[8].box === "x") 
			|| (self.addBox[6].box === "o" && self.addBox[7].box === "o" && self.addBox[8].box === "o")) {
			console.log(self.addBox[6].box + "won");
		} else if ((self.addBox[0].box === "x" && self.addBox[3].box === "x" && self.addBox[6].box === "x") 
			|| (self.addBox[0].box === "o" && self.addBox[3].box === "o" && self.addBox[6].box === "o")) {
			console.log(self.addBox[0].box + "won"); 
		} else if ((self.addBox[1].box === "x" && self.addBox[4].box === "x" && self.addBox[7].box === "x") 
			|| (self.addBox[1].box === "o" && self.addBox[4].box === "o" && self.addBox[7].box === "o")) {
			console.log(self.addBox[1].box + "won"); 
		} else if ((self.addBox[2].box === "x" && self.addBox[5].box === "x" && self.addBox[8].box === "x") 
			|| (self.addBox[2].box === "o" && self.addBox[5].box === "o" && self.addBox[8].box === "o")) {
			console.log(self.addBox[2].box + "won"); 
		} else if ((self.addBox[0].box === "x" && self.addBox[4].box === "x" && self.addBox[8].box === "x") 
			|| (self.addBox[0].box === "o" && self.addBox[4].box === "o" && self.addBox[8].box === "o")) {
			console.log(self.addBox[0].box + "won"); 
		} else if ((self.addBox[2].box === "x" && self.addBox[4].box === "x" && self.addBox[6].box === "x") 
			|| (self.addBox[2].box === "o" && self.addBox[4].box === "o" && self.addBox[6].box === "o")) {
			console.log(self.addBox[2].box + "won"); 
		}	
	} 

	//this code block will empty out boxes and restart game once winner is determined.
	function restart() {
		for(var i = 0; i < 9; i++) {
			self.addBox[i].box = "";
			self.addBox.$save(self.addBox[i]);
		}

	}
	
	
} 