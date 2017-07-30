// 节流模式：对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能
// 节流器
// 有两个功能，一个是通过计时器句柄清除前面的函数，另一个是延迟函数的执行(在此之前会先执行节流器的第一个功能清除前面的函数)
var throttle = function (){
	// 获取第一个参数
	var isClear = arguments[0],fn;
	// 如果第一个参数是boolean类型那么第一个参数则表示是否清除计时器
	if (typeof isClear ==="boolean") {
		// 第二个参数则为函数
		fn = arguments[1];
		// 函数的计时器句柄存在，就清除该计时器
		fn._throttleID && clearTimeout(fn._throttleID);
		// 通过计时器延迟函数的执行
	}else{
		// 第一个参数为函数
		fn = isClear;
		// 第二个参数为函数执行时的参数
		param = arguments[1];
		// 对执行时的参数适配默认值，这里我们用到以前学过的extend方法
		var p = extend({
			context:null,			//执行函数执行时的作用域
			args:[],					//执行函数执行时的相关参数(IE下要为数组)
			time:300					//执行函数延迟执行的时间
		},param);
		// 清除执行函数计时器句柄
		arguments.callee(true,fn);
		// 为函数绑定计时器句柄，延迟执行函数
		fn._throttleID = setTimeout(function(){
			// 执行函数
			fn.apply(p.context,p.args);
		},p.time);
	}
	function extend(){
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
	}
}

function $(id){
	return document.getElementById(id);
}
function $tag(tag,container){
	container = container || document;
	return container.getElementsByTagName(tag);
}
// 浮层类
var Layer = function (id){
	// 获取容器
	this.container = $(id);
	// 获取容器中的浮层容器
	this.layer = $tag("div",this.container)[0];
	// 获取icon容器
	this.lis = $tag("li",this.container);
	// 获取二维码图片
	this.imgs = $tag("img",this.container);
	// 绑定事件
	this.bindEvent();
}
Layer.prototype = {
	// 绑定交互事件
	bindEvent:function (){
		// 缓存当前对象
		var that = this;
		// 隐藏浮层
		function hideLayer(){
			that.layer.className = "";
		}
		// 显示浮层
		function showLayer(){
			that.layer.classNAme = "show";
		}
		// 鼠标光标移入事件
		that.on(that.container,"mouseenter",function (){
			// 清除隐藏浮层方法计时器
			throttle(true,hideLayer);
			// 延迟浮现层方法
			throttle(showLayer);
		}).on(that.container,"mouseleave",function (){
			// 延迟浮现层隐藏方法
			throttle(hideLayer);
			//清除浮现层方法计时器
			throttle(true,showLayer);
		});
	 	// 遍历icon绑定事件
	 	for(var i = 0;i<that.lis.length;i++){
	 		// 自定义属性index
	 		that.lis[i].index=i;
	 		// 为每个li元素绑定鼠标移入事件
	 		that.on(that.lis[i],"mouseenter",function (){
	 			// 获取自定义属性index
	 			var index = this.index;
	 			// 排除所有img的show类
	 			for(var i =0;i<that.imgs.length;i++){
	 				that.imgs[i].className = "";
	 			}
	 			// 为目标图片设置show类
	 			that.imgs[index].className="show";
	 			// 重新定义浮层位置
	 			that.layer.style.left = -22 +60*index+"px";
	 		})
	 	}
	},
	// 事件绑定方法
	on:function (ele,type,fn){
		ele.addEventListener? ele.addEventListener(type,fn,false):ele.attachEvent("on"+type,fn);
		return this;
	}
}

var layer=new Layer("icon");
