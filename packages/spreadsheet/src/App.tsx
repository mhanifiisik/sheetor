import { useState } from "react"
import type { SpreadsheetData } from "./types"
import { Spreadsheet } from "./components/spreadsheet"

function App() {
	const [data, setData] = useState<SpreadsheetData>({
		Sheet1: {
			A1: { value: "Product", style: { fontWeight: "bold", backgroundColor: "#f3f4f6" } },
			B1: { value: "Quantity", style: { fontWeight: "bold", backgroundColor: "#f3f4f6" } },
			C1: { value: "Price", style: { fontWeight: "bold", backgroundColor: "#f3f4f6" } },
			D1: { value: "Total", style: { fontWeight: "bold", backgroundColor: "#f3f4f6" } },
			A2: { value: "Widget A" },
			B2: { value: 5 },
			C2: { value: 10 },
			D2: { value: "=B2*C2", formula: "B2*C2" },
			A3: { value: "Widget B" },
			B3: { value: 3 },
			C3: { value: 15 },
			D3: { value: "=B3*C3", formula: "B3*C3" },
			A4: { value: "Widget C" },
			B4: { value: 2 },
			C4: { value: 20 },
			D4: { value: "=B4*C4", formula: "B4*C4" },
			A5: { value: "Total", style: { fontWeight: "bold" } },
			D5: { value: "=SUM(D2:D4)", formula: "SUM(D2:D4)", style: { fontWeight: "bold" } },
		},
	})

	return (
		<div className="app-container p-4">
			<header className="mb-4">
				<h1 className="text-2xl font-bold mb-2">Spreadsheet Component Demo</h1>
				<p>A feature-rich spreadsheet component with formatting, formulas, and import/export support</p>
			</header>

			<main>
				<Spreadsheet
					initialData={data}
					onDataChange={setData}
					className="demo-spreadsheet max-w-4xl h-[600px]"
				/>
			</main>

			<footer className="mt-6 text-center text-sm">
				<p>Built with React. Use the toolbar above to format cells, add formulas, and import/export data.</p>
			</footer>
		</div>
	)
}

export default App
