// 简单模板模式：通过格式化字符串拼凑出视图避免创建视图时大量节点操作。优化内存开销
// 命名空间
var A =A||{};
// 主体展示区内容
A.root = document.getElementById("container");
// 创建视图方法集合
A.strategy={
	// 文字列表展示
	"listPart":function (){

		// 模块容器
		var s = document.createElement("div"),
		// 列表字符串
				ul="",
				// 列表数据
				ldata =data.data.li,
				// 模块模板
				tpl=[
				'<h2>{#h2#}</h2>',
				'<p>{#p#}</p>',
				'<ul>{#ul#}</ul>'
				].join(""),
				// 列表项模板
				liTpl=[
						'<li>',
							'<strong>{#strong#}</strong>',					
							'<span>{#span#}</span>',					
						'</li>'
				].join("");
/*	
		//进一步优化
		// ...
		// 模板
		tpl = A.view(["h2","p","ul"]);
		// 列表想模板
		liTpl = A.formateString(A.view("li"),{li:A.view(["strong","span"])});
*/					
		// 有id设置模块id
		data.id && (s.id = data.id);
		// 遍历列表数据
		for(var i =0,len = ldata.length;i<len;i++){
			// 如果有列表项数据
			if (ldata[i].em || ldata[i].span) {
				// 列表字符串追加一项列表项
				ul +=A.formateString(liTpl,ldata[i]);
			}
		}
		// 装饰列表数据
		data.data.ul = ul;
		// 渲染模块并插入模块中
		s.innerHTML = A.formateString(tpl,data.data);
		// 渲染模块
		A.root.appendChild(s);

	},
	"codePart":function (){},
	"onlyTime":function (){},
	"guide":function (){}
	// ...
}
// 创建视图入口
A.init=function (data){
	// 根据传输的视图类型创建视图
	this.strategy[data.type](data);
}

// 模板渲染方法
A.formateString = function (str,data){
	return str.replace(/\{#(\w+)#\}/g,function (match,key){
		return typeof data[key]===undefined? "":data[key];
	});
}

// 模板生成器
A.view = function (name){
	// 模板库
	var v = {
		// 代码模板
		code:'<pre><code>{#code#}</code></pre>',
		// 图片模板
		img:'<img src="{#src#}" alt="{#alt#} title="{#title#}"/>',
		// 带有id和类的模块模板
		part:'<div id="{#id#}" class="{#class#}">{#part#}</div>',
		// 组合模板
		theme:[
					'<div>',
					'<h1>{#title#}</h1>',
					'{#content#}',
					'</div>'
		].join("")
	}
	// 如果参数是一个数组，则返回多行模板
	if (Object.prototype.toString.call(name)==="[Object Array]") {
		// 模板缓存器
		var tpl="";
		// 遍历标识
		for(var i =0,len = name.length;i<len;i++){
			// 模板缓存追加模板
			tpl+=arguments.callee(name[i]);
		}
		// 返回最终模板
		return tpl;
	}else{
		// 如果模板库中有该模板则返回该模板，否则返回简易模板
		return v[name]?v[name]:('<'+name+'>{#'+name+'#}</'+name+'>');
	}
}

