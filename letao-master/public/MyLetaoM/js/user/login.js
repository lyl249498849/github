mui('.mui-input-row input').input(); 


//处理登录的逻辑
function dologin(){
	var loginBtn = document.querySelector(".mui-input-group .mui-btn-primary")
	mui(".mui-button-row").on("tap",".mui-btn-primary",function(){
		//1.表单验证
		var username = document.querySelector(".mui-input-clear").value;
		var password = document.querySelector(".mui-input-password").value;
		if(!username){
			mui.toast("请输入用户名");
			return;
		}
		if(!password){
			mui.toast("请输入密码");
			return;
		}
		//2.提交表单
		var params = {
			username:username,
			password:password
		}
		loginRequest(params,function(data){
			//登录成功
			if(data.success == true){
				//console.log(document.location.href);
				//console.log(location.search.replace("?returnUrl=",""));
				//document.location.href = "index.html";
				//console.log(getQueryString("returnUrl"));
				
				//从哪里来到哪里去
				var returnUrl = getQueryString("returnUrl");
				if(returnUrl != null){
					document.location.href = getQueryString("returnUrl");
				}
				//如果没有来源则返回个人中心页面
				else{
					document.location.href = "index.html";
				}
			}
			else{
				mui.toast(data.message);
			}
		});
	})
}

dologin();
