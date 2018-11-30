//渲染页面的方法
function renderData(){
	$('.mui-scroll').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
	var pid = getQueryString("productId");
	var params = {id:pid};
	
	
	getProductDetailData(params,function(res){
		//处理尺码的问题
		var size = res.size;
		var arr = size.split("-");
		var newArr = []; 
		for(var i=arr[0];i<=arr[1];i++){
			newArr.push(i);
		}
		res.size = newArr;
		var html = template("detail",res);
		document.querySelector(".mui-scroll").innerHTML = html;
		
		//轮播图的初始化
        mui('.mui-slider').slider({
            interval:4000
        });
        //数量选择初始化
        mui('.mui-numbox').numbox();
        bindChimaEvent();
	});
}
//页面载入的时候发送请求来获取商品的详情数据,并且渲染页面
renderData();


//刷新按钮的点击事件
mui(".mui-bar-nav").on("tap",".mui-icon-reload",function(){
	renderData();
})


function bindChimaEvent(){
	//尺码选择
	mui(".lt_item").on("tap","span",function(){
		$(this).siblings().removeClass("now");
		$(this).addClass("now");
	})
}

//加入购入车点击事件
var isAdd = true;
mui(".mui-pull-right").on("tap",".mui-btn-danger",function(){
	if(isAdd){
		var pid = getQueryString("productId");
		var num = $(".mui-input-numbox").val();
		var size = $(".size.now").text();
		var params = {
			productId:pid,
			num:num,
			size:size
		}
		if(!pid){
			mui.toast("请选择商品");
			return;
		}
		if(!num){
			mui.toast("请选择商品数量");
			return;
		}
		if(!size){
			mui.toast("请选择商品尺码");
			return;
		}
		
		addCart(params,function(res){
			isAdd = true;
			if(res.success){
	            mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
	                if (e.index == 0) {
	                    location.href = 'user/cart.html';
	                } else {
	                    /*按了其他按钮 暂时处理*/
	                }
	            });
	        }
	        else{
	            mui.toast('添加失败，请重试！');
	        }
		})
	}
	isAdd = false;
})




