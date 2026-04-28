export default function TitleCaseFromSnakeCase(text: string): string {
	return text
		.replace(/_/g, ' ')
		.replace(
			/(^[a-z]{1})|(\s+[a-z]{1})/g,
			function (match) {
				return match.toUpperCase()
			}
		)
}
