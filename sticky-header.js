/* exported StickyHeader */

/**
 *    PlumpJS: StickyHeader
 *    MooTools-based sticky header that hides on scroll down and re-shows on scroll up.
 *    Relies on CSS for the show / hide animations, positioning and offsetting the main content.
 * 
 *    Based on https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
 */
 
'use strict';
 
var StickyHeader = new Class({

	Implements : Options,

	options: {
		delta         : 5,
		checkInterval : 250,
		hiddenClass   : 'hide'
	},

	lastScrollTop: 0,
	hasScrolled: false,

	initialize: function(el, options) {
		
		this.el = $(el);
		this.setOptions(options);
		
		// Get header height.
		this.headerHeight = this.el.getSize().y;

		// Add window event listener on scroll.
		window.addEvent('scroll', this.onScroll.bind(this));

		// Create an interval to reduce the cost of the onScroll handler.
		this.checkScroll.periodical(this.options.checkInterval, this);

		// Call the onScrollChange method for initial position.
		this.onScrollChange();
	},

	onScroll: function() {
		this.hasScrolled = true;
	},

	checkScroll: function() {
		// If the page has scrolled, call the scroll change and reset the flag.
		if (this.hasScrolled) {
			this.onScrollChange();
			this.hasScrolled = false;
		}
	},

	onScrollChange: function() {
		var scrollTop = window.getScroll().y;

		// Limit scroll top to counteract iOS / OSX bounce.
		scrollTop = scrollTop.limit(0, window.getScrollSize().y - window.getSize().y);

		// Check against the minimum delta.
		if (Math.abs(this.lastScrollTop - scrollTop) >= this.options.delta) {
			if ((scrollTop > this.lastScrollTop) && (scrollTop > this.headerHeight)) {
				// Scrolling down and beyond the header height.
				this.el.addClass(this.options.hiddenClass);
			} else {
				// Scolling up or header still in view.
				this.el.removeClass(this.options.hiddenClass);
			}

			// Keep the last position up-to-date.
			this.lastScrollTop = scrollTop;
		}

	}

});
