/*
 * boxScroll 0.1
 * 兼容等常见浏览器
 */
 ;(function($,window,document,undefined){
 	//定义构造函数
 	var BoxObj=function(ele,opt){
 		this.$element=ele; //最外层对象
 		this.defaults={
 			'style': 0 ,//滚动样式选择,默认为普通效果
 			'speed': 1 ,//默认为1s
 			'direction': 'left',//默认为向左边滚动
 			'toLeft':$(ele).children('.picOuterBox').children('.arrowLeft'),//默认格式下重要位置
 			'toRight':$(ele).children('.picOuterBox').children('.arrowRight'),
 			'ControlUl':$(ele).children('.picControl').children('ul')
 		},
 	
 		this.options=$.extend({},this.defaults,opt );
 		//这里可以添加一些通用方法	
 	}

 	//给构造函数添加方法
 	BoxObj.prototype={

 			commonScroll:function(){
 			//接收对象属性
 			var boxWindow=$(this.$element).children('.picOuterBox').children('.picInnerBox');
 			var speed=this.defaults.speed;
 			var style=this.defaults.style;
 			var direction=(this.defaults.direction=='left')? 1 : -1;
 			var toLeft=this.defaults.toLeft;
 			var toRight=this.defaults.toRight;
 			var Control=this.defaults.ControlUl;

 			var boxWidth=$(boxWindow).children('li').width();
 			var imgIndexMax=$(boxWindow).children('li').length;
 			var imgIndex;
 			function getImgIndex(){//判断当前图片的位置
 				imgIndex=Math.round(parseInt($(boxWindow).css("margin-left"))*(-1)/boxWidth);
 			}

 			var timer;//必须在外面定义保证全局针对这一功能只有这一个计时器
 			timer=setInterval(function(){
 				boxScroll(imgIndex,direction);
 			},5000);

 			function rest(){
 				clearInterval(timer);
				timer=setInterval(function(){
	 				boxScroll(imgIndex,direction);
	 			},5000);
 			}

 			//绑定点击按钮
 			$(Control).delegate('li', 'click', function() {
 				boxScroll($(this).index(),0);
 				rest();
 			});

 			//绑定左右按钮
 			$(toLeft).click(function() {
 				boxScroll(0,-1);
 				rest();
 			});
 			$(toRight).click(function() {
 				boxScroll(0,1);
 				rest();
 			});

 			function boxScroll(index,dir){
 				if (!$(boxWindow).is(':animated')) {//当ul窗口没有在动时
 					if(!dir){//响应ul li control操作
 						//此时dir=0，则依靠传入的imgIndex
 						imgIndex=index;
 						//其它时候dir!=0,则依靠dir
 					}else{//响应toLeft和toRight
 						if(dir==1){//向右动
 							getImgIndex();
 							if (imgIndex==(imgIndexMax-1)) {
 								imgIndex=0;

 							}else{
 								imgIndex+=1;
 							}
 						}else{//向左动
 							getImgIndex();
 							if (imgIndex==0) {
 								imgIndex=(imgIndexMax-1);
 							}else{
 								imgIndex-=1;
 							}
 						}
 					}
 					$(Control).children('li').eq(imgIndex).addClass('liSelected');
 					$(Control).children('li').eq(imgIndex).siblings().removeClass('liSelected');
 					$(boxWindow).animate({
 							"margin-left":imgIndex*boxWidth*(-1)+'px'
 						}, 1000*speed);
 				}
 			}
 		}
 	}

 	//在插件中使用windowObj对象的方法，0为vertical，1为horizontal
 	$.fn.boxScroll=function(options){
 		//创建实体
 		var boxObj=new BoxObj(this,options);
 		//用尾调的形式调用对象方法
 		return boxObj.commonScroll();
 	}
 })(jQuery,window,document);