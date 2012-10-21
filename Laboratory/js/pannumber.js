function PanNumber(id, type) {
	if (!(this instanceof PanNumber)) {
		return new PanNumber();
	}

	if (type == undefined || type === "") {
		type = "nonblock";
	}

	/* private method */
	var _getInputBox = function() {
		var input = document.createElement("input");
		input.setAttribute("size",2);
		input.setAttribute("maxlength",4);
		
		return input;
	}
	
	var _getKeyDownFunc = function(index, input) {
		return function(e) {
			if(e.preventDefault){
		        e.preventDefault(); //FF
		    } else {
		        e.returnValue = false; //IE
		    }
		    
		    input[index].value += String.fromCharCode(e.which);
		    
		    if (index != input.length-1) {
			    if (input[index].value.length >= 4
			    	&& (e.which != 8)) {
			    	input[index+1].focus();
			    }
		    }
		    if (index != 0) {
		    	if (input[index].value.length == 0 && e.which == 8) {
		    		input[index-1].focus();
		    		input[index-1].value = input[index-1].value.substring(0, input[index-1].value.length-1);
		    	}
		    }
		};
	}
	
	var _initNonBlockType = function(div, input) {
		while (div.hasChildNodes()) {
			div.removeChild(div.firstChild);
		}

		input[0].onkeydown = _getKeyDownFunc(0, input);
		input[1].onkeydown = _getKeyDownFunc(1, input);
		input[2].onkeydown = _getKeyDownFunc(2, input);
		//input[0].onkeydown = _getKeyDownFunc(0, input);
		
		div.appendChild(input[0]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[1]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[2]);
		div.appendChild(document.createTextNode("-"));
		div.appendChild(input[3]);
	}

	var _init = function(div, input, type) {
		if (type === "nonblock") {
			_initNonBlockType(div, input);
		}
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
	this.init = function(type) {
		_init(this.div, this.input, type);
	}
	/* public method */
	
	
	_init(this.div, this.input, type);
}