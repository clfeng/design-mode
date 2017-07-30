// 状态模式：当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象
// 展示结果
function showResult(result){
	if (result==0) {
		// 处理结果0
	}else if (result==1) {
		// 处理结果1
	}else if (result==2) {
		// 处理结果2
	}else if (result==3) {
		// 处理结果3
	}
}
// 上面为常用方式，下面为运用状态模式
// 投票结果状态对象
var ResultState = (function (){
	// 判断结果存在状态对象中
	var States ={
		// 每种状态作为一种独立方法保存
		state0:function (){
			// 处理结果0
			console.log("这是第一种情况");
		},
		state1:function (){
			// 处理结果1
			console.log("这是第二种情况");
		},
		state2:function (){
			// 处理结果2
			console.log("这是第三种情况");
		},
		state3:function (){
			// 处理结果3
			console.log("这是第四种情况");
		}
	};
	// 获取某一种状态并执行对应的方法
	function show(result){
		States["state"+result] && States["state"+result]();
	}
	return {
		// 返回调用状态方法接口
		show:show
	}
})();

ResultState.show(3);