"use client"

import { useState } from "react"
import { Spreadsheet } from "@sheetor/spreadsheet"
import { Toolbar } from "@/components/spreadsheet/toolbar"
import { ChatSidebar } from "@/components/sidebar/chat-sidebar"
import { toast } from "sonner"
import { Toaster } from "sonner"
import type { AIResponse, Cell } from "@/types/spreadsheet"

export default function SpreadsheetPage() {
	const [isLoading, setIsLoading] = useState(false)
	const [cells, setCells] = useState<Cell[][]>(Array.from({ length: 1000 }, () => Array(26).fill({})))
	const [isSidebarOpen, setIsSidebarOpen] = useState(true)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	const handleAIRequest = async (
		action: string,
		data: Cell[][] | null,
		context?: string,
	): Promise<AIResponse | null> => {
		try {
			setIsLoading(true)
			const response = await fetch("/api/ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ action, data, context }),
			})

			if (!response.ok) {
				throw new Error("AI request failed")
			}

			const result = await response.json()
			toast.success("AI operation completed successfully")
			return result
		} catch (error) {
			toast.error("Failed to process AI request")
			console.error("AI Error:", error)
			return null
		} finally {
			setIsLoading(false)
		}
	}

	const handleAnalyze = async (data: Cell[][]) => {
		const result = await handleAIRequest("analyze", data)
		if (result) {
			// Handle analysis result
			console.log("Analysis result:", result)
		}
	}

	const handleGenerate = async (context: string) => {
		const result = await handleAIRequest("generate", null, context)
		if (result) {
			// Handle formula generation result
			console.log("Generated formula:", result)
		}
	}

	const handleFormat = async (data: Cell[][]) => {
		const result = await handleAIRequest("format", data)
		if (result) {
			// Handle formatting result
			console.log("Formatting suggestions:", result)
		}
	}

	const handleSave = () => {
		// TODO: Implement save functionality
		toast.info("Save functionality coming soon")
	}

	const handleImport = () => {
		// TODO: Implement import functionality
		toast.info("Import functionality coming soon")
	}

	const handleExport = () => {
		// TODO: Implement export functionality
		toast.info("Export functionality coming soon")
	}

	return (
		<main className="flex min-h-screen flex-col">
			<Toaster position="top-right" />
			<Toolbar
				onAnalyze={() => handleAnalyze(cells)}
				onGenerate={() => handleGenerate("")}
				onFormat={() => handleFormat(cells)}
				onSave={handleSave}
				onImport={handleImport}
				onExport={handleExport}
			/>
			<div className="flex-1 p-4 relative flex">
				<Spreadsheet onAnalyze={handleAnalyze} onGenerate={handleGenerate} onFormat={handleFormat} />
				<div className="flex flex-col">
					<button onClick={toggleSidebar} className="m-4">
						{isSidebarOpen ? "Close Chat" : "Open Chat"}
					</button>
					{isSidebarOpen && <ChatSidebar />}
				</div>
			</div>
			{isLoading && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center">
					<div className="bg-background p-4 rounded-lg shadow-lg">
						<p>Processing AI request...</p>
					</div>
				</div>
			)}
		</main>
	)
}
