/*// 统计代理
var Count = (function (){
	// 缓存图片(参考第二十二张，备忘录模式)
	var _img = new Image();
	return function (param){
		// 统计请求字符串
		var str = "http://www.count.com/a.gif?";
		// 拼接请求字符串
		for(var i in param){
			str += i +"="+param[i];
		}
		// 发送统计请求
		_img.src = str;
	}
})();
// 测试用例,统计num
Count({num:10});*/



// 网页动态插入<script>
function addScriptTag(src){
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.src = src;
	document.body.appendChild(script);
}

/*
同源策略
如果是一级域名相同，二级域名不同的网页，仅限于cookie和iframe的访问
可以设置document.domain相同来规避同源策略
cookie的也可以将domain设置为一级域名来规避
Set-Cookie: key=value; domain=.example.com; path=/



*/