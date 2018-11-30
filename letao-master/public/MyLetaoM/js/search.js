//给搜索按钮绑定点击事件
mui("form").on("tap",".search_btn",function(){
	var searchText = document.querySelector(".search_input").value;
	console.log(searchText);
	if(!searchText){
		mui.toast("请输入搜索内容");
		return;
	}
	//1.先读取原来保存在localstorage中的数据
	var data = localStorage.getItem("leTaoHistory");
	var arr = JSON.parse(data) || [];
	
	//2.将当前的搜索内容添加到数组
	arr.push(searchText);
	
	//3.将搜索信息保存起来  用的本地缓存的技术  localstorage
	localStorage.setItem("leTaoHistory",JSON.stringify(arr));
	
	//4.跳转页面
	document.location.href = "searchList.html?key="+searchText;
})

//渲染当前搜索页面的数据
function renderData(){
	//1.读取本地保存的搜索数据
	var data = localStorage.getItem("leTaoHistory");
	var arr = JSON.parse(data) || [];
	//2.使用模板引擎生成代码
	var html = template("serachTemplate",{list:arr});
	//3.将html代码显示页面
	document.querySelector(".lt_history ul").innerHTML = html;
	//4.绑定点击事件
	bindLiClick();
	//5.绑定每一个a的点击事件，点击a跳转页面
	bindLiAClick();
}
renderData();


//点击x号删除指定的搜索记录
function bindLiClick(){
	mui("li").on("tap",".mui-icon-closeempty",function(){
		var id = this.dataset["id"];
		var data = localStorage.getItem("leTaoHistory");
		var arr = JSON.parse(data);
		//从id的位置开始删除1个元素
		arr.splice(id,1)
		//再将删完后的数据重新保存到locatstorage中
		localStorage.setItem("leTaoHistory",JSON.stringify(arr));
		renderData();
	})
}

//绑定每一个a的点击事件，点击a跳转页面
function bindLiAClick(){
	mui("li").on("tap","a",function(){
		var href = this.href;
		document.location.href= href;
	})
}


