import { Bot, Sparkles } from "lucide-react"

function ChatBarHeader() {
	return (
		<div className="flex flex-col gap-2 p-4 border-b">
			<div className="flex items-center gap-2">
				<Bot className="h-5 w-5 text-primary" />
				<h2 className="text-lg font-semibold">AI Assistant</h2>
			</div>
			<p className="text-sm text-muted-foreground">
				Ask me anything about your spreadsheet. I can help with formulas, formatting, and more.
			</p>
			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<Sparkles className="h-3 w-3" />
				<span>Powered by advanced AI</span>
			</div>
		</div>
	)
}

export default ChatBarHeader
