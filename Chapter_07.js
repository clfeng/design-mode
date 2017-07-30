// 原型模式
/*// 图片轮播类
var LoopImages = function (imgArr,container){
	this.imagesArray = imgArr;//轮播图片数组
	this.container = container;//轮播图片容器
	this.createImage = function (){};//创建轮播图片
	this.changeImage = function (){};//切换轮播图片
}

// 上下滑动切换类
var SlideLoopImage = function (imgArr,container){
	// 构造函数继承图片播放类
	LoopImages.call(this,imgArr,container);
	// 重写继承的切换下一张图片方法
	this.changeIamge = function (){
		console.log("SlideLooImage changeImage function");
	}
}

// 渐隐切换类
var FadeLoopImage = function (imgArr,container,arrow){
	LoopImages.call(this.imgArr,container);
	// 切换箭头私有变量
	this.arrow = arrow;
	this.changeImage = function(){
		console.log("FadeLoopImage changeImage function");
	}
}

// 创建一个显隐轮播图片测试实例
var fadeImg = new FadeLoopImage([
	"01.jpg",
	"02.jpg",
	"03.jpg",
	"04.jpg"
	],"slide",[
	"left.jpg",
	"right.jpg"
	]);
fadeImg.changeImage();*/
/*
// 修改
// 图片轮播类
var LoopImages = function (imgArr,container){
	this.imagesArray = imgArr;//轮播图片数组
	this.container = container;//轮播图片容器
	
}
LoopImages.prototype = {
	// 创建轮播图
	createImage : function (){
		console.log("LoopImages createImage function");
	},
	//切换轮播图片
	changeImage : function (){
		console.log("LoopImages changeImage function");
	}
}
// 上下滑动切换类
var SlideLoopImage = function (imgArr,container){
	// 构造函数继承图片播放类
	LoopImages.call(this,imgArr,container);

}
SlideLoopImage.prototype = new LoopImages();
// 重写继承的切换下一张图片方法
SlideLoopImage.prototype.changeIamge = function (){
	console.log("SlideLooImage changeImage function");
}
// 渐隐切换类
var FadeLoopImage = function (imgArr,container,arrow){
	LoopImages.call(this,imgArr,container);
	// 切换箭头私有变量
	this.arrow = arrow;

}
FadeLoopImage.prototype = new LoopImages();
FadeLoopImage.prototype.changeImage = function(){
	console.log("FadeLoopImage changeImage function");
};



// 创建一个显隐轮播图片测试实例
var fadeImg = new FadeLoopImage([
	"01.jpg",
	"02.jpg",
	"03.jpg",
	"04.jpg"
	],"slide",[
	"left.jpg",
	"right.jpg"
	]);
// fadeImg.changeImage();
// console.log(fadeImg.container);

LoopImages.prototype.getImageLength = function (){
	return this.imagesArray.length;
};
LoopImages.prototype.getContainer = function (){
	return this.container;
};

console.log(fadeImg.getImageLength());
console.log(fadeImg.getContainer());*/


/***
*基于已经存在的模板对象克隆出新对象的模式
*arguments[0],arguments[1],arguments[2]:参数1，参数2，参数3，表示模板对象
*注意。这里对模板引用类型的属性实质上进行了浅复制(引用类型属性共享),当然根据需求可以自行深复制(引用类型属性复制)
*/
function prototypeExtend(){
	var F = function (){},
		args = arguments,
		i=0,
		len=arguments.length;
		for(;i<len;i++){
			// 遍历每个模板对象中的属性
			for(var j in args[i]){
				// 将这些属性复制到缓存类原型中
				F.prototype[j] =args[i][j];
			}
		}
	// 返回缓存类的一个实例
	return new F();
}
// 示例
var penguin = prototypeExtend({
	speed:20,
	swim:function (){
		console.log("游泳速度"+this.speed);
	}
	},{
		run : function (speed){
			console.log("奔跑速度"+speed);
		}
	},{
		jump:function (){
			console.log("跳跃动作");
		}	
	});
penguin.swim();
penguin.run(10);
penguin.jump();