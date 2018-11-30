var baseUrl = "http://localhost:3000/";


//区域滚动
mui('.mui-scroll-wrapper').scroll({
	scrollY: true, //是否竖向滚动
	deceleration: 0.0005//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});



//给a标签绑定事件(mui会阻止默认的a事件)
mui(".mui-bar-tab").on("tap","a",function(){
	document.location.href = this.href;
})



//添加一个登录拦截的方法的封装
//实现在哪个页面触发了login.html，最终用户登录成功之后会来到那个页面
window.lt = {};
lt.ajaxFilter = function (params){
	$.ajax({
		type:params.type||"GET",
		url:params.url,
		async:true,
		data:params.data,
		dataType:"json",
		success:function(res){	
			//如果用户没有登录，则来到登录页面
			if(res.error == 400){
				//console.log("aaaaa");
				//console.log(window.location.href);
				document.location.href = baseUrl+"MyLetaoM/user/login.html?returnUrl="+window.location.href;
			}
			//用户登录了，则回调出去
			else{
				params.success && params.success(res);
			}
		}
	});
}



//获取url中的参数信息
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null){
		return unescape(r[2]);
	}
	return null;
} 