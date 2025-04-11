import React, { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronLeft, Send } from "lucide-react"
import type { Message } from "@/types/spreadsheet"

export const ChatSidebar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState<Message[]>([])
	const [input, setInput] = useState("")
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim()) return

		const userMessage: Message = { role: "user", content: input }
		setMessages(prev => [...prev, userMessage])
		setInput("")

		try {
			const response = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					action: "chat",
					context: input,
				}),
			})

			if (!response.ok) throw new Error("Failed to get response")

			const data = await response.json()
			const assistantMessage: Message = { role: "assistant", content: data.result }
			setMessages(prev => [...prev, assistantMessage])
		} catch (error) {
			console.error("Chat error:", error)
			const errorMessage: Message = {
				role: "assistant",
				content: "Sorry, I encountered an error. Please try again.",
			}
			setMessages(prev => [...prev, errorMessage])
		}
	}

	return (
		<div
			className={cn(
				"fixed right-0 top-0 h-full bg-background border-l shadow-lg transition-all duration-300 ease-in-out",
				isOpen ? "w-96" : "w-12",
			)}
		>
			<Button
				variant="ghost"
				size="icon"
				className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
			</Button>

			{isOpen && (
				<div className="flex flex-col h-full p-4">
					<ScrollArea className="flex-1 mb-4">
						<div className="space-y-4">
							{messages.map((message, index) => (
								<div
									key={index}
									className={cn(
										"p-3 rounded-lg max-w-[85%]",
										message.role === "user" ? "bg-primary/10 ml-auto" : "bg-muted mr-auto",
									)}
								>
									{message.content}
								</div>
							))}
							<div ref={messagesEndRef} />
						</div>
					</ScrollArea>

					<form onSubmit={handleSubmit} className="flex gap-2">
						<Input
							type="text"
							value={input}
							onChange={e => setInput(e.target.value)}
							placeholder="Ask about your spreadsheet..."
							className="flex-1"
						/>
						<Button type="submit" size="icon">
							<Send className="h-4 w-4" />
						</Button>
					</form>
				</div>
			)}
		</div>
	)
}
