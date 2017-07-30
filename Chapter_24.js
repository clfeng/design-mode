// 备忘录模式：在不破坏对象的封装性的前提下，在对象之外捕获并保存该对象内部的状态一遍日后对象使用或者对象恢复到以前的某个状态
// 下一页按钮点击事件
$("#next_page").click(function(){
	// 获取新闻内容元素
	var $new = $("#news_content"),
	// 获取新闻内容元素当前页数据
		page = $new.data("page");
		// 获取并显示新闻
		getPageData(page,function(){
			//修正新闻内容元素当前页数据
			$new.data("page",page+);
		})
});
// 商议也按钮点击事件
$("#pre_page").click(function(){
	// 显示上一页
});
// 请求某一页新闻page：当前页 	fn：成功回调函数
function getPageData(page,fn){
	// post 请求数据
	$.post("./data/getNewsData.php",{
		// 数据：页码
		page:page
	},function (res){
		// 正常返回数据
		if (res.errNo==0) {}{
			// 显示当前页
			showPage(page,res.data);
			// 执行回调函数
			fn && fn();
		}
	})
}
// 显示某页逻辑
function showPage(page,data){
	// ...
}

// 新闻缓存器
// page备忘录类
var Page = function(){
	// 信息缓存对象
	var cache= {};
	/***
	*主函数
	*参数page 页码
	*参数fn 成功回调函数
	*/
	return function(){
		// 判断该页数据是否在缓存中
		if (cache[page]) {
			// 恢复到该页状态，显示该页内容
			showPage(page,cache[page]);
			// 执行成功回调函数
			fn && fn();
		}else{
			// 若缓存cache中无该页数据
			$.post("./data/getNewsData.php",{
				// 请求携带数据page页码
				page:page
			},function(){
				// 成功返回
				if (res.errNo == 0 ) {
					// 显示该页数据
					showPage(page,res.data);
					// 将该页数据种入缓存中
					cache[page] = res.data;
					// 执行成功回调函数
					fn && fn();
				}else{
					// 异常处理
				}
			})
		}
	}
}

// 下一页按钮点击事件
$("#next_page").click(function(){
	// 获取新闻内容元素
	var $new = $("#news_content"),
	// 获取新闻内容元素当前页数据
		page = $new.data("page");
		// 获取并显示新闻
		Page(page,function(){
			// 修改新闻内容元素当前页数据
			$new.data("page",page+1);
		})
});

