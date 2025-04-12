import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export type AIModel = "gemini" | "deepseek"

interface ModelSwitcherProps {
	onModelChange: (model: AIModel) => void
	currentModel: AIModel
}

export function ModelSwitcher({ onModelChange, currentModel }: ModelSwitcherProps) {
	return (
		<div className="flex items-center gap-2">
			<Select value={currentModel} onValueChange={value => onModelChange(value as AIModel)}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select model" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="gemini">Gemini 1.5 Pro</SelectItem>
					<SelectItem value="deepseek">Deepseek Chat</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
