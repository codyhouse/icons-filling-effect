(function(){
	function IconsFilling( element ) {
		this.element = element;
		this.blocks = this.element.getElementsByClassName("js-cd-service");
		this.update();
	};

	IconsFilling.prototype.update = function() {
		if ( !"classList" in document.documentElement ) {
			return;
		}
		this.selectBlock();
		this.changeBg();
	};

	IconsFilling.prototype.selectBlock = function() {
		for(var i = 0; i < this.blocks.length; i++) {
			( this.blocks[i].getBoundingClientRect().top < window.innerHeight/2 ) ? this.blocks[i].classList.add("cd-service--focus") : this.blocks[i].classList.remove("cd-service--focus");
		}
	};

	IconsFilling.prototype.changeBg = function() {
		removeClassPrefix(this.element, 'cd-icons-filling--new-color-');
		this.element.classList.add('cd-icons-filling--new-color-' + (Number(this.element.getElementsByClassName("cd-service--focus").length) - 1));
	};

	var iconsFillingContainer = document.getElementsByClassName("js-cd-icons-filling"),
		iconsFillingArray = [],
		scrolling = false;
	if( iconsFillingContainer.length > 0 ) {
		for( var i = 0; i < iconsFillingContainer.length; i++) {
			(function(i){
				iconsFillingArray.push(new IconsFilling(iconsFillingContainer[i]));
			})(i);
		}

		//update active block on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkIconsFilling, 250) : window.requestAnimationFrame(checkIconsFilling);
			}
		});
	}

	function checkIconsFilling() {
		iconsFillingArray.forEach(function(iconsFilling){
			iconsFilling.update();
		});
		scrolling = false;
	};

	function removeClassPrefix(el, prefix) {
		//remove all classes starting with 'prefix'
        var classes = el.className.split(" ").filter(function(c) {
            return c.indexOf(prefix) < 0;
        });
        el.className = classes.join(" ");
	};
})();