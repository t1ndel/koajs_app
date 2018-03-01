let Document = require('../models/document');
const _ = require('lodash');


// POST. сохранение данных
// принимает 'text', 'text_uid', 'exceptdomain', 'excepturl', 'text_unique', 'json_rusult'
//сохраняет
//отдает {id: id }, если успех, {error: true, message: ""}, если ошибка 

exports.post = async function(ctx, next) {
	const params = _.pick(ctx.request.body, ['text', 'text_uid', 'exceptdomain', 'excepturl', 'text_unique', 'json_rusult']);


	if(!(params.text && (params.text.length > 100))) {
		ctx.throw(400, {err: true, err_desc: "Fiels text required and him size more 100"});
	}

	const document = new Document(params);
	ctx.body = {id: document._id};
	try {
		document.save();		
	} catch(err) {
		throw err;
	}
}

// GET. принимает id
//ищет запись
//отдает запись или error, message

exports.get = async function(ctx, next) {
	const params = ctx.params;

	try {
		const doc = await Document.findById(params.num);	
		ctx.body = doc;	
	} catch(err) {
		ctx.status = 404;
		ctx.body = {error: true, message: "Not Found"}
	}


}