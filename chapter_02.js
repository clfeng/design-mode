/*
面向对象编程就是将你的需求抽象成一个对象，然后针对这个对象分析其特征（属性）与动作（方法）
这个对象我们称之为类。面向对象编程思想其中一个特点就是封装，就是说把你需要的功能放在一个对象里。
*/
/*var Book = function (id,name,price){
	// 私有属性
	var num = 1;
	// 私有方法
	function checkId(){

	}
	// 特权方法
	this.getName = function (){};
	this.getPrice = function (){};
	this.setName = function (){};
	this.setPrice = function (){};
	// 对象共有属性
	this.id = id;
	// 对象共有方法
	this.copy = function (){};
	// 构造器
	this.setName(name);
	this.setPrice(price);

}
// 类静态共有属性(对象不能访问)
Book.isChines = true;
// 类静态公有方法(对象不能访问)
Book.resetTime = function (){
	console.log("new Time");
}

Book.prototype = {
	// 共有属性
	isJSBook:false;
	// 共有方法
	display:function (){};
}
*/
/*
// 安全模式
var Book = function (title,time,type){
	// 判断执行过程中的this是否是当前这个对象（如果是说明是用new创建的）
	if (this instanceof Book) {
		this.title = title;
		this.time = time;
		this.type = type;
		// 否侧重新创建这个对象
	}else{
		return new Book(title,time,type);
	}
}*/


// 2.3继承
// 类式继承
/*function SuperClass(){
	this.superValue = true;
}
SuperClass.prototype.getSuperValue = function (){
	return this.superValue;
}
function SubClass (){
	this.subValue = false;
}
// 继承父类
SubClass.prototype = new SuperClass();
SubClass.prototype.getSubValue=function (){
	return this.subValue;
}
var instance = new SubClass();
// console.log(instance.getSuperValue());
// console.log(instance.getSubValue());
// console.log(instance instanceof SuperClass);
// console.log(instance instanceof SubClass);
// console.log(SubClass instanceof SuperClass);

*/
/*// 类式继承存在的两个问题
function SuperClass(){
	this.books = ["JavaScript","html","css"];
}
function SubClass(){}
SubClass.prototype = new SuperClass();
var instance1 = new SubClass();
var instance2 = new SubClass();
console.log(instance2.books);//["JavaScript", "html", "css"]
instance1.books.push("设计模式");
console.log(instance2.books);//["JavaScript", "html", "css", "设计模式"]
// 1.当从父类继承的共有属性是引用类型时，子类的一个实例对象对继承属性的修改会影响到其他子类实例
// 2.无法给父类传递参数
// 解决方案构造函数继承式继承

*/
/*
// 构造函数继承

function SuperClass(id){
	this.books = ["JavaScript", "html", "css"];
	this.id = id;
}
SuperClass.prototype.showBooks = function (){
	console.log(this.books);
}
function SubClass(id){
	// 继承父类
	SuperClass.call(this,id);
}
// new 一个实例的理解：创建一个对象，将对应的构造函数执行一遍 ，
//将构造函数中的this.属性，this.方法赋值给创建的对象，并将对象的_proto_属性执行对应的构造函数的原型对象
var instance1 = new SubClass(10);
var instance2 = new SubClass(11);
instance1.books.push("设计模式");
console.log(instance1.books);
console.log(instance1.id);
console.log(instance2.books);
console.log(instance2.id);
instance1.showBooks();// TypeError

// 存在的问题，父类原型中的方法并没有被子类所继承
*/

// 组合式继承，结合类式继承和构造函数继承的有点
// 类式继承能够解决继承父类原型方法的问题，构造函数继承能解决继承父类共有方法属性跟传参的问题
/*function SuperClass(name){
	this.name = name;
	this.books ["html","css","JavaScript"];
}
SuperClass.prototype.getName = function (){
	console.log(this.name);
}
function SubClass(name,time){
	// 构造函数式继承父类name属性
	SuperClass.call(this,name);
	this.time =time;
}
// 类式继承，子类原型继承父类
SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function (){
	console.log(this.time);
}
// 组合式继承，解决了之前的所有问题，但还存在一个问题，父类构造函数执行了两遍
// 第一遍构造函数式继承，第二遍类式继承

*/
/*
// 原型式继承
function inheritObject(o){
	function F(){}
	F.prototype = o;
	return new F();
}
var book = {
	name :"js book",
	alikeBook:["css book","html book"]
}
var newBook = inheritObject(book);
newBook.name ="ajax book";
newBook.alikeBook.push("xml book");
console.log(newBook.name);
console.log(book.name);
console.log(newBook.alikeBook);
console.log(book.alikeBook);
*/


/*
// 寄生式继承
function inheritObject(o){
	function F(){}
	F.prototype = o;
	return new F();
}
var book = {
	name :"js book",
	alikeBook:["css book","html book"]
}
function createBook(obj){
	// 通过原型继承方式创建新对象
	var o = new inheritObject();
	// 拓展新对象
	o.getName = function (){
		console.log(name);
	};
	return o;
}
// 理解为原型式继承的二次封装，是对原型式继承的增强（寄生，依靠原型式继承而存在）

*/


/*
// 寄生组合式继承
// 原型式继承
function inheritObject(o){
	function F(){}
	F.prototype = o;
	return new F();
}

function inheritPrototype(subClass,superClass){
	// 复制一份父类的原型副本保存变量中
	var p = inheritObject(superClass.prototype);
	// 修正因为重写子类原型导致子类的constructor属性被修改
	p.constructor = subClass;
	// 设置子类原型
	subClass.prototype = p;

}

function SuperClass(name){
	this.name = name;
	this.colors =["red","green","blue"];
}
SuperClass.prototype.getName = function (){
	console.log(this.name);
};
function SubClass(name,time){
	// 构造函数式继承
	SuperClass.call(this,name);
	this.time =time;
}
// 寄生式继承父类原型
// 解决的问题：1.在组合式继承中父类构造函数执行两次，通过寄生式继承父类原型使得父类构造函数只在构造函数式继承中执行
// 2.通过寄生（增强）修正了父类原型对象赋值得到的复制对象p的constructor指向不正确的问题（即修改了子类的原型后应将子类的新原型
// 的constructor指向子类）解决 SubClass instanceof SuperClass问题
//寄生的另一种理解，通过函数内部的过度对象避免父类构造函数的再次执行
inheritPrototype(SubClass,SuperClass);
//创建两个测试方法
SubClass.prototype.getTime = function (){
	console.log(this.time);
}
var instance1 = new SubClass("js book",2014);
var instance2 = new SubClass("css book",2013);
instance1.colors.push("black");
console.log(instance1.colors);
console.log(instance2.colors);
instance2.getName();
instance2.getTime();
*/


// 单继承 属性复制（浅复制过程）
var extend = function (target,source){
	// 遍历源对象中的属性
	for (var property in source){
		// 将源对象中的属性复制到目标对象中
		target[property] = source[property];
	}
	return target;
}

// 多继承 属性复制
var mix = function (){
	var i=1,
	len = arguments.length,
	target = arguments[0],
	arg;
	for(;i<len;i++){
		arg = arguments[i];
		for(var property in arg){
			target[property] = source[property];
		}
	}
	return target;
}

// 多态
function add(){
	var arg = arguments,
		len = arg.length;
		switch(len){
			case 0:
				return 10;
			case 1:
				return 10+arg[0];
			case 2:
				return arg[0] + arg[1];
		}
}
console.log(add());
console.log(add(5));
console.log(add(6,7));
