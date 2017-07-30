// 价格策略对象
var PriceStrategy = function (){
	// 内部算法对象
	var strategy = {
		// 100返30
		return30 : function (price){
			return +price +parseInt(price/100)*30;
		},
		// 100返50
		return50:function (price){
			return +price + parseInt(price/100)*50;
		},
		// 打九折
		return90:function (price){
			return price*100*90/10000;
		},
		// 打八折
		return80:function (price){
			return price*100*80/10000;
		},
		// 打五折
		return50:function (price){
			return price*100*50/10000;
		}
	}
// 策略算法调用接口
	return function (algorithm,price){
		// 如果算法存在，则调用算法，否则返回false
		return strategy[algorithm]&&strategy[algorithm](price);
	}
}()
var price = PriceStrategy("return50",314.67);
console.log(price);


// 表单正则策略对象
var InputStrategy = function (){
	var strategy = {
		// 是否为空
		notNull:function (value){
			return /\s+/.test(value)?"请输入内容":"";
		},
		// 是否是一个数字
		number:function(value){
			return /^[0-9]+(\.[0-9]+)?$/.test(value)?"":"请输入数字";
		},
		// 是否是本地电话
		phone:function(value){
			return /^\d{3}\-\d{8}$|^\d{4}\-\d{7}$/.test(value)?"":"请输入正确的电话号码格式,如010-123456798或0418-1234567";
		}
	}
	return {
		// 验证接口type算法value表单值
		check:function(type,value){
			// 取出收尾空白字符
			value = value.replace(/^\s+|\s+$/,"");
			return strategy[type]?strategy[type](value):"没有该类型的检测方法";
		},
		addStrategy:function (type,fn){
			strategy[type]=fn;
		}
	}
}

// 拓展 可以延伸算法
InputStrategy.addStrategy("nickname",function(value){
	return /^[a-zA-Z]\w{3,7}$/.test(value)?""|"请输入4-8位昵称，如YYQH";
});
// 外观模式，简化获取元素
function $tag(tag,context){
	var context = context||document;
	return context.getElementsByTagName(tag);
}

// 