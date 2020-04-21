// https://gomakethings.com/how-to-create-your-own-vanilla-js-dom-manipulation-library-like-jquery/
var $ = (function () {

	'use strict';

	/**
	 * Create the constructor
	 * @param {String} selector The selector to use
	 */
	var Constructor = function (selector) {
		if (!selector) return;
		if (selector === 'document') {
			this.elems = [document];
		} else if (selector === 'window') {
			this.elems = [window];
		} else {
			this.elems = document.querySelectorAll(selector);
		}
	};

	/**
	 * Do ajax stuff
	 * @param  {String} url The URL to get
	 */
	Constructor.prototype.ajax = function (url) {
		// Do some XHR/Fetch thing here
		console.log(url);
	};

	/**
	 * Run a callback on each item
	 * @param  {Function} callback The callback function to run
	 */
	Constructor.prototype.each = function (callback) {
		if (!callback || typeof callback !== 'function') return;
		for (var i = 0; i < this.elems.length; i++) {
			callback(this.elems[i], i);
		}
		return this;
	};

	/**
	 * Add a class to elements
	 * @param {String} className The class name
	 */
	Constructor.prototype.addClass = function (className) {
		this.each(function (item) {
			item.classList.add(className);
		});
		return this;
	};

	/**
	 * Remove a class to elements
	 * @param {String} className The class name
	 */
	Constructor.prototype.removeClass = function (className) {
		this.each(function (item) {
			item.classList.remove(className);
		});
		return this;
	};




	Constructor.prototype.tap = function (callback) {

	    // Make sure a callback is provided
	    if ( !callback || typeof(callback) !== 'function' ) return;

	    // Variables
	    var isTouch, startX, startY, distX, distY;

	    /**
	     * touchstart handler
	     * @param  {event} event The touchstart event
	     */
	    var onTouchStartEvent = function (event) {
	        // Disable click event
	        isTouch = true;

	        // Get the starting location and time when finger first touches surface
	        startX = event.changedTouches[0].pageX;
	        startY = event.changedTouches[0].pageY;
	    };

	    /**
	     * touchend handler
	     * @param  {event} event The touchend event
	     */
	    var onTouchEndEvent = function (event) {

	        // Get the distance travelled and how long it took
	        distX = event.changedTouches[0].pageX - startX;
	        distY = event.changedTouches[0].pageY - startY;

	        // If a swipe happened, do nothing
	        if ( Math.abs(distX) >= 7 || Math.abs(distY) >= 10 ) return;

	        // Run callback
	        callback(event);

	    };

	    /**
	     * click handler
	     * @param  {event} event The click event
	     */
	    var onClickEvent = function (event) {
	        // If touch is active, reset and bail
	        if ( isTouch ) {
	            isTouch = false;
	            return;
	        }

	        // Run our callback
	        callback(event);
	    };

	    // Event listeners
			this.each(function (item) {
				item.addEventListener('touchstart', onTouchStartEvent, false);
		    item.addEventListener('touchend', onTouchEndEvent, false);
		    item.addEventListener('click', onClickEvent, false);
			});
			return this;
	};






	/**
	 * Instantiate a new constructor
	 */
	var instantiate = function (selector) {
		return new Constructor(selector);
	};

	/**
	 * Return the constructor instantiation
	 */
	return instantiate;

})();
