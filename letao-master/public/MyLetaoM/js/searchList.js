var currentPage = 1;
//渲染页面的方法
function renderData(data,callback){
	//1.如果搜索内容不存在
	if(!data.searchText){
		mui.toast("请输入搜索内容");
		return;
	}
	//2.每次加载数据的时候显示加载的动画（上拉加载不需要做这个操作）
	if(currentPage == 1){
		$('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
	}
	
	//3.拼接请求参数
	//获取当前选中的排序信息
	var type = $(".lt_order a.now")[0].dataset['type'];
	var params = {
		proName:data.searchText,
		page:currentPage,
		pageSize:5
	}
	//拼接排序的信息
	if(type){
		params[type] = 1;
	}
	//console.log(params);
	getProductData(params,function(res){
		setTimeout(function(){
			var html = template("productTpl",res);
			//如果当前是第一页，直接替换网页内容
			if(currentPage == 1){
				document.querySelector(".lt_product").innerHTML = html;
			}
			//如果当前不是第一页，则追加网页内容
			else{
				$('.lt_product').append(template('productTpl',res));
			}
			callback && callback();
		},2000);
	})
}

//读取url中的key的信息，然后根据key的信息发送请求，渲染页面
var key = getQueryString("key");
$(".search_input").val(key);
renderData({searchText:key});


//当前页面的搜索按钮事件
mui("form").on("tap",".search_btn",function(){
	currentPage = 1;
	//1.拿到用户输入的内容
	var key = document.querySelector(".search_input").value;
	var data = {searchText:key};
	//2.调用renderData显示数据
	renderData(data);
})


//排序功能
mui(".lt_order").on("tap","a[data-type]",function(){
	currentPage = 1;
	$("a[data-type]").removeClass("now").children("span").removeClass("fa-angle-down").addClass("fa-angle-up");
	$(this).addClass("now").children("span").removeClass("fa-angle-up").addClass("fa-angle-down");
	var data = {searchText:key};
	renderData(data);
})


//下拉刷新和上拉加载
mui.init({
	pullRefresh : {
		container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
	    down : {
	      height:50,//可选,默认50.触发下拉刷新拖动距离,
	      auto: false,//可选,默认false.首次加载自动下拉刷新一次
	      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
	      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
	      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
	      callback :function(){
	      	 currentPage = 1;
	      	 var that = this;
	      	 //请求服务器
	      	 var data = {searchText:key};
      	 	 renderData(data,function(){
      	 		that.endPulldownToRefresh();
      	 	 });
	      } 
	    },
	    up : {
	      height:50,//可选,默认50.触发下拉刷新拖动距离,
	      auto: false,//可选,默认false.首次加载自动下拉刷新一次
	      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
          contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；		     
	      callback :function(){
	      	 currentPage += 1;
	      	 var that = this;
	      	 //请求服务器
      	 	 var data = {searchText:key};
      	 	 renderData(data,function(){
      	 		that.endPullupToRefresh();
      	 	 });
	      } 
	    }
  	}
});
