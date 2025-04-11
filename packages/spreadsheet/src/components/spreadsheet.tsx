import React, { useState, useMemo } from "react"
import { useReactTable, getCoreRowModel, createColumnHelper, flexRender } from "@tanstack/react-table"

interface Cell {
	value: string
	formula?: string
}

interface SpreadsheetProps {
	rowCount?: number
	columnCount?: number
	initialData?: Cell[][]
	onAnalyze?: (data: Cell[][]) => void
	onGenerate?: (context: string) => void
	onFormat?: (data: Cell[][]) => void
}

const columnHelper = createColumnHelper<Record<string, Cell>>()

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rowCount = 10,
	columnCount = 10,
	initialData = [],
	onAnalyze,
	onGenerate,
	onFormat,
}) => {
	// Initialize data with empty cells if no initial data is provided
	const [data, setData] = useState(() => {
		if (initialData.length > 0) {
			return initialData.map(row =>
				row.reduce(
					(acc, cell, index) => {
						acc[String.fromCharCode(65 + index)] = cell
						return acc
					},
					{} as Record<string, Cell>,
				),
			)
		}

		return Array(rowCount)
			.fill(null)
			.map(() =>
				Array(columnCount)
					.fill(null)
					.reduce(
						(acc, _, index) => {
							acc[String.fromCharCode(65 + index)] = { value: "" }
							return acc
						},
						{} as Record<string, Cell>,
					),
			)
	})

	// Create columns configuration
	const tableColumns = useMemo(() => {
		return Array(columnCount)
			.fill(null)
			.map((_, index) => {
				const columnId = String.fromCharCode(65 + index)
				return columnHelper.accessor(columnId, {
					header: columnId,
					cell: ({ getValue, row, column }) => {
						const value = getValue()
						return (
							<input
								value={value.value}
								onChange={e => {
									const newData = [...data]
									newData[row.index][column.id] = {
										value: e.target.value,
									}
									setData(newData)

									// Call the appropriate callbacks when data changes
									if (onAnalyze) {
										const cellData = newData.map(row =>
											Object.values(row as Record<string, Cell>).map(cell => ({
												value: cell.value,
											})),
										)
										onAnalyze(cellData)
									}
									if (onFormat) {
										const cellData = newData.map(row =>
											Object.values(row as Record<string, Cell>).map(cell => ({
												value: cell.value,
											})),
										)
										onFormat(cellData)
									}
								}}
								onDoubleClick={() => {
									if (onGenerate) {
										onGenerate("")
									}
								}}
								className="w-full h-full focus:outline-none px-2 py-1"
							/>
						)
					},
				})
			})
	}, [columnCount, data, onAnalyze, onFormat, onGenerate])

	const table = useReactTable({
		data,
		columns: tableColumns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className="border border-gray-200 rounded-lg overflow-hidden">
			<table className="w-full border-collapse">
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th
									key={header.id}
									className="border border-gray-200 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600"
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id} className="border border-gray-200">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
