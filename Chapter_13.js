// 桥接模式
// 提取共同点
// 抽象
/*function changeColor(dom,color,bg){
	// 设置元素的字体颜色
	dom.style.color = color;
	// 设置元素的字体颜色
	dom.style.background = bg;
}

var spans = document.getElementsByTagName("span");
spans[0].onmouseover = function (){
	changeColor(this,"red","#ddd");
}

*/



// 多元化对象
// 多维变量类
// 运动单元
function Speed(x,y){
	this.x =x;
	this.y =y;
}
Speed.prototype.run = function (){
	console.log("运动起来");
}

// 着色单元
function Color(cl){
	this.color = cl;
}
Color.prototype.draw = function (){
	console.log("绘制色彩");
}
// 变形单元
function Shape (shape){
	this.shape = shape;
}
Shape.prototype.change = function (){
	console.log("change shape");
}
// 说话单元
function Speek (wd){
	this.wd =wd;
}
Speek.prototype.say  = function (){
	console.log("font family");
}
// 创建一个球类
function Ball(x,y,c){
	// 实现运动单元
	this.speed = new Speed(x,y);
	// 实现着色单元
	this.color = new Color(c);

}
Ball.prototype.init = function (){
	this.speed.run();
	this.color.draw();
}

// 创建一个人物类
function People(x,y,f){
	this.speed = new Speed(x,y);
	this.font = new Speek(f);
}
People.prototype.init= function (){
	this.speed.run();
	this.font.say();
}

var p = new People(10,12,16);
p.init();

/*function method(oldObj,method,fn){
	oldObj.method = fn;

}*/