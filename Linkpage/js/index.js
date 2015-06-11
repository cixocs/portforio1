// JavaScript Document

/*
======================================
	index.js
======================================
*/
(function($) {
	$.index = {
		/*================================
			@VisualSlider
		================================*/
		slider: function(){
			var $window  = $(window);
			var Width    = $window.width();
			var $target  = $('#Slider');
			var $imgList = $target.find('.img-list');
			var $img     = $imgList.find('li');
			var $txtList = $target.find('.txt-list');
			var $txt     = $txtList.find('li');
			var imgTotal = $img.length;
			var imgWidth = 0;
			var minWidth = 1266-240;
			var txtTotal = $txt.length;
			var count    = 0;
			var timerID  = '';
			var isPC     = $.isDevice('pc');

			//初期設定
			var init = function(){
				// style
				$txt.css({visibility: 'visible', opacity: 0});
				$txt.eq(0).css({opacity: 1});
				$txt.find('span').each(function(i){
					$(this).width($(this).find('img').width());
				});
				textTween();

				// event
				set();
				$window.resize(function(){
					clearTimeout(timerID);
				});
				Library.resizeStop(function(){
					clearTimeout(timerID);
					set();
				});
			};

			// set: セッティング
			var set = function(){
				if(isPC){
					imgWidth = minWidth < $window.width()-240 ? $window.width()-240 : minWidth;
				} else {
					imgWidth = $window.width();
				}
				$img.css({width: imgWidth});
				$imgList.width(imgTotal*imgWidth);
				// タイマースタート
				setTimer();
			};

			// setTimer： タイマー
			var setTimer = function(){
				timerID = setTimeout(function(){
					tween();
				}, 6000);
			}

			// tween: アニメーション
			var tween = function(){
				clearTimeout(timerID);
				var $catch;

				$.sequence(
					function(){
						// テキストを消す
						$txt.eq(count).animate({opacity: 0}, 600);
						$imgList.find('li').eq(0).delay(1300/2).animate({opacity: 0}, 1300/2);
						$imgList.find('li').eq(1).css({opacity: 1});
						// スライド
						return $imgList.delay(200).animate({left: -imgWidth}, 1300, 'easeInOutExpo', function(){
							var $this = $(this);
							$this.append($this.find('li').eq(0)).css({'left': 0});
						});
					},
					function(){
						// カウント設定
						count = count == imgTotal-1 ? 0 : count+=1;
						textTween();
						setTimer();
					}
				);
			};

			// textTween: テキスト
			var textTween = function(){
				var $span = $txt.eq(count).css({opacity: 1}).find('span'),
						last = $span.length-1;
						time = 1.5,
						delay = 400;
				$span.each(function(i){
					var w = $(this).width();
					if(last == i){
						$(this).css({opacity: 0, width: 0}).delay(delay+100).animate({opacity: 1, width: w}, w*time);
					} else {
						$(this).css({opacity: 0, width: 0}).delay(delay).animate({opacity: 1, width: w}, w*time);
					}
					delay = w*time + delay+200;
				});
			};


			return init();
		},//slider

		/*================================
			@SelectHover
		================================*/
		hover: function(){
			var $target    = $('#Select').find('.box');
			var $acImg     = $target.find('.active');

			$acImg.css({visibility: 'visible', opacity: 0});
			
			$target.hover(function(){
				$(this).find('.img').find('.active').stop(false,true).show().animate({opacity: 1},300,"easeOutBack");
			},function(){
				$(this).find('.img').find('.active').stop(false,true).hide().animate({opacity: 0},300,"easeOutBack");
			});			
		}//hover

	};//$.index


	$(function(){
		$.index.slider();
		if($.isDevice('pc')){
			$.index.hover();
		}
	});
})(jQuery);



/**
 * Author: Fujiwara
 * @sequence.js v0.2.0 -2013.03.07
*/
;(function($){
	$.extend({
		sequence: function(){
			var $Def = new $.Deferred(), piped, i = 0, l = arguments.length;
			for (; i < l; i += 1){
				if($.isFunction(arguments[i])){
					piped = (piped ? piped : $Def).pipe($.proxy(function(){
						return this();
					}, arguments[i]));
				}
			}
			$Def.resolve();
		}
	});
}(jQuery));
