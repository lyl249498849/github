
//页面载入的时候获取一级分类数据
getFirstCategoryData(function(res){
	var html = template("firstCategory",res);
	document.querySelector(".cate_left").innerHTML = html;
	//当一级分类请求完成的时候默认去请求第一个li的二级分类数据
	//var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
	//getSecondCategoryData({id:categoryId});
	
	//手动让第一个li点击一下
	var $firstLi = $('.cate_left ul li:first-child');
	mui.trigger($firstLi[0],'tap');
});


//点击一级分类按钮，获取二级分类的数据
mui(".cate_left").on("tap","li",function(){
	$(this).addClass("active").siblings().removeClass("active");
	//发送请求
	//1.获取数据的id
	var dataid = this.querySelector("a").dataset['id'];
	//2.发送请求
	var params = {id:dataid};
	getSecondCategoryData(params,function(res){
		console.log(res);
		var html = template("secondCategory",res);
		document.querySelector(".cate_right").innerHTML = html;
	});
})






