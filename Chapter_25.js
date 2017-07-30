// 迭代器模式：在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素
// 迭代器
var Iterator = function(items,container){
	// 获取父容器，若container参数存在，并且可以获取该元素则获取，否则获取document
	var container = container && document.getElementById(container) || document,
	// 获取元素
	items = document.getElementsByTagName(items),
	// 获取元素长度
	length = items.length,
	// 当前索引值，默认 0
	index = 0;
	// 缓存源生数组splice方法
	var splice = [].splice;
	return {
		// 获取第一个元素
		first: function(){
			index = 0;
			return items[index];
		},
		// 获取最后一个元素
		seconde:function(){
			index = length-1;
			return items[index];
		},
		// 获取前一个元素
		pre:function(){
			if (--index>0) {
				return items[index];
			}else{
				index = 0;
				return null;
			}
		},
		// 获取后一个元素
		next:function(){
			if (++index<length) {
				return items[index];
			}else{
				index = length -1;
				return null;
			}
		},
		// 获取某一个元素
		get:function(num){
			// 如果num大于等于0再获取正向获取，否则逆向获取
			index = num >=0?num %length:num%length+length;
			return items[index];
		},
		// 对每一个元素执行某一个方法
		dealEach:function(fn){
			// 第二个参数开始为回调函数中参数
			var args = splice.call(arguments,1);
			// 遍历元素
			for(var i =0;i<length;i++){
				fn.apply(items[i],args);
			}
		},
		// 对某一个元素执行某一个方法
		dealItem:function(num,fn){
			// 对元素执行回调函数，注 1 第三个参数开始为回调函数中参数 2 通过this.get方法设置idnex索引值
			fn.apply(this.get(num),splice.call(arguments,2));
		},
		//排他方式处理某一个元素
		exclusive:function(num,allFn,numFn){
			// 对所有元素执行回调函数
			this.dealEach(allFn);
			// 如果num类型为数组
			if (Object.prototype.toString.call(num)==="[object Array]") {
				// 遍历num数组
				for(var i = 0,len=num.length;i<len;i++){
					// 分别处理数组中每一个元素
					this.dealItem(num[i],numFn);
				}
			}else{
				// 处理第num个元素
				this.dealItem(num,numFn);
			}
		}
	}
}

var demo = new Iterator("li","container");
// console.log(demo.first());
// console.log(demo.pre());
// console.log(demo.next());
// console.log(demo.get(2000));
// demo.dealEach(function (text,color){
// 	this.innerHTML = text;
// 	this.style.background = color;
// },"test","pink");
// 排他思想处理第3个与第4个元素
/*demo.exclusive([2,3],function(){
	this,innerHTML = "被排除的";
	this.style.background = "green";
},function(){
	this.innerHTML = "选中的";
	this.style.background = "red";
})
*/


// 数组迭代器
/*var eachArray = function (arr,fn){
	var i=0,
			len = arr.length;
	// 遍历数组
	for(;i<len;i++){
		// 依次执行回调函数，注意回调函数中传入的参数第一个为索引，第二个为该索引对应的值
		if (fn.call(arr[i],i,arr[i])===false) {
			break;
		}
	}
}*/

// 对象迭代器
/*var eachObject = function (obj,fn){
	for(var i in obj){
		// 依次执行回调函数，注意回调函数中传入的参数第一个为属性，第二个为该属性对应的值
		if (fn.call(obj[i],i,obj[i])===false) {
			break;
		}
	}
}*/
// 数组迭代器和独享迭代器的组合函数
function eachArrObj(obj,fn){

	var eachObject = function (obj,fn){
	for(var i in obj){
		// 依次执行回调函数，注意回调函数中传入的参数第一个为属性，第二个为该属性对应的值
		if (fn.call(obj[i],i,obj[i])===false) {
			break;
		}
	}
}
	var eachArray = function (arr,fn){
	var i=0,
			len = arr.length;
	// 遍历数组
	for(;i<len;i++){
		// 依次执行回调函数，注意回调函数中传入的参数第一个为索引，第二个为该索引对应的值
		if (fn.call(arr[i],i,arr[i])===false) {
			break;
		}
	}
}
 
}
// 创建一个数组
for(var arr=[],i=0;i<5;arr[i++]=i);
	console.log(arr);
/*eachArray(arr,function(i,data){
	console.log(i,data);
});*/
eachArrObj(arr,function(i,data){
	console.log(i,data);
});
var obj = {
	a:23,
	b:56,
	c:67
};
eachArrObj(obj,function(i,data){
	console.log(i,data);
});
/*eachObject(obj,function(i,data){
	console.log(i,data);
});*/

/*
// 同步变量
var A ={
	// 所有用户共有
	common:{},
	// 客户端数据
	client:{
		user:{
			username:"雨夜清河",
			uid:"123"
		}
	},
	// 服务器端数据
	server:{}
}
// 同步变量迭代取值器
AGetter = function (key){
	// 如果不存在A则返回未定义
	if (!A) {
		return undefined;
	}
	var result = A;		//获取同步变量A
	key = key.split(".");	//解析属性层次序列
	// 迭代同步变量A对象属性
	for(var i =0,len=key.length;i<len;i++){
		// 如果第i层属性存在对应的值则迭代该属性
		if (result[key[i]]!==undefined) {
			result = result[key[i]];
			// 如果不存在则返回未定义
		}else{
			return undefined;
		}
	}
	// 返回获取的结果
	return result;
}

// console.log(AGetter("client.user.username"));
// console.log(AGetter('server.lang.local'));

// 同步变量迭代器
ASetter = function(key,val){
	// 如果存在A则返回未定义
	if (!A) return false;
	var result = A;
	key = key.split(".");
	// 迭代同步变量A对象属性
	for(var i =0,len = key.length;i<len-1;i++){
		// 如果第i层属性对应的值不存在，则定义为对象
		if (result[key[i]]===undefined) {
			result[key[i]]={};
		}
		// 如果第i层属性对应的值不是对象（object）的一个实例，则判处错误
		if (!(result[key[i]] instanceof Object)) {
			throw new Error("A."+key.splice(0,i+1).join(".")+"is not Object");
			return false;
		}
		// 迭代该层属性值
		result = result[key[i]];
	}
	// 返回设置成功的属性
	return result[key[i]]=val;
}
// 缓存添加体育新闻模块数据
console.log(ASetter("client.module.new.sports","on"));
console.log(ASetter("client.user.username.sports","on"));*/