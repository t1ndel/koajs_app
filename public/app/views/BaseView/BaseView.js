export default class BaseView {

	constructor(parentElement) {
		this.parentElement = parentElement;
 
	}

	start(paramsObject) {
		this.render(paramsObject);
		document.title = this.title || window.location.href;
		return this;  
	}

	render() {}

	resume() { 
		this.show();
		return this;
	 }

	pause() { 
		this.hide();
		return this;
	}

	hide() { 
		if(this.el) {
			this.el.setAttribute('hidden','hidden');
			return this;			
		}
	}

	show() { 
		if(this.el) {
			this.el.removeAttribute('hidden');
			return this;
		}
	}

	getElem() { return this.el}
}