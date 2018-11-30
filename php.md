# 服务端开发基础

## 1.Web开发入门

```javascript
前端开发最终还是属于 Web 开发中的一个分支，想要成为一名合格的前端开发人员，就必须要充分理解Web的概念。

//Web服务软件分为两种
//1. C/S (Client - Server  客户端-服务器端)
典型应用：QQ软件 ，飞秋，红蜘蛛。
特点：
1）必须下载特定的客户端程序。
2）服务器端升级，客户端升级。

//2. B/S （Broswer -Server 浏览器端- 服务器端）
典型应用： 腾讯官方（www.qq.com）  163新闻网站， 
特点：
1）不需要安装特定的客户端（只需要安装浏览器即可！！）
2）服务器端升级，浏览器不需要升级！！！！
```

##  2.之前学习了什么

​	在之前的学习过程中，我们很专注，没有关心这些东西在整体中是什么角色，起到什么作用。这里我们是时候总结一下我们之前学过了的内容：

```
网页开发技术（硬性）

HTML —— 网页内容结构（GUI）
CSS —— 网页外观样式（GUI）
JavaScript —— 编程语言（可以用于调用浏览器提供的 API）

Web APIs —— 网页交互（界面功能）
jQuery —— 便捷手段（糖果而已，不是必要的）
编程能力 / 编程思想 / 解决问题的思路（软性）
```

​    至此，我们已经可以独立完成网页开发了，具体能完成的东西就是一个一个的网页，而且还能给这个页面加上一些动态的交互。但是这距离成为一个网站还有一些路要走。

## 3.还需要学习什么

​	想要完成完整的 Web 网站，还需要学习什么？

```
搭建 WEB 服务器（提供网站服务的机器）
HTTP（浏览器与服务端的通讯协议）
服务端开发（动态网页技术）
数据库操作（服务端存储数据方式）
AJAX（浏览器与服务端的数据交互方式）
```

## 4.网络基础概念

### 4.1 IP介绍

​	设备在某一个网络中的地址，目前最常见的格式： [0-255].[0-255].[0-255].[0-255] 即为四个 0-255 的数字组
成。
	IP作用就是标识一个网络设备（计算机、手机、电视）在某一个具体的网络当中的地址。

```javascript
//IP4地址：IP地址本质上是一个由32位的二进制数组成的数据。后来为了方便记忆，就把IP4地址切成了4份，每份是8位。
00000000-00000000-00000000-00000000
2^8 – 2^8 -2^8 -2^8，大概42亿个，其中30亿在北美，亚洲4亿。2011年初已经用尽。

//IP6 ：是一个由128位二进制数组成的数据

Ipconfig ：查看本机ip ，192.168.10．1
Ping www.baidu.com  ：查看能否连接百度
127.0.0.1 是本地回环地址
```

#### 4.1.1. 局域网IP 地址

​	在单个局域网下，结构非常简单，就是我们所连接的网络设备（网关）给我们分配了一个地址，在这个范围之内我们都可以通过这个地址找到我们的这个设备。

> 如果设备没有连接任何网络情况下，我们会有一个本地回环地址 127.0.0.1

![](media/p7.png)

#### 4.1.2. 公网IP地址	

​	IP是互联网的唯一定位地址，作用相当于门牌号，比如有2000台电脑，电脑通过[路由交换机](https://www.baidu.com/s?wd=%E8%B7%AF%E7%94%B1%E4%BA%A4%E6%8D%A2%E6%9C%BA&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)形成一个局域网，就像一个大楼，大楼内部找人，有301室，302室。但是对外面的人来说，是无法进行、获取到内部地址的，她们找查找的时候只能找到XX大楼，大楼的大门号就相当于[公网IP](https://www.baidu.com/s?wd=%E5%85%AC%E7%BD%91IP&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)

​	所以同一个路由器交换机下的公网ip都是一致的。同一wifi下算是组建了一个小型局域网，路由器算作一个网关，路由器将有唯一的IP对外网进行转发传输，而外网数据在到达路由器后，由于在此局域网的用户IP是唯一的，路由器可以轻松进行进一步ARP地址匹配数据包进行连接传输，每位用户在路由器内部拥有唯一的ARP指向区，不会造成混乱。

![](media/ip01.png)

### 4.2. 域名

​	由于 IP 地址都是没有规律的一些数字组成的，很难被人记住，不利于广泛传播，所以就有人想出来要给 IP 起名字（别名）。

> 域名是需要花钱注册的

### 4.3. DNS与Hosts文件

​	通过宽带运营商提供的服务器解析一个域名背后对应的 IP，这个过程叫做 DNS 寻址，帮你完成 DNS 寻址过程的服务器叫做 DNS 服务器。

​	DNS寻址过程：浏览器--->操作系统缓存---->本机hosts文件--->DNS服务器

​	操作系统在发起对 DNS 服务器的查询请求之前，会优先检查浏览器缓存的DNS和本机的 hosts 文件。如果有包含了对当前需要解析的域名的配置，则不再发起对 DNS 服务器的请求，直接使用 浏览器缓存或者本机hosts文件中的配置。

```javascript
//1.浏览器缓存中DNS查看
chrome://net-internals/#dns

//2.hosts文件所在路径：
Windows： C:\Windows\System32\drivers\etc\hosts
macOS： /etc/hosts

//3.注意：
本机的 hosts 文件配置只能到影响本机的 DNS 寻址
只有以管理员权限运行的编辑器才有权利修改 hosts 文件

//4.常用DNS服务器
北京联通      202.106.0.20  	202.106.196.115
阿里          223.5.5.5  223.6.6.6              
114          114.114.114.114   
//114是国内移动、电信和联通通用的DNS，手机和电脑端都可以使用，干净无广告，解析成功率相对来说更高，国内用户使用的比较多，而且速度相对快、稳定，是国内用户上网常用的DNS
南方电信      180.153.225.136
百度          180.76.76.76                 
360          101.226.4.5
谷歌          8.8.8.8                
```

![](media\d10.png)

### 4.4. 端口

​	计算机本身是一个封闭的环境，就像是一个大楼，如果需要有数据通信往来，必须有门，这个门在术语中就叫端口。

​	端口号是每个应用程序在终端设备上的唯一标识。

> 一般我们把“占门”的过程叫做监听

​	可以通过在命令行中运行： netstat -an 命令监视本机端口使用情况：

![](media/p9.png)



```javascript
https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF%E5%8F%A3
https://baike.baidu.com/item/%E7%AB%AF%E5%8F%A3

//端口号的取值范围0~65535 ，1024以下端口(0~1023端口)被系统占用，不可以使用。
1024~49151端口是系统绑定的松散服务（其中一些端口是可以使用的）。
49152~65535 是可以使用的端口。

//常用端口：
	Mysql:3306
	Oracle:1521
	Tomcat:8080
	QQ:4000
	FeiQ:2425
	http:80
	https:443
```

### 4.5. URL和URI

​	URL（Uniform Resource Locator），统一资源定位符，通俗点来说就是表示网络当中某一个网页的完整访问地址，它具有一定的格式：

![](media/p10.png)

​	URI：统一资源标识符，用来标识互联网上的唯一资源。

```javascript
//URI和URL区别
URI可以是资源标识片段(fragment)，URL确是资源标识的整体表达。
URI 和 URL 都定义了 what the resource is。URL 还定义了 how to get the resource

完全URI： scheme://authority/path?query#fragment
在URI中,scheme  path  query等有时可以省略，但是URL不可以省略，需要完整的描述资源信息(因为要根据这部分描述去获取这个资源信息)
```

## 5.搭建 Web 服务器

```
服务器（提供服务）指的就是一台安装特定的软件的公共计算机，用于专门用于提供特定的服务。
按照服务类型的不同，又划分为：Web 服务器、数据库服务器、文件服务器等等。

客户端（使用服务）指的是在一次服务过程中使用这个服务的设备（网络端点）。
目前咱们最常见的客户端就是浏览器
```

​	我们手头上的这些网页，如果想要成为一个网站，首先要完成的第一件事就是有一台公共的 Web 服务器，把这一系列的页面放到这台 Web 服务器上，让用户可以通过服务器的地址访问到这些网页

![](media\p1.png)

​	我们手头上的电脑都可以是一台服务器，因为服务器是一个相对的概念，只要能提供服务就可以是一个服务器（提供服务的时候就是服务端，使用服务的时候就是客户端）。

​	既然服务器就是安装特定的软件的计算机，那么要让自己的成为 Web 服务器就是要安装一个 Web 服务器软件。

### 5.1  Web 服务器软件介绍

```javascript
//web服务软件的作用：把本地的资源共享给外部访问。

//常用的web服务软件
Apache ····································· PHP
IIS ·············································· ASP.NET
Tomcat ····································· Java
WebLogic/WebSphere/JBoss 等等
```

### 5.2. Web服务软件-apache

#### 5.2.1 apache安装

​	这里我们选择一个比较常用的 Web 服务器软件：Apache HTTP Server。

```
如果使用的是安装版，与其他软件相同，安装无外乎就是一路点下一步，只是需要注意安装目录路径中不要
有中文。

由于最新的 Apache 已经不提供 Windows 的安装版本了，所以我们这里使用的是解压版。

下载地址：https://www.apachelounge.com/download/
使用说明：https://httpd.apache.org/docs/current/platform/windows.html
```

​	安装方式如下，先解压到纯英文路径的文件夹，然后执行以下命令：

```javascript
# 注意：需要使用管理员身份运行命令行！！！
# 切换到 Apache 解压路径中的 bin 目录
$ cd <解压目录>/bin
# 安装 Apache 服务，‐n 参数是指定服务名称
$ httpd.exe -k install -n "Apache"
# 如果需要卸载 Apache，可以执行以下命令
$ httpd.exe -k uninstall -n "Apache"
```

​	执行安装命令过后会报一个错，原因是默认的配置文件有问题，需要先调整一下配置文件 conf/httpd.conf ，才能正常启动服务。

![](media\p2.png)

​	找到 Apache 解压目录中的 conf 目录下的 httpd.conf 文件，定位到 37 行，将 c:/Apache24 改为解压目录，我这里解压到路径是 C:/Develop/apache ，所以我这里修改

![](media\p3.png)

​	修改完以后，执行以下命令重新测试配置文件是否通过。

```javascript
$ httpd.exe ‐t
```

​	这里任然报错：

![](media\p4.png)

​	通过错误信息得知，这里是因为另外一个地方配置的目录不存在导致的，所以接着调整 246 行的 DocumentRoot选项：
![](media\p5.png)

​	随即，我们发现这个配置文件中有很多默认配置选项中的路径都是 c:/Apache24 ，所以我们批量都修改为我们解压的目录路径。
	然后重新执行 httpd.exe -t 测试配置文件，这时候应该提示 Syntax OK 。

> 如果有关于 ServerName 的警告提示，不用管它，暂时还不会影响我们接下来的使用和操作。

​	接着运行以下命令重新启动 Apache 服务：

```javascript
# 注意：需要使用管理员身份运行命令行！！！
$ httpd.exe ‐k start ‐n "Apache"
# 重新启动 Apache 服务
$ httpd.exe ‐k restart ‐n "Apache"
# 停止 Apache 服务
$ httpd.exe ‐k stop ‐n "Apache"

```

​	回到浏览器中，地址栏输入：http://localhost/，回车访问，这时正常应该看到 It works!

![](media\p6.png)



#### 5.2.2. 提供 Web 服务

​	启动 Apache，让别人可以使用你机器上安装的 Apache 提供的 Web 服务，访问你机器上的网站。这种情况下你的机器就是服务器，别人的机器就是客户端。

```javascript
//注意：
1.确保配置文件语法检查通过
2.确保 80 端口没有被其他程序占用
3.确保防火墙允许 80 端口的请求，或者干脆关掉防火墙
4.如果出现 Forbidden 情况，确保配置文件 httpd.conf 中 247 行（ DocumentRoot 之后）的 Directory 配
置的与 DocumentRoot 路径相同
5.我们在开发阶段大多数都是自己访问自己机器上的网站，那这种情况下，我们既是服务端又是客户端。对于新手来说，最常见的问题就是分不清楚哪是客户端应该有的，哪是服务端应该有的。这种时候一定要保持清醒，客户端局限在浏览器窗口，代码以及 Apache 相关的文件和配置都是放在服务端的。
```

#### 5.2.3.配置 Apache

```
配置文档：http://httpd.apache.org/docs/current/
配置文件中行首的 # 指的是注释
注意：以下所记录的行号仅供参考，不同版本的配置文件可能不尽相同。
```

##### a. 监听端口

​	监听端口可以随意修改为任意一个未被其他程序监听的端口，可以通过设置配置文件 httpd.conf 中的 Listen
指令后面的数字修改。

![](media/p12.png)

##### b. 网站根目录

```
网站根目录就是存放我们网站文件的最顶层目录，通常 URL 中域名后面的第一个斜线对应（映射）的就是网
站根目录。
默认文档指的是我们在访问某一个目录时（没有指定具体的文件），默认访问的文件叫做默认文档
注：动态网站情况会比较特殊，需要单独考虑，不一定是这个规则。
```

​	默认 Apache 的网站根目录是安装目录中的 htdocs 文件夹，为了方便对网站文件的管理，一般我们会将其设置在一个自定义目录中（如果你不介意其实不修改也无所谓）。
	如果需要设置网站根目录，可以通过修改配置文件 httpd.conf 中的网站根目录选项切换。

![](F:/%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE/08.php/readme/media/p13.png)



##### c. 默认文档

```
当客户端访问的是一个目录而不是具体文件时，服务端默认返回这个目录下的某个文档（文件），这个文档
就称之为默认文档。
```

​	配置文件 httpd.conf 的 280 行的 DirectoryIndex ，默认文档可以配置多个（有前到后依次去找，找到为止，如果没找到任何一个则启用目录浏览）：

![](F:/%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE/08.php/readme/media/p14.png)

##### d. 虚拟主机

​	如果一台机器上只有一个网站的话，没有任何问题，但是如果想要在一台机器上部署多个站点，就必须通过配置虚拟主机的方式解决。一旦配置虚拟主机之后，**原来的apacke的网站根目录就不能用了**。

​	由于后期对虚拟主机的配置操作非常常见，所以我们一般将虚拟主机的配置单独放到一个配置文件中，然后
在主配置文件中引入，避免破坏主配置文件中的其他配置。
	Include conf/extra/httpd-vhosts.conf 配置的作用就将另外一个配置文件引入（使其生效）

​	具体的操作方式就是在主配置文件 httpd.conf 的 505 行取消注释：

![](media/p15.png)

​	然后找到 Apache 的虚拟主机配置文件，添加一个如下的虚拟主机配置节点，然后重新启动 Apache。

```
这个文件中有两个默认的示例配置，可以注释掉 (Alt+shif+上下箭头)
```

![](media/p16.png)



​	如果真的要使用 baixiu.com 这个域名的话，就只能通过修改 hosts 文件达到目的，原因很简单：这个域名不是我们自己的，我们没有办法修改这个域名在公网上的 DNS。

**注意：还需要修改httpd.conf中的**

```javascript
<Directory>
 AllowOverride none
 # Require all denied
Require all granted
</Directory>


//注意
如果使用了虚拟主机，则默认必须全使用虚拟主机，即之前的默认网站也必须通过虚拟主机方式配置，否则访问不到。参考：http://skypegnu1.blog.51cto.com/8991766/1532454

如果虚拟主机的端口使用的不是 80 ，则需要在主配置文件中添加一个对这个端口的监听
```

##### e.配置php支持

```
PHP 文件的扩展名就是 .php
```

我们可以尝试在刚刚配置的网站中添加一个扩展名为 php 的文件，然后到浏览器中访问它。

```php
<!‐‐ demo.php ‐‐>
<?php echo 'Hello PHP'; ?>
```

结果出乎意料，并没有显示我们想要的 Hello PHP ，而是将我们的代码原封不动的返回给浏览器了。

![](F:/%E5%89%8D%E7%AB%AF%E5%A4%87%E8%AF%BE/08.php/readme/media/p18.png)

原因很简单：Apache 只能处理静态文件请求，对于后缀名为 .php 这种动态文件，它无法执行，所以就当成是一
个静态文件直接返回了。

```
解决方法：
1.在服务器上安装 PHP
2.解压 php 到纯英文路径目录中
3.在 Apache 中添加支持 PHP 的配置
```

```javascript
1.在 Apache 添加 PHP 处理模块
# php support
LoadModule php7_module C:/Develop/php/php7apache2_4.dll
    
2.在 <IfModule mime_module> 节点中添加 .php 扩展名解析支持
# parse .php files
AddType application/x‐httpd‐php .php

3.默认文档配置节点 <IfModule dir_module> 中添加 index.php
  默认文档指的是在访问一个目录而不是具体文件名时，默认执行的文件名
  <IfModule dir_module>
      DirectoryIndex index.html index.php
  </IfModule>    

4.重启 Apache
```

### 5.3 Web服务软件-集成环境

​          wamp(windows  apache  mysql  php)

​	  直接点击安装就可以。

​	  默认会访问安装目录下的index.html/index.php	

##### 	a. 允许所有请求

​	在安装目录的apache下面找到httpd.conf文件修改如下。修改之后需要重启apache，别人就可以通过ip来访问当前主机了。

​	![1537712690593](media\wamp01.png)

#####         b.配置网站根目录

​             **需要确保d:/myweb文件夹存在**

![1537712690593](media\wamp02.png)

##### 	c.配置虚拟主机

​	   有时候我们想要在apache上运行多个站点，这个时候就需要配置虚拟主机

​	   1) 具体的操作方式就是在主配置文件 httpd.conf 的 505 行取消注释：

