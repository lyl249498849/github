

# JavaScript 高级

<img src="./media/Unofficial_JavaScript_logo_2.svg.png" width="400" alt="">

## 课程大纲

在线地址：[JavaScript 高级](http://naotu.baidu.com/file/5bcd79bc4f1eaf83f96d1ad23baab345?token=d22135c63546f5ee)

![课程大纲](./media/课程大纲.png)

---

## 回顾

创建对象的四种方式：字面量、Object、工厂、构造函数

### 构造函数创建对象

```javascript
//自定义构造函数----->实例化对象
function Person(name,age,sex) {
    this.name=name;
    this.age=age;
    this.sex=sex;
    this.eat=function () {
        console.log("吃大蒜拌臭豆腐加榴莲酱");
    };
}
//构造函数---->创建对象
var per=new Person("小苏",38,"女");
//per.eat();//吃
//实例对象是通过构造函数来创建

//把这个对象的结构显示出来
console.dir(per);
console.dir(Person);

//实例对象的构造器(构造函数)
//实例对象的构造器是指向Person的,结果是true,所以,这个实例对象per就是通过Person来创建的
console.log(per.constructor==Person);//

//判断这个对象是不是这种数据类型
console.log(dog.constructor==Animal);
console.log(dog instanceof Person);
```

### 构造函数创建对象带来的问题

```javascript
function Person(name,age) {
    this.name=name;
    this.age=age;
    this.eat=function () {
        console.log("今天吃红烧土豆");
    }
}
var per1=new Person("小白",20);
var per2=new Person("小黑",30);

console.dir(per1.eat == per2.eat);
//上面的打印结果为false，每个对象的信息不共享
```

## 原型介绍

​	什么是原型：原型是Javascript中的继承的基础，我们可以把一个函数的所有对象公共的属性和方法放入到函数的原型中。

### 通过原型共享属性和方法

```javascript
function Person(name,age) {
    this.name=name;
    this.age=age;
}
//通过原型来添加方法,解决数据共享,节省内存空间
Person.prototype.eat=function () {
    console.log("吃凉菜");
};

var p1=new Person("小明",20);
var p2=new Person("小红",30);
console.log(p1.eat==p2.eat);//true

console.dir(p1);
console.dir(p2);

//什么样子的数据是需要写在原型中?
1.需要共享的数据就可以写原型中，比如需要共享的属性和方法
2.不需要共享的数据写在构造函数中
```

```javascript
//原型的作用一:数据共享
//构造函数
function Student(name,age,sex) {
  this.name=name;
  this.age=age;
  this.sex=sex;
}

//所有学生的身高都是188,所有人的体重都是55
//所有学生都要每天写500行代码
//所有学生每天都要吃一个10斤的西瓜
//原型对象
Student.prototype.height="188";
Student.prototype.weight="55kg";
Student.prototype.study=function () {
  console.log("学习,写500行代码,小菜一碟");
};
Student.prototype.eat=function () {
  console.log("吃一个10斤的西瓜");
};
//实例化对象,并初始化
var stu=new Student("晨光",57,"女");
console.dir(Student);//可以看到Student函数中有一个prototype，prototype中存放了我们所定义的若干方法
console.dir(stu);//可以看到stu的__proto__实际就是Student.prototype
```

### 原型: prototype和__ proto __

​	实例对象中有__ proto __这个属性,指向函数的原型,是一个对象,这个属性是给浏览器使用,不是标准的属性
	构造函数中有prototype这个属性,叫函数的原型,是一个对象,这个属性是给程序员使用,是标准的属性

```javascript
 function Person(name,age) {
      this.name=name;
      this.age=age;
    }
    //通过原型来添加方法,解决数据共享,节省内存空间
    Person.prototype.eat=function () {
      console.log("吃凉菜");
    };

    var p1=new Person("小明",20);
    var p2=new Person("小红",30);

    console.dir(p1);
    console.dir(p2);
    console.dir(Person);

    console.log(p1.__proto__==Person.prototype); //true
    p1.__proto__.eat();
```

### 构造函数、实例、原型三者之间的关系

![](media/aa.jpg)

<img src="media/aa.png" alt="">

​	1. 任何函数都具有一个    `prototype` 属性，该属性是一个对象。

```javascript
function F () {}
console.log(F.prototype) // => object

F.prototype.sayHi = function () {
  console.log('hi!')
}
```

​	2. 构造函数的 `  prototype 对象默认都有一个 `constructor` 属性，指向 `prototype对象所在函数。

```javascript
console.log(F.prototype.constructor === F) // => true
```

​	3. 通过构造函数得到的实例对象内部会包含一个指向构造函数的 `prototype` 对象的指针 `__proto__`。

```javascript
var instance = new F()
console.log(instance.__proto__ === F.prototype) // => true
console.log(instance.__proto__.constructor==F);
console.log(instance.__proto__.constructor === F.prototype.constructor) // => true
```

​	<img src="media/yuanxin.png" alt="">

​	4.总结

```
1) 任何函数都具有一个 prototype 属性，该属性是一个对象
2) 构造函数的 prototype 对象默认都有一个 constructor 属性，指向 prototype 对象所在函数
3) 通过构造函数得到的实例对象内部会包含一个指向构造函数的 prototype 对象的指针 __proto__
4) 所有实例都直接或间接继承了原型对象的成员
5) 构造函数的原型对象(prototype)中的属性和方法是可以被实例对象直接访问的
```

### 修改原型

​	我们注意到，前面例子中每添加一个属性和方法就要敲一遍     `Person.prototype` 。
	为减少不必要的输入，更常见的做法是用一个包含所有属性和方法的对象字面量来重写整个原型对象：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHi = function () {
  console.log('Person~~~hi!')
}

/*这样修改完之后，Person的原型中只有type和sayHello信息，把之前的sayHi以及constructor给丢失了*/
Person.prototype = {
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  }
}
```

​	在该示例中，我们将   `Person.prototype` 重置到了一个新的对象。
	这样做的好处就是为   `Person.prototype` 添加成员简单了，但是也会带来一个问题，那就是原型对象丢失了 `constructor` 成员(其实我们不写的时候会把constructor设置为Object的构造器)。

​	所以，我们为了保持   `constructor` 的指向正确，建议的写法是：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHi = function () {
  console.log('Person~~~hi!')
}

Person.prototype = {
  constructor: Person, // => 手动将 constructor 指向正确的构造函数
  type: 'human',
  sayHello: function () {
    console.log('我叫' + this.name + '，我今年' + this.age + '岁了')
  },
  sayHi: function () {
  	console.log('Person~~~hi!')
  }
}
```

### 原型方法的互相访问

```javascript
//原型对象中的方法,可以相互调用
function Animal(name,age) {
    this.name=name;
    this.age=age;
}
//原型中添加方法
Animal.prototype.eat=function () {
    console.log("动物吃东西");
    this.play();
};
Animal.prototype.play=function () {
    console.log("玩球");
    this.sleep();
};
Animal.prototype.sleep=function () {
    console.log("睡觉了");
};

var dog = new Animal("小苏",20);
dog.eat();
```

### 原生对象的原型


​	所有函数都有 prototype 属性对象。

```
1. Object.prototype
2. Function.prototype
3. Array.prototype
4. String.prototype
5. Number.prototype
6. Date.prototype
7. ...
```

​	练习：为数组对象和字符串对象扩展原型方法。

```javascript
//我们能否为系统的对象的原型中添加方法,相当于在改变源码
//我希望字符串中有一个倒序字符串的方法
String.prototype.myReverse = function () {
    for(var i=this.length-1;i>=0;i--){
        console.log(this[i]);
    }
};
var str = "abcdefg";
str.myReverse();


String.prototype.sayHi=function () {
    console.log(this+"哈哈,我又变帅了");
};

//字符串就有了打招呼的方法
var str2="小杨";
str2.sayHi();
```

```javascript
//为Array内置对象的原型对象中添加方法
Array.prototype.mySort=function () {
    for(var i=0;i<this.length-1;i++){
        for(var j=0;j<this.length-1-i;j++){
            if(this[j]<this[j+1]){
                var temp=this[j];
                this[j]=this[j+1];
                this[j+1]=temp;
            }
        }
    }
};

var arr=[100,3,56,78,23,10];
arr.mySort();
console.log(arr);
```

## 函数自调用

### 自调用函数的概念

```javascript
//自调用函数是一次性的函数--声明的同时,直接调用了
(function () {
    var num=10;
    console.log("函数");
}());
console.log(num);
```

### 自调用函数作用

​	自调用函数作用：开启一个新的作用域，可以防止变量命名污染的问题

```javascript
//自调用函数的好处：我们自己写的代码不会对外部的js代码有任何影响

//我们在开发的时候会引入很多第三方的js文件，有时候我们并不直到在第三方js中谢了什么函数
//假如第三方js已经写好了一个函数如下：
function foo(){ 
  console.log("aa");
} 

//而我们不知情，又写了下面代码
function foo(){ 
  console.log("bb");
} 

//这个时候我们自己写的代码就会把第三方的js代码给顶掉
//而如果使用自调用函数则没有这个情况
(function(){
    function foo(){
        console.log("这是我自己的foo");
    }
    foo();
}());
foo();
//推荐在以后的开发工多使用自调用函数,把所有的js代码都放在自调用函数中
```

### 自调用函数-沙箱

​	示例：沙箱模式 ： 独立的环境，不会影响外面的世界

```javascript
//沙箱:环境,黑盒,在一个虚拟的环境中模拟真实世界做实验,实验结果和真实世界的结果是一样,但是不会影响真实世界
//自调用函数中变量是私有的，但是自调用函数是可以访问外部资源

var num=10;

//沙箱---小环境
(function () {
      var num=10;
      console.log(num);
})();

 //沙箱---小环境
(function () {
     console.log(num); //沙箱中是可以访问外部资源的
}());

//以后建议代码都放到沙箱里面 
```

### 自调用函数-沙箱案例

