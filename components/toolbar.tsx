"use client"

import type React from "react"

import {
	AlignLeft,
	Bold,
	ChevronDown,
	DollarSign,
	Hash,
	Italic,
	MoreVertical,
	Percent,
	Printer,
	Redo,
	Search,
	Underline,
	Undo,
	TypeIcon as FunctionIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ToolbarButtonProps {
	icon: React.ReactNode
	label: string
	onClick?: () => void
}

function ToolbarButton({ icon, label, onClick }: ToolbarButtonProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClick}>
						{icon}
						<span className="sr-only">{label}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

function Toolbar() {
	const insertFormula = (formula: string) => {
		return formula //TODO:implement
	}

	return (
		<div className="flex items-center px-2 py-1 text-foreground">
			<ToolbarButton icon={<Search className="h-4 w-4" />} label="Search" />
			<ToolbarButton icon={<Undo className="h-4 w-4" />} label="Undo" />
			<ToolbarButton icon={<Redo className="h-4 w-4" />} label="Redo" />
			<ToolbarButton icon={<Printer className="h-4 w-4" />} label="Print" />

			<Separator orientation="vertical" className="mx-1 h-5" />

			<Button variant="outline" className="h-8 px-2 flex gap-1 items-center">
				<span className="text-sm">100%</span>
				<ChevronDown className="h-4 w-4 ml-1" />
			</Button>

			<Separator orientation="vertical" className="mx-1 h-5" />

			<ToolbarButton icon={<DollarSign className="h-4 w-4" />} label="Currency format" />
			<ToolbarButton icon={<Percent className="h-4 w-4" />} label="Percent format" />
			<ToolbarButton icon={<Hash className="h-4 w-4" />} label="Number format" />

			<Separator orientation="vertical" className="mx-1 h-5" />

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8 px-2 flex gap-1 items-center">
						<FunctionIcon className="h-4 w-4" />
						<span className="text-sm">Formula</span>
						<ChevronDown className="h-4 w-4 ml-1" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={() => insertFormula("SUM(A1:A10)")}>SUM</DropdownMenuItem>
					<DropdownMenuItem onClick={() => insertFormula("AVERAGE(A1:A10)")}>AVERAGE</DropdownMenuItem>
					<DropdownMenuItem onClick={() => insertFormula("COUNT(A1:A10)")}>COUNT</DropdownMenuItem>
					<DropdownMenuItem onClick={() => insertFormula("MAX(A1:A10)")}>MAX</DropdownMenuItem>
					<DropdownMenuItem onClick={() => insertFormula("MIN(A1:A10)")}>MIN</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Separator orientation="vertical" className="mx-1 h-5" />

			<Button variant="outline" className="h-8 px-2 flex gap-1 items-center">
				<span className="text-sm">Default</span>
				<ChevronDown className="h-4 w-4 ml-1" />
			</Button>

			<Separator orientation="vertical" className="mx-1 h-5" />

			<Button variant="outline" className="h-8 px-2 flex gap-1 items-center">
				<span className="text-sm">10</span>
				<ChevronDown className="h-3 w-3" />
			</Button>

			<Separator orientation="vertical" className="mx-1 h-5" />

			<ToolbarButton icon={<Bold className="h-4 w-4" />} label="Bold" />
			<ToolbarButton icon={<Italic className="h-4 w-4" />} label="Italic" />
			<ToolbarButton icon={<Underline className="h-4 w-4" />} label="Underline" />

			<Separator orientation="vertical" className="mx-1 h-5" />

			<ToolbarButton icon={<AlignLeft className="h-4 w-4" />} label="Align left" />

			<Separator orientation="vertical" className="mx-1 h-5" />

			<ToolbarButton icon={<MoreVertical className="h-4 w-4" />} label="More options" />
		</div>
	)
}

export default Toolbar
