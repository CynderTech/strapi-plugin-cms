const { get } = require('lodash');

const pluginId = require('../../admin/src/pluginId');

module.exports = async (ctx, next) => {
	await next();

	if (get(ctx, 'body.length')) {
		ctx.body = ctx.body.map(strapi.plugins[pluginId].services['media-item'].sanitizeForPublic);
	} else if (get(ctx, 'body.id')) {
		ctx.body = strapi.plugins[pluginId].services['media-item'].sanitizeForPublic(ctx.body);
	}
};
