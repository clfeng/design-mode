// 亨元模式
// 运用共享技术有效地支持大量的细微对象，避免对象间拥有相同的内容造成多余的开销	

/*var dom = null,//缓存创建的新闻标题元素
paper = 0,//当前页数
num = 5,//每页显示新闻
i = 0,//创建新闻元素时保存变量
len = article.length;//新闻数据长度
for(;i<len;i++){
	dom = document.createElement("div");//创建包装新闻标题元素
	dom.innerHTML = article[i];//向元素中添加新闻标题
	if (i>=num) {//默认显示第一页
		dom.style.display = "none";//超出第一页新闻隐藏
	}
	document.getElementById("container").appendChild(dom);//添加到页面中
}

// 获取所有新闻标题包装元素
j = k = n = 0;
n = ++paper%Math.ceil(len/num)*num;//j,k循环变量，n当前显示的第一个新闻序号
for (;j <len;j++){
	div[j].style.display = "none";
}
for(;k<5;k++){
	if (div[n+k]) {
		div[n+k].style.display = "block";//显示当前新闻
	}
}
*/

var Flyweight = function (){
	// 已创建的元素
	var created = [];
	// 创建一个新闻包装容器
	function create (){
		var dom = document.createElement("div");
		// 将容器插入新闻列表容器中
		document.getElementById("container").appendChild(dom);
		// 缓存新创建的元素
		created.push(dom);
		// 返回创建的元素
		return dom;
	}
	return {
			// 获取创建新闻元素方法
			getDiv:funciton (){
				// 如果已创建的元素小于当前页元素总个数，则创建
				if (created.length<5) {
					return create();
				}else{
					// 获取第一个元素，并插入最后面
					var div = create.shift();
					created.push(div);
					return div;
				}
			}
		}
	}();

	var paper = 0,
	num = 5,
	len = article.length;
// 添加5条新闻
for (var i =0; i<5;i++){
	if (article[i]) {
		Flyweight.getDiv().innerHTML = article[i];	
	}
}
// 下一页按钮绑定事件
document.getElementById("next_page").onclick = function (){
	// 如果新闻内容不足5条则返回
	if (article.length <5) {
		return;
	}
	var n = ++paper*num %len,
	j=0;
	// 插入5条新闻
	for(;j<5;j++){
		// 如果存在第n+j条则插入
		if (article[n+j]) {
			Flyweight.getDiv().innerHTML = article[n+j];
			// 否则插入起始位置第n+j-len条
		}else if (article[n+j-len]) {
			Flyweight.getDiv().innerHTML = article[n+j-len];
			// 如果都不存在则插入空字符串
		}else{
			Flyweight.getDiv().innerHTML = "";
		}
	}
}