![](media/p15.png)

​	    2) 然后找到 Apache 的虚拟主机配置文件，添加一个如下的虚拟主机配置节点(需要确保相关文件夹存在)，然后重新启动 Apache。

```
这个文件中有两个默认的示例配置，可以注释掉 (Alt+shif+上下箭头)
```

![](media/wamp03.png)

​	3) 修改C:\Windows\System32\drivers\etc\hosts配置，需要管理员权限

![](media/wamp04.png)



## 6.请求响应流程

 	安装配置完成服务器之后，我们把网页部署到服务器，浏览器通过指定网址访问到的是服务器的资源。这里就是一个简易的网站。

![](media\p11.png)



```
1. 用户打开浏览器
2. 地址栏输入我们需要访问的网站网址（URL）
3. 浏览器通过 DNS 服务器获取即将访问的网站 IP 地址
4. 浏览器发起一个对这个 IP 的请求
5. 服务端接收到这个请求，进行相应的处理
6. 服务端将处理完的结果返回给客户端浏览器
7. 浏览器将服务端返回的结果呈现到界面上
```

## 7.静态网站与动态网站

​	至此，我们已经可以把这些静态页面放到服务器上了，客户端也可以通过域名请求这个网站，但是对于我们来说，Apache 能够完成的事情过于简单，无外乎就是找到你请求对应的文件 → 读取文件 → 将文件内容响应给客户端浏览器（文件原封不动的给你）。无法满足让网页内容动起来（随着数据动态变化）的需求。
	于是乎，就有人提出了服务端动态网页的概念，这种实现这种概念的技术有很多种：JSP、ASP.NET、PHP、Node等等。
	这些技术的原理就是：不再将 HTML 固定写死，每次用户请求时，动态执行一段代码，临时生成一个用户想要的HTML 页面。

![](media\p17.png)

​	动态网站指的也就是每次请求时服务端动态生成 HTML 返回给用户的这种网站。

​	我们使用 PHP 的目的就是能让静态网页变成动态网页，能称之为动态网页的核心就是让 HTML 上的内容不再被写死，而是通过在 HTML 中嵌入一段可以在服务端执行的代码，从而达到动态网页的目标。

​	例如：我们需要有一个网页，这个网页每次打开都可显示当前的年月日，如果采用 HTML 处理：

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF‐8">
   <title>当前日期</title>
</head>
<body>
   <h1>2020‐01‐01</h1>
</body>
</html>
```

​	我们必须每天到服务器上修改这个网页，从而让它保持显示最新日期，但是有了 PHP 这种能够在服务端执行的脚本语言就可以很轻松实现：

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF‐8">
   <title>当前日期</title>
</head>
<body>
   <h1><?php date_default_timezone_set('PRC'); echo date('Y-m-d H:i:s');?></h1>
   </body>
</html>

```

​	从以上这个最最简单的基础案例就能看出：PHP 无外乎为了可以在网页中动态输出最新内容的一种技术手段

## 8. Apache 与 PHP

​	对于很多初学者来说，很容易把 Apache 和 PHP 混在一起 混为一谈，其实他们两者各自有各自负责的领域，各自的职责，但是我们在使用 PHP 做动态网站开发时，两者就会产生联系，具体如下：

![](media\p19.png)



```
1.Apache是服务器，所有的网站都部署在Apache服务器上，由Apache提供对接外部访问非服务。
2.Php是开发动态网页的技术，当访问的是php文件的时候，会先执行php脚本，然后再把执行完脚本之后的代码通过Apache服务器返回给浏览器。
```

# PHP

详细参考文档：http://php.net/manual/zh/index.php

## 1.起步

```
PHP 是什么？
PHP 写在哪？
PHP 能做啥？

超文本标记是用普通文本描述富文本的一种方式
```

​	PHP（PHP: Hypertext Preprocessor）是一种被广泛应用的脚本语言，它可以被嵌入到 HTML中，尤其适合做动态网站开发开发。

​	我们接下来会在 PHP 中看到的许多代码特性和其他编程语言类似，例如：变量、函数、循环，等等。 代码语法看起来不同，但是在概念上是基本类似的。	

> 历史使人明智：http://php.net/manual/zh/history.php.php

### 1.1. PHP 标记

> http://php.net/manual/zh/language.basic-syntax.phpmode.php

```
<?php 可以让代码进入“PHP 模式”
?> 可以让代码退出“PHP 模式”
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF‐8">
   <title>这是一个包含 PHP 脚本的网页</title>
</head>
<body>
   <h1>这是一个包含 PHP 脚本的网页</h1>
   <p>这里原封不动的输出</p>
   <?php
      // 这里是 PHP 代码，必须满足 PHP 语法
      $foo = 'bar';
      echo $foo;
   ?>
   <p>这里也不变</p>
   <p><?php echo '<b>这还是 PHP 输出的</b>'; ?></p>
</body>
</html>
```

​	类似于在 HTML 中使用 JavaScript，但是不同的是 JavaScript 运行在客户端，而 PHP 运行在服务端。
	**只有处于 PHP 标记内部的代码才是 PHP 代码，PHP 标记以外都原封不动。**

### 1.2. 省略结束标记

​	如果 PHP 代码段处于整个文件的末尾，建议（必须）删除结束标记，这样不会有额外的空行产生。

### 1.3. 输出内容方式

​	echo：

```php
<?php
// echo 是 PHP 中的一个特殊的“指令”，
// 不一定需要像函数那样通过 `()` 去使用
// 注意：echo 后面紧跟着一个空格
echo 'hello php';
echo 'hello', 'world';
// => `helloworld`
```

​	print：

```php
<?php
// print 与 echo 唯一区别就是只能有一个参数
print 'hello php';
// print 'hello', 'world';
// => Parse error: syntax error ...
```

​	var_dump：

```php
<?php
// var_dump 是一个函数，必须跟上 () 调用
// 可以将数据以及数据的类型打印为特定格式
var_dump('hello php');
// => 'string(9) "hello php"'
```

​	还有一些输出函数（可以通过查手册自学，用到再说），例如： exit() / print_r() 等等

### 1.4. 与 HTML 混编

​	普通嵌入

```php
<p><?php echo 'hello'; ?></p>
```

​	语句混编

```php
<?php if ($age >= 18) { ?>
<p>成年人</p>
<?php } else { ?>
<p>小朋友</p>
<?php } ?>
```

​	更常见的用法：

```php
<?php if ($age > 18): ?>
<p>成年人</p>
<?php else: ?>
<p>小朋友</p>
<?php endif ?>
```

### 1.5. 注释

​	你可以在代码中添加注释，从而增强我们代码的可阅读性。PHP 中注释有两种方式（与 JavaScript 相同）：

​	单行注释

```php
<?php
// 这是一条单行注释
# 井号也可以做注释（不要用，有点生僻）
$foo = 'hello';
```

​	多行注释

```php
<?php
/*
......
这里可以添加任意行数的注释内容
......
*/
$foo = 'hello';
```

## 2.语法

​	编程语言常见的语法

```
变量 —— 用于临时存放数据的容器
顺序结构 —— 先干什么再干什么
分支结构 —— 如果怎样就怎样否则怎样
循环结构 —— 不断的做某件相同的事
函数 —— 提前设计好一件事怎么干，然后想什么时候干就什么时候干
运算符 —— 数学运算和字符串拼接
字面量 —— 在代码中用某些字符组成，能够表达一个具体的值 这些字符之间表示数据的方式叫做字面量
```

​	PHP 也是另外种编程语言，作为另外一种编程语言，PHP 也具备着绝大多数语言都有的特点，例如变量、条件分支、循环、函数等等，不同的是每个语言都会有自己的语法规定。这里不用太过担心，这些语法规定与之前学习的编程语言大同小异，对我们来说不会有太大的压力。

```
1. 变量
2. 双引号字符串和单引号字符串的差异
3. 指令式的语法
4. foreach
5. 函数作用域问题
6. 字符串拼接
```

### 2.1. 变量

​	变量是编程语言中临时存放数据的容器。

​	PHP 中申明一个变量是用一个美元符号后面跟变量名来表示。变量名同样是区分大小写的。
	PHP 中变量无需声明类型，变量的类型根据值的类型来推断。

```php
<?php
$foo; // 申明一个变量，变量名为 `foo`，未对其进行赋值
$bar = 'baz'; // 申明一个变量，将一个值为 `baz` 的字符串赋值给它
echo $foo; // 输出一个变量名为 `foo` 的变量
fn($bar); // 将一个变量名为 `foo` 的变量作为 `fn` 的实参传递
```

#### 2.1.1. 数据类型

​	常见的 PHP 数据类型与 JavaScript 基本一致：

```
string（字符串）
integer（整型）—— 只能存整数
float（浮点型）—— 可以存带小数位的数字
boolean（布尔型）
array（数组）
object（对象）
NULL（空）
Resource（资源类型）
Callback / Callable（回调或者叫可调用类型）
```

##### a 字符串：

​	PHP 有多种创建字符串的方式：单引号、双引号等。

```
1.单引号字符串
    不支持特殊的转义符号，例如 \n
    如果要表示一个单引号字符内容，可以通过 \' 表达
    如果要表示一个反斜线字符内容，可以通过 \\ 表达
2.双引号字符串
    支持转义符号
    支持变量解析
```

