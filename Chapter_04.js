// 安全的工厂方法
// 安全模式创建工厂类
var Factory = function (type,content){
	if (this instanceof Factory) {
		var s = new this[type](content);
		return s;
	}else{
		return new Factory(type,content);
	}
}

Factory.prototype = {
	Java:function (content){
		// ...
	},
	JavaScript:function (content){
		// ...
	},
	UI:function (content){
		this.content = content;
		(function (content){
			var div = document.createElement("div");
				div.innerHTML = content;
				div.style.border ="1px solid red";
				document.getElementById("container").appendChild("div");
		})(content);
	},
	php: function(content){
		// ...
	}
};


// 简单工厂模式，通过一个工厂类来管理多给类对象，然后根据需求用对应的类对象创建对应的实例对象，
// 但当需求不断增加时需要同时更新类对象跟工厂类，可以反正java抽象类的思想，采用工厂方法模式
// 对相似的需求进行抽象，抽象出来的代码放在工厂类中，具体的实现类则在工厂类的原型中进行定义（减少对工厂类的更新）