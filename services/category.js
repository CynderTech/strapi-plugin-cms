const pluginId = require('../admin/src/pluginId');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
	find(params, populate) {
		return strapi.query('category', pluginId).find(params, populate);
	},

	findOne(params, populate) {
		return strapi.query('category', pluginId).findOne(params, populate);
	},

	count(params) {
		return strapi.query('category', pluginId).count(params);
	},

	async create(data, { files } = {}) {
		const validData = await strapi.entityValidator.validateEntityCreation(
			strapi.plugins[pluginId].category,
			data,
		);
		const entry = await strapi.query('category', pluginId).create(validData);

		if (files) {
			// automatically uploads the files based on the entry and the model
			await strapi.entityService.uploadFiles(entry, files, {
				model: 'category',
				source: pluginId,
				// if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
			});
			return this.findOne({ id: entry.id });
		}

		return entry;
	},

	async update(params, data, { files } = {}) {
		const validData = await strapi.entityValidator.validateEntityUpdate(
			strapi.plugins[pluginId].category,
			data,
		);
		const entry = await strapi.query('category', pluginId).update(params, validData);

		if (files) {
			// automatically uploads the files based on the entry and the model
			await strapi.entityService.uploadFiles(entry, files, {
				model: 'category',
				source: pluginId,
				// if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
			});
			return this.findOne({ id: entry.id });
		}

		return entry;
	},

	delete(params) {
		return strapi.query('category', pluginId).delete(params);
	},

	search(params) {
		return strapi.query('category', pluginId).search(params);
	},

	countSearch(params) {
		return strapi.query('category', pluginId).countSearch(params);
	},
};
