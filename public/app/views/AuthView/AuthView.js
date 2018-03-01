import BaseView from '../BaseView/BaseView.js';
import user from '../../models/User.js';
import './AuthView.scss';
// авторизация юзера
export default class AuthView extends BaseView {
	constructor(parentElement) {
		super(parentElement);

		this.template = require('./AuthView.pug');
		this.title = 'Документы';
	}	
	render(paramsObject) {
		(async () => {
		const authorize = { auth: user.auth }

		this.parentElement.innerHTML = this.template({authorize});
		this.el = this.parentElement.lastElementChild;



		this.el.querySelector('form').addEventListener('submit', async ev => {
			ev.preventDefault();

			const obj = {};
			[...ev.currentTarget.elements].forEach(item => {
				if(item.name.match(/^email|password$/)) return obj[item.name] = item.value;
			});

			if(!obj.email || !obj.password) return;

			let loginMessage = this.el.querySelector('.login__message');

			loginMessage.innerHTML = '<div>ОЖИДАЙТЕ!!</div>';

			try {
				const res = await user.login(obj);	
				window.location = '/';			
			} catch(err) {
				loginMessage.innerHTML = '<div>Неверный логин или пароль!!</div>';				
			}


		});

		this.el.addEventListener('click', async ev => {

			if(ev.target.classList.contains('logout')) {
				user.logout().then(data => {
					window.location.reload();
				});

			}
		});

		return this;
		})();

	}

	submit() {

	}


}



