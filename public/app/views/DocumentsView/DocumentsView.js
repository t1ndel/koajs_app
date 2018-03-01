import BaseView from '../BaseView/BaseView.js';
import document from '../../models/Document.js';
import './DocumentsView.scss';
// просмотр отдельного документа
export default class DocumentsView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./DocumentsView.pug');
		this.title = 'Документы';
	}	
	render(paramsObject) {
		(async () => {
		const res = await document.documentList(paramsObject.page);
		const paginInfo = await document.getPaginationInfo();
		paginInfo.currentPage = paramsObject.page || 1;

		this.parentElement.innerHTML = this.template({documents: res, paginationInfo: paginInfo});
		this.el = this.parentElement.lastElementChild;
		return this;
		})();

	}


}



