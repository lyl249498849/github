//获取购物车数据
function dogetCartData(callback){
	getCartData(function(res){
		//页面相关的逻辑
		var html = template("carttemplate",{data:res});
		document.querySelector(".mui-table-view").innerHTML = html;
		
		//注意：需要在购物车的数据拼接完了之后再去绑定编辑和删除购物车的事件
		bindDeleteEvent();
		bindEditEvent();
		bindCheckEvent();
	});
	callback && callback()
}
dogetCartData();


//删除事件的方法
function bindDeleteEvent(){
	mui(".mui-slider-right").on("tap",".mui-icon-trash",function(){
		var id = this.dataset['id'];
		mui.confirm("确认删除？","提示",['确定','取消'],function(e){
			//点击了确认按钮
			if(e.index == 0){
				//第一个参数需要传入被删除数据的id  {id:1}
				deleteCartByID({id:id},function(res){
					//删除成功
					if(res.success == true){
						dogetCartData();
					}
				})
			}
		})
	})
}

//处理编辑购物车的逻辑
function bindEditEvent(){
	mui(".mui-slider-right").on("tap",".mui-icon-compose",function(){
		var dataset = this.dataset;
		
		//处理productsize
		var splitArr = dataset['productsize'].split("-");
		var newArr = [];
		for(var i=splitArr[0];i<=splitArr[1];i++){
			newArr.push(i);
		}
		
		var obj = {
			id:dataset.id,
			num:dataset.num,
			size:dataset.size,
			productsize:newArr
		}
		
		var html = template('edit',obj).replace(/\n/g,'');
		mui.confirm(html,"编辑提示",["确认","取消"],function(e){
			//当点击确认按钮之后
			if(e.index == 0){
				//发送请求
				var params = {
					id:obj.id,
					num:document.querySelector(".mui-input-numbox").value,
					size:document.querySelector("span.now").innerText
				}
				//console.log(params);
				modifyCartData(params,function(res){
					dogetCartData();
				})
			}
		})
		
		//初始化数字选择框
		mui(".mui-numbox").numbox();
		
		//绑定尺码选择按钮的事件
		mui(".lt_cart_edit").on("tap","span",function(){
			$(this).addClass("now").siblings().removeClass("now");
		})
	});
}

//checkbox的事件
function bindCheckEvent(){
	mui(".lt_proInfo").on("change","input",function(){
		var sumprice = 0;
		$("input:checked").each(function(idx,ele){
			sumprice += ele.dataset['price'] * ele.dataset['num'];
		})
		//console.dir(sumprice);
		var span = mui(".lt_cart div span");
		span[0].innerText = Math.ceil(sumprice*100)/100;
	})
}

//下拉刷新
mui.init({
	pullRefresh : {
		container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      height:50,//可选,默认50.触发下拉刷新拖动距离,
	      auto: false,//可选,默认false.首次加载自动下拉刷新一次
	      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      //每下拉一次，callback就会执行
	      callback :function(){
	      	 var that = this;
	      	 //请求服务器
	      	 /*setTimeout(function(){
	      	 	that.endPulldownToRefresh();
	      	 },2000)*/
	      	
	      	/*getCartData(function(res){
				//页面相关的逻辑
				var html = template("carttemplate",{data:res});
				document.querySelector(".mui-table-view").innerHTML = html;
				//停止下拉刷新
				that.endPulldownToRefresh();
			})*/
			
			dogetCartData(function(){
				//停止下拉刷新
				that.endPulldownToRefresh();
			})
	      } 
	    }
  	}
});

