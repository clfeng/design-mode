window.onload = function (){
	var canvas = document.getElementsByTagName("canvas")[0],
		img = document.images[0],
		width = (canvas.width = img.width*2)/2,
		height = canvas.height = imgheight,
		ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		// 绘制特效图片
		function dealImages(){
			// 为图片添加特效
			dealImage("gray",0,0,width,height,225);
			dealImage("gray",100,50,300,200,100);
			dealImage("gray",150,100,200,100,255);
		}
		/*****
		*绘制特效图片
		*param t 特效类型
		*param x x坐标
		*param y y坐标
		*param w 宽度
		*param h 高度
		*param a 透明度
		*/
/*		function dealImage(t,x,y,w,h,a){
			// 获取画布图片数据
			var canvasData = ctx.getIamgeData(x,y,w,h);
			// 获取像素数据
			var data = canvasData.data;
			// 遍历每组像素数据(4个数据表示一个像素点数据，分别代表红色，绿色，蓝色，透明度)
			for(var i =0,len = data.length;i<len;i+=4){
				switch(t){
					// 红色滤镜 将绿色与蓝色取值为0
					case "red":
						data[i+1]=0;
						data[i+2]=0;
						data[i+3]=a;
						break;
					// 绿色滤镜 将红色和蓝色取值为0
					case "green":
						data[i] = 0;
						data[i+2] = 0;
						data[i+3] = a;
						break;
					case "blue":
						data[i] = 0;
						data[i+1]=0;
						data[i+3]=a;
						break;
					// 平均值灰色滤镜 取三色平均值
					case "gray":
						var num = parseInt((data[i]+data[i+1]+data[i+2])/3);
						data[i] = num;
						data[i+1] = num;
						data[i+2] = num;
						data[i+3] = a;
						break;
						// 其他方案
				}
			}
			// 绘制处理后的图片
			ctx.putImageData(canvasData,width+x,y);
		}*/
// 上面函数，每次遍历都必须进行分支判断，解决方案如下
function dealImage(t,x,y,w,h,a){
	var canvasData = ctx.getImageData(x,y,w,h),
			data = canvasData.data;
			// 状态模式封装算法
	var Deal = function (){
		var method ={
			// 默认类型--平均灰度特效
			"default":function(i){
				return method["gray"](i);
			},
			// 红色特效
			"red":function(i){
				data[i+1] = 0;
				data[i+2] = 0;
				data[i+3] = a;
			},
			"gray":function(i){
				// 将红、绿、蓝色取平均值
				data[i] = data[i+1] = parseInt(data[i+2])=((data[i]+data[i+1]+data[i+2])/3);
				data[i+3]= a;
			}
		};
		return function (type){
			return method[type] || method["default"];
		}
	}();
	// 迭代器处理数据
	function eachData(fn){
		for(var i =0,len = data.length;i<len;i+=4){
			// 处理一组像素数据
			fn(i);
		}
	}
	eachData(Deal(t));
	ctx.putImageData(canvasData,width+x,y);
}

}