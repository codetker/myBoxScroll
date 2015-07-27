/*
 * boxScroll 0.1
 * 兼容等常见浏览器
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
			'circleTime': 5
		};

		this.options = $.extend({}, this.defaults, opt);
	};

	//在原型上添加方法
	BoxObj.prototype = {

		boxScroll: function() {

			var boxWindow = this.$element,
				child = $(boxWindow).find(this.options.child),
				stepTime = this.options.stepTime,
				style = this.options.style,
				circle = this.options.circle,
				circleTime = this.options.circleTime,
				direction = (this.options.direction == 'right') ? 1 : -1,
				toLeft = this.options.toLeft,
				toRight = this.options.toRight,
				Control = this.options.ControlUl,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				imgIndex,
				timer;

			//判断当前图片的位置
			function getImgIndex() {
				if (style === 0) { //margin
					imgIndex = Math.round(parseInt($(boxWindow).css('margin-left')) * (-1) / boxWidth);

				} else if (style === 1) { //scroll
					imgIndex = Math.round($(boxWindow).scrollLeft() / boxWidth);

				} else {
					//add some more
				}

			}

			//设置循环
			function set() {
				if (circle) {
					timer = setInterval(function() {
						boxScroll(imgIndex, direction);
					}, 1000 * circleTime);
				}
			}
			set();

			//取消循环
			function rest() {
				clearInterval(timer);
				set();
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

					lists.eq(imgIndex).addClass('liSelected');
					lists.eq(imgIndex).siblings().removeClass('liSelected');

					//具体执行
					if (style === 0) { //margin
						$(boxWindow).animate({
							'margin-left': imgIndex * boxWidth * (-1) + 'px'
						}, 1000 * stepTime);

					} else if (style === 1) { //scroll
						$(boxWindow).animate({
							'scrollLeft': imgIndex * boxWidth + 'px'
						}, 1000 * stepTime);

					} else {

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