```javascript
<div>这是div</div>
<div>这是div</div>
<div>这是div</div>
<p>这是p</p>
<p>这是p</p>
<p>这是p</p>


<script>
  var getTag = 10;
  var dvObjs = 20;
  var pObjs = 30;

  //此处如果不加沙箱，在调用getTag方法的时候会报not function错误，原因是getTag()这个函数会被提升到script代码块的最前面
  (function () {
    //根据标签名字获取元素
    //自调用函数中的函数是私有的，在外部不可以被访问
    function getTag(tagName) {
      return document.getElementsByTagName(tagName)
    }
    //获取所有的div
    var dvObjs = getTag("div");
    for (var i = 0; i < dvObjs.length; i++) {
      dvObjs[i].style.border = "2px solid pink";
    }
    //获取所有的p
    var pObjs = getTag("p");
    for (var i = 0; i < pObjs.length; i++) {
      pObjs[i].style.border = "2px solid pink";
    }
  }());
  console.log(getTag);
  console.log(dvObjs);
  console.log(pObjs);
</script>
```

### 自调用函数注意点

```js
// 问题1：如果存在多个自调用函数要用分号分割，否则语法错误
// 下面代码会报错
(function () {
}())

(function () {
}())

// 问题2：当自调用函数 前面有匿名函数时，会把自调用函数作为参数(其实会匿名函数和自调用函数中的空格去掉)
var a = function () {
  alert('11');
}
    
(function () {
  alert('22');
}())

// 代码规范中会建议在自调用函数之前加上分号
;(function () {
}())

;(function () {
}())
```

### 自调用函数中的全局变量

```javascript
<script>
    //沙箱---小环境
    (function () {
        var num=10;  
    })();
    console.log(num); //无法访问
</script>

//虽然在自调用函数中的变量是局部变量，但是我们仍然可以通过window将自调用函数中的局部变量变为全局变量
```

```javascript
<script>
    //沙箱---小环境
    (function () {
         num=10;  //这个地方相当于window.num = 10;
    })();
    console.log(num);
</script>

//虽然在自调用函数中的变量是局部变量，但是我们仍然可以通过window将自调用函数中的局部变量变为全局变量
```

```javascript
//将局部变量变成全局变量更常见的做法如下:
(function (window) {
    var num=10;//局部变量
    window.num=num;//全局变量
})(window);
console.log(num);
```

### 自调用函数封装Random对象

```javascript
//通过自调用函数产生一个随机数对象,在自调用函数外面,调用该随机数对象方法产生随机数
(function (window) {
  //产生随机数的构造函数
  function Random() {
  }
  //在原型对象中添加方法
  Random.prototype.getRandom = function (min,max) {
     return Math.floor(Math.random()*(max-min)+min);
  };
  //自调用函数中的普通函数是私有函数，只能够在当前自调用函数内部使用
  //要想把这个方法暴露给外部，可以设置给window，或者设置给Random函数
  function test1(){
     console.log("test1");
  }
  //把Random对象暴露给顶级对象window--->外部可以直接使用这个对象
  window.Random=Random;
})(window);
//实例化随机数对象,这边能够使用Random函数，原因是Random函数已经被绑定到了window对象上
var rm=new Random();
//调用方法产生随机数
console.log(rm.getRandom(0,5));
test1();  //无法访问，test1()是私有函数
```

## 面向对象游戏案例：贪吃蛇

### 搭建页面

放一个容器盛放游戏场景 div#map，设置样式

```css
#map {
  width: 800px;
  height: 600px;
  background-color: #ccc;
  position: relative;
}
```

### 分析对象

- 游戏对象
- 蛇对象
- 食物对象

### 创建食物对象

- Food

  - 属性

    - x       
    - y
    - width
    - height
    - color       

  - 方法

    - 构造方法
    - init  随机创建一个食物对象，并输出到map上
    - remove移除食物的方法


```js
(function (window) {
    var elements = [];//用来保存每个小方块食物的
    //食物就是一个对象,有宽,有高,有颜色,有横纵坐标,先定义构造函数,然后创建对象
    function Food(x, y, width, height, color) {
        //横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景颜色
        this.color = color || "green";
    }

    //为原型添加初始化的方法(作用：在页面上显示这个食物)
    //因为食物要在地图上显示,所以,需要地图的这个参数(map---就是页面上的.class=map的这个div)
    Food.prototype.init = function (map) {
        //先删除这个小食物
        //外部无法访问的函数
        remove();

        //创建div
        var div = document.createElement("div");
        //把div加到map中
        map.appendChild(div);
        //设置div的样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //先脱离文档流
        div.style.position = "absolute";
        //随机横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";

        //把div加入到数组elements中
        elements.push(div);
    };

    //私有的函数---删除食物的
    function remove() {
        //elements数组中有这个食物
        for (var i = 0; i < elements.length; i++) {
            var ele = elements[i];
            //找到这个子元素的父级元素,然后删除这个子元素
            ele.parentNode.removeChild(ele);
            //再次把elements中的这个子元素也要删除
            elements.splice(i, 1);
        }
    }

    //把Food暴露给Window,外部可以使用
    window.Food = Food;
}(window));
```

### 创建蛇对象


- Snake

- 属性

  - width    蛇节的宽度 默认20
  - height   蛇节的高度 默认20
  - body     数组，蛇的头部和身体，第一个位置是蛇头
  - direction    蛇运动的方向  默认right  可以是 left  top bottom

- 方法

  - 构造方法
  - init  把蛇渲染到map上
  - move移动的方法
  - remove删除小蛇的方法


```js
//自调用函数---小蛇
(function (window) {
    var elements = [];//存放小蛇的每个身体部分
    //小蛇的构造函数
    function Snake(width, height, direction) {
        //小蛇的每个部分的宽
        this.width = width || 20;
        this.height = height || 20;
        //小蛇的身体
        this.body = [
            {x: 3, y: 2, color: "red"},//头
            {x: 2, y: 2, color: "orange"},//身体
            {x: 1, y: 2, color: "orange"}//身体
        ];
        //方向
        this.direction = direction || "right";
    }

    //为原型添加方法--小蛇初始化的方法
    Snake.prototype.init = function (map) {
        //先删除之前的小蛇
        remove();//===========================================

        //循环遍历创建div
        for (var i = 0; i < this.body.length; i++) {
            //数组中的每个数组元素都是一个对象
            var obj = this.body[i];
            //创建div
            var div = document.createElement("div");
            //把div加入到map地图中
            map.appendChild(div);
            //设置div的样式
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            //横纵坐标
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            //背景颜色
            div.style.backgroundColor = obj.color;
            //方向暂时不定
            //把div加入到elements数组中----目的是为了删除
            elements.push(div);
        }
    };

    //为原型添加方法---小蛇动起来
    Snake.prototype.move = function (food, map) {
        //改变小蛇的身体的坐标位置
        var i = this.body.length - 1;//2
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        //判断方向---改变小蛇的头的坐标位置
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断有没有吃到食物
        //小蛇的头的坐标和食物的坐标一致
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        //判断小蛇的头的坐标和食物的坐标是否相同
        if(headX==food.x&&headY==food.y){
            //获取小蛇的最后的尾巴
            var last=this.body[this.body.length-1];
            //把最后的蛇尾复制一个,重新的加入到小蛇的body中
            //这里面直接复制最后一个就可以了(虽然会导致this.body中两个数组元素一致)，但是随着小蛇的移动(第0个元素坐标给第1个，第1个给第2个，第2个给第3个，坐标会被调整)
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //把食物删除,重新初始化食物
            food.init(map);
        }
    };
    
    //删除小蛇的私有的函数    
	function remove() {
        //删除map中的小蛇的每个div,同时删除elements数组中的每个元素,从蛇尾向蛇头方向删除div
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            //这边移除元素应该从后面开始移除，如果使用正向for循环，会造成i越来越大而数组长度越来越小，造成一些元素无法移除
            //先从当前的子元素中找到该子元素的父级元素,然后再弄死这个子元素
            var ele = elements[i];
            //从map地图上删除这个子元素div
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window,外部可以访问
    window.Snake = Snake;
}(window));
```

### 创建游戏对象

游戏对象，用来管理游戏中的所有对象和开始游戏

- Game

  - 属性

    - food

    - snake

    - map

  - 方法

    - Game构造函数
    - init 初始化方法      将小蛇和食物显示出来
    - 开启定时器，让小蛇移动起来，添加碰撞检测
    - 添加键盘按键信息，方向键控制小蛇上下左右移动


```js
;(function(win){
    //1.构造函数
    function Game(){
        //地图的信息
        this.map = my$("map");
        //食物的信息
        this.food = new Food(0,0,20,20,"green");
        //蛇的信息
        this.snake = new Snake(20,20,"right");
    }

    //2.添加一个开始游戏的方法
    Game.prototype.startGame = function(){
        this.bindkey();
        //让食物和小蛇出现在页面
        this.food.init(this.map);
        this.snake.init(this.map);
        //开启定时器让小蛇移动
        var timer = setInterval(function(){
            //定时器中的this是window对象  console.log(this);
            //使用this来表示当前的游戏对象
            this.snake.move(this.map,this.food);
            //每移动一次需要判断小蛇是否死掉

            //bind方法还会将原函数拷贝一份，同时修改拷贝后的函数中的this指向
            var aadead = isdead.bind(this);
            aadead(timer);
        }.bind(this),200);
    }

    //3.判断游戏结束
    function isdead(timer){
        console.log(this);
        //什么时候小蛇会挂掉
        //3.1 超出边界
        var headX = this.snake.body[0].x;
        var headY = this.snake.body[0].y;

        if(headX<0 || headX>=(this.map.offsetWidth)/this.snake.width){
            clearInterval(timer);
            alert("游戏结束");
        }
        if(headY<0 || headY>=this.map.offsetHeight/this.snake.height){
            clearInterval(timer);
            alert("游戏结束");
        }
        //3.2 头撞身体
        //如何表示头撞身体？ 用头之外的其他所有body和头相比较，如有有任何一个body的坐标和头一致，则说明头撞了身体
        for(var i=1;i<this.snake.body.length;i++){
            var bodyi = this.snake.body[i];
            //如果头和身体相碰了，就游戏技术
            if(bodyi.x == headX && bodyi.y == headY){
                clearInterval(timer);
                alert("游戏结束");
                break;
            }
        }
    }

    //4.添加方向的控制
    //Game是js对象
    //onkeydown必须要dom对象
    Game.prototype.bindkey = function(){
        //给整个文档绑定onkeydown事件
        document.onkeydown = function(e){
            //注意点是我们现在的事件添加在document上面，那么此时的this是document对象
            var oev = e || window.event;
            switch (oev.keyCode){
                case 37:
                    //左
                    if(this.snake.direction == "right" || this.snake.direction == "left"){
                        break;
                    }
                    this.snake.direction = "left";
                    break;
                case  38:
                    if(this.snake.direction == "top" || this.snake.direction == "bottom"){
                        break;
                    }
                    //上
                    this.snake.direction = "top";
                    break;
                case  39:
                    if(this.snake.direction == "right" || this.snake.direction == "left"){
                        break;
                    }
                    this.snake.direction = "right";
                    //右
                    break;
                case  40:
                    if(this.snake.direction == "top" || this.snake.direction == "bottom"){
                        break;
                    }
                    //下
                    this.snake.direction = "bottom";
                    break;
                default:
                    break;
            }
        }.bind(this);
    }

    //5.将game暴露给window
    win.Game = Game;
}(window))
```

