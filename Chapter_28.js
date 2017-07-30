// 委托模式：度讴歌对象接受并处理同一请求，他们将请求委托给另一个对象同一处理请求
// 用委托模式封装一个事件委托方法，事件委托方法使用如下
delegate(document.body,"button","click",function(){
	console.log("委托成功");
});

function delegate(parent,childTag,event,fn){
	parent["on"+event]=function(e){
		var target = e &&e.target || window.event.srcElement;
		if (target.nodeName.toLowerCase() ==childTag) {
			fn();
		}
	}
}