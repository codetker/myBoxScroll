/*
 * boxScroll 0.1
 * 兼容FF,Chrome等常见浏览器
 */
;(function($, window, document, undefined) {
	//定义构造函数
	var BoxObj = function(ele, opt) {
		this.$element = ele;
		this.defaults = {
			'child': 'li',
			'style': 0,
			'stepTime': 1,
			'direction': 'right',
			'toLeft': null,
			'toRight': null,
			'ControlUl': null,
			'circle': true,
			'circleTime': 5,
			'fadeInTime': 300,
			'fadeOutTime': 400,
			'liHover': null
		};

		this.options = $.extend({}, this.defaults, opt);
	};

	//在原型上添加方法
	BoxObj.prototype = {

		boxScroll: function() {

			var boxWindow = this.$element,
				child = $(boxWindow).find(this.options.child),
				style = this.options.style,
				circle = this.options.circle,
				circleTime = this.options.circleTime,
				direction = (this.options.direction == 'right') ? 1 : -1,
				toLeft = this.options.toLeft,
				toRight = this.options.toRight,
				Control = this.options.ControlUl,
				liHover = this.options.liHover,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				imgIndex,
				timer,

				//margin and scroll stepTime
				stepTime = this.options.stepTime,

				//fadeIn and Out control time
				fadeInTime = this.options.fadeInTime,
				fadeOutTime = this.options.fadeOutTime,
				startTime,
				endTime;

			//判断当前图片的位置
			function getImgIndex() {

				switch (style) {
					case 0: //margin
						imgIndex = Math.round(parseInt($(boxWindow).css('margin-left')) * (-1) / boxWidth);
						break;

					case 1: //scroll
						imgIndex = Math.round($(boxWindow).scrollLeft() / boxWidth);
						break;

					case 2: //fade
						imgIndex = getIndexShow();
						break;

					default:
				}
			}

			//fade 中判断图片index
			function getIndexShow() {
				var temp;
				$(lists).each(function() {
					if ($(this).hasClass(liHover)) {
						temp = $(this).index();
					}
				});
				return temp;
			}

			//设置循环
			function set() {
				if (circle) {
					timer = setInterval(function() {
						boxScroll(imgIndex, direction);
					}, 1000 * circleTime);
				}
			}

			//取消循环
			function rest() {
				clearInterval(timer);
				set();
			}

			//初始化
			if (style == 2) {
				$(child).eq(0).click();
			}
			set();
			startTime = Date.parse(new Date());
			endTime = Date.parse(new Date());

			//绑定点击按钮
			$(Control).delegate('li', 'click', function() {
				boxScroll($(this).index(), 0);
				rest();
			});

			//绑定左右按钮
			$(toLeft).click(function() {
				//主要用于防止show and hide 左右点击过快
				startTime = Date.parse(new Date());
				if ((startTime - endTime) > 800) {
					boxScroll(0, -1);
					rest();
					endTime = Date.parse(new Date());
				}
			});
			$(toRight).click(function() {
				startTime = Date.parse(new Date());
				if ((startTime - endTime) > 800) {
					boxScroll(0, 1);
					rest();
					endTime = Date.parse(new Date());
				}
			});

			function boxScroll(index, dir) {
				if (!$(boxWindow).is(':animated')) {
					//响应ul li control操作
					if (!dir) {
						imgIndex = index;

						//响应toLeft和toRight
					} else {
						if (dir == 1) { //向右
							getImgIndex();
							if (imgIndex === (imgIndexMax - 1)) {
								imgIndex = 0;
							} else {
								imgIndex += 1;
							}
						} else { //向左
							getImgIndex();
							if (imgIndex === 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
						}
					}

					lists.eq(imgIndex).addClass(liHover);
					lists.eq(imgIndex).siblings().removeClass(liHover);

					//具体执行
					switch (style) {
						case 0:
							$(boxWindow).animate({
								'margin-left': imgIndex * boxWidth * (-1) + 'px'
							}, 1000 * stepTime);
							break;

						case 1:
							$(boxWindow).animate({
								'scrollLeft': imgIndex * boxWidth + 'px'
							}, 1000 * stepTime);
							break;

						case 2:
							$(child).fadeOut(fadeOutTime);
							$(child).eq(imgIndex).fadeIn(fadeInTime);
							break;

						default:
					}

				}
			}
		}
	};

	//将方法添加到jquery对象的原型上
	$.fn.boxScroll = function(options) {
		//创建实例
		var boxObj = new BoxObj(this, options);
		return boxObj.boxScroll();
	};
})(jQuery, window, document);