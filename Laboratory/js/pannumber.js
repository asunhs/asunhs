function PanNumber(id) {
	if (!(this instanceof PanNumber)) {
		return new PanNumber();
	}

	/* private method */
	var _getInputBox = function() {
		var input = document.createElement("input");
		input.setAttribute("size",2);
		input.setAttribute("maxlength",4);
		
		return input;
	}

	var _init = function(div, input) {
		while (div.hasChildNodes()) {
			div.removeChild(div.firstChild);
		}
		
		div.appendChild(input[0]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[1]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[2]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[3]);
	};
	/* private method */
	
	
	
	/* private */
	this.id = id;
	this.div = document.getElementById(this.id);
	this.input = [
		_getInputBox()
		, _getInputBox()
		, _getInputBox()
		, _getInputBox()
	];
	/* private */
	
	
	/* public method */
	this.init = function() {
		_init(this.div, this.input);
	}
	/* public method */
	
	
	_init(this.div, this.input);
}