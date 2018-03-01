import Http from '../modules/Http.js';
// модель юзера
export default new class User {
	constructor() {
		this.baseUrl = 'http://localhost:90';
		this.auth = '';

	}
	// email, password
	login(obj = {}) {
		return Http.send(`${this.baseUrl}/api/login`,'POST', obj);
	}	

	logout() {
		return Http.send(`${this.baseUrl}/api/logout`,'POST');
	}	

	isAuth() {

		if(this.auth) {
			return Promise.resolve({authorize: this.auth })
		}
		return Http.send(`${this.baseUrl}/api/isauth`,'get').then(data => {
			this.auth = data.authorize;
			return data;
		});		
	}
}