let Document = require('../models/document');
const _ = require('lodash');
const config = require('config');
// GET. отдает кол-во записей, 
// {count: count, countDocOnPage: countDocOnPage}
exports.get = async function(ctx, next) {
	const count = await Document.count();
	paginationInfo = {count: count}
	paginationInfo.length = config.countDocOnPage;
	ctx.body = paginationInfo;
}