### 主程序逻辑

```javascript
//初始化游戏对象
var gm = new Game(document.querySelector(".map"));

//初始化游戏---开始游戏
gm.init();
```



### 其它处理

#### 将js中代码单独放到一个js文件中

​	不建议此游戏抽取出太多的js文件，比如Food一个js，Snake一个js，Game一个js。

​	原因主要有：

​	1.多个js文件之间会有引用关系，html页面引入js的时候有顺序要求

​	2.项目部署到服务器的时候，用户通过浏览器请求项目的时候会请求多个js文件，造成网页整体体积变大。

#### js代码的压缩

​	  我们需要把js代码中的注释、空格等信息压缩，尽可能生成一个比较小的js文件，以供客户端使用

​	  http://tool.oschina.net/jscompress/

```js
//自调用函数传入window会被压缩
(function (window) {
  var document = window.document;

}(window))

//将来代码压缩的时候，会把 function (window)  压缩成 function (w)
```

#### 函数内 `this` 指向的不同场景

​	函数的调用方式决定了 `this` 指向的不同：

| 调用方式     | 非严格模式     | 备注                                  |
| ------------ | -------------- | ------------------------------------- |
| 普通函数调用 | window         | 严格模式("use strict";)下是 undefined |
| 构造函数调用 | 实例对象       | 原型方法中 this 也是实例对象          |
| 对象方法调用 | 该方法所属对象 |                                       |
| 事件绑定方法 | 绑定事件对象   |                                       |
| 定时器函数   | window         |                                       |

```javascript
//普通函数
function f1(){
    console.log(this);   //this 指的是window对象
}
f1(); //调用函数

//构造函数
function Person(name,age){
    this.name = name;  //this指的是实例对象
    this.age = age;
    this.say = function(){
         console.log(this); //this是调用say方法所属对象
    }
}
var p = new Person("张三",19);  //通过new调用构造函数创建对象
p.say(); //通过对象调用实例方法

//定时器
setTimeInterval(function(){
     console.log(this);   //this 指的是window对象
},1000)


//一句话：this指的是方法的调用者 .
//比如  window.f1()     f1函数中的this就是window
```

## 继承

### 神奇的原型链

```javascript
var divObj=document.getElementById("dv");
console.dir(divObj);

//divObj.__proto__---->HTMLDivElement.prototype
//HTMLDivElement.prototype的__proto__--->HTMLElement.prototype
//HTMLElement.prototype的__proto__---->Element.prototype
//Element.prototype的__proto__---->Node.prototype
//Node.prototype的__proto__---->EventTarget.prototype
//EventTarget.prototype的__proto__---->Object.prototype
//Object.prototype中的__proto__是null
```

### 原型链详解

​	构造函数的原型属性(prototype)中，除了拥有构造方法constructor之外，还有一个__ proto __属性，该属性指向父亲的原型对象(prototype)。

​	对象的__ proto __属性指向了函数的原型，就构成了原型链。

```javascript
function Person() {

}
Person.prototype.eat=function () {
    console.log("吃东西");
};

var per=new Person();
console.dir(per);//实例对象的结构
console.dir(Person);//构造函数的结构

//实例对象中有__proto__原型
//构造函数中有prototype原型
	
//prototype是对象
//所以,prototype这个对象中也有__proto__,那么指向了哪里
//实例对象中的__proto__指向的是构造函数的prototype
//所以,prototype这个对象中__proto__指向的应该是某个构造函数的原型prototype

console.log(Person.prototype.__proto__ == Object.prototype)
console.log(Object.prototype.__proto__)   //null
```

![1537518607776](media\1537518607776.png)

![](media\原型最终的指向.png)

### 什么是继承

```javascript
 /*
    * 面向对象编程思想:根据需求,分析对象,找到对象有什么特征和行为,通过代码的方式来实现需求,要想实现这个需求,就要创建对象,要想创建对象,就应该显示有构造函数,然后通过构造函数来创建对象.,通过对象调用属性和方法来实现相应的功能及需求,即可
    * 首先JS不是一门面向对象的语言,JS是一门基于对象的语言,那么为什么学习js还要学习面向对象,因为面向对象的思想适合于人的想法,编程起来会更加的方便,及后期的维护....
    * 面向对象的编程语言中有类(class)的概念(也是一种特殊的数据类型),但是JS不是面向对象的语言,所以,JS中没有类(class),但是JS可以模拟面向对象的思想编程,JS中会通过构造函数来模拟类的概念(class)

    * 小明,小红，小丽，小白，小花 都是人
    * 共同的特征和行为
    * 特征--->属性
    * 行为---方法

    * 面向对象的特性:封装,继承,多态

    * 封装:就是包装
    * 一坨重复代码放在一个函数中--封装
    * 一系列的属性放在一个对象中--封装
    * 一些功能类似的函数(方法)放在一个对象中--封装
    * 好多相类似的对象放在一个js文件中---封装

    * 继承: 首先继承是一种关系,类(class)与类之间的关系,JS中没有类,但是可以通过构造函数模拟类,然后通过原型来实现继承
    * 继承也是为了数据共享,js中的继承也是为了实现数据共享

    * 原型作用之一:数据共享,节省内存空间
    * 原型作用之二:为了实现继承

    * 继承是一种关系:
    * 父类级别与类级别的关系

    * 例子:
    * 人:  姓名, 性别, 年龄 ,吃饭, 睡觉
    * 学生类别: 姓名, 性别, 年龄 ,吃饭, 睡觉 学习行为
    * 老师类别: 姓名, 性别, 年龄 ,吃饭, 睡觉 工资,教学行为
    * 程序员: 姓名, 性别, 年龄 ,吃饭, 睡觉 工资, 敲代码

    * 动物类别:  体重， 颜色, 吃
    * 狗类别:   体重,颜色, 吃, 咬人
    * 猫类别: 体重,颜色, 吃, 咬人 逗主人开心,你好帅

    * 多态:一个对象有不同的行为,或者是同一个行为针对不同的对象,产生不同的结果,要想有多态,就要先有继承*/
```

### 原型继承

```javascript
//继承例子:
//人,都有姓名,性别,年龄, 吃饭, 睡觉, 玩
//学生,都有姓名,性别,年龄, 成绩, 吃饭, 睡觉, 玩 ,学习的行为

//js中通过原型来实现继承
function Person(age) {
    this.age=age;
}
Person.prototype.eat=function () {
    console.log("人可以吃东西");
};
function Student(score) {
    this.score=score;
}

//在改变学生原型对象之前先给学生的原型中添加一个sayHi方法(这个方法会出现什么情况?)
Student.prototype.sayHi = function () {
    console.log("hi~~~");
};

//改变学生的原型的指向即可==========>学生和人已经发生关系
Student.prototype = new Person(10);

//相同的代码太多,造成了代码的冗余(重复的代码)
var stu=new Student(100);
console.log(stu.age);
stu.eat();

console.log("下面的是学生对象中自己有的");
console.log(stu.score);
stu.sayHi();//错误?

//一般步骤是：先修改函数原型，再向修改后的原型中添加信息
```

![](media\原型链指向改变.png)

```javascript
//继承案例
//动物有名字,有体重,有吃东西的行为
//小狗有名字,有体重,有毛色, 有吃东西的行为,还有咬人的行为
//哈士奇名字,有体重,有毛色,性别, 有吃东西的行为,还有咬人的行为,逗主人开心的行为


//动物的构造韩素
function Animal(name,weight) {
    this.name=name;
    this.weight=weight;
}
//动物的原型的方法
Animal.prototype.eat=function () {
    console.log("天天吃东西,就是吃");
};

//狗的构造函数
function Dog(color) {
    this.color=color;
}
Dog.prototype=new Animal("哮天犬","50kg");
Dog.prototype.bitePerson=function () {
    console.log("哼~汪汪~咬死你");
};

//哈士奇
function ErHa(sex) {
    this.sex=sex;
}
ErHa.prototype=new Dog("黑白色");
ErHa.prototype.playHost=function () {
    console.log("哈哈~要坏衣服,要坏桌子,拆家..嘎嘎...好玩,开心不,惊喜不,意外不");
};
var erHa=new ErHa("雄性");
console.log(erHa.name,erHa.weight,erHa.color);
erHa.eat();
erHa.bitePerson();
erHa.playHost();
```

![](media\原型链的图解.png)

### 构造函数的属性继承

```javascript
//上面原型继承中为了数据共享,改变原型指向,做到了继承  ---通过改变原型指向实现的继承
//缺陷:因为改变原型指向的同时实现继承,直接初始化了属性，继承过来的属性的值都是一样的了,所以,这就是问题只能重新调用对象的属性进行重新赋值

//解决方案:继承的时候,不用改变原型的指向,直接调用父级的构造函数的方式来为属性赋值就可以了  ------借用构造函数:把要继承的父级的构造函数拿过来,使用一下就可以了

function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

function Student (name, age) {
  // 借用构造函数继承属性成员
  Person.call(this, name, age)
}

var s1 = Student('张三', 18)
console.log(s1.type, s1.name, s1.age) // => human 张三 18

//借用构造函数:构造函数名字.call(当前对象,属性,属性,属性....);
//解决了属性继承,并且值不重复的问题
//缺陷:父级类别中的方法不能继承
```

### 组合继承

