module.exports = {
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
