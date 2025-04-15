export type CellValue = string | number | boolean | null

export interface Cell {
	value: CellValue
	formula?: string
	style?: CellStyle
}

export interface CellStyle {
	fontWeight?: "normal" | "bold"
	fontStyle?: "normal" | "italic"
	textDecoration?: "none" | "underline"
	textAlign?: "left" | "center" | "right"
	backgroundColor?: string
	color?: string
	border?: string
}

export interface SpreadsheetData {
	[sheet: string]: {
		[cellAddress: string]: Cell
	}
}

export interface ImportOptions {
	type?: "xlsx" | "csv"
	sheetName?: string
	password?: string
}

export interface ExportOptions {
	type?: "xlsx" | "csv"
	sheetName?: string
	password?: string
	fileName?: string
}

export type CellCoordinate = {
	row: number
	col: number
}

export type CellRange = {
	start: CellCoordinate
	end: CellCoordinate
}
