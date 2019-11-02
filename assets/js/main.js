(function($) {

	"use strict";

	var App = {

		win: $(window),
		ww: window.innerWidth,
		wh: window.innerHeight,


		init: function() {
			App.inline_nav();
			App.overlay_nav();
			App.heros();
			App.shortcodes();

			$('.works_thumbs').css('min-height', App.wh - $('.site_header').innerHeight() + 'px');

			App.win.on('load', function() {
				$('body').waitForImages({
					finished: function() {
						setTimeout(function() {
							$('.site_loading').addClass('hide');

							App.trigger();
							App.entry_hover_effects();
							App.gallery();
							App.skills();
							App.contact_form();
						}, 1000);
					},
					waitForAll: true
				});
			});

			App.win.on('resize', function() {
				App.ww = window.innerWidth;
				App.wh = window.innerHeight;

				App.inline_nav();
				App.heros();

				$('.works_thumbs').css('min-height', App.wh - $('.site_header').innerHeight() + 'px');
				$('.site_header .search').removeClass('visible');
				$('.gallery_preview .frame').css('height', (App.wh - 160) + 'px');
				$('.gallery_preview img').css({
					'margin-top': ($('.gallery_preview .frame').height() - $('.gallery_preview img').height()) / 2
				});
			});
		},


		inline_nav: function() {
			$('.nav.inline_nav .menu li:has(ul)').children('ul').hide();

			if (App.ww > 800) {
				$('.nav.inline_nav').show();
				$('.site_header .mobile_trigger').removeClass('close');
				$('.site_header .mobile_trigger, .mobile_nav').hide();

				$('.nav.inline_nav .menu li:has(ul)').off('mouseenter mouseleave');
				$('.nav.inline_nav .menu li:has(ul)').find('a').off('click');

				$('.nav.inline_nav .menu li:has(ul)').on('mouseenter mouseleave', function() {
					$(this).find('ul:first').stop().slideToggle(250);
				});

				$('.nav.inline_nav .menu li:has(ul)').find('a').on('click', function() {
					var parent = $(this).parent();

					if (parent.children('ul').length == 0) {
						return true;
					} else {
						return false;
					}
				});
			} else {
				$('.nav.inline_nav').hide();
				$('.site_header .mobile_trigger').show();

				$('.mobile_nav .menu li:has(ul)').off('mouseenter mouseleave');
				$('.mobile_nav .menu li:has(ul)').find('a').off('click');

				$('.mobile_nav .menu li:has(ul)').find('a').on('click', function() {
					var parent = $(this).parent(),
						submenu = $(this).next('ul');

					if (submenu.is(':visible')) {
						parent.find('ul').slideUp(250);
					}

					if (submenu.is(':hidden')) {
						parent.siblings().find('ul').slideUp(250);
						submenu.css('height', 'auto').slideDown(250);
					}

					if (parent.children('ul').length == 0) {
						return true;
					} else {
						return false;
					}
				});
			}
		},
		overlay_nav: function() {
			$('.nav.overlay_nav .menu li:has(ul)').children('ul').hide();

			$('.overlay_nav .menu li:has(ul)').find('a').on('click', function() {
				var parent = $(this).parent(),
					submenu = $(this).next('ul');

				if (submenu.is(':visible')) {
					parent.find('ul').slideUp(250);
				}

				if (submenu.is(':hidden')) {
					parent.siblings().find('ul').slideUp(250);
					submenu.css('height', 'auto').slideDown(250);
				}

				if (parent.children('ul').length == 0) {
					return true;
				} else {
					return false;
				}
			});

			$('.site_header .overlay_trigger').on('click', function() {
				$('.nav.overlay_nav').addClass('visible');
			});

			$('.nav.overlay_nav .close').on('click', function() {
				$('.nav.overlay_nav').removeClass('visible');
			});
		},
		trigger: function() {
			$('.site_header .mobile_trigger').on('click', function() {
				$('.site_header .mobile_trigger').toggleClass('close');
				$('.mobile_nav').html($('.nav.inline_nav').html());
				$('.mobile_nav').slideToggle('fast');
				App.inline_nav();
			});

			$('.search_toggle').on('click', function() {
				$('.site_header .search').addClass('visible');
				$('#search_form input.search_form_field').focus();
			});

			$('.site_header .search .close').on('click', function() {
				$('.site_header .search').removeClass('visible');
			});
		},


		heros: function() {
			$('.hero').each(function() {
				var $this = $(this);

				$this.css('position', 'relative');

				if ($this.hasClass('full')) {
					$this.css('height', App.wh + 'px');
				} else {
					$this.css('height', (App.wh - $('.site_header').innerHeight()) + 'px');
				}
			});
		},


		entry_hover_effects: function() {
			$('.entry').each(function() {
				var $this = $(this);

				$this.on('mouseenter', function() {
					if ($this.hasClass('entry_fade')) {
						var fade = '<div class="content">';
						fade += '<div class="cat">' + $this.data('cat') + '</div>';
						fade += '<div class="title">' + $this.data('title') + '</div>';
						fade += '</div>';

						$('.entry_fade_content').html(fade);
						$('.entry_fade_content').addClass('visible');

						$('.entry').stop().animate({
							opacity: 0.3
						}, 200);

						$this.stop().animate({
							opacity: 1
						}, 200);
					}

					if ($this.hasClass('entry_hover')) {
						var hover = '<div class="cat">' + $this.data('cat') + '</div>';
						hover += '<div class="title">' + $this.data('title') + '</div>';

						$('.entry_hover_content').html(hover);
						$('.entry_hover_content').addClass('visible');

						$(document).on('mousemove', function(e) {
							$('.entry_hover_content').css({
								left: e.clientX - 10,
								top: e.clientY + 25
							});
						});
					}
				}).on('mouseleave', function() {
					$('.entry_hover_content').removeClass('visible');
					$('.entry_fade_content').removeClass('visible');

					$('.entry').stop().animate({
						opacity: 1
					}, 200);
				});
			});

			$('.works_thumbs_list li a').on('mouseenter', function() {
				var thumb = $(this).data('thumb');

				$('.works_thumbs .thumbs').css({
					'background-image': 'url(' + thumb + ')',
					'background-size': 'cover',
					'background-position': 'center center',
					'background-repeat': 'no-repeat'
				});

				$('.works_thumbs .thumbs').addClass('visible');

				$('.works_thumbs_list li a').stop().animate({
					'opacity': 0.2
				}, 200);

				$(this).stop().animate({
					'opacity': 1
				});
			}).on('mouseleave', function() {
				$('.works_thumbs .thumbs').removeClass('visible');

				$('.works_thumbs_list li a').stop().animate({
					'opacity': 1
				}, 200);
			});
		},


		gallery: function() {
			$('.gallery_link').on('click', function(e) {
				var img = $(this).attr('href'),
					title = $(this).data('title'),
					current = $('.gallery_link').index($(this)),
					total = $('.gallery_link').length,
					frame_height = App.wh - 160;

				var meta = '<div class="meta">';
				meta += '<span class="title">' + title + '</span>';
				meta += '<div class="close"><span></span></div>';
				meta += '</div>';

				var frame = '<div class="frame" style="height:' + frame_height + 'px">';
				frame += '<img src="' + img + '">';
				frame += '</div>';

				var nav = '<div class="nav">';
				nav += '<div class="prev"><span></span></div>';
				nav += '<div class="next"><span></span></div>';
				nav += '</div>';

				$.magnificPopup.open({
					items: {
						src: '<div class="gallery_preview">' + meta + frame + nav + '</div>',
						type: 'inline'
					}
				});

				$('.gallery_preview img').css({
					'margin-top': ($('.gallery_preview .frame').height() - $('.gallery_preview img').height()) / 2
				});

				$('.gallery_preview .close').on('click', function() {
					$.magnificPopup.instance.close();
				});

				if (current == 0) {
					$('.gallery_preview .nav .prev').addClass('disabled');
				}

				if (current == total - 1) {
					$('.gallery_preview .nav .next').addClass('disabled');
				}

				$('.gallery_preview .nav .next').on('click', function() {
					if (current < total - 1) {
						current++;

						var i = $('.gallery_link').eq(current);
						img = i.attr('href');
						title = i.data('title');

						$('.gallery_preview .meta .title').text(title);
						$('.gallery_preview .frame img').attr('src', img);

						$('.gallery_preview img').css({
							'margin-top': ($('.gallery_preview .frame').height() - $('.gallery_preview img').height()) / 2
						});

						if (current == total - 1) {
							$(this).addClass('disabled');
						}

						if (!current == 0) {
							$('.gallery_preview .nav .prev').removeClass('disabled');
						}
					}
				});

				$('.gallery_preview .nav .prev').on('click', function() {
					if (current > 0) {
						current--;

						var i = $('.gallery_link').eq(current);
						img = i.attr('href');
						title = i.data('title');

						$('.gallery_preview .meta .title').text(title);
						$('.gallery_preview .frame img').attr('src', img);

						$('.gallery_preview img').css({
							'margin-top': ($('.gallery_preview .frame').height() - $('.gallery_preview img').height()) / 2
						});

						if (current == 0) {
							$(this).addClass('disabled');
						}

						if (current < total) {
							$('.gallery_preview .nav .next').removeClass('disabled');
						}
					}
				});

				e.preventDefault();
			});
		},


		skills: function() {
			App.win.on('scroll', function() {
				var scroll = $(this).scrollTop();

				$('.skills').each(function() {
					if ($(this).offset().top < (scroll + App.wh)) {
						var skill = $(this).find('.skill');

						skill.each(function(i) {
							$(this).delay(i * 50).queue(function(next) {
								var bar = $(this).find('.skill_bar_percent');

								if (!bar.hasClass('animated')) {
									bar.addClass('animated');

									bar.animate({
										'width': bar.data('percent') + '%'
									});

									next();
								}
							});
						});
					}
				});
			}).scroll();
		},


		contact_form: function() {
			$('#contact-form').on('submit', function() {
				var action = $(this).attr('action');

				$('#contact-messages').slideUp(500, function() {

					$('#contact-messages').hide();
					$('#submit').attr('disabled', 'disabled');

					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comment: $('#comment').val()
					}, function(data) {
						document.getElementById('contact-messages').innerHTML = data;
						$('#contact-messages').slideDown(500);
						$('#submit').removeAttr('disabled');
						if (data.match('success') != null)
							$('#contact-form').slideUp(500);
					});

				});

				return false;
			});
		},


		shortcodes: function() {
			// backgrounds
			$('[data-bg]').each(function() {
				var bg = $(this).data('bg');

				$(this).css({
					'background-image': 'url(' + bg + ')',
					'background-size': 'cover',
					'background-position': 'center center',
					'background-repeat': 'no-repeat'
				});
			});

			$('[data-bg-color]').each(function() {
				var bg = $(this).data('bg-color');

				$(this).css('background-color', bg);
			});

			// back to top
			$('.to_top').on('click', function() {
				$('html, body').animate({
					scrollTop: 0
				}, 300);
			});

			// owl slider
			$('.slider').each(function() {
				var slider = $(this),
					dots = slider.data('dots') == true ? 1 : 0,
					arrows = slider.data('arrows') == true ? 1 : 0,
					items = typeof(slider.data('items')) !== "undefined" ? parseInt(slider.data('items'), 10) : 1,
					margin = typeof(slider.data('margin')) !== "undefined" ? parseInt(slider.data('margin'), 10) : 0;

				slider.owlCarousel({
					autoplay: true,
					smartSpeed: 500,
					items: items,
					loop: true,
					nav: arrows,
					dots: dots,
					margin: margin,
					navText: ['', '']
				});
			});
		}

	}

	App.init();

})(jQuery);
