var Flyweight ={
	moveX: function (x){
		this.x = x;
	},
	moveY: function (y){
		this.y = y;
	}
};

var Player = function (x,y,c){
	this.x= x;
	this.y = y;
	this.color = c;
};

Player.prototype = Flyweight;
Player.prototype.changeC = function (c){
	this.color =c;
};

var Spirit = function (x,y,r){
	this.x = x;
	this.y = y;
	this.r = r;
}

Spirit.prototype = Flyweight;
Spirit.prototype.changeR = function (r){
	this.r = r;
};
var player1 = new Player(5,6,"red");
console.log(player1);
player1.moveX(6);
player1.moveY(7);
player1.changeC("pink");
console.log(player1);
