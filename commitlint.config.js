export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "ci", "build", "revert"],
		],
		"subject-case": [2, "always", "sentence-case"],
		"scope-empty": [2, "never"],
	},
}
