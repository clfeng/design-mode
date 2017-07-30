// 惰性模式：减少每次代码执行时的重复分支判断，通过对对象重定义来屏蔽原对象中的分支判断
// 添加绑定事件方法
var A = {};
/*A.on=(function (dom,type,fn){
	// 如果支持addEventListener方法
	if (document.addEventListener) {
		// 返回新定义方法
		return function (dom,type,fn){
			dom.addEventListener(type,fn,false);
		}
	}else if (document.attachEvent) {
		// 返回新定义方法
		return function (dom,type,fn){
			dom.attachEvent("on"+type,fn);
		}
		// 定义on方法
	}else{
		// 返回新定义方法
		return function (dom,type,fn){
			dom["on"+type]=fn;
		}
	}
})();
console.log(A.on);*/

// 惰性执行
A.on=function (dom,type,fn){
	// 如果支持addEventListener方法
	if (document.addEventListener) {
		// 显示定义on
		A.on= function (dom,type,fn){
			dom.addEventListener(type,fn,false);
		}
	}else if (document.attachEvent) {
		// 显示定义on
		A.on= function (dom,type,fn){
			dom.attachEvent("on"+type,fn);
		}
		// 显示定义on
	}else{
		// 显示定义on
		A.on= function (dom,type,fn){
			dom["on"+type]=fn;
		}
	}
// 执行重定义on
	A.on(dom,type,fn);
};