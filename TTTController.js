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
	self.addBox= getBox();
	
	self.addBox.$loaded( function() {
		if (self.addBox.length < 9) {
			for (var i=0;i<9;i++) {
		self.addBox.$add({box: ''});
		}
	}	
});

		function getBox() {
		var ref = new Firebase("https://19431971.firebaseio.com/");
		var box = $firebaseArray(ref);
		return box;
	}

	function clickedBox(c) {
		
		if (self.addBox[c].box == '' && self.turn == "o") {

		 self.addBox[c].box = "x";
		 self.turn = "x";
		 self.addBox.$save(c);
	}	else if (self.addBox[c].box == '' && self.turn == "x") {
		self.addBox[c].box = "o";
		self.turn = "o";
		self.addBox.$save(c);
	}  else {
		null
	}
}
	
}