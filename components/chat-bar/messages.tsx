"use client"

import { useCallback, useEffect, useRef } from "react"

interface Message {
	id: string
	content: string
	sender: "user" | "agent"
	timestamp: string
}

interface ChatBarMessagesProps {
	messages: Message[]
}

function ChatBarMessages({ messages }: ChatBarMessagesProps) {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [])

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<div className="flex flex-col gap-2 p-2 h-full overflow-y-auto">
			{messages.map(message => (
				<div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
					<div
						className={`p-2 rounded-lg w-full border ${
							message.sender === "user"
								? "bg-primary text-primary-foreground"
								: "bg-background border-border"
						}`}
					>
						<div className="flex justify-between items-center">
							<span className="font-medium">{message.sender === "user" ? "You" : "Assistant"}</span>
							<span className="text-xs opacity-70">{message.timestamp}</span>
						</div>
						<p className="text-sm whitespace-pre-wrap">{message.content}</p>
					</div>
				</div>
			))}
			<div ref={messagesEndRef} />
		</div>
	)
}

export default ChatBarMessages
