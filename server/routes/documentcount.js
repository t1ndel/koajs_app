let Document = require('../models/document');
const _ = require('lodash');
// принимает /num, отдает кол-во записей  {count: count}
exports.get = async function(ctx, next) {
	const count = await Document.count();
	ctx.body = {count: count}
}
