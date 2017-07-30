// 外观模式
// 为一组复杂的子系统接口提供一个更高级的统一接口，通过这个借口使得对子系统接口的访问更容易

// 外观模式实现
function addEvent(dom,type,fn){
	// 对于支持DMO2级事件处理程序addEventListener方法的浏览器
	if (addEventListener) {
		dom.addEventListener(type,fn,false);
		// 对于不支持addEventListener的方法但支持attachEvent方法的浏览器
	}else if (dom.attachEvent) {
		dom.attachEvent("on"+type,fn);
		// 对于不支持addEventListener方法也不支持attachEvent方法，但支持on+"事件名"的了浏览器
	}else{
		dom["on"+type]=fn;
	}
}

// 获取事件对象
var getEvent = function (event){
	// 标准浏览器返回event.IE下window.event
	return event || window.event;
}
// 获取元素
var getTarget = function (event){
	var event = getEvent(event);
	// 标准浏览器下event.target，IE下event.srcElement;
	return event.target || event.srcElement;
}

// 阻止默认行为
var preventDefault = function (event){
	var event = getEvent(event);
	// 标准浏览器下
	if (event.preventDefault) {
		event.preventDefault();
	}else{
		// IE
		event.returnValue = false;
	}
}
// 用例
document.onclick = function (e){
	// 阻止默认行为
	preventDefault();
	if (getTarget(e)!==document.getElementById("myinput")) {
		hideInputSug();
	}
}