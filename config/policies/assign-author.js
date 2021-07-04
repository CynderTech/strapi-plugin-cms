const { get, set } = require('lodash');

const pluginId = require('../../admin/src/pluginId');

module.exports = async (ctx, next) => {
	if (!strapi.plugins[pluginId].services['media-item'].isAdminUser(ctx)) {
		const userId = get(ctx, 'state.user.id');

		if (ctx.is('multipart')) {
			set(ctx, 'data.author', userId);
		} else {
			set(ctx, 'request.body.author', userId);
		}
	}

	next();
};
