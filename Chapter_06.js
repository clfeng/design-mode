// 创建一个人类
var Human = function (param){
	// 技能
	this.skill = param && param.skill || "保存";
	// 兴趣爱好
	this.hobby = param && param.skill || "保存";

}
// 人类原型方法
Human.prototype = {
	getSkill:function (){
		return this.skill;
	},
	getHobby:function (){
		return this.hobby;
	}
}

// 实例化姓名类
var Name = function (name){
	var that = this;
	// 构造器
	// 构造器解析姓名的姓和名
	(function (name,that){
		that.wholeName = name;
		if (name.indexOf(" ")>-1) {
			that.FirstName = name.slice(0,name.indexOf(" "));
			that.secondName = name.slice(name.indexOf(" "));
		}
	})(name,that);
}

// 实例化职位类
var Work = function (work){
	var that = this;
	// 构造器
	// 构造函数中通过传入职位特征来设置相应职位以及描述
	(function (work,that){
		switch(work){
			case "code":
				that.work = "工程师";
				that.workDescript ="每天沉醉于编程";	
				break;
			case "UI":
			case "UE":
				that.work = "设计师";
				thart.workDescript ="设计更似一种艺术";
				break;
			case "teach":
				that.work="教师";
				thart.workDescript = "分享也是一种快乐";
				break;
			default :
				that.work = work;
				thart.workDescript = "对不起，我们还不清楚您所选择职位的相关描述";

		}
	})(work,that);

}
// 更换期望职位
Work.prototype.changeWork = function (work){
	this.work = work;
}
// 添加对职位的描述
Work.prototype.chagneDescript = function (setence){
	this.workDescript = setence;
}

/****
*应聘者建造者
*参数name:姓名(全名)
*param work : 期望职位

*/
var Person = function (name,work){
	// 创建应聘者缓存对象
	var _person = new Human;
	// 创建应聘者姓名解析对象
	_person.name = new Name(name);
	// 创建应聘者期望职位
	_person.work = new Work(work);
	// 将创建的应聘者对象返回
	return _person;
}


var person = new Person("xiao ming","code");
console.log(person.skill);
console.log(person.name.FirstName);
console.log(person.work.work);
console.log(person.work.workDescript);
person.work.chagneDescript("更改一下职位描述！");
console.log(person.work.workDescript);

// 工厂模式追求的是创建的结果
// 建造者模式不仅得到创建的结果，也参与了创建的具体过程，对创建的具体实现的细节也参与了干涉

// 在建造中模式中我们关心的是对象创建过程，因此我们通常将创建对象的类模块化，
// 这样使被创建的类的每一个模块都可以得到灵活的运用与高质量的复用

// 个人：对创建过程的关注体现在将创建对象的类模块化