```javascript
//组合继承:原型继承+借用构造函数继承
function Person(name,age,sex) {
    this.name=name;
    this.age=age;
    this.sex=sex;
}
Person.prototype.sayHi=function () {
    console.log("阿涅哈斯诶呦");
};
function Student(name,age,sex,score) {
    //借用构造函数:属性值重复的问题
    Person.call(this,name,age,sex);
    this.score=score;
}
//改变原型指向----继承
Student.prototype=new Person();//不传值
Student.prototype.eat=function () {
    console.log("吃东西");
};

//此时的"小黑",20,"男","100分" 都是属于对象的信息，不是原型的信息
var stu=new Student("小黑",20,"男","100分");
console.log(stu.name,stu.age,stu.sex,stu.score);
stu.sayHi();
stu.eat();

var stu2=new Student("小黑黑",200,"男人","1010分");
console.log(stu2.name,stu2.age,stu2.sex,stu2.score);
stu2.sayHi();
stu2.eat();

//属性和方法都被继承了
//推荐使用
```

### 构造函数的属性继承+拷贝继承

```javascript
function Person (name, age) {
  this.type = 'human'
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.log('hello ' + this.name)
}

function Student (name, age) {
  Person.call(this, name, age)
}

// 原型对象拷贝继承原型对象成员
for(var key in Person.prototype) {
  Student.prototype[key] = Person.prototype[key]
}

var s1 = Student('张三', 18)

s1.sayName() // => hello 张三

//效率较低，内存占用高（因为要拷贝父类的属性）
//无法获取父类不可枚举的方法（不可枚举方法，不能使用for in 访问到）
//不推荐使用
```

### 逆推继承看原型

```javascript
function F1(age) {
    this.age = age;
}
function F2(age) {
    this.age = age;
}

F2.prototype = new F1(10);
function F3(age) {
    this.age = age;
}
F3.prototype = new F2(20);

var f3 = new F3(30);
console.log(f3.age);//
```

![](media\逆推继承看原型.png)

### 属性成员的搜索原则

```javascript
//当实例对象和原型中都有sex信息的时候，访问对象的属性获取的是谁的信息呢？
function Person(age,sex) {
    this.age=age;
    this.sex=sex;
}
Person.prototype.sex="女";
var per=new Person(10,"男");
console.log(per.sex);
```

​	每当代码读取某个对象的某个属性时，都会执行一次搜索，目标是具有给定名字的属性

```
1. 搜索首先从对象实例本身开始
2. 如果在实例中找到了具有给定名字的属性，则返回该属性的值
3. 如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性
4. 如果在原型对象中找到了这个属性，则返回该属性的值
5. 如果在原型对象中没有找到这个属性，则继续从父亲的原型中查找，有就返回
```

​	也就是说，在我们调用   `per.sex` 的时候，会先后执行两次搜索：

```javascript
1. 首先，解析器会问：“实例 per 有 sex 属性吗？”答：“没有。
2. 然后，它继续搜索，再问：“ per 的原型有 sex 属性吗？”答：“没有。
3. 于是，它就从父亲的原型中查找有没有sex
```

​	而这正是多个对象实例共享原型所保存的属性和方法的基本原理。

```
总结：
1. 先在自己身上找，找到即返回
2. 自己身上找不到，则沿着原型链向上查找，找到即返回
3. 如果一直到原型链的末端还没有找到，则返回 undefined
```

---

## 函数进阶

### 函数的定义方式

- 函数声明
- 函数表达式(匿名函数)
- 自调用函数
- `new Function`

#### 函数声明

```javascript
function foo () {

}
```

#### 函数表达式

```javascript
var foo = function () {

}
```

#### 函数声明与函数表达式的区别

```
1.函数声明必须有名字
2.函数声明会函数提升，在预解析阶段就已创建，声明前后都可以调用
3.函数表达式类似于变量赋值
4.函数表达式可以没有名字，例如匿名函数
5.函数表达式没有变量提升，在执行阶段创建，必须在表达式执行之后才可以调用
```

​	下面是一个根据条件定义函数的例子：

```javascript
if (false) {
    function f () {
        alert(1);
    }
}
f();
//函数声明如果写在if else中，不同浏览器会有不同的结果
//谷歌报错 ：f is not a function
//ie8  alert(1)
//说明不同浏览器的预解析规则不太一样
```

​	不过我们可以使用函数表达式解决上面的问题：

```javascript
var f

if (false) {
  f = function () {
    console.log(1)
  }
} 

//函数表达式不会像函数声明一样被强行提升
```

#### new Function()

```javascript
//所有的函数实际上都是Function的构造函数创建出来的实例对象
var f1 = new Function("num1","num2","return num1+num2");
```

### 函数也是对象

```javascript
function f1(){}

1.所有函数都是 Function 的实例，所以函数也是对象(对象拥有 __proto__ 属性)，函数拥有prototype属性
2.console.dir(f1)    打印函数
3.所有的函数实际上都是Function的构造函数创建出来的实例对象
  f1.__proto__ == Function.prototype    //结果为true，函数的__proto__指向了Function的prototype
4.console.dir(Function)   Function既是一个函数也是一个对象，其实var Function = new Function()，这里就不讨论了。
  Function.prototype.__proto__ == Object.prototype   //Function的prototype中的__proto__最终都指向了Object的原型
5.console.log(Object.prototype.__proto__);  //null
```

![](media\hanshuyuanxing.png)

### call、apply、bind：作用可以改变函数this的指向

#### call

`	call()` 方法调用一个函数, 其具有一个指定的 `this` 值和分别地提供的参数(参数的列表)。

```javascript
//语法：fun.call(thisArg,args...)

function f1(a,b){
    console(a+b);
    console(this);
}
f1.call(null,100,200);

/*参数：
1. thisArg
    在函数运行时指定的 this 值
    如果指定了 null 或者 undefined 则内部 this 指向 window
2.arg1, arg2, ...
    指定的参数列表
*/
```

#### apply

`	apply()` 方法调用一个函数, 其具有一个指定的 `this` 值，以及作为一个数组（或类似数组的对象）提供的参数。


  注意：该方法的作用和 `call()` 方法类似，只有一个区别，就是 `call()` 方法接受的是若干个参数的列表，而 `apply()` 方法接受的是一个包含多个参数的数组。


语法：

```javascript
fun.apply(thisArg, [argsArray])

function f1(a,b){
    console(a+b);
    console(this);
}
f1.call(null,[100,200]);

/*
参数：
1. thisArg
2. argsArray
*/
```

`	apply()` 与 `call()` 非常相似，不同之处在于提供参数的方式。
`	apply()` 使用参数数组而不是一组参数列表。例如：

```javascript
//使用apply和call改变函数中this的指向
function f1(x,y) {
   console.log("这个函数是window对象的一个方法:"+(x+y)+this.sex);
}
window.f1(10,20);

//obj是一个对象
var obj={
     age:10,
     sex:"男"
};

window.f1.apply(obj,[10,20]);
window.f1.call(obj,10,20);
console.dir(obj);
```

```javascript
//通过apply和call改变原型方法中this的指向
function Person(age,sex) {
    this.age=age;
    this.sex=sex;
}
//通过原型添加方法
Person.prototype.sayHi=function (x,y) {
    console.log("您好啊:"+this.sex);
    return 1000;
};
var per=new Person(10,"男");
per.sayHi();

console.log("==============");
function Student(name,sex) {
    this.name=name;
    this.sex=sex;
}
var stu=new Student("小明","人妖");

var r1=per.sayHi.apply(stu,[10,20]);
var r2=per.sayHi.call(stu,10,20);

console.log(r1);
console.log(r2);
```

#### apply和call方法的由来

```javascript
function f1() {
    console.log(this+":====>调用了");
}
//f1是函数,f1也是对象
console.dir(f1);

//对象调用方法,说明,该对象中有这个方法
f1.apply();
f1.call();
console.log(f1.__proto__==Function.prototype);

//所有的函数都是Function的实例对象
console.log(Function.prototype);//ƒ () { [native code] }
console.dir(Function);
//apply和call方法实际上并不在函数这个实例对象中,而是在Function的prototype中
```

#### bind

​	bind函数是复制函数，在复制函数的时候改变了this的指向

```javascript
//语法：fun.bind(thisArg,args...)

function f1(x,y){
    console.log(x+y);
    console.log(this.age);
}

function Person(){
    this.age = 100;
}

var per = new Person();
var ff = f1.bind(per,10,20);  //这边将f1函数复制了一份，同时改变了f1函数中this的指向
ff();

/*
1.参数：
  1.1 thisArg
      当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
  1.2 arg1, arg2, ...
      当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

2.返回值：返回由指定的this值和初始化参数改造的原函数拷贝
*/
```

示例1：对象方法中this的修改

```javascript
function Person(age) {
    this.age=age;
}
Person.prototype.play=function () {
    console.log(this+"====>"+this.age);
};

function Student(age) {
    this.age=age;
}
var per=new Person(10);
var stu=new Student(20);

//复制了一份
var ff=per.play.bind(stu);
ff();
```

示例2：返回函数中this的修改

```javascript
this.x = 9; 
var module = {
  x: 81,
  getX: function() { 
      return this.x; 
  }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81
```

示例3：定时器函数中this修改

```javascript
<script>
    function ShowRandom() {

    }
    ShowRandom.prototype.showRandom = function(){
        //通过bind方法来修改定时器中this指向
        var timer = setInterval(function(){
            var num = this.produceNum();
            console.log(num);
        }.bind(this),1000)
    }
    ShowRandom.prototype.produceNum = function(){
        return parseInt(Math.random()*10+1);//1~10的随机数
    }

    var s = new ShowRandom();
    s.showRandom();
</script>
```

#### 小结

- call 和 apply 特性一样
  ```
  1.都是用来调用函数，而且是立即调用
  2.但是可以在调用函数的同时，通过第一个参数指定函数内部 this 的指向
  3.call 调用的时候，参数必须以参数列表的形式进行传递，也就是以逗号分隔的方式依次传递即可
  4.apply 调用的时候，参数必须是一个数组，然后在执行的时候，会将数组内部的元素一个一个拿出来，与形参一一对应进行传递
  5.如果第一个参数指定了 null 或者 undefined 则内部 this 指向 window
  ```

