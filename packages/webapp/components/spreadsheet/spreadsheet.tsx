import React, { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Cell } from "@/types/spreadsheet"
import { DEFAULT_ROWS, DEFAULT_COLS, COLUMN_LABELS } from "@/constants/spreadsheet"

interface SpreadsheetProps {
	rows?: number
	cols?: number
	onAnalyze?: (data: Cell[][]) => void
	onGenerate?: (context: string) => void
	onFormat?: (data: Cell[][]) => void
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows = DEFAULT_ROWS,
	cols = DEFAULT_COLS,
	onAnalyze,
	onGenerate,
	onFormat,
}) => {
	const [cells, setCells] = useState<Cell[][]>(
		Array(rows)
			.fill(null)
			.map(() =>
				Array(cols)
					.fill(null)
					.map(() => ({ value: "" })),
			),
	)
	const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)

	const handleCellClick = useCallback((row: number, col: number) => {
		setSelectedCell({ row, col })
	}, [])

	const handleCellChange = useCallback((row: number, col: number, value: string) => {
		setCells(prev => {
			const newCells = [...prev]
			newCells[row] = [...newCells[row]]
			newCells[row][col] = { ...newCells[row][col], value }
			return newCells
		})
	}, [])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (selectedCell && e.key === "Enter") {
				e.preventDefault()
				if (e.shiftKey) {
					// Move up
					setSelectedCell(prev => (prev ? { ...prev, row: Math.max(0, prev.row - 1) } : null))
				} else {
					// Move down
					setSelectedCell(prev => (prev ? { ...prev, row: Math.min(rows - 1, prev.row + 1) } : null))
				}
			}
		},
		[selectedCell, rows],
	)

	return (
		<div className="w-full h-full overflow-auto" onKeyDown={handleKeyDown}>
			<table className="border-collapse">
				<thead>
					<tr>
						<th className="w-12 h-8 border bg-muted" />
						{COLUMN_LABELS.map((label, col) => (
							<th key={col} className="w-24 h-8 border bg-muted">
								{label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{cells.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<td className="w-12 h-8 border bg-muted text-center">{rowIndex + 1}</td>
							{row.map((cell, colIndex) => (
								<td
									key={colIndex}
									className={cn(
										"w-24 h-8 border p-0",
										selectedCell?.row === rowIndex && selectedCell?.col === colIndex
											? "bg-primary/10"
											: "bg-background",
									)}
								>
									<Input
										type="text"
										value={cell.value}
										onChange={e => handleCellChange(rowIndex, colIndex, e.target.value)}
										onClick={() => handleCellClick(rowIndex, colIndex)}
										className="w-full h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
									/>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
