const { isNumber } = require('lodash');
const { sanitizeEntity } = require('strapi-utils');

module.exports = {
	/**
	 * Retrieve a record.
	 *
	 * @return {Object}
	 */

	async findOne(ctx) {
		const { id } = ctx.params;
		let entity;

		if (isNumber(id)) {
			entity = await strapi.services.category.findOne({ id });
		} else {
			entity = await strapi.services.category.findOne({ slug: id });
		}

		return sanitizeEntity(entity, { model: strapi.models.category });
	},
};
