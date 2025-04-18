import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
	stories: ["../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"storybook-addon-next-router",
		"@storybook/addon-viewport",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
}
export default config
