/* eslint-disable no-underscore-dangle */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const pluginId = require('../admin/src/pluginId');

module.exports = {
	async find(ctx) {
		let entities;

		if (ctx.query._q) {
			entities = await strapi.plugins[pluginId].services.category.search(ctx.query);
		} else {
			entities = await strapi.plugins[pluginId].services.category.find(ctx.query);
		}

		return entities.map((entity) =>
			sanitizeEntity(entity, {
				model: strapi.plugins[pluginId].models.category,
			}),
		);
	},

	async findOne(ctx) {
		const { id } = ctx.params;
		let entity;

		if (!Number.isNaN(Number(id))) {
			entity = await strapi.plugins[pluginId].services.category.findOne({ id });
		} else {
			entity = await strapi.plugins[pluginId].services.category.findOne({ slug: id });
		}

		return sanitizeEntity(entity, { model: strapi.plugins[pluginId].models.category });
	},

	async count(ctx) {
		if (ctx.query._q) {
			return strapi.plugins[pluginId].services.category.countSearch(ctx.query);
		}
		return strapi.plugins[pluginId].services.category.count(ctx.query);
	},

	async create(ctx) {
		let entity;
		if (ctx.is('multipart')) {
			const { data, files } = parseMultipartData(ctx);
			entity = await strapi.plugins[pluginId].services.category.create(data, {
				files,
			});
		} else {
			entity = await strapi.plugins[pluginId].services.category.create(ctx.request.body);
		}
		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models.category,
		});
	},

	async update(ctx) {
		const { id } = ctx.params;

		let entity;
		if (ctx.is('multipart')) {
			const { data, files } = parseMultipartData(ctx);
			entity = await strapi.plugins[pluginId].services.category.update({ id }, data, {
				files,
			});
		} else {
			entity = await strapi.plugins[pluginId].services.category.update(
				{ id },
				ctx.request.body,
			);
		}

		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models.category,
		});
	},

	async delete(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.plugins[pluginId].services.category.delete({
			id,
		});
		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models.category,
		});
	},
};
