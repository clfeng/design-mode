// 解释器模式：对于一种语言，给出其文法表示形式，并定义一种解释器，通过使用这种解释器来解释语言中定义的语句

// 遍历文档树
var Interpreter = (function (){
	// 获取兄弟元素名称
	function getSublingName(node){
		// 如果存在兄弟元素
		if (node.previousSibling) {
			var name="",//返回的兄弟元素名称字符串
					count=1,//紧邻兄弟元素中相同名称元素个数
					node=node.nodeName,//原始节点名称
					sibling = node.previousSibling;//前一个兄弟元素
			// 如果存在前一个兄弟元素
			while(sibling){
				// 如果节点为元素 并且节点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名陈存在
				if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
					// 如果节点名称和前一个兄弟元素名称相同
					if (nodeName == sibling.nodeName) {
						// 节点名称后面添加计数
						name += ++count;
					}else{
						// 重置相同紧邻节点名称节点个数
						count = 1;
						// 追加新的节点名称
						name +="|"+sibling.nodeName.toUpperCase();
					}
				}
				// 向前获取前一个兄弟元素
				sibling = sibling.previousSibling;
			}
			return name;
			// 否则不存在兄弟元素返回
		}else{
			return "";
		}
	}
	// 参数1 node 目标节点 参数二 wrap：容器节点
	return function (node,wrap){
		// 路径数组
		var path =[],
		// 如果不存在容器节点，默认为document
				wrap = wrap || document;
		// 如果当前（目标）节点等于容器节点
		if (node == wrap) {
			// 容器节点为元素
			if (wrap.nodeType ==1) {
				path.push(wrap.nodeName.toUpperCase());
			}
			// 返回最终路径数组结果
			return path;
		}
		// 如果当前节点的父节点不等于容器节点
		if (node.parentNode !==wrap) {
			// 对当前节点的父节点执行遍历操作
			path = arguments.callee(node.parentNode,wrap);
		}
		// 如果当前节点的父元素节点与容器节点相等
		else{
			// 容器节点为元素
			if (wrap.nodeType ==1) {
				// 路径数组中输入容器节点名称
				path.push(wrap.nodeName.toUpperCase());
			}
		}
		// 获取元素的兄弟元素名称统计
		var sublingsName = getSublingName(node);
		// 如果节点为元素
		if (node.nodeType ==1) {
			// 输入当前节点元素名称及其前面兄弟元素名称统计
			path.push(node.nodeName.toUpperCase()+sublingsName);
		}
		// 返回最终路径数组结果
		return path;
	}
	// 立即执行方法
})();

var path = Interpreter(document.getElementById("span7"));
console.log(path.join(">"));