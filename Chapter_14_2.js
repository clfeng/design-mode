//组合模式实现form表单

// 抽象基类，实现统一接口
function Base(){
	this.children = [];
	this.element = null;
}

Base.prototype = {
	init : function (){
		throw new Error("请重写你的方法");
	},
	add: function (){
		throw new Error("请重写你的方法");
	},
	getElement: function (){
		throw new Error("请重写你的方法");
	}
};

function inheritPrototype(subClass,superClass){
	function F(){};
	F.prototype = superClass.prototype;
	var f = new F();
	subClass.prototype =f;
}

function FormItem(id,parent){
	Base.call(this);
	this.id = id;
	this.parent = parent;
	this.init();
}

inheritPrototype(FormItem,Base);

FormItem.prototype.init = function (){
	this.element = document.createElement("form");
	this.element.id = this.id;
	this.element.className = "form-container";
}

FormItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
FormItem.prototype.getElement = function (){
	return this.element;
}

FormItem.prototype.show = function (){
	this.parent.appendChild(this.element);
}


//创建一个fieldset类
function FieldsetItem(id,legend){
	Base.call(this);
	this.id = id;
	this.legend = legend;
	this.init();
}
inheritPrototype(FieldsetItem,Base);

FieldsetItem.prototype.init = function (){
	this.element = document.createElement("fieldset");
	var legendElement = document.createElement("legend");
	var text = document.createTextNode(this.legend);
	legendElement.appendChild(text);
	this.element.appendChild(legendElement);
	this.element.id = this.id;
}

FieldsetItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
FieldsetItem.prototype.getElement = function (){
	return this.element;
}

function Group(classname){
	Base.call(this);
	this.classname = classname || "";
	this.init();
}
inheritPrototype(Group,Base);

Group.prototype.init = function (){
	this.element = document.createElement("div");
	this.element.className = this.classname;
}

Group.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
Group.prototype.getElement = function (){
	return this.element;
}

function LabelItem(forId,text){
	Base.call(this);
	this.forId = forId;
	this.text = text;
	this.init();
}

inheritPrototype(LabelItem,Base);

LabelItem.prototype.init = function (){
	this.element = document.createElement("label");
	this.element.innerHTML = this.text;
	this.element.for = this.forId;
}

LabelItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
LabelItem.prototype.getElement = function (){
	return this.element;
}

function InputItem(id){
	Base.call(this);
	this.id = id;
	this.init();
}
inheritPrototype(InputItem,Base);

InputItem.prototype.init = function (){
	this.element = document.createElement("input");
	this.element.name = this.id;
	this.element.id = this.id;
}

InputItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
InputItem.prototype.getElement = function (){
	return this.element;
}

function SpanItem(text){
	Base.call(this);
	this.text = text;
	this.init();
}
inheritPrototype(SpanItem,Base);

SpanItem.prototype.init = function (){
	this.element = document.createElement("span");
	this.element.appendChild(document.createTextNode(this.text));
}

SpanItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
SpanItem.prototype.getElement = function (){
	return this.element;
}

function TextareaItem(text,rows,cols){
	Base.call(this);
	this.text = text;
	this.rows = rows;
	this.cols = cols;
	this.init();
}
inheritPrototype(TextareaItem,Base);

TextareaItem.prototype.init = function (){
	this.element = document.createElement("textarea");
	this.element.rows =this.rows;
	this.element.cols = this.cols;
	this.element.appendChild(document.createTextNode(this.text));

}

TextareaItem.prototype.add = function (child){
	this.children.push(child);
	this.element.appendChild(child.getElement());
	return this;
};
TextareaItem.prototype.getElement = function (){
	return this.element;
}
var form = new FormItem("FormItem",document.body);
form.add(
	new FieldsetItem("account","账号").add(
		new Group().add(
			new LabelItem("user_name","用户名:")
			).add(
			new InputItem("user_name")
			).add(
			new SpanItem("4到6位数字或字母")
			)
			).add(
			new Group().add(
				new LabelItem("user_password","密&emsp;码:")
				).add(
				new InputItem("user_password")
				).add(
				new SpanItem("6到12位数字或密码")
				)
				)
			).add(
			new FieldsetItem("information","信息").add(
				new Group().add(
					new LabelItem("nickName","昵称:")
					).add(
					new InputItem("nickName")
					)
					).add(
					new Group().add(
						new LabelItem("status","状态:")
						).add(
						new InputItem("status")
						)
						)
					)
			.show();