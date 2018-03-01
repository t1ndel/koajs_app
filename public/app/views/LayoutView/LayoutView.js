import Menu from '../../components/mainMenu/main-menu.js';
import './LayoutView.scss';
import BaseView from '../BaseView/BaseView.js';

const data = {
				items: [
					{
						title: 'Проверить документ',
						path: '/documentcheck'
					},
					{
						title: 'Архив проверок',
						path: '/documents'
					},
					{
						title: 'Вход/выход',
						path: '/login'
					},					
				]
			};

// макет
export default class LayoutView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./LayoutView.pug');
	}
	render() {
		this.parentElement.innerHTML = this.template();
		this.el = this.parentElement.lastElementChild;

		this.el.querySelector('.layout__main-menu').appendChild((new Menu(data)).getElem());

	}
	getMainBlock() {
		return this.el.querySelector('.layout__main');
	}

}