- bind
  ```
  1.可以用来指定内部 this 的指向，然后生成一个改变了 this 指向的新的函数
  2.它和 call、apply 最大的区别是：bind 不会调用
  ```

### 数组中存放函数

```javascript
//数组可以存储任何类型的数据
var arr=[
    function () {
        console.log("十一假期快乐");
    },
    function () {
        console.log("十一假期开心");
    }
    ,
    function () {
        console.log("十一假期健康");
    }
    ,
    function () {
        console.log("十一假期安全");
    },
    function () {
        console.log("十一假期如意");
    }
];
//回调函数:函数作为参数使用
arr.forEach(function (ele) {
    ele();
});
```

### 函数的其它成员

- arguments  实参集合
- length  形参的个数
- name  函数的名称
- caller  函数的调用者

```javascript
function fn(x, y, z) {
  console.log(fn.length) // => 形参的个数
  console.log(arguments) // 伪数组实参参数集合
  console.log(fn.caller) // 获取调用当前函数的函数
  console.log(fn.name) // => 函数的名字
}

function f() {
  fn(10, 20, 30)
}

f()
```

#### 什么是伪数组

​	伪数组，就是像数组一样有 `length` 属性，也有 `0、1、2、3` 等属性的对象，看起来就像数组一样，但不是数。

​	伪数组特点：

​	1.拥有 length 属性。但是其length属性不会像真正的数组一样随着元素的添加删除自动更新

​	2.可以遍历伪数组，但是不具备数组的方法  

```javascript
var fakeArray = {
  "0": "first",
  "1": "second",
  "2": "third",
  length: 3
};
 
delete fakeArray["2"]; //fakeArray中的length不会发生更新

for (var i = 0; i < fakeArray.length; i++) {
  console.log(fakeArray[i]);
}

// 此时fakeArray虽然具备length属性，但是不能直接调用数组的方法
// 伪数组存在的意义，是可以让普通的对象也能正常使用数组的很多算法,比如：
Array.prototype.join.call(fakeArray,'+');
Array.prototype.push.call(fakeArray, 'd')
//上面代码的含义：当前的fakeArray对象没有join方法，但是Array.prototype中有，可以将Array.prototype.join中的this改为当前的fakeArray，然后用"+"号进行拼接
```

#### 常见的伪数组

- 函数内部的 `arguments`
- DOM 对象列表（比如通过 `document.getElementsByTags` 得到的列表）
- jQuery 对象（比如 `$("div")` ）

#### 小结

- 伪数组是一个 Object，没有数组 Array.prototype 的属性值，而真实的数组是一个 Array。
- 数组是基于索引的实现， length 会自动更新；而Object对象是键值对
- 伪数组不可以直接调用数组的方法，但是可以通过原型call方式间接调用数组中的方法

### 函数递归

#### 递归执行模型

```javascript
function fn1 () {
  console.log(111)
  fn2()
  console.log('fn1')
}

function fn2 () {
  console.log(222)
  fn3()
  console.log('fn2')
}

function fn3 () {
  console.log(333)
  fn4()
  console.log('fn3')
}

function fn4 () {
  console.log(444)
  console.log('fn4')
}

fn1()
```

#### 举个例子：计算阶乘的递归函数

```javascript
function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
```

#### 举个例子：求n个数字的和

```javascript
//递归实现:求n个数字的和   n=5--->  5+4+3+2+1

//函数的声明
function getSum(x) {
    if(x==1){
        return 1;
    }
    return x+getSum(x-1);
}
//函数的调用
console.log(getSum(5));
```

#### 求斐波那契数

```javascript
function getFib(x) {
    if(x==1||x==2){
        return 1
    }
    return getFib(x-1)+getFib(x-2);
}
console.log(getFib(12));
```

#### 递归应用场景

- 遍历 DOM 树

  ```javascript
  //从根节点开始遍历
  function fromRoot(ele){
      //找到根节点的所有孩子
      var children = ele.children;
      //遍历根节点的每个孩子
      for(var i=0;i<children.length;i++){
          //获取每一个孩子
          var c = children[i];
          //打印节点名称
          console.log(c.nodeName);
          //如果每一个孩子下面还有子节点，则继续将每一个孩子看成根节点继续遍历孩子下面的子孩子
          c.children && fromRoot(c);
      }
  }
  fromRoot(my$("box"));
  ```

### 高阶函数

- 函数可以作为参数
- 函数可以作为返回值

#### 函数作为参数

```javascript
function f1(fn) {
    console.log("f1的函数");
    //fn是参数,最后作为函数使用了,函数是可以作为参数使用
    fn();//此时fn当成是一个函数来使用的
}

//1.传入匿名函数
f1(function () {
    console.log("我是匿名函数");
});

//2.命名函数
function f2() {
    console.log("f2的函数");
}
//函数作为参数的时候,如果是命名函数,那么只传入命名函数的名字,没有括号
f1(f2);
```

```javascript
function eat (callback) {
  setTimeout(function () {
    console.log('吃完了')
    callback();//回调
  }, 1000)
}

eat(function () {
  console.log('去唱歌')
})
```

```javascript
function f1(fn) {
   setInterval(function () {
       console.log("定时器开始");
       fn(); //回调
       console.log("定时器结束");
   },1000);
}

f1(function () {
   console.log("好困啊,好累啊,就是想睡觉");
});
```

#### 函数作为返回值

```javascript
function f1() {
    console.log("f1函数开始");
    return function () {
        console.log("我是函数,但是此时是作为返回值使用的");
    }
}

var ff=f1();
ff();
```

#### 判断和获取变量类型的方式

```javascript
//1.获取变量类型
var num=10;
console.log(typeof num);//获取num这个变量的数据类型
var obj={};//对象

//2.判断这个对象是不是某个类型的
console.log(obj instanceof Object);
console.log(obj.constructor == Object);//这种方式在函数的原型被改掉后会不适用

//3.获取变量类型的第三种方案
//此时输出的是Object的数据类型   [object Object]
console.log(Object.prototype.toString());

//获取某个对象的数据类型的样子
//Object.prototype.toString.call(对象);//此时得到的就是这个对象的类型

//输出的数组的数据类型      [object Array]
console.log(Object.prototype.toString.call([]));

var arr=[10,20,30];
console.log(Object.prototype.toString.call(arr));
```

​	案例：判断某个对象是否是指定类型的对象

```javascript
//判断某个对象是否是指定类型的对象
function genFun (type) {
  return function (obj) {
    //Object.prototype.toString.call(obj) 输出obj对象的数据类型
    return Object.prototype.toString.call(obj) === type
  }
}

var isArray = genFun('[object Array]')
var isObject = genFun('[object Object]')

console.log(isArray([])) // => true
console.log(isObject({})) // => true
```

#### 函数作为参数练习

```javascript
var arr = [1, 100, 20, 200, 40, 50, 120, 10];
//排序---函数作为参数使用,匿名函数作为sort方法的参数使用,那么此时的匿名函数中有两个参数,
arr.sort(function (obj1,obj2) {
    if(obj1>obj2){
        return -1;
    }else if(obj1==obj2){
        return 0;
    }else{
        return 1;
    }
});
console.log(arr);


//字符串可以直接用大于号小于号比较
var arr1=["acdef","abcd","bcedf","bced"];
arr1.sort(function (a,b) {
    if(a>b){
        return 1;
    }else if(a==b){
        return 0;
    }else{
        return -1;
    }
});
console.log(arr1);
```

#### 函数作为返回值练习

案例：排序,每个文件都有名字，大小,时间,都可以按照某个属性的值进行排序

```javascript
//三部电影,电影有名字,大小,上映时间
function File(name, size, time) {
    this.name = name;//电影名字
    this.size = size;//电影大小
    this.time = time;//电影的上映时间
}
var f1 = new File("jack.avi", "400M", "1997-12-12");
var f2 = new File("tom.avi", "200M", "2017-12-12");
var f3 = new File("xiaosu.avi", "800M", "2010-12-12");
var arr = [f1, f2, f3];

function fn(attr) {
    //函数作为返回值
    return function getSort(obj1, obj2) {
        if (obj1[attr] > obj2[attr]) {
            return 1;
        } else if (obj1[attr] == obj2[attr]) {
            return 0;
        } else {
            return -1;
        }
    }
}

var ff = fn("name");

//函数作为参数
arr.sort(ff);
for (var i = 0; i < arr.length; i++) {
    console.log(arr[i].name + "====>" + arr[i].size + "===>" + arr[i].time);
}
```

### 函数闭包

#### 变量作用域的回顾

```javascript
1.变量:局部变量\全局变量\隐式全局变量
2.作用域:就是变量的使用范围
    局部作用域和全局作用域
    js中没有块级作用域 : 括号中定义的变量,这个变量可以在大括号外面使用
    函数中定义的变量是局部变量
3.作用域链:变量的使用,从里向外,层层的搜索,搜索到了就可以直接使用了
    层层搜索,搜索到0级作用域的时候,如果还是没有找到这个变量,结果就是报错
4.预解析:就是在浏览器解析代码之前,把变量的声明和函数的声明提前(提升)到该作用域的最上面。函数的提升先于变量的提升。
```

#### 什么是闭包

​	闭包：定义在一个函数内部的函数，静态保存所有了父级作用域的内部函数。

​	闭包的三大特点为：

```
1、函数嵌套函数
2、内部函数可以访问外部函数的变量(函数A中,有一个函数B,函数B中可以访问函数A中定义的变量或者是数据)
3、缓存数据,延长变量的作用域链
```

​	闭包的分类：函数式闭包和对象模式闭包

```javascript
//闭包的主要作用：缓存数据,延长变量的作用域链
//1.函数模式的闭包
function f1(){
    var num = 10;
    return function(){
        console.log(num);
    }
}
var ff = f1();
ff();

//2.对象模式的闭包
function f3(){
    var num = 10;
    return {
        age:num
    }
}
var obj = f3();
console.log(obj.age);
```

​         闭包案例：产生三个随机数，但是这三个数都是相同的

```javascript
//闭包的主要作用：缓存数据,延长变量的作用域链
//普通函数
function showRandom() {
    var num=parseInt(Math.random()*10+1);
    console.log(num);
}
showRandom();
showRandom();
showRandom();


//闭包产生三个随机数，但是这三个数都是相同的
function f1(){
    var num = parseInt(Math.random()*10+1);
    return function(){
        console.log(num);
    }
}
var ff = f1();
ff();
ff();
ff();
```

