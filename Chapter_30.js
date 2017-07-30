// 节流模式：对重复的业务逻辑进行节流控制，执行最后一次操作并取消其他操作，以提高性能
// 节流器
var throttle = function (){
	// 获取第一个参数
	var isClear = arguments[0],fn;
	// 如果第一个参数是boolean类型那么第一个参数则表示是否清楚计时器
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
// 返回顶部按钮动画
function moveScroll(){
	var top = $(document).scrollTop();
	$("#back").animate({top:top+300},400,"easeOutCubic");
}
// 监听页面滚动条事件
$(window).on("scroll",function(){
	// 节流执行返回顶部按钮动画
	throttle(moveScroll);
	console.log("---");

})