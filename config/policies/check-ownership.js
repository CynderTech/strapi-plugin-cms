const { get } = require('lodash');

const pluginId = require('../../admin/src/pluginId');

module.exports = async (ctx, next) => {
	const { id } = ctx.params;
	const isAdminUser =
		get(process, 'env.ADMIN_ROLE_WHITELIST', 'super_admin,admin').indexOf(
			get(ctx, 'state.user.role.type'),
		) !== -1;

	if (isAdminUser) {
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
				ctx.unauthorized();
			}
		}
	}
};
