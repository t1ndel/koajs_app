let Document = require('../models/document');
const _ = require('lodash');
const config = require('config');
//GET. принимает номер страницы. количество статей на странице в config.countDocOnPage
// ищет список записей
// отдает список записей
exports.get = async function(ctx, next) {
	const params = ctx.params;
	const count = config.countDocOnPage;
	
	let offset = !isNaN(parseFloat(params.num)) && isFinite(params.num) ? ~~params.num : 1;
	offset = (offset * count) - count;

	// console.log(offset);

	const result = await Document.aggregate([
			{ $skip: offset },
			{ $limit: count }
		]).exec();

	ctx.body = result;




}
						