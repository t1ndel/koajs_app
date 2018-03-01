import './NotFoundView.scss';
import BaseView from '../BaseView/BaseView.js';
// при обращении к несуществующему url будет использоваться этот вид
export default class NotFoundView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./NotFoundView.pug');
	}	
	render() {
		this.parentElement.innerHTML = this.template();
		this.el = this.parentElement.lastElementChild;
		return this;
	}

}
