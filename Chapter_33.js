// 参与者：在特定的作用域执行给定的函数，并将参数原封不动地传递
// 函数绑定bind
/*function bind(fn,context){
	// 闭包返回新函数
	return function (){
		return fn.apply(context,arguments);
	}
}
//测试对象
var demoObj={
	title:"这是一个例子"
}
// 测试方法
function demoFn(){
	console.log(this.title);
}
// 让demoObj参与demoFn的执行
var bindFn = bind(demoFn,demoObj);
demoFn();
bindFn();
*/
/*function bind(fn,context){
	// 闭包返回新函数
	return function (){
		return fn.apply(context,arguments);
	}
}
var btn = document.getElementsByTagName("button")[0],
		p = document.getElementsByTagName("p")[0];
function demoFn(){
	console.log(arguments,this);
}
//为设置提供参与对象
// var bindFn = bind(demoFn);
var bindFn = bind(demoFn,btn);
// 提供btn元素参与对象
var  bindFn=bind(demoFn,p);
btn.addEventListener("click",bindFn);
btn.removeEventListener("click",bindFn);



var btn = document.getElementsByTagName("button")[0],
		p = document.getElementsByTagName("p")[0];
function demoFn(){
	console.log(arguments,this);
}
var bindFn=demoFn.bind(p);
btn.addEventListener("click",bindFn);

*/
/*
// 函数柯里化：函数柯里化的思想是对函数的参数分割，这有点像其他面向对象语言中的类的多态
function curry(fn){
	// 缓存数组slice方法Array.prototype.slice
	var Slice = [].slice;
	// 从第二个参数开始截取参数
	var args = Slice.call(arguments,1);
	// 闭包返回新函数
	return function (){
		// 将参数(类数组)转化为数组
		var addArgs = Slice.call(arguments);
		// 拼接参数
		allArgs = args.concat(addArgs);
		// 返回新函数
		return fn.apply(null,allArgs);
	}
}

// 加法器
function add(num1,num2){
	return num1+num2;
}
// 加5加法器
function add5(num){	
	return add(5,num);
}
// 测试add加法器
console.log(add(1,2));
console.log(add5(6));
var add5 = curry(add,5);
console.log(add5(7));
// var add7and8 = curry(add,7,8);
// console.log(add7and8());*/

/*
// 重写bind
function bind(fn,context){
	// 缓存数组slice方法
	var Slice = [].slice,
			// 从第三个参数开始截取参数(包括第三个参数)
		args = Slice.call(arguments,2);
	// 返回新方法
	return function (){
		// 将参数转化为数组
		var addArgs = Slice.call(arguments),
		// 拼接参数
				allArgs = addArgs.concat(args);
		// 对fn装饰并返回
		return fn.apply(context,allArgs);
	}
}
function demoFn(){
	console.log(arguments,this);
}
var demoData1 = {
	text:"这是第一组数据"
},
demoData2 = {
	text:"这是第二组数据"
};
var btn = document.getElementsByTagName("button")[0],
		p= document.getElementsByTagName("p")[0];
// 提供btn元素，demoData1参与对象
// var bindFn = bind(demoFn,btn,demoData1);
// var bindFn = bind(demoFn,btn,demoData1,demoData2);
// 浏览器内容bind方法
var bindFn = demoFn.bind(btn,demoData1);
btn.addEventListener("click",bindFn);


// 兼容各个浏览器的bind方法
if (Function.prototype.bind === undefined) {
	Function.prototype.bind = function (conext){
		// 缓存数组slice方法
		var Slice =	[].slice,
		// 从第二个参数截取参数
		args = Slice.call(arguments,1),
		// 保存当前函数尹永明
		that = this;
		// 返回新函数
		return function (){
			var addArgs = Slice.call(arguments),
				// 拼接参数，注意：传入的参数放在后面
				allArgs = args.concat(addArgs);
			//对当前函数装饰并返回
			return that.apply(context,allArgs);
		}
	}
}*/

// 返柯里化
Function .prototype.uncurry = function (){
	// 保存当前对象
	var that = this;
	return function (){
		return Function.prototype.call.apply(that,arguments);
	}
}

// 用Object.prototype.toString检验对象类型时
var toString = Object.prototype.toString.uncurry();
console.log(toString);
console.log(toString(function(){}));
console.log(toString([]));

// 保存数组push方法
var push  = [].push.uncurry();
// 创建一个对象
var demoArr = {};
// 通过push方法为对象添加数据成员
push(demoArr,"第一个成员","第二个成员");
// 执行过程
// Function.prototype.call.apply([].push,[demoArr,"第一个成员","第二个成员"])
// [].push.call(demoArr,"第一个成员","第二个成员")
console.log(demoArr);