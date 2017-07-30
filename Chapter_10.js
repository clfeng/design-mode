// 适配器模式：将一个类（对象）的接口(方法或属性)转化成另外一个接口，
// 以满足用户需求，使类(对象)之间接口的不兼容问题通过适配器得以解决
A(function(){
	A("button").on("click",function(e){
		// ....
	});
});
// 适配相似框架
window.A = A = jQuery;


//适配异类框架
var A = A || {};
// 通过ID获取元素
A.g = function (id){
	return document.getElementById(id);
}
// 为元素绑定时间
A.on = function (id,type,fn){
	// 如果传递参数是字符串则以id处理，否则以元素对象处理
	var dom = typeof id === "string"? this.g(id):id;
	// 标准dom2级添加事件
	if (dom.addEventListener) {
		dom.addEventListener(type,fn,false);
	}else if (dom.attachEvent) {
		dom.attachEvent("on"+type,fn);
	}else{
		dom["on"+type]=fn;
	}
};
// 需求：窗口加载完成事件
A.on(window,"load",function(){
	// 按钮点击事件
	A.on("mybutton","click",function (){
		// do something
	})
});
// 适配器
A.g=function (id){
	// 通过jQuery获取jQuery对象，然后返回第一个成员
	return $(id).get(0);
}
A.on = function (id,type,fn){
	// 如果传递参数字符串则以id处理，否则以元素对象处理
	var dom = typeof id ==="string"? $("#"+id):$(id);
		dom.on(type,fn);
}



// 服务器端数据适配
// 为简化模型，这里使用jQuery的ajax方法 理想数据是一个一维数组
function ajaxAdapter(data){
	// 处理数据并返回新数据
	return [data["key1"],data["key2"],data["key3"]];
}
$.ajax({
	url:"someAdress.php",
	success:function(data,status){
		if (data) {
			// 使用适配后的数据--返回的对象
			doSomething(ajaxAdapter(data));
		}
	}
})


























