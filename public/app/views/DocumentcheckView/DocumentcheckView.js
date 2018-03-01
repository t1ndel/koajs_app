import BaseView from '../BaseView/BaseView.js';
import document from '../../models/Document.js';
import './DocumentcheckView.scss';
// вид для проверки документа
export default class DocumentcheckView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./DocumentcheckView.pug');
		this.title = 'Документы';
	}	
	render(paramsObject) {
		(async () => {
		this.parentElement.innerHTML = this.template();
		this.el = this.parentElement.lastElementChild;



		this.el.querySelector('form').addEventListener('submit', async ev => {
			ev.preventDefault();

			const obj = {};
			[...ev.currentTarget.elements].forEach(item => {
				if(item.name.match(/^text|exceptdomain|excepturl$/)) return obj[item.name] = item.value;
			});

			if(!obj.text) return;

			const messageBox = this.el.querySelector('.documentcheck__message');
			messageBox.innerHTML = 'ОЖИДАЙТЕ(секунд 10, потом будет редирект на стр. записи)';



			try {
				const res = await document.documentCheck(obj);
				if(res.id) window.location = 'document?id=' + res.id;				
			} catch(err) {
				messageBox.innerHTML = 'Ошибка';		
			}




		});

		return this;
		})();

	}

	submit() {

	}


}



