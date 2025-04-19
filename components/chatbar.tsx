"use client"

import { Plus, Settings, History, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

function ChatBar() {
	return (
		<div className="bg-card text-card-foreground border-l border-border flex flex-col h-full">
			<div className="flex items-center justify-between p-2 border-b border-border">
				<div className="text-sm font-medium">New chat</div>
				<div className="flex items-center gap-2">
					<Button>
						<Settings />
					</Button>
					<Button>
						<Plus />
					</Button>
					<Button>
						<History />
					</Button>
				</div>
			</div>

			<div className="p-2 border-b border-border">
				<div className="flex items-center gap-1 text-xs text-muted-foreground">
					<span className="w-5 h-5 flex items-center justify-center rounded-full border border-border">
						@
					</span>
					<span>App.tsx</span>
				</div>
			</div>

			<div className="flex-1 p-2">
				<div className="text-muted-foreground text-sm">Plan, search, build anything</div>
			</div>

			<div className="p-2 border-t border-border">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<span>Agent</span>
						<span className="text-[10px] border border-border px-1 rounded">Auto</span>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="h-6 w-6 text-muted-foreground hover:text-foreground"
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Show options</span>
						</Button>
						<Button className="h-7 bg-primary hover:bg-primary/90 text-xs px-3 rounded">Send</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatBar
