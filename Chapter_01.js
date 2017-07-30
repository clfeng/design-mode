// 1.如何实现方法的链式调用
var link = {}
link.a = function (){
	console.log("a");
	return this;
};
link.b= function (){
	console.log("b");
	return this;
};
link.c = function (){
	console.log("c");
	return this;
};
// link.a().b().c();

// 2.试着定义一个可以为函数添加多个方法的addMethod方法

function Method(){};
Method.addMethod=function (methodname,func){
	this[methodname]=func;
	return this;
}
Method.addMethod("a",function(){
	console.log("a");
	return this;
}).addMethod("b",function(){
	console.log("b");
	return this;
});
// Method.a().b();

// 3.试着定义一个既可以为函数原型添加方法又可为自身添加方法的addMethod
function MethodPro(){};
MethodPro.prototype.addMethod=function (methodname,func){
	this[methodname]=func;
	return this;
};
MethodPro.prototype.addMethod("proA",function (){
	console.log("proA");
});
var method = new MethodPro();
method.addMethod("funcA",function(){
	console.log("funcA");
});
method.funcA();
MethodPro.prototype.proA();
console.log("---");
method.proA();


/*
团队合作，理应顾及他人，尽量减少产生全局变量，可以通过利用对象对数据，及方法进行封装来实现


*/