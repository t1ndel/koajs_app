const mongoose = require('./libs/mongoose');
const User = require('./models/user');

// для регистрации нужно установить параметры displayName, email, password, salt.

// запустить либо через консоль и ввести данные, либо в userDate руками добавить данные для реги, например
// const userDate = {displayName: '3admin', email: '3admin@mail.ru', password: '12345', salt: 'privet'}

const userDate = {}




function validationHelper(obj) {
	let keys = Object.keys(obj);
	return keys.length && keys.every(item => {
			return item.match(/^displayName|email|password|salt$/i);
	});
}



if(!validationHelper(userDate)) {

	process.argv.slice(2).forEach(item => {
		const arr = item.split('=');
		userDate[arr[0]] = arr[1];
	});

	if(!validationHelper(userDate)) {
		console.log('Не все данные введены(нужны displayName,email,password,salt)')
		return;
	}

}


const user = new User(userDate);

user.save()
	.then(resolve => {
		console.log(`Юзер ${userDate.displayName} зареган`);
		process.exit()
	})
	.catch(err => {
		console.error('Ошибка');
		console.error(err);
		process.exit();
	});