```php
<?php
// ====== 单引号 ======
echo 'hello\nworld';
// => `hello\nworld`
echo 'I\'m a better man';
// => `I'm a better man`
echo 'OS path: C:\\Windows';
// => `OS path: C:\Windows`
// ====== 双引号 ======
echo "hello\nworld";
// => `hello
// world`
$name = 'zce';
echo "hello $name";
// => `hello zce`
```

```
字符串函数
http://php.net/manual/zh/ref.strings.php
http://www.w3school.com.cn/php/php_string.asp
```

##### b 数组

​	PHP 中数组可以分为两类：
	1.索引数组，与 JavaScript 中的数组基本一致

```php
<?php
// 定义一个索引数组
$arr = array(1, 2, 3, 4, 5);
var_dump($arr);
// PHP 5.4 以后定义的方式可以用 `[]`
$arr2 = [1, 2, 3, 4, 5];
var_dump($arr2);
```

​	2.关联数组有点类似于 JavaScript 中的对象

```php
<?php
// 注意：键只能是`integer`或者`string`
$arr = array('key1' => 'value1', 'key2' => 'value2');
var_dump($arr);
// PHP 5.4 以后定义的方式可以用 `[]`
$arr2 = ['key1' => 'value1', 'key2' => 'value2'];
var_dump($arr2);
```

​	3.二维数组

```php
$arr = array();
$arr[0] = array(11,22,33);
$arr[1] = array(44,55,66);
$arr[2] = array(77,88,99);
print_r($arr); 
//echo输出字符串，print_r输出对象，var_dump更详细的输出对象


$arr = array(123);
$arr['apple'] = array('color'=>'red','shape'=>'round');
$arr['orange'] = array('color'=>'orange','shape'=>'round');
$arr['banana'] = array('color'=>'yellow','shape'=>'long');
print_r($arr);
```

#### 2.1.2. 数据类型转换

> 参考：http://php.net/manual/zh/language.types.type-juggling.php

```php
<?php
$str = '132';
// 将一个内容为数字的字符串强制转换为一个整形的数字
$num = (int)$str;
// 将一个数字强制转换为布尔值
$flag = (bool)$num;
```

### 2.2. 运算符

数学运算符，逻辑运算符与 JavaScript 基本一致，无额外特殊情况。
字符串连接（拼接）采用的是比较特殊的 .

```php
<?php
$name = 'zce';
// 拼接 `hey ` 和 `zce`
$message = 'hey ' . $name;
// 相当于 +=
$foo .= $message
```

### 2.3. 语句

  分号分割
  if、switch、while、for、 foreach、function......

### 2.4. 流程控制

1.顺序结构
2.分支结构
      if ... else
      switch ... case
3.循环结构
     for
     while
     foreach --- 专门用来遍历数组

```php
<?php
$arr = array('name' => 'zhangsan', 'age' => '18');
foreach ($arr as $key => $value) {
	echo $key . ' ' . $value;
}
```

​     指令式的 if、for、foreach、while 单独掌握

```php
<?php
// 指令式就是将开始 { 换成 : 结束 } 换成 endif;
if (true) :
echo "hello ";
else :
echo "world ";
endif;

// for foreach while 也是一样
for ($i = 0; $i < 10; $i++) :
echo $i;
endfor;
```

### 2.5. 函数

​	定义与使用函数的方式与 JavaScript 相同：

```php
<?php
// 函数名不区分大小写
function foo ($name, $title) {
	echo "$name ($title)";
}
// 调用
foo('zce', 'UFO');
Foo('zgd', 'SBO'); // 大小写不区分

// 系统函数-转换JSON数据
$arr = array("a"=>"111","b"=>"222","c"=>"hi");
$ret = json_encode($arr); //{"a":"111","b":"222","c":"333"}
echo $ret;
```

​	注意：使用方式有点差异（函数名不区分大小写），但是不要这么搞！！！
          	   建议在 PHP 中采用下划线式（snake_case）做命名规则，不管是函数还是变量

## 3.特性

### 3.1. 变量作用域

​	关于变量作用域这一点，PHP 与绝大多数语言也都不同：默认函数内不能访问函数所在作用域的成员。

```javascript
//在 JavaScript 中，我们可以在函数作用域中使用父级作用域中的成员：
var top = 'top variable'
function foo () {
    var sub = 'sub variable'
    console.log(top)
    // => `top variable`
    function bar () {
         console.log(top)
         // => `top variable`
         console.log(sub)
         // => `sub variable`
     }
     bar()
}
foo()
```

```php
//而在 PHP 中：
<?php
   $top = 'top variable';
   function foo () {
       $sub = 'sub variable';
       echo $top;
       // => 无法拿到
       function bar () {
          echo $top;
          // => 无法拿到
          echo $sub;
          // => 无法拿到
       }
       bar();
   }
   foo();
```

​	如果需要访问全局变量，可以通过 global 关键字声明：

```php
<?php
    $top = 'top variable';
    function foo () {
         // 声明在当前作用域中获取全局作用域中的 `$top`
		global $top;
		$sub = 'sub variable';
		echo $top;
		// => `top variable`
		function bar () {
			// 声明在当前作用域中获取全局作用域中的 `$top` 和 `$bar`
			global $top, $bar;
			echo $top;
			// => `top variable`
			echo $sub;
			// => 任然无法拿到，因为 `$sub` 不再全局范围，而是在 `foo` 函数中定义
		}
		bar();
	}
	foo();
```

### 3.2. 超全局变量

> http://www.w3school.com.cn/php/php_superglobals.asp

​	PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。

​	这些超全局变量是：

```
$GLOBALS — 引用全局作用域中可用的全部变量
$_SERVER — 获取服务端相关信息
$_REQUEST — 获取提交参数
$_POST — 获取 POST 提交参数
$_GET — 获取 GET 提交参数
$_FILES — 获取上传文件
$_ENV — 操作环境变量
$_COOKIE — 操作 Cookie
$_SESSION — 操作 Session
```

​	本节会介绍一些超全局变量，并会在稍后的章节讲解其他的超全局变量。

#### 3.2.1. $GLOBALS

​	$GLOBALS 这种全局变量用于在 PHP 脚本中的任意位置访问全局变量（从函数或方法中均可）。
	PHP 在名为 $GLOBALS[index] 的数组中存储了所有全局变量。变量的名字就是数组的键。

​	下面的例子展示了如何使用超级全局变量 $GLOBALS：

```php
<?php
	$x = 75;
	$y = 25;
	function foo () {
		$GLOBALS['z'] = $GLOBALS['x'] + $GLOBALS['y'];
	}
	foo();
	echo $z;
	// => 100
```

### 3.3. 常量定义与使用

> 常量跟变量一样也是一个数据容器，但是不同的是一旦申明过后就不允许被修改。

#### 3.3.1. 定义常量

```php
<?php
// 定义常量使用的是内置的 `define` 函数
// 第一个参数是常量的名称，建议采用全大写字母命名，多个单词下划线分隔
// 第二个参数是常量中存放的数据，可以是任意类型
// 第三个参数是常量名称是否区不分大小写，默认 false 区分大小写
define('SYSTEM_NAME', '阿里百秀');
define('SYSTEM_ENABLE', true);
```

#### 3.3.2. 使用常量

```php
<?php
// 直接通过常量的名称访问常量
// 与变量不同的是不需要用 $
echo SYSTEM_NAME;
echo SYSTEM_ENABLE;
```

### 3.4. 载入其他文件

​	通常情况下，当一个文件中的代码过长，自然会想到要拆分到多个文件中。随着开发经验的积累，慢慢的会发现，除了文件过程应该拆分文件，更应该做的事情是根据用途去划分。
	不管你是怎样想的，核心问题都是一样：怎么将代码拆分到多个文件中？

​	PHP 中引入其他 PHP 文件有四种方式：

```php
require         载入必要文件
require_once    载入必要文件一次，宏定义
include         载入公共文件         
include_once    载入公共文件一次，公共页面等
```

![](media\a1.png)

​	总结来说：

```php
1.横向分为两类：require 和 include 两种，区别在于 require 会因为载入文件不存在而停止当前文件执行，而
include 不会。

2.纵向分为两类：xxx 和 xxx_once，区别在于代码中每使用一次 xxx 就执行一次载入的文件，而 xxx_once 只
会在第一次使用是执行
```

​	使用层面：

```php
1.include 一般用于载入公共文件，这个文件的存在不影响程序后面的运行(可以用来载入可有可无的页面)
2.require 用于载入不可缺失的文件(比如载入配置文件，程序中必须要用到这个配置文件)
3.至于是否采用一次载入（once）这种方式取决于被载入的文件(比如宏定义文件仅需要载入一次)
```

```php
//1.config.php
<?php
define('SYSTEM_NAME', 'HELLO');
define('SYSTEM_VERSION', '1.0.0');
define('DB_HOST', '192.168.110.120');


//2.require.php
<?php
// require 'config.php';
// require 可以用于在当前脚本中载入一个别的脚本文件并且执行他
// require 在每一次调用时都会载入对应的文件
// echo SYSTEM_NAME;
// require 'config.php';
// echo SYSTEM_NAME;

// require_once ==================================
// require_once 如果之前载入过，不再执行（只执行一次）
// 由于类似于 定义常量 定义函数 这种操作不能执行多次
// 所以 require_once 更加合适载入这种文件

require_once 'config.php';
echo SYSTEM_NAME;
require_once 'config.php';
echo SYSTEM_NAME;
```

```php
//1.aside.php
<aside>
  这是侧边栏1111
</aside>

//2.include.php
<body>
  <!-- require 特点： 一旦被载入的文件不存在就会报一个致命错误，当前文件不再往下执行 -->
  <!-- include 特点： 载入文件不存在不会报错误（会有警告，警告不用管），当前文件继续执行 -->
  <?php include 'aside.php'; ?>
  <main>
    这是主要的区域
  </main>
</body>
```

## 4.常用 API

> 任何编程语言本身并没有太多的能力，具体的能力大多数都来源于 API。

​	PHP 的能力来源于它有 1000+ 内置函数，不是每一个函数都默认直接可以使用，有一些需要安装或者启用额外的"插件" 扩展

### 4.1 字符串处理

> 宽字符集(中文)需要开启 php_mbstring 扩展

#### 4.1.1. 开启 PHP 扩展

```
1. 将PHP目录中的 php.ini-development 复制一个修改为 php.ini
2. 修改php.ini中的 extension_dir extension_dir = "C:/php/ext"
3. 解开php.ini中mbstring的注释（; 是注释符） extension = php_mbstring . dll 注意等号空格
4. 在Apache 配置文件中申明一下php.ini 的所在目录PHPIniDir C:/php
```

#### 4.1.2. 字符串处理函数

字符串截取

```php
string substr ( string $string , int $start [, int $length ] )
    
string mb_substr ( string $str , int $start [, int $length = NULL [, string $encoding =
mb_internal_encoding() ]] )
```

字符串长度

```php
int strlen ( string $string )
    
mixed mb_strlen ( string $str [, string $encoding = mb_internal_encoding() ] )

    
$str = 'hello';
// 获取字符串长度
echo strlen($str);
echo strlen('你好');
echo mb_strlen('你好');  //开启php_mbstring扩展

//可以通过<?php  phpinfo(); 查看php_mbstring扩展有没有添加成功
```

大小写转换

```php
string strtolower ( string $string )
string strtoupper ( string $string )
```

去除首尾空白字符

```php
string trim ( string $str [, string $character_mask = " \t\n\r\0\x0B" ] )
string ltrim ( string $str [, string $character_mask ] )
string rtrim ( string $str [, string $character_mask ] )
```

查找字符串中某些字符首次出现位置

```php
mixed strpos ( string $haystack , mixed $needle [, int $offset = 0 ] )
    
int mb_strpos ( string $haystack , string $needle [, int $offset = 0 [, string $encoding =
mb_internal_encoding() ]] )
```

字符串替换

```php
mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &$count ] )
```

重复字符串

```php
string str_repeat ( string $input , int $multiplier )
```

字符串分割

```php
array explode( string $input, string $char )
```

![](media\a2.png)

```php
php -a  即可开启php交互模式
```

### 4.2 数组处理

```php
array_keys() / array_values()       获取关联数组中全部的键 / 值
array_key_exists()/isset($d['a'])   判断关联数组中是否存在某个键
array_unique(数组)                  去除重复的元素
array_push()  / $arr[] = 'new value'   添加元素
array_pop()							删除数组中最后一个元素
count() 							数组长度
in_array() 							检测存在
```

```php
$dict = array(
  'hello' => '你好',
  'hello1' => '你好',
  'hello2' => '你好',
);

var_dump(array_keys($dict));
// => ['hello', 'hello1', 'hello2']

var_dump(array_values($dict));
// => ['你好', '你好', '你好']

var_dump(array_key_exists('hello', $dict));
var_dump(array_key_exists('hello4', $dict));

// 只有当 php.ini 中 display_errors = On 时候
// 才会在界面上显示 notice 错误
// 开发阶段一定设置为 On 生产阶段（上线）设置为 Off
```

### 4.3 isset和empty

```php
1.bool isset ( mixed var [, mixed var [, ...]] )     检测变量是否设置 
若变量不存在则返回 FALSE 
若变量存在且其值为NULL，也返回 FALSE 
若变量存在且值不为NULL，则返回 TURE 
        
2.bool empty ( mixed var )                           检查一个变量是否为空 
若变量不存在则返回 TRUE 
若变量存在且其值为""、0、"0"、NULL、、FALSE、array()、var $var; 以及没有任何属性的对象，则返回 TURE 
若变量存在且值不为""、0、"0"、NULL、、FALSE、array()、var $var; 以及没有任何属性的对象，则返回 FALSE 
```

```php
//1.基本使用
<?php 
$var = 0; 
// 结果为 true，因为 $var 为空 
if (empty($var)) { 
echo '$var is either 0 or not set at all'; 
} 

// 结果为 false，因为 $var 已设置 
if (!isset($var)) { 
echo '$var is not set at all'; 
} 
?> 
    

//2.使用isset和empty判断数组中是否存在指定key
$dict = array(
  'hello' => '你好',
  'hello1' => '你好',
  'hello2' => '你好',
);
//2.1 isset
if (isset($dict['foo'])) {
  echo $dict['foo'];
} else {
  echo '没有';
}

