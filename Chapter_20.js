/****
*异步请求对象(简化版本)
*参数data 	请求数据
*参数dataType	相应数据处理对象
*参数dom		事件源
*/

var sendData = function (data,dealType,dom){
	// xhr对象，简化版本，IE另行处理
	var xhr = new XMLHttpRequest(),
			// 请求路径
			url = 'getData.php?mode=userInfo';
			// 返回请求路径
			url.onload = function (event){
				// 请求成功
				if ((xhr.status>=200 && xhr.status<300)||xhr.status == 304) {
					dealData(xhr.responseText,dealType,dom);
				}else{
					// 请求失败
				}
			};
			// 拼接请求字符串
			for(var i in data){
				url+="&"+i+"="+data[i];
			}
			// 发送异步请求
			xhr.open("get",url.true);
			xhr.send(null);
}

/**
*处理响应数据
*参数data 响应数据
*参数dataType 响应数据处理对象
*参数dom 事件源
*/
var dealData = function (data,dealType,dom){
	// 对象toString方法简化引用
	var dataType = Object.prototype.toString.call(data);
	// 判断相应数据处理对象
	switch(dealType){
		case "sug":
		// 如果数据为数组
		// if (data === "[object Array]") {
		if (data instanceof Array) {
			// 创建提示框组件
			return createSug(data,dom);
		}
		// 将相应的对象数据转化为数组
		// if (data ==="object Object") {
		if (data instanceof Object) {
			var newData = [];
			for(var i in data)
				newData.push(data[i]);
			// 创建提示框组件
			return createSug(newData,dom)
		}
		// 将相应的其他数据转化为数组
		return  createSug([data],dom);
		break;
		case "validate":
		// 创建校验组件
		return createValidataResult(data,dom);
		break;
	}
}

/****
*创建提示框组件
*参数data 响应适配数据
*参数dom 事件源
*/
// var createSug = function(data,dom){
// 	var i = 0,
// 		len =data.length,
// 		html="";
// 		// 拼接每一条提示语句
// 		for(;i<len;i++){
// 			html +="<li>"+data[i]+"</li>";
// 		}
// 		// 显示提示框
// 		dom.parentNode.getElementByTagName("ul")[0].innerHTML =html;
// }

/***
*创建校验组件
*参数data 响应适配数据
*参数dom 	事件源
*/
// var createValidataResult = function(data,dom){
// 	// 显示校验结果
// 	dom.parentNode.getElementByTagName("span")[0].innerHTML = data;
// }
var createSug = function (data,dom){
	console.log(data,dom,"createSug");
};
var createValidataResult = function(data,dom){
	console.log(data,dom,"createValidataResult");
};
var input = document.getElementsByTagName("input");
// 测试数据
// dealData("用户名不正确","validate",input[0]);
// dealData(123,"sug",input[1]);
// dealData(["爱奇艺","阿里巴巴","爱漫画"],"sug",input[1]);
// dealData({
// 	"iqy":"爱奇艺",
// 	"albb":"阿里巴巴",
// 	"imh":"爱漫画",
// },"sug",input[1]);

input[0].onchange = function (e){
	sendData({value:input[0].value},"validate",input[0]);
}
input[1].onkeydown = function(e){
	sendDats({value :input[1].value},"sug",input[1]);
}