import * as XLSX from "xlsx"
import type { CellCoordinate, ImportOptions, ExportOptions, SpreadsheetData, CellValue } from "../types"

/**
 * Converts Excel column letters to a zero-based column index
 */
export const columnLetterToIndex = (column: string): number => {
	let result = 0
	for (let i = 0; i < column.length; i++) {
		result = result * 26 + column.charCodeAt(i) - "A".charCodeAt(0) + 1
	}
	return result - 1
}

/**
 * Converts a zero-based column index to Excel column letters
 */
export const indexToColumnLetter = (index: number): string => {
	let column = ""
	let temp = index + 1

	while (temp > 0) {
		const remainder = (temp - 1) % 26
		column = String.fromCharCode(65 + remainder) + column
		temp = Math.floor((temp - remainder) / 26)
	}

	return column
}

/**
 * Converts cell address (e.g., "A1") to row and column indices
 */
export const cellAddressToCoordinate = (address: string): CellCoordinate => {
	const match = address.match(/^([A-Z]+)(\d+)$/)
	if (!match) {
		throw new Error(`Invalid cell address: ${address}`)
	}

	const col = columnLetterToIndex(match[1])
	const row = Number.parseInt(match[2], 10) - 1

	return { row, col }
}

/**
 * Converts row and column indices to cell address (e.g., "A1")
 */
export const coordinateToCellAddress = (coord: CellCoordinate): string => {
	return `${indexToColumnLetter(coord.col)}${coord.row + 1}`
}

/**
 * Imports data from an Excel file
 */
export const importFromExcel = async (file: File, options: ImportOptions = {}): Promise<SpreadsheetData> => {
	try {
		const arrayBuffer = await file.arrayBuffer()
		const workbook = XLSX.read(arrayBuffer, {
			type: "array",
			password: options.password,
		})

		const result: SpreadsheetData = {}

		const sheetNames = options.sheetName ? [options.sheetName] : workbook.SheetNames

		for (const sheetName of sheetNames) {
			if (!workbook.Sheets[sheetName]) continue

			const worksheet = workbook.Sheets[sheetName]
			result[sheetName] = {}

			const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1")

			for (let row = range.s.r; row <= range.e.r; ++row) {
				for (let col = range.s.c; col <= range.e.c; ++col) {
					const cellAddress = XLSX.utils.encode_cell({ r: row, c: col })
					const excelCell = worksheet[cellAddress]

					if (excelCell) {
						const cellKey = coordinateToCellAddress({ row, col })

						result[sheetName][cellKey] = {
							value: excelCell.v,
							formula: excelCell.f || undefined,
						}
					}
				}
			}
		}

		return result
	} catch (error) {
		console.error("Error importing Excel file:", error)
		throw new Error("Failed to import Excel file")
	}
}

/**
 * Exports data to an Excel file
 */
export const exportToExcel = (data: SpreadsheetData, options: ExportOptions = {}): void => {
	try {
		const workbook = XLSX.utils.book_new()

		const sheetNames = options.sheetName ? [options.sheetName] : Object.keys(data)

		for (const sheetName of sheetNames) {
			if (!data[sheetName]) continue

			const sheetData = data[sheetName]
			const cellAddresses = Object.keys(sheetData)

			if (cellAddresses.length === 0) continue

			// Find the dimensions of the sheet
			let maxRow = 0
			let maxCol = 0

			for (const address of cellAddresses) {
				const { row, col } = cellAddressToCoordinate(address)
				maxRow = Math.max(maxRow, row)
				maxCol = Math.max(maxCol, col)
			}

			// Create a 2D array for the worksheet
			const aoa: (CellValue | null)[][] = Array(maxRow + 1)
				.fill(null)
				.map(() => Array(maxCol + 1).fill(null))

			// Fill in the data
			for (const address of cellAddresses) {
				const { row, col } = cellAddressToCoordinate(address)
				const cell = sheetData[address]
				aoa[row][col] = cell.value
			}

			const worksheet = XLSX.utils.aoa_to_sheet(aoa)

			// Add formulas
			for (const address of cellAddresses) {
				const formula = sheetData[address].formula
				if (formula) {
					const excelAddress = XLSX.utils.encode_cell({
						r: cellAddressToCoordinate(address).row,
						c: cellAddressToCoordinate(address).col,
					})

					if (!worksheet[excelAddress]) {
						worksheet[excelAddress] = { t: "n", v: 0 }
					}

					worksheet[excelAddress].f = formula
				}
			}

			XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
		}

		const fileName = options.fileName || "spreadsheet.xlsx"
		XLSX.writeFile(workbook, fileName, { password: options.password })
	} catch (error) {
		console.error("Error exporting to Excel:", error)
		throw new Error("Failed to export to Excel")
	}
}
