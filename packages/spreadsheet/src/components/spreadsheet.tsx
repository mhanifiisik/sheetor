import React, { useState, useRef, type ChangeEvent } from "react"
import { useSpreadsheet } from "../hooks/use-spreadsheet"
import type { SpreadsheetData, ImportOptions, ExportOptions, CellStyle } from "../types"

export interface SpreadsheetProps {
	initialData?: SpreadsheetData
	className?: string
	onDataChange?: (data: SpreadsheetData) => void
}

export function Spreadsheet({ initialData, className, onDataChange }: SpreadsheetProps) {
	const {
		data,
		activeSheet,
		isLoading,
		error,
		setActiveSheet,
		getCell,
		setCellValue,
		setCellStyle,
		addSheet,
		removeSheet,
		renameSheet,
		importData,
		exportData,
		clearSheet,
		clearAll,
	} = useSpreadsheet({ initialData })

	const [currentCell, setCurrentCell] = useState<string | null>(null)
	const [newSheetName, setNewSheetName] = useState<string>("")
	const [exportFileName, setExportFileName] = useState<string>("spreadsheet.xlsx")
	const [formulaValue, setFormulaValue] = useState<string>("")

	const fileInputRef = useRef<HTMLInputElement>(null)

	// Notify parent component about data changes
	React.useEffect(() => {
		onDataChange?.(data)
	}, [data, onDataChange])

	// Update formula bar when cell selection changes
	React.useEffect(() => {
		if (currentCell) {
			const cell = getCell(currentCell)
			setFormulaValue(cell?.formula || String(cell?.value || ""))
		} else {
			setFormulaValue("")
		}
	}, [currentCell, getCell])

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			await importData(file)
			if (fileInputRef.current) {
				fileInputRef.current.value = ""
			}
		}
	}

	const handleExport = () => {
		exportData({
			fileName: exportFileName,
		})
	}

	const handleAddSheet = () => {
		if (newSheetName.trim()) {
			try {
				addSheet(newSheetName.trim())
				setNewSheetName("")
			} catch (e) {
				console.error(e)
				// In a real application, you'd want to show an error message to the user
			}
		}
	}

	const handleRemoveSheet = () => {
		if (activeSheet) {
			try {
				removeSheet(activeSheet)
			} catch (e) {
				console.error(e)
			}
		}
	}

	const handleRenameSheet = (newName: string) => {
		if (activeSheet && newName.trim() && newName !== activeSheet) {
			try {
				renameSheet(activeSheet, newName.trim())
			} catch (e) {
				console.error(e)
			}
		}
	}

	const handleFormulaChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFormulaValue(e.target.value)
	}

	const handleFormulaSubmit = () => {
		if (currentCell && formulaValue.trim()) {
			const isFormula = formulaValue.startsWith("=")
			setCellValue(
				currentCell,
				isFormula ? formulaValue : formulaValue,
				isFormula ? formulaValue.substring(1) : undefined,
			)
		}
	}

	const handleFormulaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleFormulaSubmit()
		}
	}

	const applyStyle = (style: Partial<CellStyle>) => {
		if (currentCell) {
			setCellStyle(currentCell, style)
		}
	}

	// Calculate visible cells based on view dimensions
	const renderVisibleCells = () => {
		if (!data[activeSheet]) return null

		// In a real implementation, you would calculate visible cells based on scrolling
		// This simplified version just shows a fixed grid
		const rows = 10
		const cols = 6

		const rowHeaders = Array.from({ length: rows }, (_, i) => i + 1)
		const colHeaders = Array.from(
			{ length: cols },
			(_, i) => String.fromCharCode(65 + i), // 'A', 'B', 'C', etc.
		)

		return (
			<div className="flex-1 overflow-auto ">
				<table className="border-collapse w-auto">
					<thead>
						<tr>
							<th className="min-w-[40px] h-8 border-r border-b border-gray-300 bg-gray-200 sticky top-0 z-10" />
							{colHeaders.map(col => (
								<th
									key={col}
									className="min-w-[80px] h-8 px-2 py-1 border-r border-b border-gray-300 bg-gray-100 text-center font-semibold select-none sticky top-0 z-10"
								>
									{col}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rowHeaders.map(row => (
							<tr key={row}>
								<th className="min-w-[40px] h-8 px-2 py-1 border-r border-b border-gray-300 bg-gray-100 text-center font-semibold select-none">
									{row}
								</th>
								{colHeaders.map(col => {
									const cellAddr = `${col}${row}`
									const cell = getCell(cellAddr)
									const cellStyle = cell?.style || {}

									// Create inline styles based on cell styling
									const inlineStyle = {
										fontWeight: cellStyle.fontWeight || "normal",
										fontStyle: cellStyle.fontStyle || "normal",
										textDecoration: cellStyle.textDecoration || "none",
										textAlign: cellStyle.textAlign || "left",
										backgroundColor: cellStyle.backgroundColor || "transparent",
										color: cellStyle.color || "inherit",
										border: cellStyle.border,
									}

									return (
										<td
											key={cellAddr}
											style={inlineStyle}
											className={`min-w-[80px] h-8 px-2 py-1 border-r border-b border-gray-300 outline-none whitespace-nowrap overflow-hidden text-ellipsis ${
												cellAddr === currentCell
													? "bg-blue-50 outline outline-2 outline-blue-500 z-[1]"
													: ""
											}`}
											onClick={() => setCurrentCell(cellAddr)}
											onKeyDown={e => {
												if (e.key === "Enter" || e.key === " ") {
													setCurrentCell(cellAddr)
												}
											}}
											tabIndex={0}
										>
											{cell?.value !== undefined && cell?.value !== null
												? String(cell.value)
												: ""}
										</td>
									)
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	}

	const renderSheetTabs = () => {
		return (
			<div className="flex bg-gray-100 border-b border-gray-300 overflow-x-auto" role="tablist">
				{Object.keys(data).map(sheetName => (
					<button
						key={sheetName}
						className={`px-4 py-2 cursor-pointer whitespace-nowrap border-r border-gray-300 select-none ${
							sheetName === activeSheet ? "bg-white border-b-2 border-b-blue-500" : "hover:bg-gray-200"
						}`}
						onClick={() => setActiveSheet(sheetName)}
						role="tab"
						aria-selected={sheetName === activeSheet}
					>
						{sheetName}
					</button>
				))}

				<div className="flex items-center gap-2 px-2 py-1 border-r border-gray-300">
					<input
						type="text"
						value={newSheetName}
						onChange={e => setNewSheetName(e.target.value)}
						placeholder="New sheet..."
						className="p-1 border border-gray-300 rounded text-sm w-[100px]"
					/>
					<button
						onClick={handleAddSheet}
						className="bg-blue-500 text-white border-none rounded w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-blue-600"
					>
						+
					</button>
				</div>
			</div>
		)
	}

	const renderToolbar = () => {
		const currentCellData = currentCell ? getCell(currentCell) : undefined
		const currentStyle = currentCellData?.style || {}

		return (
			<div className="flex flex-col bg-gray-50 border-b border-gray-300">
				{/* File operations and sheet actions */}
				<div className="flex justify-between p-2 border-b border-gray-200">
					<div className="flex items-center gap-2">
						<input
							ref={fileInputRef}
							type="file"
							accept=".xlsx,.xls,.csv"
							onChange={handleFileChange}
							className="hidden"
						/>
						<div className="flex gap-1">
							<button
								onClick={() => fileInputRef.current?.click()}
								className="py-1.5 px-3 border border-gray-300 rounded bg-white hover:bg-gray-100 text-sm flex items-center"
								title="Import spreadsheet"
							>
								<span className="material-icons text-sm mr-1">upload_file</span>
								Import
							</button>

							<button
								onClick={handleExport}
								className="py-1.5 px-3 border border-gray-300 rounded bg-white hover:bg-gray-100 text-sm flex items-center"
								title="Export spreadsheet"
							>
								<span className="material-icons text-sm mr-1">download</span>
								Export
							</button>
							<input
								type="text"
								value={exportFileName}
								onChange={e => setExportFileName(e.target.value)}
								placeholder="Filename.xlsx"
								className="py-1.5 px-3 border border-gray-300 rounded text-sm max-w-[150px]"
								title="Export filename"
							/>
						</div>

						<div className="h-full w-[1px] bg-gray-300 mx-1"></div>

						<div className="flex gap-1">
							<button
								onClick={clearSheet}
								className="py-1.5 px-3 border border-gray-300 rounded bg-white hover:bg-gray-100 text-sm flex items-center"
								title="Clear current sheet"
							>
								<span className="material-icons text-sm mr-1">clear</span>
								Clear Sheet
							</button>
							<button
								onClick={clearAll}
								className="py-1.5 px-3 border border-gray-300 rounded bg-white hover:bg-gray-100 text-sm flex items-center"
								title="Clear all sheets"
							>
								<span className="material-icons text-sm mr-1">delete_sweep</span>
								Clear All
							</button>
						</div>
					</div>
				</div>

				{/* Formula bar */}
				<div className="flex items-center p-2 gap-2 border-b border-gray-200">
					<div className="text-sm font-medium min-w-[80px]">Cell: {currentCell || ""}</div>
					<div className="flex-1 flex items-center">
						<span className="px-2 text-lg font-mono">=</span>
						<input
							type="text"
							value={formulaValue}
							onChange={handleFormulaChange}
							onKeyDown={handleFormulaKeyDown}
							placeholder="Enter formula or value"
							className="flex-1 py-1.5 px-3 border border-gray-300 rounded bg-white"
						/>
						<button
							onClick={handleFormulaSubmit}
							className="ml-2 py-1.5 px-3 border border-gray-300 rounded bg-white hover:bg-gray-100"
							title="Apply formula or value"
						>
							<span className="material-icons">check</span>
						</button>
					</div>
				</div>

				{/* Formatting controls */}
				<div className="flex items-center p-2 gap-3">
					{/* Text formatting */}
					<div className="flex gap-1 items-center border-r border-gray-200 pr-3">
						<button
							onClick={() =>
								applyStyle({ fontWeight: currentStyle.fontWeight === "bold" ? "normal" : "bold" })
							}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.fontWeight === "bold" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Bold"
						>
							<span className="material-icons text-sm">format_bold</span>
						</button>
						<button
							onClick={() =>
								applyStyle({ fontStyle: currentStyle.fontStyle === "italic" ? "normal" : "italic" })
							}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.fontStyle === "italic" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Italic"
						>
							<span className="material-icons text-sm">format_italic</span>
						</button>
						<button
							onClick={() =>
								applyStyle({
									textDecoration: currentStyle.textDecoration === "underline" ? "none" : "underline",
								})
							}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.textDecoration === "underline" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Underline"
						>
							<span className="material-icons text-sm">format_underlined</span>
						</button>
					</div>

					{/* Text alignment */}
					<div className="flex gap-1 items-center border-r border-gray-200 pr-3">
						<button
							onClick={() => applyStyle({ textAlign: "left" })}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.textAlign === "left" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Align left"
						>
							<span className="material-icons text-sm">format_align_left</span>
						</button>
						<button
							onClick={() => applyStyle({ textAlign: "center" })}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.textAlign === "center" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Align center"
						>
							<span className="material-icons text-sm">format_align_center</span>
						</button>
						<button
							onClick={() => applyStyle({ textAlign: "right" })}
							className={`w-8 h-8 flex items-center justify-center rounded ${
								currentStyle.textAlign === "right" ? "bg-blue-100" : "hover:bg-gray-200"
							}`}
							title="Align right"
						>
							<span className="material-icons text-sm">format_align_right</span>
						</button>
					</div>

					{/* Color controls */}
					<div className="flex gap-3 items-center">
						<div className="flex flex-col items-center">
							<label className="text-xs text-gray-500">Text color</label>
							<input
								type="color"
								value={currentStyle.color || "#000000"}
								onChange={e => applyStyle({ color: e.target.value })}
								className="w-8 h-6 cursor-pointer border border-gray-300"
							/>
						</div>
						<div className="flex flex-col items-center">
							<label className="text-xs text-gray-500">Fill color</label>
							<input
								type="color"
								value={currentStyle.backgroundColor || "#ffffff"}
								onChange={e => applyStyle({ backgroundColor: e.target.value })}
								className="w-8 h-6 cursor-pointer border border-gray-300"
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (isLoading) {
		return <div className="p-4 text-center">Loading...</div>
	}

	if (error) {
		return <div className="p-4 text-center text-red-500">Error: {error.message}</div>
	}

	return (
		<div className={`flex flex-col border border-gray-300 rounded overflow-hidden shadow-sm ${className || ""}`}>
			{renderToolbar()}
			{renderSheetTabs()}
			{renderVisibleCells()}
		</div>
	)
}