//2.2 empty
if (empty($dict['foo'])) {
  echo '没有';
} else {
  echo $dict['foo'];
}
//empty($dict['foo']) 相当于 !isset($dict['foo']) || $dict['foo'] == false
```

### 4.4 时间处理

时间戳： time()

```php
从Unix纪元（格林威治时间 1970-01-01 00:00:00）到当前时间的秒数
```

格式化日期： date()

```php
获取有格式的当前时间
格式化一个指定的时间戳
可以通过 strtotime() 将有格式的时间字符串转换为时间戳
```

```php
<?php

// 1. 通过代码设置时区，更推荐
date_default_timezone_set('PRC');
// 2. 通过配置文件设置时区 PRC中国时区
// date.timezone = PRC

// time 获取到的是 秒数为单位的时间戳
echo time();

echo '<br>';
// 格式化一个时间戳
// 第一个参数是一个时间格式
// 第二个参数是一个时间戳
// 默认时间戳获取的就是格林威治时间
echo date('Y-m-d H:i:s', time());

$str = '2017-10-22 15:18:58';

// 对已有时间做格式化
// strtotime 可以用来将一个有格式的时间字符串 转换为一个 时间戳
$timestamp = strtotime($str);

// 注意单引号字符串问题
echo date('Y年m月d日<b\r>H:i:s', $timestamp);
```



### 4.5 文件操作

![](media\a3.png)

> 参考：http://www.w3school.com.cn/php/php_ref_filesystem.asp

## 5.案例

### 5.1.将names.txt数据显示在表格

```php
<?php
// 1. 读取文件内容                 
$contents = file_get_contents('names.txt');
// 2. 按照一个特定的规则解析文件内容   // => 数组
// 2.1. 按照换行拆分
$lines = explode("\n", $contents);
// 2.2. 遍历每一行分别解析每一行中的数据
foreach ($lines as $item) {
  if (!$item) continue;
  // $item => '70 | 余娜 | 37 | q.elgjdfg@pqiv.sa | http://HKHEBUI.RO'
  $cols = explode('|', $item);  //一维数组  []
  $data[] = $cols;    //将$cols数组追加到$data数组中  [[],[]]
}

// 3. 通过混编的方式将数据呈现到表格中
// var_dump($data);
?>
    
    
<table>
    <thead>
      <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
        <th>邮箱</th>
        <th>网址</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($data as $line): ?>
          <tr>          	
            <?php foreach ($line as $col): ?>
                <!--先将每一列的数据去除空格-->
                <?php $col = trim($col); ?>
                <!--如果某一列的的数据是以http://开头，则说明是网页，则创建一个带a的td-->
                <?php if (strpos($col, 'http://') === 0): ?>
                  <td><a href="<?php echo strtolower($col); ?>">
                          <?php echo substr($col, 7); ?>
                      </a>
                  </td>
                <!--创建一个普通td-->
                <?php else: ?>
                  <td><?php echo $col; ?></td>
                <?php endif ?>
            <?php endforeach ?>
          </tr>
      <?php endforeach ?>
    </tbody>
</table>
```



# HTTP

## 1.概要

### 1.1. 定义

​	HTTP（HyperText Transfer Protocol，超文本传输协议）最早就是计算机与计算机之间沟通的一种标准协议，这种协议限制了通讯内容的格式以及各项内容的含义。

![](media\b1.png)

​	随着时代的发展，技术的变迁，这种协议现在广泛的应用在各种领域，也不仅仅局限于计算机与计算机之间，手机、电视等各种智能设备很多时候都在使用这种协议通讯，所以一般现在称 HTTP 为端与端之间的通讯协议。

​	Web 属于 B/S 架构的应用软件，在 B/S 架构中，浏览器与服务器沟通的协议就是 HTTP 协议，作为一个合格的Web 开发者，了解 HTTP 协议中约定的内容是一门必修课。

```
应用软件架构一般分为两类：
B/S 架构：Browser（浏览器） ←→ Server（服务器），这种软件都是通过浏览器访问一个网站使用，
服务器提供数据存储等服务。

C/S 架构：Client（客户端） ←→ Server（服务器），这种软件通过安装一个软件到电脑，然后使用，
服务器提供数据存储等服务。

```

### 1.2. 约定内容

```
请求 / 响应报文格式
请求方法 —— GET / POST
响应状态 —— 200 / 404 / 302 / 304
预设的请求 / 响应头
```

### 1.3. 约定形式

```
1. 客户端通过随机端口与服务端某个固定端口（一般为80）建立连接 三次握手
2. 客户端通过这个连接发送请求到服务端（这里的请求是名词）
3. 服务端监听端口得到的客户端发送过来的请求
4. 服务端通过连接响应给客户端状态和内容
```

​	要求：接下来的一个月，每次上网打开任何一个页面时都要能够脑补这个画面，默念这个流程。

![](media\b2.png)

![](media\d10.png)

## 2.核心概念

### 2.1. 报文

#### 2.1.1. 请求报文

![](media\b3.png)

![](media\b4.png)

1.请求行
     GET /demo.php HTTP/1.1
     请求方式 + 空格 + 请求路径 + 空格 + HTTP 协议版本
2.请求头
     客户端想要告诉服务端的一些额外信息，以下为常见的请求头：

![](media\b6.png)

3.请求体
     这次请求客户端想要发送给服务端的数据正文，一般在 GET 请求时很少用到，因为 GET 请求主观上都是去“拿东西”。

#### 2.1.2. 响应报文

![](media\b5.png)



1.状态行
     HTTP/1.1 200 OK
     HTTP 协议版本 + 空格 + 状态码 + 空格 + 状态描述
2.响应头
     服务端想要告诉客户端的一些额外信息，常见的有以下：

![](media\b7.png)

​	如果需要在程序中设置自定义的响应头（不是预设的），建议使用 X-Property-Name响应体

​	这次请求服务端想要返回给客户端的数据正文，一般返回的都是 HTML，也可以返回 JavaScript 或者 CSS（需要修改响应头中的响应类型）。

### 2.1.3. 应用场景

​	设置响应文件类型

```php
MIME type 指的是文件类型， 像 text/css text/html text/plain applcation/javascript

//1.案例1：设置Content-type为text/html
<?php
// PHP 中 header 函数专门用于设置响应头
header('Content-Type: text/html; charset=GBK');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>这是一个网页内容</title>
</head>
<body>
  <h1>这是一个网页内容</h1>
</body>
</html>
    

//2.案例2：设置Content-type为application/javascript
<?php
// 通过 HTTP 响应头告诉客户端我们给你的内容是 CSS 代码
header('Content-Type: application/javascript');
?>
alert(1);


//3.案例3：设置Content-type为text/css
<?php
// 通过 HTTP 响应头告诉客户端我们给你的内容是 CSS 代码
header('Content-Type: text/css');
?>
body {
  background-color: hotpink;
}
```

​	重定向（跳转到其他网页）

```php
<?php
// 注意这边的冒号前面没有空格
header('Location: 03-location2.php');

//重定向原理 = 302 + 新的location
```

​	下载文件

```php
//浏览器直接访问此php页面可以下载文件
<?php
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=demo.txt');
?>
```

​	图片防盗链

```
通过判断请求来源 Referer 是否为本网站从而区分是否是合法请求
```


## 2.2. 请求方式

http://www.w3school.com.cn/tags/html_ref_httpmethods.asp
http://www.runoob.com/http/http-methods.html


### 2.2.1. GET

​	字面意思：拿，获取

### 2.2.2. POST

​	字面意思：发，给

### 2.2.3. 对比 GET 与 POST

![](media\b8.png)

## 2.3. 状态码

> 了解即可，不用刻意去记忆，用多了自然就忘不了。
> http://www.w3school.com.cn/tags/html_ref_httpmessages.asp

​	状态代码由三位数字组成，第一个数字定义了响应的类别，且有五种可能取值。

```
1xx：指示信息 —— 表示请求已接收，继续处理。
2xx：成功 —— 表示请求已被成功接收、理解、接受。
3xx：重定向 —— 要完成请求必须进行更进一步的操作。
4xx：客户端错误 —— 请求有语法错误或请求无法实现。
5xx：服务器端错误 —— 服务器未能实现合法的请求
```

​	常见状态代码、状态描述的说明如下

```
200 OK：客户端请求成功。
400 Bad Request：客户端请求有语法错误，不能被服务器所理解。
401 Unauthorized：请求未经授权，这个状态代码必须和 WWW-Authenticate 报头域一起使用。
403 Forbidden：服务器收到请求，但是拒绝提供服务。
404 Not Found：请求资源不存在，举个例子：输入了错误的URL。
500 Internal Server Error：服务器发生不可预期的错误。
503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常。
```

# 表单处理

​	表单的概念在生活中很常见，就像是问卷调查表一样，别人先把问卷发给你，你照着问卷的要求填写，完事过后再将填完的问卷发给别人，从而达到一个将别人需要的信息传递给别人的一种方式


​	传统的网页大多数的作用都是展示数据，就是将信息传递给用户。而在现代化的 Web 开发中，非常注重信息交互，所以表单也随处可见，只是形式上变成网页，性质上还是一模一样的。主要的作用任然是收集指定的用户信
息。

​	信息交互：例如简书这个平台，除了展示文章（展示信息），还可以发布文章（收集信息）

## 1.表单基本使用

​	HTML 中有一个专门用于提交数据的标签：form，通过这个标签可以很容易的收集用户输入。

```
form 标签有两个必要属性：
action：表单提交地址（填完了，交给谁）
method：表单以什么方式提交
```

​	例如，我们需要在登录界面上收集用户输入的用户名和密码

```html
//1.form.php
<body>
  <form action="login.php" method="post">
    <div>
      <label for="username">用户名</label>
      <input type="text" id="username" name="username">
    </div>
    <div>
      <label for="password">密码</label>
      <input type="password" id="password" name="password">
    </div>
    <button type="submit">登录</button>
  </form>
</body>
```

​	按照目前的情况，用户第一次请求得到这个表单页面，填写完表单内容，点击登录，表单会自动发送到login.php ，剩下的问题就是要考虑如何在 login.php 中获取到用户提交过来的内容。

```php
PHP 中有三个超全局变量专门用来获取表单提交内容：
$_GET ：用于获取以 GET 方式提交的内容，更标准的说法：接收 URL 地址问号参数中的数据
$_POST ：用于获取以 POST 方式提交的内容，更标准的说法：接收 请求体 中的数据
$_REQUEST ：用于获取 GET 或 POST 方式提交的内容
```

​	借助    助 `$_POST` `$_GET` 或者 `$_REQUEST` 就可以获取到表单提交的内容：

```php
//2.login.php
<?php
var_dump($_GET);
// $_GET 用于接收 URL 地址中的提交数据（一般是 GET 参数）
var_dump($_POST);
// $_POST 用于接收 请求体 中提交的数据（一般是 POST 提交的数据）
var_dump($_REQUEST);
// $_REQUEST = $_GET + $_POST


<?php
// 获取表单提交的用户名和密码
echo '用户名：' . $_REQUEST['username'];
echo '密码：' . $_REQUEST['password'];
```

### 1.1. 提交地址

​	action 提交地址指的是这个表单填写完成过后点击提交，发送请求的请求地址是什么。
	从便于维护的角度考虑，一般我们最常见的都是提交给当前文件，然后在当前文件中判断是否是表单提交请求：

```php
<!‐‐ 这样写死 action 地址，当文件重命名就需要修改代码 ‐‐>
<form action="/foo/login.php">
<!‐‐ ... ‐‐>
</form>
    
<!‐‐ 通过 `$_SERVER['PHP_SELF']` 获取路径，可以轻松避免这个问题 ‐‐>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>">
<!‐‐ ... ‐‐>
</form>
```

```php
<?php
// 将表单的处理逻辑放在HTML之前，为了更灵活的控制 HTML 的输出
// var_dump($_POST);
// 因为对于表单的处理逻辑不是每一次都需要执行，
// 所以一般我们会判断请求的方式，从而决定是否执行对数据的处理
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 请求的方式是 POST，当前是点击按钮产生的请求
  var_dump($_POST);
}
?>
    
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <div>
      <label for="username">用户名</label>
      <input type="text" id="username" name="username">
    </div>
    <div>
      <label for="password">密码</label>
      <input type="password" id="password" name="password">
    </div>
    <button type="submit">登录</button>
  </form>    
```

### 1.2. 提交方式

​	method 可以用于设置表单提交的方式，目前我们所认识的就是最常见两种表单提交方式： GET 和 POST 。
	从效果上来看，两者都可以将数据提交到服务端，但是从实现提交的原理上两者有很大的不同：

#### 1.2.1 GET

```
表单数据是通过 URL 中的 ? 参数传递到服务端的
可以在地址栏中看到提交的内容
数据长度有限制，因为 URL 地址长度有限（2000个字符）
```

#### 1.2.2 POST

```
表单数据是通过请求体传递到服务端的，我们在界面上看不到
可以提交任何类型的数据，包括文件
由于界面上看不见，浏览器也不储存，所以更安全
```

​	至于什么情况下应该选用哪种方式，这个需要结合业务场景和这两种方式各自的特点来决定，没有绝对的答案，只能给出一些原则：

```
绝不能使用 GET 来发送密码或其他敏感信息！！！
应该想清楚这次请求到底主要是去拿东西，还是去送东西
```

## 2. 常见表单元素处理

​	至于表单元素中的文本框文本域一类的元素，都是直接将元素的 name 属性值作为键，用户填写的信息作为值，发送到服务端。
	但是表单元素中还有一些比较特殊的表单元素需要单独考虑：

### 2.1. 单选按钮

```php
<!‐‐ 最终只会提交选中的那一项的 value ‐‐>
<input type="radio" name="gender" value="male">
<input type="radio" name="gender" value="female">
```

### 2.2. 复选按钮

```php
<!‐‐ 没有设置 value 的 checkbox 选中提交的 value 是 on ‐‐>
<input type="checkbox" name="agree">
<!‐‐ 设置了 value 的 checkbox 选中提交的是 value 值 ‐‐>
<input type="checkbox" name="agree" value="true">
```

​	如果需要同时提交多个选中项，可以在 name 属性后面 跟上 [] ：
http://php.net/manual/zh/faq.html.php#faq.html.arrays

```php
<input type="checkbox" name="funs[]" value="football">
<input type="checkbox" name="funs[]" value="basketball">
<input type="checkbox" name="funs[]" value="world peace">
```

​	最终提交到服务端，通过 $_POST 接收到的是一个索引数组。

### 2.3. 选择框

```php
<select name="subject">
    <!‐‐ 设置 value 提交 value ‐‐>
    <option value="1">语文</option>
    <!‐‐ 没有设置 value 提交 innerText ‐‐>
    <option>数学</option>
