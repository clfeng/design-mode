// 通过在对象方法中将当前对象返回，实现对统一个对象多个方法的链式调用，从而简化对该对象的多个方法的多次调用时，对该对象的多次引用
/*var A = function (){
	return B;
}
var B = A.prototype = {
	length:2,
	size:function(){
		return this.length;
	}
};
console.log(A().size());*/

/*var A = function (selector){
	return A.fn;
}
A.fn= A.prototype = {};*/


/*var A = function (selector){
	return new A.fn.init(selector);
}
A.fn= A.prototype ={
	init:function (selector){
		this[0] = document.getElementById(selector);//作为当前对象的属性值保存
		this.length = 1;
		console.log(this===A.fn,this===A.prototype,this);
		return this;
	},
	length:2,
	size:function(){
		return this.length;
	}
}
// A.fn.init("demo");
// new A.fn.init("demo");

console.log(A("demo"));*/

// var A = function(selector){
// 	return new A.fn.init(selector);
// }
// A.fn = A.prototype = {
// 	constructor:A,
// 	init:function(this.constructor){
// 		console.log(this.constructor);
// 		/*
// 		*此处输出的测试结果
// 		function (selector){
// 			return new A.fn.init(selector);
// 		}
// 		*/
// 	}
// }
// A.fn.init.prototype = A.fn;

// selector选择符，context上下文
var A = function(selector,context){
	return new A.fn.init(selector,context);
}

A.fn = A.prototype ={
	constructor:A,
	init:function (selector,context){
		// 获取元素长度
		this.length = 0;
		// 默认获取元素的上下文为document
		context = context || document;
		// 如果是id选择符 按位非将-1转化为0，转化为布尔值false
		if (~selector.indexOf("#")) {
			// 截取id并选择
			this[0] = document.getElementById(selector.slice(1));
			this.length = 1;
			// 如果是元素名称
		}else{
			// 在上下文中选择元素
			var doms = context.getElementsByTagName(selector),
					i = 0,
					len = doms.length;
			for(;i<len;i++){
				// 压入this
				this[i] = doms[i];
			}
			// 校正长度
			this.length = len;
		}
		// 保存上下文
		this.context = context;
		// 保存选择符
		this.selector = selector;
		// 返回对象
		return this;
	},
	push:[].push,
	sort:[].sort,
	splice:[].splice
}
A.fn.init.prototype = A.fn;
A.extend = A.fn.extend = function(){
	// 拓展对象从第二个参数算起
	var i = 1,
		// 获取参数长度
		len = arguments.length,
		// 第一个参数为源对象
		target = arguments[0],
		// 拓展对象中属性
		j;
	// 如果只传一个参数
	if (i==len) {
		// 源对象为当前对象
		target =this;
		// i从0计算
		i--;
	}
	// 遍历参数中拓展对象
	for(;i<len;i++){
		// 遍历拓展对象中的属性
		for(j in arguments[i]){
			// 拓展源对象
			target[j]=arguments[i][j];
		}
	}
	// 返回源对象
	return target;
};

// // 测试用例
// var demo = A.extend({first:1},{second:2},{third:3});
// console.log(demo);
// 拓展A.fn方式一
/*A.extend(A.fn,{version:"1.0"});
console.log(A("demo").version);
// 拓展A,fn方式二
A.extend(A.fn,{getVersion:function(){return this.version}});
// console.log(A("demo").getVersion);
console.log(A("demo").getVersion());
// 拓展A方式一
A.extend(A,{author:"clf"});
console.log(A.author);
// 拓展方式
A.extend({nickname:"雨夜清河"});
console.log(A.nickname);*/


A.fn.extend({
	// 添加事件
	on:(function(){
		// 标准浏览器DOM2级事件
		if (document.addEventListener) {
			return function(type,fn){
				var i = this.length-1;
				// 遍历所有元素添加事件
				for(;i>=0;i--){
					this[i].addEventListener(type,fn,false);
				}
				// 返回源对象
				return this;
			}
			// IE浏览器DOM2级事件
		}else if (document.attachEvent) {
			return function(type,fn){
				var i = this.length-1;
				for(;i>=0;i--){
					this[i].attachEvent("on"+type,fn);
				}
				return this;
			}
			// 不支持DOM2级事件浏览器添加事件
		}else{
			return function(type,fn){
				var i = this.length-1;
				for(;i>=0;i--){
					this[i]["on"+type]=fn;
				}
				return this;
			}
		}
	})()
});

A.extend({
	// 将"-"分割线转化为驼峰式，如'border-color'->'borderColor'
	camelCase:function(str){
		return str.replace(/\-(\w)/g,function(all,letter){
			return letter.toUpperCase();
		});
	}
});
A.fn.extend({
	// 设置css样式
	css:function(){
		var arg = arguments,
				len = arg.length;
		if (this.length<1) {
			return this;
		}
		// 只有一个参数时
		if (len===1) {
			// 如果为字符串则为获取第一个元素css样式
			if (typeof arg[0]==="string") {
				// IE
				if (this[0].currentStyle) {
					return this[0].currentStyle[name];
				}else{
					return getComputedStyle(this[0],false)[name];
				}
			// 为对象时则设置多个样式
			}else if(typeof arg[0] ==="object"){
				for(var i in arg[0]){//遍历每个样式
					for(var j = this.length-1;j>=0;j--){
						// 调用拓展方法camelCase将"-"分割线转化为驼峰式
						this[j].style[A.camelCase(i)] = arg[0][i];
					}
				}
			}
			// 两个参数则设置一个样式
		}else if (len===2) {
			for(var j = this.length-1;j>=0;j--){
				this[j].style[A.camelCase(arg[0])]=args[1];
			}
		}
		return this;
	}
});

A.fn.extend({
	// 设置属性
	attr:function(){
		var arg = arguments,
				len = arg.length;
		if (this.length<1) {
			return this;
		}
	// 如果一个参数
		if(len ===1){
			// 为字符串则获取第一个元素属性
			if (typeof arg[0]==="string") {
				return this[0].getAttribute(arg[0]);
			// 为对象设置每个元素的多个属性
			}else if (typeof arg[0] ==="obj") {
				for(var i in arg[0]){//遍历属性
					for(var j = this.length-1;j>=0;j--){
						this[j].setAttribute(i,arg[0][i]);
					}
				}
			}
			// 两个参数则设置每个元素单个属性
		}else if (len==2) {
			for(var j =this.length-1;j>=0;j--){
				this[j].setAttribute(arg[0],arg[1]);
			}
		}
	return this;
	}
});
A.fn.extend({
	// 获取或者设置元素的内容
	html:function(){
		var arg = arguments,
				len = arg.length;
		// 无参数则获取第一个元素的内容
		if (len ===0) {
			return this[0]&&this[0].innerHTML;
			// 一个参数则设置每一个元素的内容
		}else{
			for(var i = this.length-1;i>=0;i--){
				this[i].innerHTML = arg[0];
			}
		}
		return this;
	}
});
A("div")
	.css({
		height:"30px",
		border:"1px solid #000",
		"background-color":"red"
	})
	.attr("class","demo")
	.html("add demo text")
	.on("click",function (){
		console.log("clicked");
	})