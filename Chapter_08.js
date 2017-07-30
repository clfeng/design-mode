// 单列模式
// 命名空间的管理员
/*var clf = {
	g:function (id){
		return document.getElementById(id);
	},
	css:function (id,key,value){
		this.g(id).style[key] = value;
	}
}

// 创建小型代码库
var A = {
	Util:{
		util_method1:function (){},
		util_method2:function (){}
	},
	Tool:{
		tool_method1:function (){},
		tool_method2:function (){}
	},
	Ajax:{
		get:function (){},
		post:function (){}
	},
	other:{
		// ...
	}
}
// 静态变量
var Conf = (function (){
	// 私有变量
	var conf = {
		MAX_NUM:100,
		MIN_NUM: 1,
		COUNT: 1000
	}
	// 返回去取值器对象
	return {
		// 取值器方法
		get:function(name){
			return conf[name]?conf[name]:null;
		}
	}
})();

var count  = Conf.get("COUNT");
console.log(count);*/



// 惰性单例
var LazySingle = (function (){
	// 单例示例引用
	var _instance = null;
	function Single(){
		// 这里定义私有属性和方法
		return {
			publicMethod:function (){},
			publicProperty:"1.0"
		}
	}
	// 获取单例对象接口
	return function (){
		// 如果未创建单例将创建单例
		if (!_instance) {
			_instance = Single();
		}
		// 返回单例
		return _instance;
	}
})();
// 惰性体现在并没有一开始就创建，而是等到要用的时候再进行床LazySingle()创建
console.log(LazySingle().publicProperty);