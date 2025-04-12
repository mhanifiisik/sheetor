export interface Cell {
	value: string
	formula?: string
}

export interface AIResponse {
	message: string
	data?: Record<string, unknown>
}

export interface Message {
	role: "user" | "assistant"
	content: string
}