​	闭包案例：实现函数内变量多次调用的累加

```javascript
//闭包的主要作用：缓存数据,延长变量的作用域链
//1.普通的函数
function f1() {
    var num = 10;
    num++;
    return num;
}
console.log(f1());
console.log(f1());
console.log(f1());

//2.函数模式的闭包
function f2() {
    var num = 10;
    return function () {
        num++;
        return num;
    }
}
var ff = f2();
console.log(ff());//11
console.log(ff());//12
console.log(ff());//13

//可以发现每次ff执行的时候，num的值发生了累加(其实是对应的内存未被释放)
```

​	闭包案例：点赞

```javascript
<ul>
    <li><img src="images/ly.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
	<li><img src="images/lyml.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
	<li><img src="images/fj.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
	<li><img src="images/bd.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
</ul>

<style>
    ul {
        list-style-type: none;
    }

    li {
        float: left;
        margin-left: 10px;
    }

    img {
        width: 200px;
        height: 180px;
    }

    input {
        margin-left: 30%;
    }
</style>

//获取所有的按钮
//根据标签名字获取元素
function my$(tagName) {
    return document.getElementsByTagName(tagName);
}
//闭包缓存数据
function getValue() {
    var value=2;
    return function () {
        //每一次点击的时候,都应该改变当前点击按钮的value值
        this.value="赞("+(value++)+")";
    }
}
//获取所有的按钮
var btnObjs=my$("input");
//循环遍历每个按钮,注册点击事件
for(var i=0;i<btnObjs.length;i++){
    //注册事件
    btnObjs[i].onclick=getValue();
}
```

#### 闭包的内存分析

![](media\bibao1.png)

> 第一步，代码执行前生成全局上下文环境，并在执行时对其中的变量进行赋值。此时全局上下文环境是活动状态。

![](media\bibao2.png)

> 第二步，执行第17行代码时，调用fn()，产生fn()执行上下文环境，压栈，并设置为活动状态。

![](media\bibao3.png)

> 第三步，执行完第17行，fn()调用完成。按理说应该销毁掉fn()的执行上下文环境，但是这里不能这么做。注意，重点来了：因为执行fn()时，返回的是一个函数。函数的特别之处在于可以创建一个独立的作用域。而正巧合的是，返回的这个函数体中，还有一个自由变量max要引用fn作用域下的fn()上下文环境中的max。因此，这个max不能被销毁，销毁了之后bar函数中的max就找不到值了。

> 因此，这里的fn()上下文环境不能被销毁，还依然存在与执行上下文栈中。

> 即，执行到第18行时，全局上下文环境将变为活动状态，但是fn()上下文环境依然会在执行上下文栈中。另外，执行完第18行，全局上下文环境中的max被赋值为100。如下图：

![](media\bibao4.png)

> 第四步，执行到第20行，执行f1(15)，即执行bar(15)，创建bar(15)上下文环境，并将其设置为活动状态。

![](media\bibao5.png)

> 第五步，执行完20行就是上下文环境的销毁过程，这里就不再赘述了。

#### 闭包内存案例

示例1：

```javascript
<script>
    function makeAdder() {
        var num = 5;
        return function() {
            return num++;
        }
    }
    var x = makeAdder(); //makeAdder创建作用域对象，makeAdder返回的函数引用该作用域对象(作用域对象不被销毁)
    console.log(x()); //5
    console.log(x()); //6
    x = null;    //返回函数的引用计数为0，释放makeAdder作用域对象

    var y = makeAdder();//makeAdder重新创建作用域对象，makeAdder返回的函数引用该作用域对象(作用域对象不被销毁)
    console.log(y()); //5
    console.log(y());  //6
</script>

//当JavaScript执行一个函数时，都会创建一个作用域对象(scope object)，用来保存在这个函数中创建的局部变量。他和被传入函数的变量一起被初始化。
//注意点是：第一，每次函数被执行的时候，就会创建一个新的，特定的作用域对象；
//第二，与全局对象（在浏览器里面是当做window对象来访问的）不同的是，你不能从JavaScript代码中直接访问作用域对象，也没有可以遍历当前作用与对象里面属性的方法。

//所以当调用 makeAdder 时，解释器创建了一个作用域对象，它带有一个属性：num。然后 makeAdder 返回一个新创建的函数。
//通常 JavaScript 的垃圾回收器会在这时回收 makeAdder 创建的作用域对象，但是返回的函数却保留一个指向那个作用域对象的引用。结果是这个作用域对象不会被垃圾回收器回收，直到指向 makeAdder 返回的那个函数对象的引用计数为零。
```

#### 闭包中的this

思考题 1：

```javascript
var name = "The Window";
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name;
    };
  }
};

console.log(object.getNameFunc()())
```

思考题 2：

```javascript
var name = "The Window";　　
var object = {　　　　
  name: "My Object",
  getNameFunc: function () {
    var that = this;
    return function () {
      return that.name;
    };
  }
};
console.log(object.getNameFunc()())
```

## JS的内存管理

### 内存管理介绍

​	JavaScript具有自动垃圾收集机制，执行环境会负责管理代码执行过程中使用的内存。

　　垃圾收集机制原理：垃圾收集器会按照固定的时间间隔（或代码执行中预定的收集时间）， 周期性地执行这一操作：找出那些不再继续使用的变量，然后释放其占用的内存。

​	JS中大部分浏览器采用标记清除的垃圾回收机制，部分低版本的IE采用引用计数来实现垃圾的回收。

### JS垃圾回收机制-引用计数

#### 引用计数介绍

​	这种方式常常会引起内存泄漏，**低版本的IE使用这种方式**。

​	原理：当JavaScript代码生成一个新的内存驻留项时（比如一个对象或函数），系统就会为这个项留出一块内存空间。因为这个对象可能会被传递给很多函数，并且会被指定给很多变量，所以很多代码都会指向这个对象的内存空间。JavaScript会跟踪这些指针，当最后一个指针废弃不用时，这个对象占用的内存会被释放。

```javascript
A ---------> B ---------> C

//例如对象A有一个属性指向B，而B也有一个属性指向C。即使当前作用域中只有对象A有效，但由于指针的关系所有3个对象都必须保留在内存中。当离开A的当前作用域时（例如代码执行到声明A的函数的末尾处），垃圾收集器就可以释放A占用的内存。此时，由于没有什么指向B，因此B可以释放，最后，C也可以释放。
```

#### 引用计数的问题-内存泄漏

​	内存泄漏是指程序中己动态分配的堆*内存*由于某种原因程序未释放或无法释放，造成系统*内存*的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。

```javascript
//循环引用导致内存泄漏 
A ---------> B ------------> C
             ^、_ _ _ _ _ _ _|
                  
//这里，我们又为对象C添加了一个引用B的属性。在这种情况下，当A释放时，仍然有来自C的指针指向B。这种引用循环需要由JavaScript进行特殊的处理，但必须考虑到整个循环与作用域中的其他变量已经处于隔离状态。
```

#### 什么时候会产生循环引用

##### 1.闭包的循环引用

> ​	闭包可能会导致在不经意间创建循环引用。因为函数是必须保存在内存中的对象，所以位于函数执行上下文中的所有变量也需要保存在内存中：    

```javascript
//闭包引起的循环引用
function outerFn() {
    var outerVar = {};
    function innerFn() {
        console.log(outerVar);
    }
    outerVar.fn = innerFn;
    return innerFn;
};

//	这里创建了一个名为 outerVar 的对象，该对象在内部函数innerFn()中被引用。然后，为 outerVar 创建了一个指向 innerFn()的属性，之后返回了innerFn()。这样就在 innerFn() 上创建了一个引用outerVar的闭包，而outerVar又引用了innerFn()。	
```

```javascript
//这会导致变量在内存中存在的时间比想象得长，而且又不容易被发现。这还不算完，还有可能会出现比这种情况更隐蔽的引用循环：
function outerFn() {
    var outerVar = {};
    function innerFn() {
        console.log('hello');
    }
    outerVar.fn = innerFn;
    return innerFn;
};

//这里我们修改了innerFn()，不再招惹 outerVar。但是，这样做仍然没有断开循环引用。

//即使innerFn()不再勾引 outerVar，outerVar 也仍然位于innerFn()的封闭环境中。由于闭包的原因，位于 outerFn()中的所有变量都隐含地被 innerFn()所引用。我们再想一想，在 java 中的内部类不也是类似当前情况吗，内部类能够‘看’外部的 this。此时此刻，正如彼时彼刻，竟如此相像。因此，闭包会使意外地创建这些引用循环变得易如反掌。
```

##### 2.DOM与JavaScript的循环引用

```javascript
//导致这种循环的一个常见原因是简单的事件处理:
$(document).ready(function() {
    var button = document.getElementById('button-1');
    button.onclick = function() {
        console.log('hello');
        return false;
    };
});

//当指定单击事件处理程序时，就创建了一个在其封闭的环境中包含button变量的闭包。而且，现在的button也包含一个指向闭包（onclick属性自身）的引用。这样，就导致了在IE中即使离开当前页面也不会释放这个循环。
//为了释放内存，就需要断开循环引用，例如关闭窗口,删除onclick属性。
```

```javascript
//也可以像下面这样重写代码来避免这种闭包：
function hello() {
    console.log('hello');
    return false;
}
$(document).ready(function() {
    var button = document.getElementById('button-1');
    button.onclick = hello;
});
//因为hello()函数不再包含 button，引用就成了单向的（从button到hello）,不存的循环，所以就不会造成内存泄漏	
```

```javascript
//用jQuery化解引用循环
$(document).ready(function() {
    var $button = $('#button-1');
    $button.click(function(event) {
        event.preventDefault();
        console.log('hello');
    });
});
//即使此时仍然会创建一个闭包，并且也会导致同前面一样的循环，但这里的代码却不会使 IE 发生内存泄漏。由于jQuery考虑到了内存泄漏的潜在危害，所以它会手动释放自己指定的所有事件处理程序。只要坚持使用jQuery的事件绑定方法，就无需为这种特定的常见原因导致的内存泄漏而担心。
```

