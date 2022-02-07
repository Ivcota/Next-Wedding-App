
;(function (root, factory) {
    var pluginName = 'Navigation';

    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    }
	else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    }
	else {
        root[pluginName] = factory(pluginName);
    }
}(this, function (pluginName){

	'use strict';

	var defaults = {
      breakpoint: 992,
		submenuTrigger: "hover",
		overlay: true,
		overlayColor: "rgba(0, 0, 0, 0.7)",
		autoSubmenuIndicator: true,
		submenuIndicatorTrigger: false,
		hideSubWhenClickOut: true,
		scrollMomentum: true,
		scrollSpy: false,
		scrollSpySpeed: 1000,
		scrollSpyOffset: 0,
		landscapeClass: "navigation-landscape",
		onInit: function(){},
		onLandscape: function(){},
		onShowOffCanvas: function(){},
      onHideOffCanvas: function(){}
   };


	// Merge defaults with user options
	var extend = function (target, options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


	// Events namespacing
	var events = {
		on: function on(event, callback, useCapture){
			if(!this.namespaces) // save the namespaces on the DOM element itself
				this.namespaces = {};

			this.namespaces[event] = callback;
			var options = useCapture || false;

			this.addEventListener(event.split('.')[0], callback, options);
			return this;
		},
		off: function off(event, useCapture) {
			if(this.namespaces !== undefined){
				if(this.namespaces[event]){
					this.removeEventListener(event.split('.')[0], this.namespaces[event], useCapture);
					delete this.namespaces[event];
					return this;
				}
			}
		},
		check: function check(event) {
			if(this.namespaces !== undefined){
				if(this.namespaces[event]){
					return true;
				}
				else{
					return false;
				}
			}
		}
	};
	window.on = document.on = Element.prototype.on = events.on;
	window.off = document.off = Element.prototype.off = events.off;
	window.check = document.check = Element.prototype.check = events.check;


	// Check if given element has a parent with the given class
	var closestByClass = function(el, clazz) {
		while(el !== null && el.tagName.toLowerCase() !== "html"){
			if(el.classList.length > 0 && el.classList.contains(clazz)){
				return true
			}
			else{
				el = el.parentNode;
			}
		}
		return false;
	};


	// Return the window's width
	var windowWidth = function(){
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	};


	// Constructor
	function Plugin(element, options) {

      var nav,
		clickEvent = "click.link",
		bigScreenFlag = Number.MAX_VALUE,
      smallScreenFlag = 1,
		hoverEnabled;

		if(element !== null){
			nav = element;
		}
		else{
			return false;
		}

		// Initialize the navigation
		nav.init = function(options){

			nav.options = extend(defaults, options);

			nav.navigationBody = nav.getElementsByClassName("navigation-body")[0];
			nav.menuItems = nav.querySelectorAll(".navigation-item, .navigation-dropdown-item");
			nav.menuLinks = nav.querySelectorAll(".navigation-link, .navigation-dropdown-link");

			var submenus = nav.querySelectorAll(".navigation-dropdown, .navigation-megamenu");
			for (var i = 0; i < submenus.length; i++) {
				submenus[i].className += " navigation-submenu";
				submenus[i].parentNode.className += " has-submenu";
			};

			if(nav.options.autoSubmenuIndicator){
				for(var i = 0; i < nav.menuItems.length; i++){
					if(nav.menuItems[i].classList.contains("has-submenu")){
						var indicator = document.createElement("span");
						indicator.classList.add("submenu-indicator");
						if(nav.menuItems[i].children[1].classList.contains("navigation-dropdown-left")){
							indicator.classList.add("submenu-indicator-left");
						}
						nav.menuItems[i].children[0].appendChild(indicator);
					}
				}
			};

			hoverEnabled = !(matchMedia("(hover: none)").matches);

			navigationMode();
			window.on("resize", navigationMode);

			if(nav.options.overlay){
				nav.overlayPanel = document.createElement("div");
				nav.overlayPanel.classList.add("overlay-panel");
				nav.overlayPanel.style.background = nav.options.overlayColor;
				nav.appendChild(nav.overlayPanel);
				nav.overlayPanel.addEventListener("click", nav.toggleOffcanvas);
			};

			nav.getElementsByClassName("navigation-button-toggler")[0].on("click", function(e){
				e.stopPropagation();
				e.preventDefault();
				nav.toggleOffcanvas();
			});
			nav.getElementsByClassName("navigation-body-close-button")[0].on("click", nav.toggleOffcanvas);

			if(nav.options.hideSubWhenClickOut){
				document.on("touchstart.body", function(e){
					if(closestByClass(e.target, "navigation") === false){
						nav.hideSubmenus("BODY");
					}
				});
				document.on("click.body", function(e){
					if(closestByClass(e.target, "navigation") === false){
						nav.hideSubmenus("BODY");
					}
				});
			};

			var tabs = nav.querySelectorAll(".navigation-tabs");
			if(tabs.length > 0){
				for(var i = 0; i < tabs.length; i++){
					navigationTabs(tabs[i]);
				}
			}

			if(nav.options.scrollMomentum){
				nav.navigationBody.classList.add("scroll-momentum");
			}

			nav.options.onInit.call();

		}


		// Navigation mode
		var navigationMode = function() {
			fixSubmenuRightPositionAll();
			if(windowWidth() < nav.options.breakpoint && bigScreenFlag > nav.options.breakpoint){
				nav.classList.remove(nav.options.landscapeClass);
				nav.hideSubmenus("BODY");
				turnOffEvents();
				if(nav.options.submenuIndicatorTrigger){
					clickIndicators();
				}
				else{
					click(clickEvent);
					clickIndicators();
				}
			}
			if(windowWidth() > nav.options.breakpoint && smallScreenFlag < nav.options.breakpoint){
				if(!nav.classList.contains(nav.options.landscapeClass)){
					nav.className += " " + nav.options.landscapeClass;
				}
				nav.hideSubmenus("BODY");
				turnOffEvents();
				if(
					(nav.options.submenuTrigger === "click") ||
					(navigator.userAgent.match(/Mobi/i)) ||
					(navigator.maxTouchPoints > 1 && hoverEnabled)
				){
					click(clickEvent);
				}
				else{
					hover();
				}
				nav.options.onLandscape.call();
			}
			bigScreenFlag = windowWidth();
			smallScreenFlag = windowWidth();
		};


		// Show the Offcanvas
		nav.toggleOffcanvas = function(){
			if(!nav.classList.contains(nav.options.landscapeClass)){
				if(!nav.navigationBody.classList.contains("is-visible") && !nav.classList.contains(nav.options.landscapeClass)){
					nav.navigationBody.className += " is-visible";
					nav.overlayPanel.classList.add("is-visible");
					nav.options.onShowOffCanvas.call();
				}
				else{
					nav.navigationBody.className += " is-invisible";
					if(!nav.navigationBody.check("transitionend")){
						nav.navigationBody.on("transitionend", function(){
							nav.navigationBody.classList.remove("is-visible");
							nav.navigationBody.classList.remove("is-invisible");
							nav.navigationBody.off("transitionend");
						});
					}
					nav.overlayPanel.className += " is-invisible";
					if(!nav.overlayPanel.check("transitionend")){
						nav.overlayPanel.on("transitionend", function(){
							nav.overlayPanel.classList.remove("is-visible");
							nav.overlayPanel.classList.remove("is-invisible");
							nav.overlayPanel.off("transitionend");
						});
					}
					nav.options.onHideOffCanvas.call();
				}
			}
		};


		// Show a submenu
		nav.showSubmenu = function(el) {
			if(!el.nextElementSibling.classList.contains("is-visible")){
				el.nextElementSibling.className += " is-visible";
			}
			fixSubmenuRightPositionItem(el);
		};


		// Hide an item
		function hide(item, delayMultiplyer){
			setTimeout(function(){
				item.classList.remove("is-visible");
			}, 100 * delayMultiplyer);
		}


		// Hide a submenu
		nav.hideSubmenus = function(el) {
			var submenus;
			if(el === "BODY"){
				submenus = nav.querySelectorAll(".navigation-submenu.is-visible");
			}
			else{
				submenus = el.parentNode.querySelectorAll(".navigation-submenu.is-visible");
			}
			for(var i = submenus.length - 1; i >= 0; i--){
				if(nav.classList.contains(nav.options.landscapeClass)){
				   hide(submenus[i], submenus.length - i);
				}
				else{
				   submenus[i].classList.remove("is-visible");
				}
				submenus[i].parentNode.classList.remove("is-active");
				if(submenus[i].previousElementSibling.getElementsByClassName("submenu-indicator").length > 0){
				   submenus[i].previousElementSibling.lastElementChild.classList.remove("is-active");
				}
			}
		};


		// Click on menu links to show submenus
		var click = function(eventName) {
			for(var i = 0; i < nav.menuLinks.length; i++){
				nav.menuLinks[i].on(eventName, function(e){
					if(e.target.parentNode.classList.contains("has-submenu")){
						e.preventDefault();
						e.stopPropagation();
						if(e.target.parentNode.classList.contains("is-active")){
							e.target.parentNode.classList.remove("is-active");
							if(e.target.getElementsByClassName("submenu-indicator").length > 0){
								e.target.lastElementChild.classList.remove("is-active");
							}
							nav.hideSubmenus(e.target);
						}
						else{
							if(e.target.parentNode.classList.contains("navigation-item")){
								nav.hideSubmenus("BODY");
							}
							e.target.parentNode.className += " is-active";
							if(e.target.getElementsByClassName("submenu-indicator").length > 0){
								e.target.lastElementChild.className += " is-active";
							}
							nav.hideSubmenus(e.target.parentNode);
							nav.showSubmenu(e.target);
							return false;
						}
						if(e.target.getAttribute("target") === "_blank" || e.target.getAttribute("target") === "blank"){
							window.open(e.target.getAttribute("href"));
						}
						else{
							if(e.target.getAttribute("href") === "#" || e.target.getAttribute("href") === "" || e.target.getAttribute("href") === "javascript:void(0)"){
								return false;
							}
							else{
								window.location.href = e.target.getAttribute("href");
							}
						}
					}
				});
			}
		};


		// Click on submenus indicators to show submenus
		var clickIndicators = function() {
			nav.navigationBody.on("click.indicator", function(e){
				if(e.target.classList.length > 0 && e.target.classList.contains("submenu-indicator")){
					e.preventDefault();
					e.stopPropagation();
					if(e.target.classList.contains("is-active")){
						e.target.classList.remove("is-active");
						e.target.parentNode.parentNode.classList.remove("is-active");
						nav.hideSubmenus(e.target.parentNode);
					}
					else{
						if(e.target.parentNode.parentNode.classList.contains("navigation-item")){
							nav.hideSubmenus("BODY");
						}
						e.target.className += " is-active";
						e.target.parentNode.parentNode.classList.add("is-active");
						nav.showSubmenu(e.target.parentNode);
					}
				}
			});
		};


		// Hover on menu items to show submenus
		var hover = function() {
			function getPosition(el) {
				var rect = el.getBoundingClientRect();
				return {
					x:rect.left,
					y:rect.top
				};
			}

			for(var i = 0; i < nav.menuItems.length; i++){
				if(nav.menuItems[i].classList.contains("has-submenu")){
					nav.menuItems[i].on("mouseenter.item", function(e){
						e.preventDefault();
						e.stopPropagation();
						if(e.target.classList.contains("has-submenu")){
							nav.showSubmenu(e.target.firstElementChild);
							e.target.className += " is-active";
						}
					});

					nav.menuItems[i].on("mouseleave.item", function(e){
						e.preventDefault();
						e.stopPropagation();
                  if(e.target.classList.contains("has-submenu")){
                     var coords = getPosition(e.target.lastElementChild);
                     if(
                        (e.clientX < coords.x || e.clientX > coords.x + e.target.lastElementChild.offsetWidth) ||
                        (e.clientY < coords.y || e.clientY > coords.y + e.target.lastElementChild.offsetHeight)
                     ){
                        nav.hideSubmenus(e.target.firstElementChild);
                        e.target.classList.remove("is-active");
                     }
                  }
					});
				}
			}
		};


		// Turn off the events
		var turnOffEvents = function() {
			nav.navigationBody.off("click.indicator");
			for(var i = 0; i < nav.menuItems.length; i++){
				nav.menuItems[i].off("mouseenter.item");
				nav.menuItems[i].off("mouseleave.item");
			}
			for(var i = 0; i < nav.menuLinks.length; i++){
				nav.menuLinks[i].off("click.link");
			}
		};


		// Fix submenu position on right
		var fixSubmenuRightPositionItem = function(el) {
			if(windowWidth() > nav.options.breakpoint){
				var navWidth = nav.navigationBody.offsetWidth;
				if(el.classList.contains("navigation-link")){
					if(el.offsetLeft + el.nextElementSibling.offsetWidth > navWidth){
						el.nextElementSibling.style.right = 0;
					}
					else{
						el.nextElementSibling.style.right = "auto";
					}
				}
			}
		};

		var fixSubmenuRightPositionAll = function() {
			var submenus = nav.navigationBody.querySelectorAll(".navigation-item > .navigation-submenu");
			var navWidth = nav.navigationBody.offsetWidth;
			for(var i = 0; i < submenus.length; i++){
				if(submenus[i].previousElementSibling.offsetLeft + submenus[i].offsetWidth > navWidth){
					submenus[i].style.right = 0;
				}
				else{
					submenus[i].style.right = "auto";
				}
			}
		};


		// Navigation tabs
		var navigationTabs = function(tab) {
			var navs = tab.getElementsByClassName("navigation-tabs-nav-item");
			var panes = tab.getElementsByClassName("navigation-tabs-pane");

			for(var i = 0; i < navs.length; i++){
				navs[i].on("click.tabs", function(e){
					e.preventDefault();
					e.stopImmediatePropagation();
					for(var i = 0; i < navs.length; i++){
						navs[i].classList.remove("is-active");
					}
					e.target.parentNode.classList.add("is-active");
					for(var i = 0; i < panes.length; i++){
						panes[i].classList.remove("is-active");
					}
					panes[getIndex(e.target.parentNode)].classList.add("is-active");
				});
			}

			function getIndex(item) {
				var children = item.parentNode.childNodes;
				var num = 0;
				for (var i = 0; i < children.length; i++) {
					 if(children[i] == item)
						 return num;
					 if(children[i].nodeType == 1)
						 num++;
				}
				return -1;
			};
		};


		//************************
		// Scrollspy functionality
		//************************

		var scrollSpy = function() {

			var links = nav.querySelectorAll(".navigation-link[href*='#']");

			// Adds two numbers together
			var add = function(ex1, ex2) {
				return parseInt(ex1, 10) + parseInt(ex2, 10);
			};


			// Find the elements
			var findElements = function(links) {
				var elements = [];
				for(var i = 0; i < links.length; i++){
					var hash = links[i].getAttribute("href");

					if(hash.length > 1 && hash.substring(0, 1) === "#"){
						var element = document.getElementById(hash.substr(1)),
							top = Math.floor(element.offsetTop),
							bottom = top + Math.floor(element.offsetHeight);
						elements.push({ element: hash, hash: hash, top: top, bottom: bottom });
					}
				}
				return elements;
			};


			// Find our link from a hash
			var findLink = function (links, hash){
				for(var i = 0; i < links.length; i++){
					var link = links[i];
					if(link.getAttribute("href") === hash){
						return link;
					}
				}
			};

			// Reset classes on our elements
			var resetClasses = function (links){
				for(var i = 0; i < links.length; i++){
					var link = links[i];
					link.parentNode.classList.remove("is-active");
				}
			};


			// Smooth scroll
			var smoothScroll = function(destination, duration, easing, callback){

				var easings = {
					linear: function linear(t) {
						return t;
					},
					easeInQuad: function easeInQuad(t) {
						return t * t;
					},
					easeOutQuad: function easeOutQuad(t) {
						return t * (2 - t);
					},
					easeInOutQuad: function easeInOutQuad(t) {
						return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
					},
					easeInCubic: function easeInCubic(t) {
						return t * t * t;
					},
					easeOutCubic: function easeOutCubic(t) {
						return (--t) * t * t + 1;
					},
					easeInOutCubic: function easeInOutCubic(t) {
						return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
					},
					easeInQuart: function easeInQuart(t) {
						return t * t * t * t;
					},
					easeOutQuart: function easeOutQuart(t) {
						return 1 - (--t) * t * t * t;
					},
					easeInOutQuart: function easeInOutQuart(t) {
						return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
					},
					easeInQuint: function easeInQuint(t) {
						return t * t * t * t * t;
					},
					easeOutQuint: function easeOutQuint(t) {
						return 1 + (--t) * t * t * t * t;
					},
					easeInOutQuint: function easeInOutQuint(t) {
						return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
					}
				};

				var start = window.pageYOffset;
				var startTime = "now" in window.performance ? performance.now() : new Date().getTime();
				var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight;
				var destinationOffset = typeof destination === "number" ? destination : destination.offsetTop + nav.options.scrollSpyOffset;
				var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

				if("requestAnimationFrame" in window === false){
					window.scroll(0, destinationOffsetToScroll);
					if(callback){
						callback();
					}
					return;
				}

				function scroll() {
					var now = "now" in window.performance ? performance.now() : new Date().getTime();
					var time = Math.min(1, ((now - startTime) / duration));
					var timeFunction = easings[easing](time);

					if(destinationOffsetToScroll < 0){
						destinationOffsetToScroll = 0;
					}

					window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

					if(window.pageYOffset === destinationOffsetToScroll){
						if(callback){
							callback();
						}
						return;
					}

					requestAnimationFrame(scroll);
				}

				scroll();
			};


			// For each scrollspy instance
			var scrollSpyInit = function(){

				for(var i = 0; i < links.length; i++){
					var link = links[i];

					link.on("click.scrollSpy", function(e){
						if(!e.target.classList.contains("submenu-indicator") && e.target.getAttribute("href").length > 1 && e.target.getAttribute("href").substring(0, 1) === "#"){
							var target = e.target.getAttribute("href"),
								section = document.getElementById(target.replace("#", ""));
							if(target.length > 0){
								smoothScroll(document.querySelector(target), nav.options.scrollSpySpeed, "easeInOutCubic");
							}
						}
					});
				}

				var elements = findElements(links);

				window.on("resize.scrollSpy", function(){
					elements = [];
					elements = findElements(links);
				});

				window.on("scroll.scrollSpy", function(){
					var position = {
						top: add(this.pageYOffset, Math.abs(nav.options.scrollSpyOffset)),
						left: this.pageXOffset
					};

					var link;

					for(var i = 0; i < elements.length; i++){
						var current = elements[i];

						if(position.top >= current.top && position.top < current.bottom){
							var hash = current.hash;

							link = findLink(links, hash);

							if(link){
								resetClasses(links);
								link.parentNode.classList.add("is-active");
								break;
							}
						}
					}
				});
			};

			scrollSpyInit();

		}

		nav.init(options);

		if(nav.options.scrollSpy){
			window.onload = function(){
				scrollSpy();
			}
		}

		return nav;
    };

    return Plugin;

}));
