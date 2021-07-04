const { get } = require('lodash');

const pluginId = require('../../admin/src/pluginId');

module.exports = async (ctx, next) => {
	const { id } = ctx.params;

	if (strapi.plugins[pluginId].services['media-item'].isAdminUser(ctx)) {
		await next();
	} else {
		let entity;

		if (!Number.isNaN(Number(id))) {
			entity = await strapi.plugins[pluginId].services['media-item'].findOne({ id });
		} else {
			entity = await strapi.plugins[pluginId].services['media-item'].findOne({ slug: id });
		}

		if (entity) {
			if (get(ctx, 'state.user.id') === get(entity, 'author.id')) {
				await next();
			} else {
				ctx.forbidden();
			}
		}
	}
};
