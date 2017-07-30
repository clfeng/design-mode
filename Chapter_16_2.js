// 格式化字符串
function formateString(str,data){
	return str.replace(/\{#(\w+)#\}/g,function (match,key){
		return typeof data[key]===undefined?"":data[key];
	});
}
// 基础导航
var Nav = function (data){
	// 基础导航样式模板
	this.item = '<a href="{#href#}" title="{#title#}">{#name#}</a>';
	// 创建空字符串
	this.html ="";
	// 格式化数据
	for(var i = 0,len = data.length;i<len;i++){
		this.html+=formateString(this.item,data[i]);
	}
	// 返回字符串数据
	return this.html;
}

// 带有消息提醒信息导航
var NumNav = function (data){
	// 消息提醒信息组件模板
	var tp1 = '<b>{#num#}</b>';
	// 装饰数据
	for(var i = data.length-1;i>=0;i--){
		data[i].name +=data[i].name + formateString (tp1,data[i]);
	}
	return Nav.call(this,data);
}

// 带有链接地址的导航
var LinkNav = function (data){
	// 链接地址模板
	var tp1 = '<span>{#link#}</span>';
	// 装饰数据
	for(var i =data.length-1;i>=0;i--){
		data[i].name +=data[i].name +formateString(tp1,data[i]);
	}
	// 继承基础导航类，并返回字符串
	return Nav.call(this,data);
}

// 获取导航容器
var nav = document.getElementById("content");
// 添加内容
nav.innerHTML = NumNav([
{
	href:"http://www.baidu.com",
	title:"百度一下，你就知道",
	name:"百度",
	num:"10"
},
{
	href:"http://www.taobao.com",
	title:"淘宝商城",
	name:"淘宝",
	num:"2"
},
{
	href:"http://www.qq.com",
	title:"腾讯首页",
	name:"腾讯",
	num:"3"
}
]);