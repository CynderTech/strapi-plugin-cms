const pluginId = require('../admin/src/pluginId');

module.exports = {
	find(params, populate) {
		return strapi.query('media-item', pluginId).find(params, populate);
	},

	findOne(params, populate) {
		return strapi.query('media-item', pluginId).findOne(params, populate);
	},

	count(params) {
		return strapi.query('media-item', pluginId).count(params);
	},

	async create(data, { files } = {}) {
		const validData = await strapi.entityValidator.validateEntityCreation(
			strapi.plugins[pluginId]['media-item'],
			data,
		);
		const entry = await strapi.query('media-item', pluginId).create(validData);

		if (files) {
			// automatically uploads the files based on the entry and the model
			await strapi.entityService.uploadFiles(entry, files, {
				model: 'media-item',
				source: pluginId,
				// if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
			});
			return this.findOne({ id: entry.id });
		}

		return entry;
	},

	async update(params, data, { files } = {}) {
		const validData = await strapi.entityValidator.validateEntityUpdate(
			strapi.plugins[pluginId]['media-item'],
			data,
		);
		const entry = await strapi.query('media-item', pluginId).update(params, validData);

		if (files) {
			// automatically uploads the files based on the entry and the model
			await strapi.entityService.uploadFiles(entry, files, {
				model: 'media-item',
				source: pluginId,
				// if you are using a plugin's model you will have to add the `source` key (source: 'users-permissions')
			});
			return this.findOne({ id: entry.id });
		}

		return entry;
	},

	delete(params) {
		return strapi.query('media-item', pluginId).delete(params);
	},

	search(params) {
		return strapi.query('media-item', pluginId).search(params);
	},

	countSearch(params) {
		return strapi.query('media-item', pluginId).countSearch(params);
	},

	sanitizeForPublic(mediaItem) {
		const { author, ...rest } = mediaItem;

		return {
			...rest,
			author: author
				? strapi.plugins['users-permissions'].services.user.sanitizeForPublic(author)
				: author,
		};
	},
};