</select>
```



```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  var_dump($_POST);
}
?>

<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <input type="text" name="username" id="">
    <input type="password" name="password" id="">
    <textarea name="key2" id="" cols="30" rows="10"></textarea>

    <!-- 当表单中使用了 radio ，一定要为相同 name 的 radio 设置不同的 value，让服务端可以辨别 -->
    性别
    <label><input type="radio" name="gender" value="male"> 男</label>
    <label><input type="radio" name="gender" value="female"> 女</label>
    <br>
    <!-- checkbox 如果没有选中则不会提交，如果选中提交 on -->
    <label><input type="checkbox" name="agree" value="true"> 同意协议</label>
    <br>
    <label><input type="checkbox" name="funs[]" value="football"> 足球</label>
    <label><input type="checkbox" name="funs[]" value="basketball"> 篮球</label>
    <label><input type="checkbox" name="funs[]" value="earth"> 地球</label>
    <br>
    <select name="status">
      <option>激活</option>
      <option>未激活</option>
      <option value="1">待激活</option>
    </select>
    <br>
    <input type="file" name="" id="">
    <button>提交</button>
  </form>
```



## 3.案例

### 3.1. 基于文件的注册和登录

```
1. 注册
2. 用户请求一个注册页面
3. 服务端返回一个注册表单
4. 用户填写表单并提交
5. 服务端接收用户提交的信息
6. 判断是否正确填写内容以及是否勾选同意
7. 如果出现异常界面给出提示，并返回表单
8. 如果都正常，则保存到文件中（每个用户一行）
9. 登录
10. 自己分析
```

```php
<?php
/**
 * 回发处理逻辑
 */
function postback () {
  // 申明 $message 是全局
  // global $message;

  // 1. 校验参数的完整性
  if (empty($_POST['username'])) {
    // 没有提交用户名 或 用户名为空字符串
    $GLOBALS['message'] = '会不会玩';
    return;
  }

  if (empty($_POST['password'])) {
    $GLOBALS['message'] = '请输入密码';
    return;
  }

  if (empty($_POST['confirm'])) {
    $GLOBALS['message'] = '请输入确认密码';
    return;
  }

  if ($_POST['password'] !== $_POST['confirm']) {
    $GLOBALS['message'] = '两次输入的密码不一致';
    return;
  }

  if (!(isset($_POST['agree']) && $_POST['agree'] === 'on')) {
    $GLOBALS['message'] = '必须同意注册协议';
    return;
  }

  // 所有的校验都OK
  $username = $_POST['username'];
  $password = $_POST['password'];

  // 将数据保存到文本文件中
  file_put_contents('users.txt', $username . '|' . $password . "\n", FILE_APPEND);
  $GLOBALS['message'] = '注册成功';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  postback();
}
?>

    
    
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
    <table border="1">
      <tr>
        <td><label for="username">用户名</label></td>
        <td><input type="text" name="username" id="username" value="<?php echo isset($_POST['username']) ? $_POST['username'] : ''; ?>"></td>
      </tr>
      <tr>
        <td><label for="password">密码</label></td>
        <td><input type="password" name="password" id="password"></td>
      </tr>
      <tr>
        <td><label for="confirm">确认密码</label></td>
        <td><input type="password" name="confirm" id="confirm"></td>
      </tr>
      <tr>
        <td></td>
        <td><label><input type="checkbox" name="agree" value="on"> 同意注册协议</label></td>
      </tr>
      <?php if (isset($message)): ?>
      <tr>
        <td></td>
        <td><?php echo $message; ?></td>
      </tr>
      <?php endif ?>
      <tr>
        <td></td>
        <td><button>注册</button></td>
      </tr>
    </table>
</form>
```



## 4.文件上传

```php
http://php.net/manual/zh/features.file-upload.php
注意：
     修改 php.ini 中的 post_max_size 配置，让服务端可以接受更大的请求体体积
     修改 php.ini 中的 upload_max_filesize 配置，让服务端支持更大的单个上传文件
```

​	type 属性为 file 的 input 元素可以通过表单提交文件（上传文件），服务端 PHP 可以通过 $_FILES 获取上
传的文件信息。

```php
<?php
function upload () {
  if (!isset($_FILES['avatar'])) {
    $GLOBALS['message'] = '别玩我了';
    // 客户端提交的表单内容中根本没有文件域
    return;
  }
  $avatar = $_FILES['avatar'];
  echo $avatar['error'];
  if ($avatar['error'] !== UPLOAD_ERR_OK) {
    // 服务端没有接收到上传的文件
    $GLOBALS['message'] = '上传失败';
    return;
  }

  // 接收到了文件
  // 将文件从临时目录移动到网站范围之内
  $source = $avatar['tmp_name']; // 源文件在哪
  // => 'C:\Windows\Temp\php1138.tmp'
  $target = './uploads/' . $avatar['name']; // 目标放在哪
  // => './uploads/icon-02.png'
  // 移动的目标路径中文件夹一定是一个已经存在的目录
  $moved = move_uploaded_file($source, $target);

  if (!$moved) {
    $GLOBALS['message'] = '上传失败';
    return;
  }
  // 移动成功（上传整个过程OK）
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 接收文件 使用一个 叫做 $_FILES 超全局成员
  upload();
}  


<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar">
    <button>上传</button>
    <?php if (isset($message)): ?>
    <p style="color: hotpink"><?php echo $message; ?></p>
    <?php endif ?>
</form>
```

​	$_FILES 同样也是一个关联数组，键为表单的 name ，内容如下：

```php
array(1) {
    ["avatar"]=>
        array(5) {
        ["name"]=>string(17) "demo.jpg"
        ["type"]=>string(10) "image/jpeg"
        ["tmp_name"]=>string(27) "C:\Windows\Temp\php786C.tmp"
        ["error"]=> int(0)
        ["size"]=> int(29501)
    }
}
```

## 5.音乐列表案例

> 基于文件存储的音乐数据增删改查

### 5.1. 思路分析

​	绝大多数情况下我们编写的应用功能都是在围绕着某种类型的数据做增删改查（Create / Read / Update /
Delete）。

​	对于被增删改查的数据有几点是可以明确的：

```
结构相同的多条数据（可以认为是：一个数组，数组中的元素都具有相同的属性结构）
可以持久化（长久保存）
```

#### 5.1.1. 数据放在哪？

​	我们第一件事就是考虑数据放在哪（怎么存怎么取）？
	目前我们接触到的技术方案中，只有文件可以持久化的保存内容（数据），所以一定是用文件存我们要操作的数据。

​	但是由于我们要存放的是一个有着复杂结构的数据，并不是简简单单的值，所以我们必须设计一种能表示复杂结构数据的方式。

​	例如，一行为一条数据，不同信息之间用 | 分割，同时约定好每个位置的数据含义：

```
59d632855434e | 错过 | 梁咏琪 | /uploads/img/1.jpg | /uploads/mp3/1.mp3
59d632855434f | 开始懂了 | 孙燕姿 | /uploads/img/2.jpg | /uploads/mp3/2.mp3
59d6328554350 | 一生中最爱 | 谭咏麟 | /uploads/img/3.jpg | /uploads/mp3/3.mp3
59d6328554351 | 爱在深秋 | 谭咏麟 | /uploads/img/4.jpg | /uploads/mp3/4.mp3
```

​	这种方式很简单，但是缺点也非常明显，所以我们迫切需要一个更好更方便的表示有结构数据的方式。

### 5.2. JSON

​	JSON（JavaScript Object Notation） 是一种通过普通字符串描述数据的手段，用于表示有结构的数据。JSON是JavaScript的原生格式，类似于JS中字面量的概念，语法上跟 JavaScript 的字面量非常类似。

#### 5.2.1. JSON数据类型

```json
null
string : "hello json"
number : 2048
boolean : true
object
```

```php
{
"name": "zce",
"age": 18,
"gender": true,
"girl_friend": null
}
//JSON对象key要求是字符串，值可以是对象
//JS中，对象转字符串    JSON.stringify(对象)
//JS中，字符串转对象    JSON.parse(字符串)
```

#### 5.2.2. 注意

```
1. JSON 中属性名称必须用双引号包裹
2. JSON 中字符串必须使用双引号
3. JSON 中不能有单行或多行注释
4. JSON 没有 undefined 这个值
```

#### 5.2.3. JSON 表述

有了 JSON 这种格式，我们就可以更加容易的表示拥有复杂结构的数据了。

```javascript
[
{
"id": "59d632855434e",
"title": "错过",
"artist": "梁咏琪",
"images": ["/uploads/img/1.jpg"],
"source": "/uploads/mp3/1.mp3"
},
{
"id": "59d632855434f",
"title": "开始懂了",
"artist": "孙燕姿",
"images": ["/uploads/img/2.jpg"],
"source": "/uploads/mp3/2.mp3"
},
{
"id": "59d6328554350",
"title": "一生中最爱",
"artist": "谭咏麟",
"images": ["/uploads/img/3.jpg"],
"source": "/uploads/mp3/3.mp3"
},
{
"id": "59d6328554351",
"title": "爱在深秋",
"artist": "谭咏麟",
"images": ["/uploads/img/4.jpg"],
"source": "/uploads/mp3/4.mp3"
}
]
```

### 5.3. 功能实现

​	在服务端开发领域中所谓的渲染指的是经过程序执行得到最终的 HTML 字符串这个过程。

#### 5.3.1. 列表数据展示（展示类）

​	1.文件读取
	2.JSON 反序列化

```
json_decode 需要注意第二个参数
如果希望以关联数组的方式而非对象的方式操作数据，可以将 json_decode 的第二个参数设置为 true
```

​	3.数组遍历 foreach
	4.PHP 与 HTML 混编

```php
<?php
    // 1. 读取文件内容
    $json = file_get_contents('data.json');
    // 2. 反序列化
    // json_decode 第二个参数可以用来指定返回数据都采用 关联数组的方式 描述对象
    $data = json_decode($json, true);
    // 3. 遍历数据渲染HTML
    // var_dump($data);
    if (!$data) {
      // JSON 格式不正确
      exit('数据文件异常');
    }
?>

<tbody class="text-center">
    <?php foreach ($data as $item): ?>
    <tr>
        <td class="text-center"><input type="checkbox" name="" id=""></td>
        <td class="align-middle"><?php echo $item['title']; ?></td>
        <td class="align-middle"><?php echo $item['artist']; ?></td>
        <td class="align-middle">
            <?php foreach ($item['images'] as $img): ?>
            <img src="<?php echo $img; ?>" alt="">
            <?php endforeach ?>
        </td>
        <td class="align-middle"><audio src="<?php echo $item['source']; ?>" controls></audio></td>
        <td class="align-middle">
            <a class="btn btn-outline-danger btn-sm" href="del.php?id=<?php echo $item['id']; ?>">删除</a>
        </td>
    </tr>
    <?php endforeach ?>
</tbody>
```

#### 5.3.2. 新增数据（表单类）

​	1.表单使用（form action method enctype，input name label for id）
	2.服务端表单校验并提示错误消息

```
empty 判断一个成员是否没定义或者值为 false（可以隐式转换为 false）
```

#### 5.3.3.上传文件

```
文件数量
文件种类
如果需要考虑文件重名的情况，可以给上传的文件重新命名（唯一名称）

```

#### 5.3.4.单文件域多文件上传

```
name 一定 以 [] 结尾，服务端会接收到一个数组

```

#### 5.3.5.JSON 序列化

#### 5.3.6.文件写入

```php
<?php

