import { Button } from "@/components/ui/button"
import type { Meta, StoryObj } from "@storybook/react"
import { Plus } from "lucide-react"

const meta = {
	title: "Test/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: "Button",
		variant: "default",
	},
}

export const Secondary: Story = {
	args: {
		children: "Button",
		variant: "secondary",
	},
}

export const Small: Story = {
	args: {
		children: "Button",
		size: "sm",
	},
}

export const Large: Story = {
	args: {
		children: "Button",
		size: "lg",
	},
}

export const WithIcon: Story = {
	args: {
		children: <Plus />,
	},
}
