
// роутер, обрабатывает клики по ссылкам(ловит их на this.rootElem), событие popstate, смотрит path и показывает
// вид, зареганный на этот роут, если такой есть, иначе this.page404
// При этом юзер должен быть обязательно авторизирован, иначе идет редирект на /login,
export default new class Router {


	constructor() {

		this.routes = {};
		this.currentView = null;

		this.rootElem = document.body;

	}

	getPathsearch(location) {
		return '/' + location.href.split('/').slice(-1);
	}

	// инициализирует роутер
	start() {

		this.rootElem.addEventListener('click', ev => {
			const target = ev.target;

			if(target.tagName.toLowerCase() !== 'a') return;

			if(target.getAttribute('target') === '__blank') return;


			ev.preventDefault();
			this.go(this.getPathsearch(target));
			


		});

		window.addEventListener('popstate', ev => {
			this.go(this.getPathsearch(window.location));
		});

		this.go(this.getPathsearch(window.location));

	}
	// принимает путь с параметрами, рендерит вид, зареганый на этот путь и передает ему параметры

	go(route) {

        let [path, getParamsString] = route.split('?');
        const getParamsObject = (getParamsString) ? JSON.parse(`{"${getParamsString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`) : {};


		if(!this.routes[path]) {
			if(this.page404) {
				this.currentView = this.page404;
				this.page404.start(getParamsObject);	
				return;			
			} else return;

		}
		let view = this.routes[path];

		let u = window.location.pathname + (window.location.search == '/' ? '' : window.location.search);

		if(u !== route) {
			window.history.pushState({}, '', route);
		} 

		if(this.currentView) this.currentView.pause();

		this.currentView = view;

		// проверка авторизированности юзера, чтобы заработала, нужно установить в свойство
		// user объект юзера
		if(this.user && !this.user.auth && window.location.pathname !== '/login') { 
			window.location = '/login'; 
			return; 
		}

		view.start(getParamsObject);


	}

	register(routesViews) {
		Object.assign(this.routes, routesViews);
		return this;
	}

    back() {
        window.history.back();
    }	

    setNotFoundPage(view) {
        this.page404 = view;
    }

    setUser(user) {
    	this.user = user;
    }

}