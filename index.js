function findMatchingTags(content) {
	const matchingTags = [];
	const data = require("./badwords.json");

	data.forEach((entry) => {
		const patterns = entry.match.split("|");
		const exceptions = entry.exceptions || [];

		const isException = exceptions.some((exception) => {
			const regexException = new RegExp(exception.replace(/\*/g, ".*"));
			return regexException.test(content);
		});

		if (
			patterns.some((pattern) => {
				const regexPattern = new RegExp(pattern.replace(/\*/g, ".*"));
				return regexPattern.test(content);
			})
		) {
			if (!isException) {
				matchingTags.push(...entry.tags);
			}
		}
	});

	return matchingTags;
}

module.exports = findMatchingTags;