function add () {
  // 目标：接收客户端提交的数据和文件，最终保存到数据文件中
  $data = array(); // 准备一个空的容器，用来装最终要保存的 数据
  $data['id'] = uniqid();

  // 1. 接收提交的文本内容
  // ===================================================
  if (empty($_POST['title'])) {
    $GLOBALS['error_message'] = '请输入音乐标题';
    return;
  }
  if (empty($_POST['artist'])) {
    $GLOBALS['error_message'] = '请输入歌手名称';
    return;
  }

  // 记下 title 和 artist
  $data['title'] = $_POST['title'];
  $data['artist'] = $_POST['artist'];

  // 2. 接收图片文件
  // =======================================================
  // 如何接收单个文件域的多文件上传？？？
  if (empty($_FILES['images'])) {
    $GLOBALS['error_message'] = '请正常使用表单';
    return;
  }

  $images = $_FILES['images'];
  // 准备一个容器装所有的海报路径
  $data['images'] = array();

  // 遍历这个文件域中的每一个文件（判断是否成功、判断类型、判断大小、移动到网站目录中）
  for ($i = 0; $i < count($images['name']); $i++) {
    // $images['error'] => [0, 0, 0]
    if ($images['error'][$i] !== UPLOAD_ERR_OK) {
      $GLOBALS['error_message'] = '上传海报文件失败1';
      return;
    }

    // 类型的校验
    // $images['type'] => ['image/png', 'image/jpg', 'image/gif']
    if (strpos($images['type'][$i], 'image/') !== 0) {
      $GLOBALS['error_message'] = '上传海报文件格式错误';
      return;
    }

    // TODO: 文件大小的判断
    if ($images['size'][$i] > 1 * 1024 * 1024) {
      $GLOBALS['error_message'] = '上传海报文件过大';
      return;
    }

    // 移动文件到网站范围之内
    $dest = '../uploads/' . uniqid() . iconv('UTF-8', 'GBK', $images['name'][$i]);
    // move_uploaded_file 在 Windows 中文系统上要求传入的参数如果有中文必须是 GBK 编码
    // 切记在接收文件时注意文件名中文的问题，通过iconv函数转换中文编码为 GBK 编码
    if (!move_uploaded_file($images['tmp_name'][$i], $dest)) {
      $GLOBALS['error_message'] = '上传海报文件失败2';
      return;
    }

    $data['images'][] = iconv('GBK', 'UTF-8', substr($dest, 2));
  }

  // 3. 接收音乐文件
  // =======================================================
  if (empty($_FILES['source'])) {
    $GLOBALS['error_message'] = '请正常使用表单';
    return;
  }

  $source = $_FILES['source'];
  // => { name: , tmp_name .... }

  // 判断是否上传成功
  if ($source['error'] !== UPLOAD_ERR_OK) {
    $GLOBALS['error_message'] = '上传音乐文件失败1';
    return;
  }
  // 判断类型是否允许
  $source_allowed_types = array('audio/mp3', 'audio/wma');
  if (!in_array($source['type'], $source_allowed_types)) {
    $GLOBALS['error_message'] = '上传音乐文件类型错误';
    return;
  }
  // 判断大小
  if ($source['size'] < 1 * 1024 * 1024) {
    $GLOBALS['error_message'] = '上传音乐文件过小';
    return;
  }
  if ($source['size'] > 10 * 1024 * 1024) {
    $GLOBALS['error_message'] = '上传音乐文件过大';
    return;
  }
  // 移动
  $target = '../uploads/' . uniqid() . '-' . iconv('UTF-8', 'GBK', $source['name']);
  if (!move_uploaded_file($source['tmp_name'], $target)) {
    $GLOBALS['error_message'] = '上传音乐文件失败2';
    return;
  }
  // 将数据装起来
  // 保存数据的路径一定使用绝对路径存
  $data['source'] = iconv('GBK', 'UTF-8', substr($target, 2));

  // 4. 将数据加入到原有数据中
  $json = file_get_contents('data.json');
  $old = json_decode($json, true);
  array_push($old, $data);
  $new_json = json_encode($old);
  file_put_contents('data.json', $new_json);

  // 5. 跳转
  header('Location: list.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  add();
}
?>

    
    
//add.php    
<?php if (isset($error_message)): ?>
<div class="alert alert-danger">
    <?php echo $error_message; ?>
</div>
<?php endif ?>
        
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
    <div class="form-group">
        <label for="title">标题</label>
        <input type="text" class="form-control" id="title" name="title">
    </div>
    <div class="form-group">
        <label for="artist">歌手</label>
        <input type="text" class="form-control" id="artist" name="artist">
    </div>
    <div class="form-group">
        <label for="images">海报</label>
        <!-- multiple 可以让一个文件域多选 -->
        <input type="file" class="form-control" id="images" name="images[]" accept="image/*" multiple>
    </div>
    <div class="form-group">
        <label for="source">音乐</label>
        <!-- accept 可以设置两种值分别为  MIME Type / 文件扩展名 -->
        <input type="file" class="form-control" id="source" name="source" accept="audio/*">
    </div>
    <button class="btn btn-primary btn-block">保存</button>
</form>
```

#### 5.3.7. 删除数据

1.问号传参

```php
一般情况下，如果需要超链接点击发起的请求可以传递参数，我们可以采用 ? 的方式
<a href="/delete.php?id=123">删除</a>
```

2.数组移除元素

```php
array_splice
```

```php
<?php
// 如何知道客户端想要删除哪一个？？？
// 通过客户端在URL地址中的问号参数的不同来辨别要删除的数据

// 接收 URL 中的不同的 ID
if (empty($_GET['id'])) {
  // 没有传递必要的参数
  exit('<h1>必须指定参数</h1>');
}

$id = $_GET['id'];

// 找到要删除的数据
$data = json_decode(file_get_contents('data.json'), true);
foreach ($data as $item) {
  // 不是我们要的之间找下一条
  if ($item['id'] !== $id) continue;
  // $item => 我们要删除的那一条数据

  // 从原有数据中移除
  $index = array_search($item, $data);
  array_splice($data, $index, 1);

  // 保存删除指定数据过后的内容
  // echo '<pre>';
  // var_dump($data);
  // echo '</pre>';
  $json = json_encode($data);
  file_put_contents('data.json', $json);

  // 跳转回列表页
  header('Location: list.php');
}
```

## 6.参考链接

HTML 中的 form 标签：http://www.w3school.com.cn/html/html_forms.asp
PHP 中处理表单：http://www.w3school.com.cn/php/php_forms.asp
Emmet 手册：https://docs.emmet.io/cheat-sheet/

# HTTP 会话

 Cookie技术：会话数据保存在浏览器客户端。

 Session技术：会话数据保存在服务器端

## 1.PHP 中操作 Cookie

​	HTTP 很重要的一个特点就是无状态（每一次见面都是“初次见面”），如果单纯的希望通过我们的服务端程序去记住每一个访问者是不可能的，所以必须借助一些手段或者说技巧让服务端记住客户端，这种手段就是 Cookie。

![](media\c1.png)

​	Cookie 就像是在超级市场买东西拿到的小票，由超市（Server）发给消费者（Browser），超市方面不用记住每一个消费者的脸，但是他们认识消费者手里的小票（Cookie），可以通过小票知道消费者之前的一些消费信息（在服务端产生的数据）。

http://php.net/manual/zh/function.setcookie.php

```php
//1.设置Cookie
<?php
setcookie('key', 'value');
// 只传递一个参数是删除
// 原理：设置过期时间为一个过去时间
setcookie('key');
// 传递两个参数是设置 cookie
setcookie('key1', 'value1');
// 传递第三个参数是设置过期时间
// 不传递就是 会话级别的 Cookie （关闭浏览器就自动删除）
setcookie('key2', 'value2', time() + 1 * 24 * 60 * 60);
setcookie('key3', 'value3', time() + 1 * 24 * 60 * 60, '/users');
setcookie('key4', 'value4', time() + 1 * 24 * 60 * 60, '/users', 'day-10.io');
```

![](media\huihua1.png)

```javascript
//2.获取Cookie
<?php
// 专门取 cookie
// 关联数组的方式访问客户端提交过来的 Cookie
var_dump($_COOKIE);
```

```php
//3.Cookie使用注意点
Cookie的path：
/ ---->网站根目录的所有url都可以访问这个Cookie
/users ---->users开头的url可以访问这个Cookie
    
Cookie的domain:设置cookie的作用域名范围
day-10.io ---->所有day-10.io的所有子域可以访问
//例如aa.day-10.io是day-10.io的子域名
//例如bb.day-10.io是day-10.io的子域名
       
//Cookie数据类型只能保存非中文字符串类型的。可以保存多个cookie，但是浏览器一般只允许存放300个Cookie，每个站点最多存放20个Cookie，每个Cookie的大小限制为4KB。
```

### 1.1.点击按钮屏蔽广告

```php
//index.php
<?php
if (isset($_GET['action']) && $_GET['action'] === 'close-ad') {
  // 不想看到广告
  setcookie('hide_ad', '1');
  $_COOKIE['hide_ad'] === '1';
}
?>
    
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <style>
    .ad {
      height: 200px;
      background-color: #ff0;
    }
    .ad a {
      float: right;
    }
  </style>
</head>
<body>
  <?php if (empty($_COOKIE['hide_ad']) || $_COOKIE['hide_ad'] !== '1'): ?>
  <div class="ad">
    <a href="index.php?action=close-ad">不再显示</a>
  </div>
  <?php endif ?>
</body>
</html>
```

### 1.2. 记住上次的访问时间

![](media\huihua02.png)

## 2.Session

​	由于 Cookie 是服务端下发给客户端由客户端本地保存的。换而言之客户端可以在本地对其随意操作，包括删除和修改。如果客户端随意伪造一个 Cookie 的话，对于服务端是无法辨别的，就会造成服务端被蒙蔽，构成安全隐患。
	于是乎就有了另外一种基于 Cookie 基础之上的手段：Session：

![](media\c3.png)

​	Session 区别于 Cookie 一个很大的地方就是：Session 数据存在了服务端，而 Cookie 存在了客户端本地，存在服务端最大的优势就是，不是用户想怎么改就怎么改了。
	Session 这种机制会更加适合于存放一些属于用户而又不能让用户修改的数据，因为客户端不再保存具体的数据，只是保存一把“钥匙”，伪造一把可以用的钥匙，可能性是极低的，所以不需要在意。

![](media\c4.png)

http://php.net/manual/zh/session.examples.basic.php

```php
//1.设置session
<?php
// 给当前用户找一个属于他的箱子（没有箱子开箱子，有箱子找已有的箱子）
session_start();
$_SESSION['key1'] = 'value1';
```

```javascript
//2.获取session
<?php
// 给当前用户找一个属于他的箱子（没有箱子开箱子，有箱子找已有的箱子）
session_start();
var_dump($_SESSION);
```

### 2.1. 猜数字游戏

​	参考：https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/A_first_splash
	注意：这里是 JavaScript 的实现，经供参考
	建议：好好看看里面写的一些内容

​	我想让你创建一个可以猜数字的游戏，它会在1~100以内随机选择一个数, 然后让玩家挑战在10轮以内猜出这个数字，每一轮都要告诉玩家正确或者错误， 如果出错了，则告诉他数字是低了还是高了，并且还要告诉玩家之前猜的数字是什么。 一旦玩家猜测正确，或者他们用完了回合，游戏将结束。 游戏结束后，可以让玩家选择再次开始。

```php
<?php
// 找一个属于当前访问者的箱子
// 并且把箱子的钥匙（session_id）交给用户（cookie）
session_start();
if (empty($_SESSION['num']) || empty($_GET['num'])) {
  $num = rand(0, 100);
  // 存在 cookie 中不保险，存在服务端的箱子里
  $_SESSION['num'] = $num;
} else {
  $count = empty($_SESSION['count']) ? 0 : $_SESSION['count'];
  if ($count < 10) {
	//session中的数据是强类型的，不需要强制转换
    $result = (int)$_GET['num'] - $_SESSION['num'];
    if ($result == 0) {
      $message = '猜对了';
      unset($_SESSION['num']);
      unset($_SESSION['count']);
    } elseif ($result > 0) {
      $message = '太大了';
    } else {
      $message = '太小了';
    }
    $_SESSION['count'] = $count + 1;
  } else {
    $message = 'looooooooooooow!';
    unset($_SESSION['num']);
    unset($_SESSION['count']);
  }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>猜数字</title>
  <style>
    body {
      padding: 100px 0;
      background-color: #2b3b49;
      color: #fff;
      text-align: center;
      font-size: 2.5em;
    }
    input {
      padding: 5px 20px;
      height: 50px;
      background-color: #3b4b59;
      border: 1px solid #c0c0c0;
      box-sizing: border-box;
      color: #fff;
      font-size: 20px;
    }
    button {
      padding: 5px 20px;
      height: 50px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <h1>猜数字游戏</h1>
  <p>Hi，我已经准备了一个0~100的数字，你需要在仅有的10机会之内猜对它。</p>
  <?php if (isset($message)): ?>
  <p><?php echo $message; ?></p>
  <?php endif ?>
  <form action="session.php" method="get">
    <input type="number" min="0" max="100" name="num" placeholder="随便猜">
    <button type="submit">试一试</button>
  </form>
</body>
</html>
```

# MySQL

## 1.准备工作

### 1.1. 引入

```javascript
//缓存--->文件--->关系型数据库
//1.数据保存到内存：
优点：
1）读写非常快
缺点：
1）程序关闭导致数据丢失

//2.数据保存到文件：
优点：
1）数据可以永久保存
缺点：
1）频繁地IO操作，效率不高！
2）数据管理不方便。例如查询某个数据需要全部读取出来，再匹配。

//3.数据保存到数据库软件：
优点：
1）数据永久保存下来
2）数据管理非常方便。（例如查询非常快速和方便）
```

### 1.2. 简介

​	数据库就是存放和管理数据的软件，用来按照特定的结构去组织和管理我们的数据，有了数据库我们就可以更加方便、便捷的操作（C / R / U / D）我们需要保存的数据。
	不管是什么数据库，最终都是将数据存到文件（硬盘）中，只是存储的格式不同于文本文件。

​	一个 Excel 文件就可以看做一个数据库：

![](media\d1.png)

​	一个 Excel 文件中可以包含多个数据表：

![](media\d2.png)

### 1.3. 常用数据库介绍

![](media\database01.png)

```javascript
//关系型数据库：
Oracle，甲骨文公司的产品。 当前最流行应用最广泛的数据库软件。适合中大型，中大应用。
SQL Server: 是微软公司的产品。window平台应用非常广泛。和c#，net平台兼容非常好。
DB2： IBM公司的产品。
MySQL: 开源组织的产品。甲骨文公司的产品。免费

//非关系型数据库
MongoDB
```

### 1.3. Mysql安装与配置

```javascript
//1.mysql安装和卸载参照教程

//2.mysql环境变量配置
C:\Program Files\MySQL\MySQL Server 5.5\bin
	
//3.验证mysql是否安装成功
打开cmd  -> 输入 mysql -u root -p  回车   -> 输入密码   回车
C:\Users\APPle>mysql -u root -p
```

## 2.基础操作

### 2.1. 数据库客户端工具

​	数据库客户端工具本质上就是一个使用数据库服务器软件（Server）提供的服务的数据库客户端（Client）。

![](media\database02.png)

#### 2.1.1. 命令行工具

​	常见的操作指令：

```mysql
mysql> show databases; ‐‐ 显示全部数据库
mysql> create database <db‐name>; ‐‐ 创建一个指定名称的数据库
mysql> use <db‐name>; ‐‐ 使用一个数据库，相当于进入指定的数据库
mysql> show tables; ‐‐ 显示当前数据库中有哪些表
mysql> create table <table‐name> (id int, name varchar(20), age int); ‐‐ 创建一个指定名称的数据
表，并添加 3 个列
mysql> desc <table‐name>; ‐‐ 查看指定表结构
mysql> source ./path/to/sql‐file.sql ‐‐ 执行本地 SQL 文件中的 SQL 语句
mysql> drop table <table‐name>; ‐‐ 删除一个指定名称的数据表
mysql> drop database <db‐name>; ‐‐ 删除一个指定名称的数据库
mysql> exit|quit; ‐‐ 退出数据库终端
```

#### 2.1.2. 可视化工具

​	如果需要复杂的操作，推荐 Navicat Premium/SQLyog

​	下载地址：http://www.navicat.com.cn/download/navicat-premium
	这是一个付费软件，可以免费试用 14 天

### 2.2. 基本概念

​	1.数据库 ：管理数据的软件
	2.表
	3.字段 —— 指的就是列
	4.字段类型 —— 指的就是列能够存储的数据种类

![](media\mysql01.png)

​	![](media\mysql02.png)	

​	![](media\mysql03.png)

​	5.数据库查询：指的是操作数据库的过程（查、增、删、改）
	6.数据库查询语言：SQL

### 2.3. 表操作

```mysql
create database mydatabase;  --创建仓库
use mydatabase;   --使用仓库
show tables;      --查看仓库下的所有表

create table student(
   sid int,
   sname varchar(20),
   sage int
 );                 -- 创建表           

desc student        --查看表结构
drop table student  --删除表

alter table student add column sgender varchar(2);   --添加字段
alter table student drop column sgender;    --删除字段
alter table student modify column sname varchar(100);  --修改字段类型
alter table student change column sname myname varchar(2);   --修改字段名称
alter table student rename to teacher;   --修改表名称
```

### 2.4. 数据增删改

```mysql
--1.0 新建一张表
CREATE TABLE student(
Id INT,
NAME VARCHAR(20),
Gender VARCHAR(2),
Age INT);

-- ********一、增删改数据********* ---
-- 1.1 增加数据
-- 插入所有字段。默认是依次按顺序插入
INSERT INTO student VALUES(1,'张三','男',20);
SELECT * FROM student;
-- 注意不能少或多字段值
-- INSERT INTO student VALUES(2,'李四','女');
-- 插入部分字段
INSERT INTO student(id,NAME) VALUES(2,'李四');

-- 1.2 修改数据
-- 修改所有数据（建议少用）
UPDATE student SET gender='女';
-- 带条件的修改（推荐使用）
UPDATE student SET gender='男' WHERE id=1; -- 修改id为1的学生，修改性别为男
-- 修改多个字段,注意: SET 字段名=值,字段名=值,....
UPDATE student SET gender='男',age=30 WHERE id=2;

-- 1.3 删除数据
-- 删除所有数据（建议少用）
DELETE FROM student;
-- 带条件的删除(推荐使用)
DELETE FROM student WHERE id=2;
```

### 2.5. 基本查询语句

```mysql
create table student(
	id int,
	name varchar(20),
	chinese float,
	english float,
	math float,
    gender varchar(2)
);

insert into student(id,name,chinese,english,math) values(1,'张小明',89,78,90,’男’);
insert into student(id,name,chinese,english,math) values(2,'李进',67,53,95, ’男’);
insert into student(id,name,chinese,english,math) values(3,'王五',87,78,77, ’男’);
insert into student(id,name,chinese,english,math) values(4,'李一一',88,98,92, ’女’);
insert into student(id,name,chinese,english,math) values(1,'张小明',89,78,90, ’女’);
insert into student(id,name,chinese,english,math) values(NULL,' ',NULL,NULL,NULL,NULL);

-- 2.1 查询所有列
SELECT * FROM student;

-- 2.2 查询指定列(多列)
SELECT id,NAME,chinese FROM student;

-- 2.3 查询指定别名
SELECT id AS ’编号’,Name AS ’姓名’ FROM student AS s;

-- 2.4 查询时动态添加常量列(数据库中没有数据，查询的时候添加上去的)
-- 需求： 在查询student表时添加一个班级列，内容为“java”
SELECT id,NAME,chinese,age,'java' AS '语言'  FROM student;

-- 2.5 查询时合并列
-- 需求： 查询每个学生的servlet和jsp的总成绩
SELECT id,NAME,(chinese+English) AS '总成绩' FROM student;
-- 注意：合并列只能合并数值类型的字段
SELECT id,( chinese + English + math) FROM student;

-- 2.6 查询时去除重复记录(DISTINCT)
-- 需求： 查询学生的id  
SELECT DISTINCT id FROM student;
-- 另一种语法
SELECT DISTINCT(id) FROM student;

-- 2.7 条件查询(where)
-- 2.7.1 逻辑条件： and(与)     or(或)
-- 需求： 查询id为2，且姓名为李四的学生
SELECT * FROM student WHERE id=2 AND NAME='李进'; -- 交集
-- 需求： 查询id为2，或姓名为张三的学生
SELECT * FROM student WHERE id=2 OR NAME='李进'; -- 并集
-- 2.7.2 比较条件： >   <   >=  <=  =  <>(不等于)     between and (等价于>= 且 <=)
-- 需求： 查询servlet成绩大于70分的学生
SELECT * FROM student WHERE chinese >70;
-- 需求： 查询jsp成绩大于等于75，且小于等于90分的学生
SELECT * FROM student WHERE chinese >=75 AND english <=90;
-- 另一个语法
SELECT * FROM student WHERE chinese BETWEEN 75 AND 90; -- (包前包后)
SELECT * FROM student WHERE gender<>'男';
-- 2.7.3 判空条件(null 空字符串)：  is null / is not null    空字符串 =''  / <>''
-- 需求： 查询地址为空的学生（包括null和空字符串）
-- null vs  空字符串
-- null：表示没有值
-- 空字符串：有值的！
-- 判断null
SELECT * FROM student WHERE id IS NULL ;
-- 判断空字符串
SELECT * FROM student WHERE name ='';
-- （包括null和空字符串）
SELECT * FROM student WHERE id IS NULL OR name =''; 
-- 需求： 查询有地址的学生(不包括null和空字符串)
SELECT * FROM student WHERE id IS NOT NULL AND name <>'';
-- 2.7.4 模糊条件： like
-- 通常使用以下替换标记：
-- % : 表示任意个字符
-- _ : 表示一个字符
-- 需求： 查询姓‘张’的学生
SELECT * FROM student WHERE NAME LIKE '李%';
-- 需求： 查询姓‘李’，且姓名只有两个字的学生
SELECT * FROM student WHERE NAME LIKE '李_';

-- 2.8 聚合查询（使用聚合函数的查询）
 -- 常用的聚合函数： sum()  avg()  max()  min()  count()
-- 需求：查询学生的chinese的总成绩 (sum() :求和函数)
SELECT SUM(chinese) AS ' chinese的总成绩' FROM student;
-- 需求： 查询学生的chinese的平均分
SELECT AVG(chinese) AS ' chinese的平均分' FROM student;
-- 需求: 查询当前chinese最高分
SELECT MAX(chinese) AS '最高分' FROM student;
-- 需求： 查询最低分
SELECT MIN(chinese) AS '最低分' FROM student;
-- 需求： 统计当前有多少学生(count(字段))
SELECT COUNT(*) FROM student;
SELECT COUNT(id) FROM student;
-- 注意：count（）函数统计的数量不包含null的数据
-- 使用count统计表的记录数，要使用不包含null值的字段

-- 2.9 分页查询（limit 起始行,查询几行）
-- 起始行从0开始
-- 分页：当前页  每页显示多少条
-- 分页查询当前页的数据的sql: SELECT * FROM student LIMIT (当前页-1)*每页显示多少条,每页显示多少条;
-- 需求： 查询第1,2条记录（第1页的数据）
SELECT * FROM student LIMIT 0,2;
-- 查询第3,4条记录（第2页的数据）
-- 查询第5,6条记录（第3页的数据）
SELECT * FROM student LIMIT 4,2;   SELECT * FROM student LIMIT 2*2,2;
-- 查询第7,8条记录 (没有记录不显示)
SELECT * FROM student LIMIT 6,2;   SELECT * FROM student LIMIT 3*2,2;

-- 2.10 查询排序（order by ）
-- 语法 ：order by 字段 asc/desc
-- asc: 顺序，正序。数值：递增，字母：自然顺序（a-z）
-- desc: 倒序，反序。数值：递减，字母：自然反序(z-a)
-- 默认情况下，按照插入记录顺序排序
SELECT * FROM student;
-- 需求： 按照id顺序排序
SELECT * FROM student ORDER BY id ASC;
SELECT * FROM student ORDER BY id; -- 默认正序
SELECT * FROM student ORDER BY id DESC;-- 反序
-- 注意：多个排序条件
-- 需求： 按照id正序，按照chinese的倒序
SELECT * FROM student ORDER BY id ASC,chineseDESC;

-- 2.11 分组查询(group by)
-- 需求： 查询男女的人数
-- 预期结果：
  --  男   3
  ---  女   2
  -- 1) 把学生按照性别分组(GROUP BY gender)
  -- 2) 统计每组的人数(COUNT(*))
SELECT gender,COUNT(*) FROM student GROUP BY gender;
```

### 2.6. 索引

```mysql
索引的优点：绝对性的提高查询速度
索引的缺点: 1、占用磁盘空间
           2、索引会减缓增删改操作(一旦数据发生变化，索引必定会更新)
特殊索引：主键是特殊的索引  、 唯一约束也是索引
索引是添加到列上的
索引一般添加在经常需要查询的列上

CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	address VARCHAR(20) DEFAULT '无锡国家软件园'  -- 默认值
)

