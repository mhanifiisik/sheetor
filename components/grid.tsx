"use client"

import {
	AutoColumnSize,
	Autofill,
	ContextMenu,
	CopyPaste,
	DropdownMenu,
	Filters,
	HiddenRows,
	registerPlugin,
} from "handsontable/plugins"

import { CheckboxCellType, NumericCellType, registerCellType } from "handsontable/cellTypes"
import { HotTable, HotColumn } from "@handsontable/react"

import "handsontable/styles/handsontable.min.css"
import "handsontable/styles/ht-theme-main.min.css"

import type { Data } from "@/app/data"

registerCellType(CheckboxCellType)
registerCellType(NumericCellType)

registerPlugin(AutoColumnSize)
registerPlugin(Autofill)
registerPlugin(ContextMenu)
registerPlugin(CopyPaste)
registerPlugin(DropdownMenu)
registerPlugin(Filters)
registerPlugin(HiddenRows)

type GridProps = {
	data: Data
}

export default function Grid(props: GridProps) {
	return (
		<div className="w-full h-screen">
			<HotTable
				data={props.data}
				colWidths={[140, 126, 192, 100, 100, 90, 90, 110, 97]}
				colHeaders={[
					"Company name",
					"Country",
					"Name",
					"Sell date",
					"Order ID",
					"In stock",
					"Qty",
					"Progress",
					"Rating",
				]}
				dropdownMenu={true}
				contextMenu={true}
				filters={true}
				rowHeaders={true}
				manualRowMove={true}
				navigableHeaders={true}
				autoWrapRow={true}
				autoWrapCol={true}
				imeFastEdit={true}
				licenseKey="non-commercial-and-evaluation"
				height={800}
			>
				<HotColumn data={1} />
				<HotColumn data={2} />
				<HotColumn data={3} />
				<HotColumn data={5} />
				<HotColumn data={6} type="checkbox" className="htCenter" />
				<HotColumn data={7} type="numeric" />
				<HotColumn data={8} readOnly={true} className="htMiddle" />
				<HotColumn data={9} readOnly={true} className="htCenter" />
			</HotTable>
		</div>
	)
}