[注意点：低版本的IE中需要注意循环引用的问题]()

### JS垃圾回收机制-标记清除

#### 标记清除介绍

​	大部分浏览器以此方式进行垃圾回收，当变量进入执行环境（函数中声明变量）的时候，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”，在离开环境之后还有的变量则是需要被删除的变量。标记方式不定，可以是某个特殊位的反转或维护一个列表等。

```javascript
//标记清除算法由以下步骤组成：
1.垃圾回收器构建"roots"列表。Roots通常是代码中保留引用的全局变量。在JavaScript中，"window"对象可以作为 root 全局变量示例。
2.所有的"roots"被检查并标记为active（即不是垃圾）。所有的children也被递归检查。从"root"能够到达的一切都不被认为是垃圾。
3.所有为不被标记为active的内存可以被认为是垃圾了。收集器限制可以释放这些内存并将其返回到操作系统。
```

![](media\biaojiqingchu.gif)

#### 循环引用不再是问题

![](media\biaojiqingchu2.png)

​	尽管两个对象还是存在引用，但是他们从 root 出发已经是不可达的了。


## 深浅拷贝

#### 浅拷贝

```javascript
//浅拷贝：就是把一个对象的地址给了另一个对象,他们指向相同,两个对象之间有共同的属性或者方法,都可以使用
var obj1={
    age:10,
    sex:"男",
    car:["奔驰","宝马","特斯拉","奥拓"]
};
//另一个对象
var obj2={};

//写一个函数,作用:把一个对象的属性复制到另一个对象中,浅拷贝
//把a对象中的所有的属性复制到对象b中
function extend(a,b) {
    for(var key in a){
        b[key]=a[key];
    }
}
extend(obj1,obj2);
console.dir(obj2);//开始的时候这个对象是空对象
console.dir(obj1);//有属性

//注意点：这边当拷贝car的时候其实是将obj1里面的car数组的引用地址给了obj2里面的car。也就是obj1里面的car和obj2里面的car其实是同一个东西
```

#### 深拷贝

```javascript
//深拷贝:拷贝还是复制,深:把一个对象中所有的属性或者方法,一个一个的找到.并且在另一个对象中开辟相应的空间,一个一个的存储到另一个对象中

var obj1={
    age:10,
    sex:"男",
    car:["奔驰","宝马","特斯拉","奥拓"],
    dog:{
        name:"大黄",
        age:5,
        color:"黑白色"
    }
};

var obj2={};//空对象
//通过函数实现,把对象a中的所有的数据深拷贝到对象b中
function extend(a,b) {
    for(var key in a){
        //先获取a对象中每个属性的值
        var item=a[key];
        //判断这个属性的值是不是数组
        if(item instanceof Array){
            //如果是数组,那么在b对象中添加一个新的属性,并且这个属性值也是数组
            b[key]=[];
            //调用这个方法，把a对象中这个数组的属性值一个一个的复制到b对象的这个数组属性中
            extend(item,b[key]);
        }else if(item instanceof Object){//判断这个值是不是对象类型的
            //如果是对象类型的,那么在b对象中添加一个属性,是一个空对象
            b[key]={};
            //再次调用这个函数,把a对象中的属性对象的值一个一个的复制到b对象的这个属性对象中
            extend(item,b[key]);
        }else{
            //如果值是普通的数据,直接复制到b对象的这个属性中
            b[key]=item;
        }
    }
}

extend(obj1,obj2);
console.dir(obj1);
console.dir(obj2)
```

## 正则表达式简介

### 什么是正则表达式

正则表达式：用于匹配规律规则的表达式，正则表达式最初是科学家对人类神经系统的工作原理的早期研究，现在在编程语言中有广泛的应用。正则表通常被用来检索、替换那些符合某个模式(规则)的文本。
正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。

### 正则表达式的作用

1. 给定的字符串是否符合正则表达式的过滤逻辑(匹配)
2. 可以通过正则表达式，从字符串中获取我们想要的特定部分(提取)
3. 强大的字符串替换能力(替换)

### 正则表达式的特点

1. 灵活性、逻辑性和功能性非常的强
2. 可以迅速地用极简单的方式达到字符串的复杂控制
3. 对于刚接触的人来说，比较晦涩难懂

### 正则表达式的测试

