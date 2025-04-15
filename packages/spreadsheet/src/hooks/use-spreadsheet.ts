import { useState, useCallback } from "react"
import type { Cell, SpreadsheetData, ImportOptions, ExportOptions, CellCoordinate } from "../types"
import { importFromExcel, exportToExcel, coordinateToCellAddress, cellAddressToCoordinate } from "../utils/excel"

interface UseSpreadsheetOptions {
	initialData?: SpreadsheetData
}

export function useSpreadsheet(options: UseSpreadsheetOptions = {}) {
	const [data, setData] = useState<SpreadsheetData>(options.initialData || { Sheet1: {} })
	const [activeSheet, setActiveSheet] = useState<string>(
		Object.keys(options.initialData || { Sheet1: {} })[0] || "Sheet1",
	)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<Error | null>(null)

	const getCell = useCallback(
		(coord: CellCoordinate | string): Cell | undefined => {
			let address: string

			if (typeof coord === "string") {
				address = coord
			} else {
				address = coordinateToCellAddress(coord)
			}

			return data[activeSheet]?.[address]
		},
		[data, activeSheet],
	)

	const setCellValue = useCallback(
		(coord: CellCoordinate | string, value: Cell["value"], formula?: string) => {
			let address: string

			if (typeof coord === "string") {
				address = coord
			} else {
				address = coordinateToCellAddress(coord)
			}

			setData(prevData => {
				const sheetData = prevData[activeSheet] ? { ...prevData[activeSheet] } : {}

				sheetData[address] = {
					...sheetData[address],
					value,
					...(formula !== undefined ? { formula } : {}),
				}

				return {
					...prevData,
					[activeSheet]: sheetData,
				}
			})
		},
		[activeSheet],
	)

	const setCellStyle = useCallback(
		(coord: CellCoordinate | string, style: Cell["style"]) => {
			let address: string

			if (typeof coord === "string") {
				address = coord
			} else {
				address = coordinateToCellAddress(coord)
			}

			setData(prevData => {
				const sheetData = prevData[activeSheet] ? { ...prevData[activeSheet] } : {}
				const currentCell = sheetData[address] || { value: null }

				sheetData[address] = {
					...currentCell,
					style: {
						...currentCell.style,
						...style,
					},
				}

				return {
					...prevData,
					[activeSheet]: sheetData,
				}
			})
		},
		[activeSheet],
	)

	const addSheet = useCallback(
		(sheetName: string) => {
			if (data[sheetName]) {
				throw new Error(`Sheet "${sheetName}" already exists`)
			}

			setData(prevData => ({
				...prevData,
				[sheetName]: {},
			}))

			setActiveSheet(sheetName)
		},
		[data],
	)

	const removeSheet = useCallback(
		(sheetName: string) => {
			if (!data[sheetName]) {
				throw new Error(`Sheet "${sheetName}" does not exist`)
			}

			if (Object.keys(data).length <= 1) {
				throw new Error("Cannot remove the last sheet")
			}

			setData(prevData => {
				const newData = { ...prevData }
				delete newData[sheetName]
				return newData
			})

			if (activeSheet === sheetName) {
				const remainingSheets = Object.keys(data).filter(s => s !== sheetName)
				setActiveSheet(remainingSheets[0])
			}
		},
		[data, activeSheet],
	)

	const renameSheet = useCallback(
		(oldName: string, newName: string) => {
			if (!data[oldName]) {
				throw new Error(`Sheet "${oldName}" does not exist`)
			}

			if (data[newName]) {
				throw new Error(`Sheet "${newName}" already exists`)
			}

			setData(prevData => {
				const newData = { ...prevData }
				newData[newName] = newData[oldName]
				delete newData[oldName]
				return newData
			})

			if (activeSheet === oldName) {
				setActiveSheet(newName)
			}
		},
		[data, activeSheet],
	)

	const importData = useCallback(async (file: File, importOptions: ImportOptions = {}) => {
		setIsLoading(true)
		setError(null)

		try {
			const importedData = await importFromExcel(file, importOptions)
			setData(importedData)

			const firstSheet = Object.keys(importedData)[0]
			if (firstSheet) {
				setActiveSheet(firstSheet)
			}
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Failed to import data"))
		} finally {
			setIsLoading(false)
		}
	}, [])

	const exportData = useCallback(
		(exportOptions: ExportOptions = {}) => {
			setError(null)

			try {
				exportToExcel(data, exportOptions)
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Failed to export data"))
			}
		},
		[data],
	)

	const clearSheet = useCallback(() => {
		setData(prevData => ({
			...prevData,
			[activeSheet]: {},
		}))
	}, [activeSheet])

	const clearAll = useCallback(() => {
		const emptySheets = Object.keys(data).reduce((acc, sheetName) => {
			acc[sheetName] = {}
			return acc
		}, {} as SpreadsheetData)

		setData(emptySheets)
	}, [data])

	return {
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
	}
}
