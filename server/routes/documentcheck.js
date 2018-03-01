const Document = require('../models/document');
const _ = require('lodash');
const rp = require('request-promise');
const config = require('config');

//POST. принимает данные для проверки, проверяет, сохраняет в бд, если норм - отдает id записи, если нет - ошибка
// на вход 'text', 'exceptdomain', 'excepturl'
// выход - {id: id}/{err: true, err_desc: err_desc}

exports.post = async function(ctx, next) {
	const params = _.pick(ctx.request.body, ['text', 'exceptdomain', 'excepturl']);

	if( !(params.text && (params.text.length > 100)) ) {
		ctx.throw(400, {err: true, err_desc: "Fiels text required and him size more 100"});
	}

	
	const userkey = config.userkey;
	params.userkey = userkey;

	const check = await rp({
								uri: 'http://api.text.ru/post',
								method: 'POST',
								form: params,
								json: true
							});

	// console.log(check);
	// console.log(check.text_uid);	

	if(check.err_code) {
		ctx.throw(400, {err: true, err_desc: check.err_desc});
	}


	const paramsuid = {};
	paramsuid.userkey = userkey;
	paramsuid.uid = check.text_uid;
	// console.log(paramsuid);

	


	const textruResponse = new Promise((resolve, reject) => {
		let timerId = setInterval(() => {
				rp({
					uri: 'http://api.text.ru/post',
					method: 'POST',
					form: paramsuid,
					json: true
				}).then(checkResult => {
					// console.log(checkResult);
					if(checkResult.text_unique) {
						clearInterval(timerId);
						resolve(checkResult);
					}			
				});	
			}, 5000);		
	});

	const checkResult = await textruResponse;



	if(checkResult.err_code) {
		ctx.throw(400, {err: true, err_desc: checkResult.err_desc});
	}

	const documentSetting = {
		text: params.text,
		text_uid: check.text_uid,
		exceptdomain: params.exceptdomain || '',
		excepturl:	params.excepturl || '',				
		text_unique: checkResult.text_unique,
		result_json: checkResult.result_json 							
	}

	// console.log(documentSetting);

	const document = new Document(documentSetting);
	try {
		await document.save();	
		ctx.body = {id: document._id };
	} catch(err) {
		throw err;
	}


}
						