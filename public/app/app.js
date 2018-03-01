

import LayoutView from './views/LayoutView/LayoutView.js';



import DocumentsView from './views/DocumentsView/DocumentsView.js';
import DocumentView from './views/DocumentView/DocumentView.js';
import DocumentcheckView from './views/DocumentcheckView/DocumentcheckView.js';
import AuthView from './views/AuthView/AuthView.js';

import NotFoundView from './views/NotFoundView/NotFoundView.js';


import user from './models/User.js' 


import Http from './modules/Http.js';

import router from './modules/Router.js';

const layout = new LayoutView(document.body);
layout.start();
const layoutMainBlock = layout.getMainBlock();

const documents = new DocumentsView(layoutMainBlock);
const doc = new DocumentView(layoutMainBlock);

const authview = new AuthView(layoutMainBlock);

const doccheck = new DocumentcheckView(layoutMainBlock);

const notfound = new NotFoundView(layoutMainBlock);

router.setUser(user);
router.setNotFoundPage(notfound);


(async () => {
	await user.isAuth();

	router
		.register({
			'/': documents,
			'/documents': documents,
			'/document': doc,
			'/documentcheck': doccheck,
			'/login': authview
		})
		.start();


})();









// (async () => {
// 	const user = new User;
// 	const res = await user.login({
// 		email: 'admin@mail.ru',
// 		password: '12345'
// 	});	
// 	// const result = await user.logout();

// 	const result = await user.isAuth();

// 	console.log(result);

// })()



