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
				'ControlUl': null,
				'liHover': null,
				'autoRun': true
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
				autoRun = this.options.autoRun,
				Control = this.options.ControlUl,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				liHover = this.options.liHover,
				imgIndex, timer;

			function getImgIndex() { //判断当前图片的位置
				imgIndex = Math.round(parseInt($(boxWindow).css('margin-left')) * (-1) / boxWidth);
			}

			function set() {
				timer = setInterval(function() {
					boxScroll(imgIndex, direction);
				}, 5000);
			}

			if (autoRun) {
				set();
			}

			function rest() {
				if (autoRun) {
					clearInterval(timer);
					set();
				}
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
					switch (dir) {
						case 0:
							imgIndex = index;
							break;
						case 1:
							getImgIndex();
							if (imgIndex == (imgIndexMax - 1)) {
								imgIndex = 0;
							} else {
								imgIndex += 1;
							}
							break;
						case -1:
							getImgIndex();
							if (imgIndex == 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
							break;
						default:
							;
					}
					lists.eq(imgIndex).addClass(liHover);
					lists.eq(imgIndex).siblings().removeClass(liHover);
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
				autoRun = this.options.autoRun,
				Control = this.options.ControlUl,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				liHover = this.options.liHover,
				imgIndex, timer;

			function getImgIndex() { //判断当前图片的位置
				imgIndex = Math.round($(boxWindow).scrollLeft() / boxWidth);
			}

			function set() {
				timer = setInterval(function() {
					boxScroll(imgIndex, direction);
				}, 5000);
			}

			if (autoRun) {
				set();
			}

			function rest() {
				if (autoRun) {
					clearInterval(timer);
					set();
				}
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
					switch (dir) {
						case 0:
							imgIndex = index;
							break;
						case 1:
							getImgIndex();
							if (imgIndex == (imgIndexMax - 1)) {
								imgIndex = 0;

							} else {
								imgIndex += 1;
							}
							break;
						case -1:
							getImgIndex();
							if (imgIndex == 0) {
								imgIndex = (imgIndexMax - 1);
							} else {
								imgIndex -= 1;
							}
							break;
						default:
							;
					}
					lists.eq(imgIndex).addClass(liHover);
					lists.eq(imgIndex).siblings().removeClass(liHover);
					$(boxWindow).animate({
						'scrollLeft': imgIndex * boxWidth + 'px'
					}, 1000 * stepTime);
				}
			}
		},
		showAndHide: function() {
			var boxWindow = this.$element,
				child = $(boxWindow).find(this.options.child),
				stepTime = this.options.stepTime,
				toLeft = this.options.toLeft,
				toRight = this.options.toRight,
				Control = this.options.ControlUl,
				autoRun = this.options.autoRun,
				lists = $(Control).children('li'),
				boxWidth = $(child).width(),
				imgIndexMax = $(child).length,
				liHover = this.options.liHover,
				imgIndex, startTime, endTime, timer;

			$(lists).eq(0).click();

			function getImgIndex() { //判断当前图片的位置
				imgIndex = selectIndex();

			}

			function selectIndex() {
				var tmp;
				$(Control).children().each(function() {
					if ($(this).hasClass(liHover)) {
						tmp = $(this).index();
					}
				});
				return tmp;
			}

			startTime = Date.parse(new Date()); //时间控制，0.8s内仅能点一次,防止多次点击
			endTime = Date.parse(new Date());

			function set() {
				timer = setInterval(function() {
					boxScroll(imgIndex, direction);
				}, 5000);
			}

			if (autoRun) {
				set();
			}

			function rest() {
				if (autoRun) {
					clearInterval(timer);
					set();
				}
			}

			//绑定点击按钮
			$(Control).delegate('li', 'click', function() {
				boxScroll($(this).index(), 0);
				rest();
			});

			//绑定左右按钮
			$(toLeft).click(function() {
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
				switch (dir) {
					case 0:
						imgIndex = index;
						break;
					case 1:
						getImgIndex();
						if (imgIndex == (imgIndexMax - 1)) {
							imgIndex = 0;

						} else {
							imgIndex += 1;
						}
						break;
					case -1:
						getImgIndex();
						if (imgIndex == 0) {
							imgIndex = (imgIndexMax - 1);
						} else {
							imgIndex -= 1;
						}
						break;
					default:
						;
				}
				$(child).fadeOut(300);
				setTimeout(function() {
					$(child).eq(imgIndex).fadeIn(500);
				}, 100);
				$(lists).removeClass(liHover);
				$(lists).eq(imgIndex).addClass(liHover);
			}
		}
	}

	//在插件中使用windowObj对象的方法，0为vertical，1为horizontal
	$.fn.boxScroll = function(options) {
		//创建实体
		var boxObj = new BoxObj(this, options);
		switch (boxObj.options.style) {
			case 0:
				return boxObj.commonScroll();
				break;
			case 1:
				return boxObj.marginScroll();
				break;
			case 2:
				return boxObj.showAndHide();
				break;
			default:
				;
		}
	}
})(jQuery, window, document);