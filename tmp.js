/*var template_array = [];
var fn =(function (data){
	var template_key = "";
	for(key in data){
		template_key +=('var'+key+'=data[\"'+key+'\"];');
		eval (template_key);
		template.array.push('"+_dealTpl(str)+"');
		template_key=null;
	}
})(templateData);
fn=null;
return template_array.join('');*/
/*
{%for(var i =0,len =tagCloud.length;i<len;i++){%}
	{%var ctx = tagCloud[i];%}
	<a href="#" class="tag_item"
	{%if (ctx['is_selected']) {%}
		selected
	{%}%}
	"tittle="{%=ctx["title"]%}>{%=ctx["text"]%}</a>
{%}%}
*/
/*function(str){
		var fnBody = "var template_arry=[];\nvar fn =(function (data){\nvar template_key = "";\nfor(key in data){\n"+
		"template_key +=('var'+key+'=data[\"'+key+'\"];');\neval (template_key);\ntemplate.array.push('"+_dealTpl(str)+"');\n"+
		"template_key=null;\n}\n})(templateData);\nfn=null;\nreturn template_array.join('');\n"
		return new Function("templateData",fnBody);
	}*/
	function(str){
		var fnBody = [
					'var template_arr=[]',
					'var fn=(function(data){',
					'var template_key="";',
					'for(key in data{',
						'template_key +=("var"+key+"=data[\'key\'];);',
					'}',
					'eval(template_key);',
					'template_array.push('

					"})"
		]
	}

	function(str){
		var fnBody=[
				"var template_arr=[];",
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
		].join("");
	}


	var fnBody = "var template_arry=[];\nvar fn =(function (data){\nvar template_key = "";\nfor(key in data){\n"+
		"template_key +=('var'+key+'=data[\"'+key+'\"];');\neval (template_key);\ntemplate.array.push('"+_dealTpl(str)+"');\n"+
		"template_key=null;\n}\n})(templateData);\nfn=null;\nreturn template_array.join('');\n"