CREATE INDEX index_Name on student(NAME(20));
DROP INDEX index_Name ON student;
```

### 2.7. 数据约束

​	  数据约束：对用户操作表的数据进行约束

####         a) 默认值约束

```mysql
CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	address VARCHAR(20) DEFAULT '无锡国家软件园'  -- 默认值
)
DROP table student;
-- 当字段没有插入值的时候，mysql自动给该字段分配默认值
INSERT INTO student(id,NAME) VALUES(1,'张三');

-- 注意：默认值的字段允许为null
INSERT INTO student(id,NAME,address) VALUE(2,'李四',NULL);
INSERT INTO student(id,NAME,address) VALUE(3,'王五','无锡新区');
```

#### 	b) 非空约束    

```mysql
-- 需求： gender字段必须有值（不为null）
DROP table student;

CREATE TABLE student(
	id INT,
	NAME VARCHAR(20),
	gender VARCHAR(2) NOT NULL -- 非空
)

-- 非空字段必须赋值
INSERT INTO student(id,NAME) VALUES(1,'李四');
注意点：这条语句SQLyong软件会默认帮我们生成gender为空字符串的值，使用命令行的时候就会报错

-- 非空字符不能插入null
INSERT INTO student(id,NAME,gender) VALUES(1,'李四',NULL);
```

####      c) 唯一约束

```mysql
-- 1.3 唯一
DROP table student;

CREATE TABLE student(
	id INT UNIQUE, -- 唯一
	NAME VARCHAR(20)
)

INSERT INTO student(id,NAME) VALUES(1,'zs');
INSERT INTO student(id,NAME) VALUES(1,'lisi'); -- ERROR 1062 (23000): Duplicate entry '1' for key 'id'
INSERT INTO student(id,NAME) VALUES(2,'lisi');

唯一字段是指有值的情况下唯一，NULL值的的数据可以插入多次，所以唯一字段也不能用来标识数据唯一
INSERT INTO student(id,NAME) VALUES(NULL,'wangwu');
INSERT INTO student(id,NAME) VALUES(NULL,'wangwu');
```

#### 	d) 主键约束

​	非空+唯一，用来标识数据的唯一

​	 1）通常情况下，**每张表都会设置一个主键字段。**用于标记表中的每条记录的唯一性。

​	2）建议不要选择表的包含业务含义的字段作为主键，建议给每张表独立设计一个非业务含义的id字段                                           

```mysql
-- 主键（非空+唯一）
DROP TABLE student;

CREATE TABLE student(
	id INT PRIMARY KEY, -- 主键约束，一般添加在INT类型的字段上
	NAME VARCHAR(20)
)

INSERT INTO student(id,NAME) VALUES(1,'张三');
INSERT INTO student(id,NAME) VALUES(2,'张三');
INSERT INTO student(id,NAME) VALUES(1,'李四'); -- 违反唯一约束： Duplicate entry '1' for key 'PRIMARY'

insert into student(name) value('李四'); -- 违反非空约束： ERROR 1048 (23000): Column 'id' cannot be null
```

#### 	e) 自增长约束

​	字段值在没有设置的情况下自动递增

```mysql
-- 1.5 自增长
DROP TABLE student;

CREATE TABLE student(
	id INT PRIMARY KEY AUTO_INCREMENT, -- 自增长，从0开始
	NAME VARCHAR(20)
)

-- 自增长字段可以不赋值，自动递增
INSERT INTO student(NAME) VALUES('张三');
INSERT INTO student(NAME) VALUES('李四');
INSERT INTO student(NAME) VALUES('王五');

SELECT * FROM student;
-- 不能影响自增长约束
DELETE FROM student;
-- 可以影响自增长约束
TRUNCATE TABLE student;
```

#### 	f) 外键约束

​	约束两种表的数据，外键约束一般是关联其他表的主键字段

```mysql
-- 部门表（主表）
CREATE TABLE dept(
	id INT PRIMARY KEY,
	deptName VARCHAR(20)
)
INSERT INTO dept(id,deptName) VALUES(1,’技术部’);
INSERT INTO dept(id,deptName) VALUES(2,’人力资源部’);
INSERT INTO dept(id,deptName) VALUES(3,’市场部’);
INSERT INTO dept(id,deptName) VALUES(4,’总经办’);


