"use client"

import { useCallback, useState } from "react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import ChatBarHeader from "../chat-bar/header"
import ChatBarMessages from "../chat-bar/messages"
import ChatBarFooter from "../chat-bar/footbar"

interface Message {
	id: string
	content: string
	sender: "user" | "agent"
	timestamp: string
}

function AppSidebar() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			content: "Hello! I'm your AI assistant. How can I help you with your spreadsheet today?",
			sender: "agent",
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		},
	])

	const handleSendMessage = useCallback((content: string) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content,
			sender: "user",
			timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
		}

		setMessages(prev => [...prev, newMessage])

		setTimeout(() => {
			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				content: "I'm processing your request...",
				sender: "agent",
				timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
			}
			setMessages(prev => [...prev, aiResponse])
		}, 1000)
	}, [])
	return (
		<Sidebar side="right" className="h-screen p-2 bg-gray-100 border-l">
			<SidebarHeader>
				<ChatBarHeader />
			</SidebarHeader>
			<SidebarContent>
				<ChatBarMessages messages={messages} />
			</SidebarContent>
			<SidebarFooter>
				<ChatBarFooter onSendMessage={handleSendMessage} />
			</SidebarFooter>
		</Sidebar>
	)
}

export default AppSidebar
