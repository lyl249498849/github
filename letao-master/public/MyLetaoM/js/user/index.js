//获取用户数据
getUserData(function(res){
	var mediabody = document.querySelector(".mui-media-body");
	var html = "";
	html += res.username;
	html += "<p class='mui-ellipsis'>绑定手机:"+res.mobile+"</p>";
	mediabody.innerHTML = html;	
});


//当点击退出登录按钮，执行退出登录的请求
mui(".p10").on("tap","a",function(res){
	doLogout(function(res){
		if(res.success == true){
			document.location.href = "login.html";
		}
		else{
			mui.toast("操作失败");
		}
	});
})