-- 员工表（副表/从表）
CREATE TABLE employee(
	id INT PRIMARY KEY,
	empName VARCHAR(20),
	deptId INT,
)
INSERT INTO employee (id,empName,deptId) VALUES(1,’小明’,1);
INSERT INTO employee (id,empName,deptId) VALUES(2,’小虎’,2);
INSERT INTO employee (id,empName,deptId) VALUES(3,’小强’,4);
思考：有id为4的部门吗?所以此时需要用到外键约束


-- 外键约束-修改员工表
CREATE TABLE employee(
	id INT PRIMARY KEY AUTO_INCREMENT,
	empName VARCHAR(20),
	deptId INT,
CONSTRAINT fk_emlyee_dept FOREIGN KEY(deptId) REFERENCES dept(id)
约束       约束名        约束字段          参考      dept表中的id字段  
)
INSERT INTO employee (id,empName,deptId) VALUES(4,’小六’,2);
INSERT INTO employee (id,empName,deptId) VALUES(5,’小黑’,4);   
-- 上面语句问题: 该记录业务上不合法，员工插入了一个不存在的部门数据
INSERT INTO employee VALUES(5,'陈六',4); -- 违反外键约束： Cannot add or update a child row: a foreign key constraint fails (`day16`.`employee`, CONSTRAINT `emlyee_dept_fk` FOREIGN KEY (`deptId`) REFERENCES `dept` (`id`))


注意：
	1）被约束的表称为副表，约束别人的表称为主表，外键设置在副表上的！！！
	2）主表的参考字段通长为主键（非空唯一）！
	3）当有了外键约束,添加数据： 先添加主表，再添加副表
	4）当有了外键约束,修改数据： 
     思考：UPDATE dept SET id=4 WHERE id=2; 有什么问题?
     
        --先修改副表，再修改主表
        UPDATE employee SET deptId=3 WHERE depId=2;
        UPDATE dept SET id=4 WHERE id=2;
	5）当有了外键约束,删除数据： 先删除副表，再删除主表
        DELETE FROM employee WHERE deptId=2;
        DELETE FROM dept WHERE id=2;


SELECT * FROM dept;
SELECT * FROM employee;
```

#### 	g) 级联操作约束

​	问题： 当有了**外键约束**的时候，必须先修改或删除副表中的所有关联数据，才能修改或删除主表！但是，我们希望直接修改或删除主表数据，从而影响副表数据。可以使用级联操作实现！！！

​	级联修改： ON UPDATE CASCADE

​        级联删除： ON DELETE CASCADE

```mysql
CREATE TABLE employee(
	id INT PRIMARY KEY,
	empName VARCHAR(20),
	deptId INT,-- 把部门名称改为部门ID
	-- 声明一个外键约束
	CONSTRAINT emlyee_dept_fk FOREIGN KEY(deptId) REFERENCES dept(id) ON UPDATE CASCADE ON DELETE CASCADE  
)
注意： 级联操作必须在外键基础上使用
```

### 2.8. 关联查询

```javascript
--  **************二、关联查询（多表查询）****************----
-- 需求：查询员工及其所在部门(显示员工姓名，部门名称)
-- 2.1 交叉连接查询（不推荐。产生笛卡尔乘积现象：4 * 4=16，有些是重复记录）
SELECT empName,deptName FROM employee,dept;

-- 需求：查询员工及其所在部门(显示员工姓名，部门名称)
-- 多表查询规则：1）确定查询哪些表   2）确定哪些哪些字段   3）表与表之间连接条件
-- 2.2 内连接查询：只有满足条件的结果才会显示(使用最频繁)
SELECT empName,deptName       -- 2）确定哪些哪些字段
	FROM employee,dept    -- 1）确定查询哪些表
	WHERE employee.deptId=dept.id  -- 3）表与表之间连接条件
	
-- 内连接的另一种语法
SELECT empName,deptName
	FROM employee
	INNER JOIN dept
	ON employee.deptId=dept.id;
	
-- 使用别名
SELECT e.empName,d.deptName
	FROM employee AS e
	INNER JOIN dept AS d
	ON e.deptId=d.id;

-- 需求： 查询每个部门的员工
-- 预期结果：
 --  软件开发部  张三
 --  软件开发部  李四
 --  应用维护部  王五
 --  秘书部      陈六
 --  总经办      null 
SELECT d.deptName, e.empName
	FROM dept AS d 
	INNER JOIN employee AS e
	ON d.id= e.deptId;
查询结果无总经办,原因是使用的内连接查询

-- 2.2 左[外]连接查询： 使用左边表的数据去匹配右边表的数据，如果符合连接条件的结果则显示，如果不符合连接条件则显示null
 -- （注意： 左外连接：左表的数据一定会完成显示！）
SELECT d.deptName,e.empName
	FROM dept d
	LEFT OUTER JOIN employee e
	ON d.id=e.deptId;
```

## 3.PHP 操作数据库

​	如何在 PHP 代码中操作数据库是我们能否在自己的程序中使用数据库的核心。
	数据库扩展：http://php.net/manual/zh/refs.database.php
	如果需要使用 MySQLi 扩展，需要在 php.ini 文件中打开这个扩展（解除注释） extension=php_mysqli.dll

```php
<?php
// 如果需要在调用函数时忽略错误或者警告可以在函数名之前加上 @
// 1. 建立与数据库服务器之间的连接
$connection = mysqli_connect('127.0.0.1', 'root', '123456', 'demo2');
// 1. 必须在查询数据之前
// 2. 必须传入连接对象和编码
mysqli_set_charset($connection, 'utf8');
if (!$connection) {
  // 连接数据库失败
  exit('<h1>连接数据库失败</h1>');
}
// 基于刚刚创建的连接对象执行一次查询操作
// 得到的是一个查询对象，这个查询对象可以用来再到数据一行一行拿数据
$query = mysqli_query($connection, 'select * from users;');
// var_dump($query);
if (!$query) {
  exit('<h1>查询失败</h1>');
}
while ($row = mysqli_fetch_assoc($query)) {
  var_dump($row);
}
// 释放查询结果集
mysqli_free_result($query);
// 炸桥 关闭连接
mysqli_close($connection);
```

## 4.案例

​	基于数据库的增删改查

### 4.1. 列表功能

​	查询数据

```php
<?php
// 1. 建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'test');
if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}
// 2. 开始查询
$query = mysqli_query($conn, 'select * from users;');
if (!$query) {
  exit('<h1>查询数据失败</h1>');
}
// 3. 遍历结果集
// while ($item = mysqli_fetch_assoc($query)) {
//   $data[] = $item;
// }
?>

<tbody>
    <?php while ($item = mysqli_fetch_assoc($query)): ?>
    <tr>
        <th scope="row"><?php echo $item['id'] ?></th>
        <td><img src="<?php echo $item['avatar']; ?>" class="rounded" alt="<?php echo $item['name']; ?>"></td>
        <td><?php echo $item['name']; ?></td>
        <td><?php echo $item['gender'] == 0 ? '♀' : '♂'; ?></td>
        <td><?php echo $item['birthday']; ?></td>
        <td class="text-center">
            <a class="btn btn-info btn-sm" href="edit.php">编辑</a>
            <a class="btn btn-danger btn-sm" href="delete.php?id=<?php echo $item['id'] ?>">删除</a>
        </td>
    </tr>
    <?php endwhile ?>
</tbody>
```

### 4.2. 增加用户

​	增删改数据

```php
<?php
function add_user() {
  // 1.验证非空
  if (empty($_POST['name'])) {
    $GLOBALS['error_message'] = '请输入姓名';
    return;
  }
  if (!(isset($_POST['gender']) && $_POST['gender'] !== '-1')) {
    $GLOBALS['error_message'] = '请选择性别';
    return;
  }
  if (empty($_POST['birthday'])) {
    $GLOBALS['error_message'] = '请输入日期';
    return;
  }
  // 取值
  $name = $_POST['name'];
  $gender = $_POST['gender'];
  $birthday = $_POST['birthday'];
  // 接收文件并验证
  if (empty($_FILES['avatar'])) {
    $GLOBALS['error_message'] = '请上传头像';
    return;
  }
  // 返回文件扩展名
  $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
  // => jpg
  $target = '../uploads/avatar-' . uniqid() . '.' . $ext;
  if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $target)) {
    $GLOBALS['error_message'] = '上传头像失败';
    return;
  }
  $avatar = substr($target, 2);
  // var_dump($name);
  // var_dump($gender);
  // var_dump($birthday);
  // var_dump($avatar);

  // 2. 建立连接
  $conn = mysqli_connect('localhost', 'root', '123456', 'test');
  if (!$conn) {
    $GLOBALS['error_message'] = '连接数据库失败';
    return;
  }
  // var_dump("insert into users values (null, '{$name}', {$gender}, '{$birthday}', '{$avatar}');");
  // 3. 开始查询
  $query = mysqli_query($conn, "insert into users values (null, '{$name}', {$gender}, '{$birthday}', '{$avatar}');");
  if (!$query) {
    $GLOBALS['error_message'] = '查询过程失败';
    return;
  }
  $affected_rows = mysqli_affected_rows($conn);
  if ($affected_rows !== 1) {
    $GLOBALS['error_message'] = '添加数据失败';
    return;
  }

  //4. 响应
  header('Location: index.php');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  add_user();
}
?>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data" autocomplete="off">
```

### 4.3. 编辑用户（和增加用户一个页面）

```php
<?php
// 接收要修改的数据 ID
if (empty($_GET['id'])) {
  exit('<h1>必须传入指定参数</h1>');
}
$id = $_GET['id'];
// 1. 建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'test');
if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}
// 2. 开始查询
// 因为 ID 是唯一的 那么找到第一个满足条件的就不用再继续了 limit 1
$query = mysqli_query($conn, "select * from users where id = {$id} limit 1;");
if (!$query) {
  exit('<h1>查询数据失败</h1>');
}
// 已经查询到的当前数据
$user = mysqli_fetch_assoc($query);
if (!$user) {
  exit('<h1>找不到你要编辑的数据</h1>');
}

function edit () {
  global $user;
  // 验证非空
  if (empty($_POST['name'])) {
    $GLOBALS['error_message'] = '请输入姓名';
    return;
  }
  if (!(isset($_POST['gender']) && $_POST['gender'] !== '-1')) {
    $GLOBALS['error_message'] = '请选择性别';
    return;
  }
  if (empty($_POST['birthday'])) {
    $GLOBALS['error_message'] = '请输入日期';
    return;
  }
  // 取值
  $user['name'] = $_POST['name'];
  $user['gender'] = $_POST['gender'];
  $user['birthday'] = $_POST['birthday'];
  // 有上传就修改
  if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] === UPLOAD_ERR_OK) {
    // 用户上传了新头像 -> 用户希望修改头像
    $ext = pathinfo($_FILES['avatar']['name'], PATHINFO_EXTENSION);
    $target = '../uploads/avatar-' . uniqid() . '.' . $ext;
    if (!move_uploaded_file($_FILES['avatar']['tmp_name'], $target)) {
      $GLOBALS['error_message'] = '上传头像失败';
      return;
    }
    $user['avatar'] = substr($target, 2);
  }
  // $user => 修改过后的信息
  // TODO: 将数据更新回数据库
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  edit();
}
?>

<main class="container">
    <h1 class="heading">编辑“<?php echo $user['name']; ?>”</h1>
    <form action="<?php echo $_SERVER['PHP_SELF']; ?>?id=<?php echo $user['id']; ?>" method="post" enctype="multipart/form-data">
        <!-- <input type="hidden" id="id" value="<?php echo $user['id']; ?>"> -->
        <img src="<?php echo $user['avatar']; ?>" alt="">
        <div class="form-group">
            <label for="avatar">头像</label>
            <!-- 文件域不能设置默认值 -->
            <input type="file" class="form-control" id="avatar" name="avatar">
        </div>
        <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" class="form-control" id="name" name="name" value="<?php echo $user['name']; ?>">
        </div>
        <div class="form-group">
            <label for="gender">性别</label>
            <select class="form-control" id="gender" name="gender">
                <option value="-1">请选择性别</option>
                <option value="1"<?php echo $user['gender'] === '1' ? ' selected': ''; ?>>男</option>
            <option value="0"<?php echo $user['gender'] === '0' ? ' selected': ''; ?>>女</option>
        </select>
    </div>
<div class="form-group">
    <label for="birthday">生日</label>
    <input type="date" class="form-control" id="birthday" name="birthday" value="<?php echo $user['birthday']; ?>">
</div>
<button class="btn btn-primary">保存</button>
</form>
</main>
```

### 4.4. 删除用户

```php
<?php
// 接收要删除的数据 ID
if (empty($_GET['id'])) {
  exit('<h1>必须传入指定参数</h1>');
}
$id = $_GET['id']; // => 1,2,3
// 1. 建立连接
$conn = mysqli_connect('localhost', 'root', '123456', 'test');
if (!$conn) {
  exit('<h1>连接数据库失败</h1>');
}
// 2. 开始查询
$query = mysqli_query($conn, 'delete from users where id in (' . $id . ');');
if (!$query) {
  exit('<h1>查询数据失败</h1>');
}
$affected_rows = mysqli_affected_rows($conn);
if ($affected_rows <= 0) {
  exit('<h1>删除失败</h1>');
}
header('Location: index.php');
```

## 5.全部配置总结

```php
1. Apache
1.1. PHPIniDir
1.2. LoadModule
1.3. AddType

2. PHP
2.1. extension_dir
2.2. php_mbstring.dll
2.3. php_mysqli.dll
2.4. data.timezone
2.5. upload_max_filesize
2.6. post_max_size
```

