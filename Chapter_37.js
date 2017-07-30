// Widget:(Web widget 指的是一块可以在任意页面中执行的代码块)：
// Widget 模式是指借用Web Widget思想将页面分解成不见，针对不见开发，最终组合成完成的页面
// 模板引擎模块
F.module("lib/template",function(){
	/****
	*模板引擎 处理数据与编译模板入口
	*@param str 模板容器id或者模板字符串
	*@param data渲染数据
	*/
	var _TplEngine = function (str,data){
		// 如果数据是数组
		if (data instanceof Array) {
			// 缓存渲染模板结果
			var html ="",
			// 数据索引
					i =0,
			// 数据长度
					len = data.length;
			// 遍历数据
			for(; i<len;i++){
				// 缓存模板渲染结果，也可写成html+=arguments.callee(str,data[i]);
				html+=_getTpl(str)(data[i]);
			}
			// 返回模板渲染最终结果
			return html;
		}else{
			// 返回模板渲染结果
			// console.log(_getTpl(str).toString());
		return _getTpl(str)(data);
		}
	},
	/***
	*获取模板
	*@param str 模板容器id或者模板字符串
	*/
	_getTpl=function(str){
		// 获取元素
		var ele = document.getElementById(str);
		// 如果元素存在
		if(ele){
			// 如果是input或者textarea表单元素，则获取该元素的value值，否则获取元素内容
			var html = /^(textarea|input)$/i.test(ele.nodeName)?ele.value:ele.innerHTML;
			// 编译模板
			return _compileTpl(html);
		}else{
			// 编译模板
			return _compileTpl(str);
		} 
	},
// 编译执行
	_compileTpl = function(str){
		var fnBody =[
				"var template_array=[];",
				"var fn=(function(data){",
				"var template_key='';",
				"for(key in data){",
					"template_key +=('var '+key+'=data[\"'+key+'\"];');",
				"}",
				"eval(template_key);",
				"template_array.push('"+_dealTpl(str)+"');",
				"template_key =null;",
				"})(templateData);",
				"fn=null",
				"return template_array.join('');"
		].join("\n");
		return new Function("templateData",fnBody);
	},
// 处理模板
	_dealTpl = function(str){
		var _left='{%',	//左分隔符
				_right ="%}";	//右分隔符
		// 显示转化为字符串
		return String(str)
			// 转义标签内< 如: <div>{% if(a&lt;b)%}</div> -><div>{%if(a<b)%}</div>div>
											.replace(/&lt;/g,'<')
											// 转义标签内的>
											.replace(/&gt;/g,'>')
											// 过滤回车符，制表符，回车符
											.replace(/[\r\t\n]/g,'')
											// 替换内容
											.replace(new RegExp(_left+'=(.*?)'+_right,'g'),"',typeof($1)==='undefined'?'':$1,'")
											// 替换左分隔符
											.replace(new RegExp(_left,'g'),"');")
											// 替换右分隔符
											.replace(new RegExp(_right,'g'),"template_array.push('");
	}
	return _TplEngine;
});

