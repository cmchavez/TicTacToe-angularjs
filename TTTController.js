angular
	.module('tttApp')
	.controller('TTTController', TTTController);

TTTController.$inject = ['$firebaseArray']

function TTTController($firebaseArray) {
	var self = this;
	self.clickedBox = clickedBox;
	self.player1 = "x";
	self.player2 = "o";
	self.turn = "o";

		self.boxes= [
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"},
		{box: '', select: "empty"}
	]
		function getBox() {
		var ref = new Firebase("https://19431971.firebaseio.com/");
		var box = $firebaseArray(ref);
		return box;
	}

	function clickedBox(i) {
		// alert(i);
		if (self.boxes[i].box == '' && self.turn == "o") {
		 self.boxes[i].box = "x";
		 self.turn = "x";
	}	else if (self.boxes[i].box == '' && self.turn == "x") {
		self.boxes[i].box = "o";
		self.turn = "o";
	}  else {
		null
	}
}
	
}