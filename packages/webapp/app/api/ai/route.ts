import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "")

export async function POST(request: Request) {
	try {
		const { action, data, context, model = "gemini" } = await request.json()

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
				return new Response(JSON.stringify({ error: "Invalid action" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				})
		}

		// Use selected model
		if (model === "gemini") {
			try {
				const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })
				const result = await model.generateContent(prompt)
				const response = await result.response
				const text = response.text()

				return new Response(JSON.stringify({ result: text }), {
					headers: {
						"Content-Type": "application/json",
					},
				})
			} catch (error) {
				console.warn("Gemini API failed:", error)
				// Fall through to Deepseek
			}
		}

		// Use Deepseek (either as fallback or primary choice)
		const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
			},
			body: JSON.stringify({
				model: "deepseek-chat",
				messages: [{ role: "user", content: prompt }],
				temperature: 0.7,
				max_tokens: 500,
			}),
		})

		if (!response.ok) {
			throw new Error(`Deepseek API error: ${response.status}`)
		}

		const responseData = await response.json()
		return new Response(JSON.stringify({ result: responseData.choices[0].message.content }), {
			headers: {
				"Content-Type": "application/json",
			},
		})
	} catch (error) {
		console.error("AI API Error:", error)
		return new Response(JSON.stringify({ error: "Failed to process AI request" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
