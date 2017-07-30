/*//简单工厂模式
// 理解：通过java中的用户代理更好理解些，由代理管理所以的函数方法，
// 而自己仅仅需要知道代理的存在，通过创建代理这一接口，然后来调用自己所需要的功能，
// 而不必去关系其内部的实现，只需要了解代理拥有什么样的功能
// example_1
// 篮球基类
var Basketball = function (){
	this.intro - "蓝旗盛行于美国";
}
Basketball.prototype - {
	getMember:function (){
		console.log("每个队伍需要5名队员");
	},
	getBallSize:function (){
		console.log("篮球很大");
	}
}
// 足球基类
var Football = function (){
	this.intro = "足球在世界范围内很流行";
}
Football.prototype = {
	getMember:function(){
		console.log("每个队伍需要11名队员");
	},
	getBallSize:function (){
		console.log("足球很大");
	}
}
// 网球基类
var Tennis = function (){
	this.intro = "每年有很多网球系列赛";
}
Tennis.prototype = {
	getMember:function (){
		console.log("每个队伍需要1名队员");
	},
	getBallSize:function (){
		console.log("网球很小");
	}
}
// 运动工厂
var SportsFactory=function(name){
	swith(name){
		case "NBA":
			return new Basketball();
		case "wordCup":
			return new Football();
		case "FrenchOpen":
			return new Tennis();
	}
}*/


// 工厂模式
function createBook(name,time,type){
	// 创建一个对象，并对对象拓展属性和方法
	var o = new Object();
	o.name = name;
	o.time = time;
	o.type = type;
	o.getName = function  (){
		console.log(this.name);
	};
	return o;
}
var book1 = createBook("js book",2014,"js");
var book2 = createBook("css book",2013,"css");
book1.getName();
book2.getName();

// example_2
function createPop(type,text){
	// 创建一个对象，并对对象拓展属性和方法
	var o = new Object();
	o.content = text;
	o.show = function (){
		// 显示方法
	};
	if (type == "alert") {
		// 提示框差异部分
	}
	if (type == "prompt") {
		// 提示框差异部分
	}
	if (type == "confirm") {
		// 确认框差异部分
	}
	// 将对象返回
	return o;
}
// 创建提示框
var userNameAlert = createPop("alert","用户名只能是26个字母和数字");

// 总结：第一种是通过类实例化对象创建的，第二种是通过创建一个新对象然后包装增强其属性和功能来实现的
// 第一种的工厂用于管理多个类，根据需要创建某个类的实例化对象，第二种创建一个实例对象，根据需要做增强