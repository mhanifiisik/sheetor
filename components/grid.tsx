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

interface GridProps {
	data: Data[]
}

export default function Grid(props: GridProps) {
	return (
		<div className="w-full h-full absolute inset-0">
			<HotTable
				data={[]}
				colWidths={[]}
				colHeaders={[]}
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
				height="100%"
				width="100%"
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
