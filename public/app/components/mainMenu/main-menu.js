import mainmenuTemplate from './main-menu.pug';
import './main-menu.scss';

export default class MainMenu {
	constructor(data) {
		this.render(data);
	}

	render(data) {
		let elem = document.createElement('div');
		elem.innerHTML = mainmenuTemplate(data);
		this.el = elem.lastElementChild;

	}

	getElem() {
		return this.el;
	}
}