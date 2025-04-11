import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
	try {
		const { action, data, context } = await request.json()

		let prompt = ""
		switch (action) {
			case "analyze":
				prompt = `Analyze the following spreadsheet data and provide insights:\n${JSON.stringify(data)}`
				break
			case "generate":
				prompt = `Generate an Excel formula for the following context:\n${context}`
				break
			case "format":
				prompt = `Suggest formatting for the following data:\n${JSON.stringify(data)}`
				break
			case "chat":
				prompt = `You are an AI assistant for a spreadsheet application. The user has asked: "${context}"

				Please provide a helpful response that:
				1. Directly answers their question
				2. Suggests relevant spreadsheet functions or features they might find useful
				3. If applicable, provide example formulas or steps to achieve their goal

				Keep your response concise and practical.`
				break
			default:
				return NextResponse.json({ error: "Invalid action" }, { status: 400 })
		}

		const completion = await openai.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: "gpt-4-turbo-preview",
			temperature: 0.7,
			max_tokens: 500,
		})

		return NextResponse.json({ result: completion.choices[0].message.content })
	} catch (error) {
		console.error("AI API Error:", error)
		return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 })
	}
}
