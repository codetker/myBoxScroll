/*
 * boxScroll 0.1
 * 兼容等常见浏览器
 */
;
(function($, window, document, undefined) {
	//定义构造函数
	var BoxObj = function(ele, opt) {
		this.$element = ele; //最外层对象
		this.defaults = {
				'child': 'li',
				'style': 0, //滚动样式选择,默认为普通效果
				'stepTime': 1, //默认为1s
				'direction': 'right', //默认为向右边滚动
				'toLeft': null, //默认格式下重要位置
				'toRight': null,
				'ControlUl': null
			},

			this.options = $.extend({}, this.defaults, opt);
		//这里可以添加一些通用方法	
	}

	//给构造函数添加方法
	BoxObj.prototype = {

		marginScroll: function() {
			//接收对象属性
			var boxWindow = this.$element,
				child = $(boxWindow).children(this.options.child),
				stepTime = this.options.stepTime,
				style = this.options.style,
				circle = this.options.circle,
				direction = (this.options.direction == 'right') ? 1 : -1,
				toLeft = this.options.toLeft,
				toRight = this.options.toRight,
				Control = this.options.ControlUl,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				imgIndex;

			function getImgIndex() { //判断当前图片的位置
				imgIndex = Math.round(parseInt($(boxWindow).css('margin-left')) * (-1) / boxWidth);
			}

			var timer; //必须在外面定义保证全局针对这一功能只有这一个计时器
			timer = setInterval(function() {
				boxScroll(imgIndex, direction);
			}, 5000);

			function rest() {
				clearInterval(timer);
				timer = setInterval(function() {
					boxScroll(imgIndex, direction);
				}, 5000);
			}

			//绑定点击按钮
			$(Control).delegate('li', 'click', function() {
				boxScroll($(this).index(), 0);
				rest();
			});

			//绑定左右按钮
			$(toLeft).click(function() {
				boxScroll(0, -1);
				rest();
			});
			$(toRight).click(function() {
				boxScroll(0, 1);
				rest();
			});

			function boxScroll(index, dir) {
				if (!$(boxWindow).is(':animated')) { //当ul窗口没有在动时
					if (!dir) { //响应ul li control操作
						//此时dir=0，则依靠传入的imgIndex
						imgIndex = index;
						//其它时候dir!=0,则依靠dir
					} else { //响应toLeft和toRight
						if (dir == 1) { //向右动
							getImgIndex();
							if (imgIndex == (imgIndexMax - 1)) {
								imgIndex = 0;
							} else {
								imgIndex += 1;
							}
						} else { //向左动
							getImgIndex();
							if (imgIndex == 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
						}
					}
					lists.eq(imgIndex).addClass('liSelected');
					lists.eq(imgIndex).siblings().removeClass('liSelected');
					$(boxWindow).animate({
						'margin-left': imgIndex * boxWidth * (-1) + 'px'
					}, 1000 * stepTime);
				}
			}
		},
		commonScroll: function() {
			//接收对象属性
			//接收对象属性
			var boxWindow = this.$element,
				child = $(boxWindow).find(this.options.child),
				stepTime = this.options.stepTime,
				style = this.options.style,
				circle = this.options.circle,
				direction = (this.options.direction == 'right') ? 1 : -1,
				toLeft = this.options.toLeft,
				toRight = this.options.toRight,
				Control = this.options.ControlUl,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				imgIndex;

			function getImgIndex() { //判断当前图片的位置
				imgIndex = Math.round($(boxWindow).scrollLeft() / boxWidth);
			}

			var timer; //必须在外面定义保证全局针对这一功能只有这一个计时器
			timer = setInterval(function() {
				boxScroll(imgIndex, direction);
			}, 5000);

			function rest() {
				clearInterval(timer);
				timer = setInterval(function() {
					boxScroll(imgIndex, direction);
				}, 5000);
			}

			//绑定点击按钮
			$(Control).delegate('li', 'click', function() {
				boxScroll($(this).index(), 0);
				rest();
			});

			//绑定左右按钮
			$(toLeft).click(function() {
				boxScroll(0, -1);
				rest();
			});
			$(toRight).click(function() {
				boxScroll(0, 1);
				rest();
			});

			function boxScroll(index, dir) {
				if (!$(boxWindow).is(':animated')) { //当ul窗口没有在动时
					if (!dir) { //响应ul li control操作
						//此时dir=0，则依靠传入的imgIndex
						imgIndex = index;
						//其它时候dir!=0,则依靠dir
					} else { //响应toLeft和toRight
						if (dir == 1) { //向右动
							getImgIndex();
							if (imgIndex == (imgIndexMax - 1)) {
								imgIndex = 0;

							} else {
								imgIndex += 1;
							}
						} else { //向左动
							getImgIndex();
							if (imgIndex == 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
						}
					}
					lists.eq(imgIndex).addClass('liSelected');
					lists.eq(imgIndex).siblings().removeClass('liSelected');
					$(boxWindow).animate({
						'scrollLeft': imgIndex * boxWidth + 'px'
					}, 1000 * stepTime);
				}
			}
		}
	}

	//在插件中使用windowObj对象的方法，0为vertical，1为horizontal
	$.fn.boxScroll = function(options) {
		//创建实体
		var boxObj = new BoxObj(this, options);
		if (boxObj.options.style == 0) {
			return boxObj.commonScroll();
		} else if (boxObj.options.style == 1) {
			return boxObj.marginScroll();
		} else {

		}
	}
})(jQuery, window, document);