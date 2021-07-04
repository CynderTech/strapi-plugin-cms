/* eslint-disable no-underscore-dangle */
const { isNumber } = require('lodash');
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

const pluginId = require('../admin/src/pluginId');

module.exports = {
	async find(ctx) {
		let entities;

		if (ctx.query._q) {
			entities = await strapi.plugins[pluginId].services['media-item'].search(ctx.query);
		} else {
			entities = await strapi.plugins[pluginId].services['media-item'].find(ctx.query);
		}

		return entities.map((entity) =>
			sanitizeEntity(entity, {
				model: strapi.plugins[pluginId].models['media-item'],
			}),
		);
	},

	async findOne(ctx) {
		const { id } = ctx.params;
		let entity;

		if (isNumber(id)) {
			entity = await strapi.plugins[pluginId].services['media-item'].findOne({ id });
		} else {
			entity = await strapi.plugins[pluginId].services['media-item'].findOne({ slug: id });
		}

		return sanitizeEntity(entity, { model: strapi.plugins[pluginId].models['media-item'] });
	},

	async count(ctx) {
		if (ctx.query._q) {
			return strapi.plugins[pluginId].services['media-item'].countSearch(ctx.query);
		}
		return strapi.plugins[pluginId].services['media-item'].count(ctx.query);
	},

	async create(ctx) {
		let entity;
		if (ctx.is('multipart')) {
			const { data, files } = parseMultipartData(ctx);
			entity = await strapi.plugins[pluginId].services['media-item'].create(data, {
				files,
			});
		} else {
			entity = await strapi.plugins[pluginId].services['media-item'].create(ctx.request.body);
		}
		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models['media-item'],
		});
	},

	async update(ctx) {
		const { id } = ctx.params;

		let entity;
		if (ctx.is('multipart')) {
			const { data, files } = parseMultipartData(ctx);
			entity = await strapi.plugins[pluginId].services['media-item'].update({ id }, data, {
				files,
			});
		} else {
			entity = await strapi.plugins[pluginId].services['media-item'].update(
				{ id },
				ctx.request.body,
			);
		}

		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models['media-item'],
		});
	},

	async delete(ctx) {
		const { id } = ctx.params;

		const entity = await strapi.plugins[pluginId].services['media-item'].delete({
			id,
		});
		return sanitizeEntity(entity, {
			model: strapi.plugins[pluginId].models['media-item'],
		});
	},
};
