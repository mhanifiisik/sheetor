import React from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BarChart3, Sigma, Paintbrush, Save, FileUp, FileDown, Table2 } from "lucide-react"

interface ToolbarProps {
	onAnalyze: () => void
	onGenerate: () => void
	onFormat: () => void
	onSave?: () => void
	onImport?: () => void
	onExport?: () => void
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAnalyze, onGenerate, onFormat, onSave, onImport, onExport }) => {
	return (
		<div className="flex items-center gap-2 p-2 border-b">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={onSave}>
					<Save className="h-4 w-4 mr-2" />
					Save
				</Button>
				<Button variant="outline" size="sm" onClick={onImport}>
					<FileUp className="h-4 w-4 mr-2" />
					Import
				</Button>
				<Button variant="outline" size="sm" onClick={onExport}>
					<FileDown className="h-4 w-4 mr-2" />
					Export
				</Button>
			</div>
			<Separator orientation="vertical" className="h-6" />
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={onAnalyze}>
					<BarChart3 className="h-4 w-4 mr-2" />
					Analyze
				</Button>
				<Button variant="outline" size="sm" onClick={onGenerate}>
					<Sigma className="h-4 w-4 mr-2" />
					Generate
				</Button>
				<Button variant="outline" size="sm" onClick={onFormat}>
					<Paintbrush className="h-4 w-4 mr-2" />
					Format
				</Button>
			</div>
		</div>
	)
}
