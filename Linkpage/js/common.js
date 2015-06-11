// JavaScript Document

/*
======================================
	common.js
======================================
*/
(function($) {
	$.common = {
		/*================================
			@sidenavi
		================================*/
		sidenavi: function(){
			var target = $('#Header').find('.course-list');
			
			target.show();
		},//sidenavi

		/*================================
			@footerHover
		================================*/
		footerhover: function(){
			var $target    = $('#Footer').find('.bnr');
			
			$target.hover(function(){
				$(this).find('.img').find('img').attr('src',$(this).find('.img').find('img').attr('src').replace('.','_on.'));
			},function(){
				$(this).find('.img').find('img').attr('src',$(this).find('.img').find('img').attr('src').replace('_on.','.'));
			});			
		},//sidenavi

		/*================================
			@SP navi
		================================*/
		spnavi: function(){
			var Width      = $(window).width();
			var Height     = $(document).height();
			var $target    = $('#Navi-SP').find('.sp-gnavi');
			var $navi      = $target.find('ul');
			var $navilist  = $navi.find('li');
			var $btn       = $('#Navi-SP').find('.spnavi-btn');
			var $close     = $target.find('.closeBtn');
			
			$target.css({width: Width , height: Height+10000});

			$(window).resize(function(){
			  Width  = $(window).width();
				Height = $(window).height();
				$target.css({width: Width , height: Height+10000});
			});

			$btn.click(function(){
				$target.show();
				return false;
			});
			$close.click(function(){
				$target.hide();
				return false;
			});
		},//spnavi
		
		/*================================
			@ophover
		================================*/
		ophover: function(target,options){
			var c = $.extend({
				type        : 'swap', //swap or opacity
				activeclass : 'active',
				postfix     : '_on',
				duration    : 500,
				easing      : 'easeOutBack'
			}, options);

			$(target).each(function(){
				var $Clone = '';
				$(this).parent().css({'width':$(this).width(),'height':$(this).height(),'overflow':'hidden','display':'block','position':'relative'});
				$Clone = $(this).clone().addClass('clone');
				$(this).css({'position':'absolute','top':'0','left':'0'}).addClass('original');
				var dot = $Clone.attr('src').lastIndexOf('.');
				var imgsrc_ro = $Clone.attr('src').substr(0, dot) + '_on' + $Clone.attr('src').substr(dot, 4);
				$Clone.attr('src',imgsrc_ro).addClass(c.addclass);
				if(c.type == 'swap'){
					$Clone.css({'position':'absolute','top':$(this).height(),'left':'0'});
				}else if(c.type == 'opacity'){
					$Clone.css({'position':'absolute','top':'0','left':'0','opacity':'0'});
				}
				$(this).after($Clone);
			});

			$(target).parent().hover(function(){
				if(!$(this).find('img').hasClass(c.activeclass)){
					if(c.type == 'swap'){
						$(this).find('.original').stop(false,true).animate({'top':'-'+$(this).height()},{duration:c.duration,easing:c.easing});
						$(this).find('.clone').stop(false,true).animate({'top':'0'},{duration:c.duration,easing:c.easing});
					}else if(c.type == 'opacity'){
						$(this).find('img.clone').stop(false,true).animate({'opacity':'1'},{duration:c.duration,easing:'linear'});
					}
				}
			},function(){
				if(!$(this).find('img').hasClass(c.activeclass)){
					if(c.type == 'swap'){
						$(this).find('.original').stop(false,true).animate({'top':'0'},{duration:c.duration,easing:c.easing});
						$(this).find('.clone').stop(false,true).animate({'top':$(this).height()},{duration:c.duration,easing:c.easing});
					}else if(c.type == 'opacity'){
						$(this).find('img.clone').stop(false,true).animate({'opacity':'0'},{duration:c.duration,easing:'linear'});
					}
				}
			});

			$(target).parent().click(function(){
				if(c.type == 'swap'){
					$(this).find('.original').css({'top':'0'});
					$(this).find('.clone').css({'top':$(this).height()});
				}else if(c.type == 'opacity'){
					$(this).find('.clone').css({'opacity':'0'});
				}
			});
		},//ophover

		/*================================
			@sidenavi
		================================*/
		sidenavi: function(){
			var Height    = $(window).height();

			if(Height <= 815){
				$('#Header').css({position:'absolute'});
			}
		},//sidenavi

		/*================================
			@ienavi
		================================*/
		ienavi: function(){
			var Height    = $(window).height();
			var $Target   = $('#Header');
		
			if($.isBrowser('ie', 6)){
				$Target.css({position:'absolute',top:0,height:Height});

				$(window).scroll(function(){
					var y = $(this).scrollTop();
					$Target.css({top:y});
				});
			}

		}//ienavi

	};//$.common


	/**
	 * pagetop 2013.09.24
	 */
	pagetop = function(){
		var target = $('#Pagetop');
		var adjustW = 1180;
		
		var init = function(){
			if($.isBrowser('ie', 6)) return false;
			set();
		}
		
		var set = function(){
			target.css({opacity: 0});
			btnSet();
			$(window).resize(function(){
				btnSet();
			});
			$(window).scroll(function(){
				tween();
			});
		}
		
		var btnSet = function(){
			$winW = $(window).width();
			adjustY = $(window).height() / 3;
			
			if($winW < adjustW){
				target.css({display: 'none'});
			} else {
				target.css({display: 'block'});
			}
		}
		
		var tween = function(){
			var topY = $(window).scrollTop();
			if(topY > adjustY){
				target.stop(true, false).animate({opacity: 1},300);
			} else {
				target.stop(true, false).animate({opacity: 0},300);
			}
		}
			
		return init();
	};


	$(function(){
		pagetop();
		if($.isDevice('sp')){
			$('body').addClass('SP');
			$.common.spnavi();
		} else {
			$.common.sidenavi();
			$.common.ienavi();
			$.common.ophover('img.hover',{type:'opacity',duration:150});
			$.common.footerhover();
//			Library.boxhover($('#Footer .bnr'));
		}
	});
})(jQuery);
