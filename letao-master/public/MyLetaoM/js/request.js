//地址常量
const queryCart = '/cart/queryCart';


//获取购物车数据
function getCartData(callback){
	lt.ajaxFilter({
		type:"GET",
		url:queryCart,
		async:true,
		success:function(res){
			callback && callback(res);
		}
	})
}

//根据id删除指定购物车的数据
function deleteCartByID(params,callback){
	$.ajax({
		type:"GET",
		url:"/cart/deleteCart",
		data:params,
		async:true,
		success:function(res){
			callback && callback(res);
		}
	});
}

//更改购物车数据
function modifyCartData(params,callback){
	$.ajax({
		type:"POST",
		url:"/cart/updateCart",
		data:params,
		async:true,
		success:function(res){
			callback && callback(res);
		}
	});
}


//获取用户信息的请求
function getUserData(callback){
	lt.ajaxFilter({
		url:"/user/queryUserMessage",
		type:"GET",
		success:function(res){
			callback && callback(res);
		}
	})
}

//登出的请求
function doLogout(callback){
	$.ajax({
		type:"GET",
		url:"/user/logout",
		async:true,
		success:function(res){
			callback && callback(res);
		}
	});
}

//登录的请求
function loginRequest(params,callback){
	$.ajax({
		url:"/user/login",
		type:"POST",
		data:params,
		dataType:'json',
		success:function(res){
			callback&&callback(res);
		},
		error:function(){
			
		}
	})
}


//1.请求一级分类的数据
function getFirstCategoryData(callback){	
	$.ajax({
		url:"/category/queryTopCategory",
		type:"GET",
		data:null,
		dataType:'json',
		success:function(res){
			callback && callback(res);
		}
	})
}

//获取二级分类的方法
function getSecondCategoryData(params,callback){
	$.ajax({
		url:"/category/querySecondCategory",
		type:"GET",
		data:params,
		dataType:'json',
		success:function(res){
			callback && callback(res);			
		}
	})
}


//根据搜索内容查询商品数据
function getProductData(params,callback){
	$.ajax({
		url:"/product/queryProduct",
		type:"GET",
		data:params,
		dataType:'json',
		success:function(res){
			callback && callback(res);			
		}
	})	
}


//获取商品详情的数据
function getProductDetailData(params,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:params,
        dataType:'json',
        success:function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);
        }
    });
};


//加入购物车
function addCart(params,callback){
	lt.ajaxFilter({
		type:"POST",
		url:"/cart/addCart",
		async:true,
		data:params,
		success:function(res){
			callback && callback(res);
		}
	})
	/*$.ajax({
        type:'POST',
        url:'/cart/addCart',
        data:params,
        dataType:'json',
        success:function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);
        }
    });*/
}
