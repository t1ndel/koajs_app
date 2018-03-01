import BaseView from '../BaseView/BaseView.js';
import document from '../../models/Document.js';
import './DocumentView.scss';
 
export default class DocumentView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./DocumentView.pug');
		this.title = 'Документы';
	}	
	render(paramsObject) {
		(async () => {
		console.log(paramsObject.id);
		const res = await document.getDocument(paramsObject.id);


		this.parentElement.innerHTML = this.template({document: res});
		this.el = this.parentElement.lastElementChild;
		return this;
		})();

	}


}