- [在线测试正则](https://c.runoob.com/front-end/854)
- 工具中使用正则表达式
  + sublime/vscode/word
  + 演示替换所有的数字

### 正则表达式的组成

- 普通字符
- 特殊字符(元字符)：正则表达式中有特殊意义的字符

示例演示：

- `\d` 匹配数字
- `ab\d` 匹配 ab1、ab2

### 元字符串

通过测试工具演示下面元字符的使用

#### 常用元字符串

元字符：除了\n之外的其他任意字符

| 元字符 | 说明                              |
| ------ | --------------------------------- |
| \d     | 匹配数字                          |
| \D     | 匹配任意非数字的字符              |
| \w     | 匹配字母或数字或下划线            |
| \W     | 匹配任意不是字母，数字，下划线    |
| \s     | 匹配任意的空白符                  |
| \S     | 匹配任意不是空白符的字符          |
| .      | 匹配除换行符以外的任意单个字符    |
| ^      | 表示匹配行首的文本(以谁开始)      |
| $      | 表示匹配行尾的文本(以谁结束)      |
| \b     | 表示单词边界匹配符   what are you |

#### 限定符

| 限定符   | 说明       |
| ----- | -------- |
| *     | 重复零次或更多次 |
| +     | 重复一次或更多次 |
| ?     | 重复零次或一次  |
| {n}   | 重复n次     |
| {n,}  | 重复n次或更多次 |
| {n,m} | 重复n到m次   |

```javascript
*    表示的是:前面的表达式出现了0次到多次
[a-z][0-9]*  小写字母中的任意一个,后面是要么是没有数字的,要么是多个数字的

+    表示的是:前面的表达式出现了1次到多次
[a-z][9]+    小写字母一个后面最少一个9,或者多个9

?    表示的是:前面的表达式出现了0次到1次,最少是0次,最多1次 。另一个含义:阻止贪婪模式
[4][a-z]?    4后面可以出现a~z，也可以没有


限定符:限定前面的表达式出现的次数
n{0,} 表示的是n出现了0次到多次,和*一样的
n{1,} 表示的是n出现了1次到多次,和 +一样的
n{0,1} 表示的是n出现了0次到1次,和 ?一样的
n{5,10} 表示的是前面的n出现了5次到10次
n{4}  表示n出现了4次
  

^ 表示的是以什么开始,或者是取非(取反) 
^[0-9] 以数字开头
^[a-z] 以小写字母开始
[^0-9] 取反,非数字
[^a-z] 非小写字母
[^0-9a-zA-Z_] 不再0到9 a到z A到Z之间

$ 表示的是以什么结束   [0-9][a-z]$  必须以小写字母结束
```

#### 其它

```
[] 字符串用中括号括起来，表示匹配其中的任一字符，相当于或的意思
[^]  匹配除中括号以内的内容
\ 转义符
| 或者，选择两者中的一个。注意|将左右两边分为两部分，而不管左右两边有多长多乱
() 从两个直接量中选择一个，分组
```

```javascript
[] 表示的是:范围
[1-7] 表示的是1到7之间的任意的一个数字
[a-z] 表示的是:所有的小写的字母中的任意的一个
[A-Z] 表示的是:所有的大写的字母中的任意的一个
[a-zA-Z] 表示的是:所有的字母的任意的一个
[0-9a-zA-Z] 表示的是: 所有的数字或者是字母中的一个
[\u4e00-\u9fa5]  匹配汉字
| 或者     [0-9]|[a-z] 表示的是要么是一个数字,要么是一个小写的字母
() 分组 提升优先级   [0-9]|([a-z])|[A-Z]         gr(a|e)y匹配gray和grey
([0-9])([1-5])([a-z]) 三组, 从最左边开始计算
```

## JavaScript 中使用正则表达式

### 创建正则对象

方式1：

```javascript
var reg = new Regex('\d', 'i');
var reg = new Regex('\d', 'gi');
```

方式2：

```javascript
var reg = /\d/i;
var reg = /\d/gi;
```

参数

| 标志   | 说明         |
| ---- | ---------- |
| i    | 忽略大小写      |
| g    | 全局匹配       |
| gi   | 全局匹配+忽略大小写 |

### 匹配正则表达式

```javascript
console.log(/[a-zA-Z]+/.test("hello"));
console.log(/./.test("除了回车换行以为的任意字符"));//true
console.log(/.*/.test("0个到多个"));//true
console.log(/.+/.test("1个到多个"));//true
console.log(/.?/.test("哈哈"));//true
console.log(/[a-z]/.test("what"));//true
console.log(/[A-Z]/.test("Are"));//true
console.log(/[a-zA-Z]/.test("干啥子"));//false
console.log(/[0-9a-zA-Z]/.test("9ebg"));//true
console.log(/b|(ara)/.test("abra"));//true
console.log(/[a-z]{2,3}/.test("arfsf"));//

console.log(/\d/.test("998"));//true
console.log(/\d*/.test("998"));//true
console.log(/\d+/.test("998"));//true
console.log(/\d{0,}/.test("998"));//true
console.log(/\d{2,3}/.test("998"));//true
console.log(/\D/.test("eat"));//true
console.log(/\s/.test("  "));//true
console.log(/\S/.test("嘎嘎"));//true
console.log(/\w/.test("_"));//true
console.log(/\W/.test("_"));//true
```

### 正则匹配案例

```javascript
//1.查看字符串是否包含数字
//var reg = new RegExp("\\d+");
var reg =/\d+/;  //相比上面写法少了转义字符

// test 方法检查在字符串中是否存在一个模式，如果存在则返回 true，否则就返回 false。
alert(reg.test("abc123"));

//2.需求：校验QQ号码
var reg = /^[1-9]\d{4,10}$/;
alert(reg.test("11533"));

//3.固定电话的正则
var reg = /^(0\d{2,3}-)?[1-9]\d{7}$/;
alert(reg.test("021-88882222"));

//4.匹配日期
var dateStr = '2015-10-10';
var reg = /^\d{4}-\d{1,2}-\d{1,2}$/
console.log(reg.test(dateStr));

//5.查看字符串是否以数字开头以数字结束
var reg = /^(\d+)$|^(\d+)(.)*(\d+)$/;
alert(reg.test("abc123"));

//注意点：其中^表示开头，$表示结束，/^\d+$/表示需要匹配的字符串必须以数字开头，必须以数字结束。如果去掉，则会进行部分匹配

//6.匹配邮箱
var reg = /^[a-zA-Z1-9]\\w{1,}@[a-zA-Z1-9]{2,}(\\.(com|cn|net)){1,2}$/;

//7.验证中文名字(2到6位)
var reg=/^[\u4e00-\u9fa5]{2,6}$/;

//8.需求：找出所有3个英文字母组成的单词
var str = "da Jia hao hao xue xi zheng qu sheng lii";
var reg = /\b[a-z]{3}\b/ig;

// exec 方法:用正则表达式模式在字符串中运行查找，并返回包含该查找结果的一个数组。
while((line = reg.exec(str)) !=null){
  	alert(line);
}

//9.把里面所有的数字全部显示出来
var str="中国移动:10086,中国联通:10010,中国电信:10000"; 
var reg=/\d{5}/g;
//通过正则表达式匹配这个字符串
var line=reg.exec(str);
while (line!=null){
   //输出匹配的内容
   console.log(line[0]);
   line=reg.exec(str);
}
```

### 分组提取

```javascript
 // 1. 提取日期中的年部分  2015-5-10
var dateStr = '2016-1-5';
// 正则表达式中的()作为分组来使用，获取分组匹配到的结果用Regex.$1 $2 $3....来获取
var reg = /(\d{4})-\d{1,2}-\d{1,2}/;
if (reg.test(dateStr)) {
  console.log(RegExp.$1);
}

// 2. 提取邮件中的每一部分
var reg = /(\w+)@(\w+)\.(\w+)(\.\w+)?/;
var str = "123123@xx.com";
if (reg.test(str)) {
  console.log(RegExp.$1);
  console.log(RegExp.$2);
  console.log(RegExp.$3);
}
```

## 字符串中正则的使用

### 字符串正则提取

```javascript
//match方法返回符合条件的集合
//1.查找字符串中所有连续出现的数字，放入数组
var str="abc123ee23f90";
alert(str.match(/\d+/g));
alert(str.match(/\d+/));//如果这里没有/g，只会找到第一个符合条件的放入数组

//2.查找字符串中所有的数字，放入数组
var str="abc123ee23f90";
alert(str.match(/\d/g));

// 3. 提取工资
var str = "张三：1000，李四：5000，王五：8000。";
var array = str.match(/\d+/g); 
console.log(array);

// 4. 提取email地址
var str = "123123@xx.com,fangfang@valuedopinions.cn 286669312@qq.com 2、emailenglish@emailenglish.englishtown.com 286669312@qq.com...";
var array = str.match(/\w+@\w+\.\w+(\.\w+)?/g);  //(\.\w+)?  表示可能出现0次或者多次
console.log(array);

//5.把里面所有的数字全部显示出来
var str="中国移动:10086,中国联通:10010,中国电信:10000"; 
var array=str.match(/\d{5}/g);
console.log(array);
```

### 贪婪模式和懒惰模式

​	所谓贪婪匹配就是匹配重复字符是尽可能多的匹配

​	懒惰模式就是匹配的时候尽可能的少匹配

```javascript
"aaaaa".match(/a+/);    //贪婪模式：["aaaaa"]
"aaaaa".match(/a+?/);   //懒惰模式(使用?号)：["a"]

'0a123ba123b'.match(/a[a-b0-9]*b/);	  //贪婪模式: ["a123ba123b"]
'0a123ba123b'.match(/a[a-b0-9]*?b/);  //懒惰模式 ：["a123b"]

//按照贪婪和懒惰模式，下面的结有问题：
"aaab".match(/a+b/);   //["aaab"]
"aaab".match(/a+?b/);  //["aaab"]  这边明明是懒惰模式，可是匹配结果仍然是"aaab"
//原因是正则表达式的模式匹配总是会寻找字符串中第一个可能匹配的位置。
```

### 字符串正则替换

```javascript
// 1. 替换所有空白
var str = "   123AD  asadf   asadfasf  adf ";
str = str.replace(/\s/g,"xx");
console.log(str);

// 2. 替换所有,|，
var str = "abc,efg,123，abc,123，a";
str = str.replace(/,|，/g, ".");
console.log(str);

//3.替换字符串中所有的 – 和 + 号
var str = "a-b-+b-c";
var reg = /-|\+/g;  //注意，此处没有加边界匹配器，因为要替换所有的-,g表示匹配的模式,+号需要转义
alert(str.replace(reg, "*"));

//4.替换字符串中的所有的帅
var str="你好帅哦,真的是太帅了,帅,就是真帅";
str=str.replace(/帅/g,"猥琐");
console.log(str);

//5.替换字符串中的所有的h
var str="HhpphH";//SSppSS
str=str.replace(/[h]/gi,"S");  //i忽略大小写
console.log(str);

//6.替换重叠词
var str = "妮妮好好啊，我好喜喜欢你";
var str1 = str.replace(/(.)\1+/g,"$1")
alert(str1);
 
//7.替换标签为空字符串
var str = "<p> 你好小明 </p> <div>王鹏</div>";
var reg = /<[^<>]+>/g;  //标签中除了<>不能放，其他都能放，所以是[^<>]
alert(str.replace(reg, ""));
```

![](F:\前端备课\06.js高级\笔记\media\bb.png)

### 字符串正则其他方法

```javascript
//1.查找字符串中指定字符
var str = "a-b-b-c";
//忽略大小写查找
var reg = /a/i;  
//打印结果是所查找的内容在字符串中出现的位置
alert(str.search(reg));

//2.切割字符串
var str="a|b|c|";
var arr=str.split(/\W+/);
alert(arr)
```

### 正则案例：验证密码强度

```javascript
<div id="dv">
    <label for="pwd">密码</label>
	<input type="text" id="pwd" maxlength="16"><!--课外话题-->
	<div>
    	<em>密码强度：</em>
		<em id="strength"></em>
		<div id="strengthLevel" class="strengthLv0"></div>
	</div>
</div>
<script src="common.js"></script>

<style type="text/css">
    #dv{
        width: 300px;
        height:200px;
        position: absolute;
        left:300px;
        top:100px;
    }
    .strengthLv0 {
        height: 6px;
        width: 120px;
        border: 1px solid #ccc;
        padding: 2px;
    }

    .strengthLv1 {
        background: red;
        height: 6px;
        width: 40px;
        border: 1px solid #ccc;
        padding: 2px;
    }

    .strengthLv2 {
        background: orange;
        height: 6px;
        width: 80px;
        border: 1px solid #ccc;
        padding: 2px;
    }

    .strengthLv3 {
        background: green;
        height: 6px;
        width: 120px;
        border: 1px solid #ccc;
        padding: 2px;
    }
</style>



//给我密码,我返回对应的级别
function getLvl(pwd) {
    var lvl=0;//默认是0级
    //密码中是否有数字,或者是字母,或者是特殊符号
    if(/[0-9]/.test(pwd)){
        lvl++;
    }
    //判断密码中有没有字母
    if(/[a-zA-Z]/.test(pwd)){
        lvl++;
    }
    //判断密码中有没有特殊符号
    if(/[^0-9a-zA-Z_]/.test(pwd)){
        lvl++;
    }
    return lvl;//最小的值是1,最大值是3
}


my$("pwd").onkeyup=function () {
    //每次键盘抬起都要获取文本框中的内容,验证文本框中有什么东西,得到一个级别,然后下面的div显示对应的颜色
    //如果密码的长度是小于6的,没有必要判断
    if(this.value.length>=6){
        var lvl=getLvl(this.value);
        if(lvl==1){
            //弱
            my$("strengthLevel").className="strengthLv1";
        }else if(lvl==2){
            my$("strengthLevel").className="strengthLv2";
        }else if(lvl==3){
            my$("strengthLevel").className="strengthLv3";
        }else{
            my$("strengthLevel").className="strengthLv0";
        }
    }else{
        my$("strengthLevel").className="strengthLv0";
    }
};
```

### 正则案例：表单验证

```javascript
QQ号：<input type="text" id="txtQQ"><span></span><br>
邮箱：<input type="text" id="txtEMail"><span></span><br>
手机：<input type="text" id="txtPhone"><span></span><br>
生日：<input type="text" id="txtBirthday"><span></span><br>
姓名：<input type="text" id="txtName"><span></span><br>

//获取文本框
var txtQQ = document.getElementById("txtQQ");
var txtEMail = document.getElementById("txtEMail");
var txtPhone = document.getElementById("txtPhone");
var txtBirthday = document.getElementById("txtBirthday");
var txtName = document.getElementById("txtName");

//
txtQQ.onblur = function () {
  //获取当前文本框对应的span
  var span = this.nextElementSibling;
  var reg = /^\d{5,12}$/;
  //判断验证是否成功
  if(!reg.test(this.value) ){
    //验证不成功
    span.innerText = "请输入正确的QQ号";
    span.style.color = "red";
  }else{
    //验证成功
    span.innerText = "";
    span.style.color = "";
  }
};

//txtEMail
txtEMail.onblur = function () {
  //获取当前文本框对应的span
  var span = this.nextElementSibling;
  var reg = /^\w+@\w+\.\w+(\.\w+)?$/;
  //判断验证是否成功
  if(!reg.test(this.value) ){
    //验证不成功
    span.innerText = "请输入正确的EMail地址";
    span.style.color = "red";
  }else{
    //验证成功
    span.innerText = "";
    span.style.color = "";
  }
};
```

​	表单验证部分，封装成函数：

```javascript
var regBirthday = /^\d{4}-\d{1,2}-\d{1,2}$/;
addCheck(txtBirthday, regBirthday, "请输入正确的出生日期");
//给文本框添加验证
function addCheck(element, reg, tip) {
  element.onblur = function () {
    //获取当前文本框对应的span
    var span = this.nextElementSibling;
    //判断验证是否成功
    if(!reg.test(this.value) ){
      //验证不成功
      span.innerText = tip;
      span.style.color = "red";
    }else{
      //验证成功
      span.innerText = "";
      span.style.color = "";
    }
  };
}
```
# study
