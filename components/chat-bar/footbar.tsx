"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatBarFooterProps {
	onSendMessage: (message: string) => void
}

function ChatBarFooter({ onSendMessage }: ChatBarFooterProps) {
	const [message, setMessage] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (message.trim()) {
			onSendMessage(message.trim())
			setMessage("")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex gap-2 p-2 border-t">
			<Textarea
				value={message}
				onChange={e => setMessage(e.target.value)}
				placeholder="Type your message..."
				className="min-h-[40px] resize-none"
				onKeyDown={e => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault()
						handleSubmit(e)
					}
				}}
			/>
			<Button type="submit" size="icon" disabled={!message.trim()}>
				<Send className="h-4 w-4" />
			</Button>
		</form>
	)
}

export default ChatBarFooter
