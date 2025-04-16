import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FileUp, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import LoadingIndicator from "../ui/loading-indicator"

export const LandingPage = () => {
	return (
		<div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
			<div className="max-w-2xl w-full space-y-8">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">AI-Powered Spreadsheet</h1>
					<p className="text-muted-foreground text-lg">
						Create and analyze spreadsheets with the power of AI
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Plus className="h-5 w-5" />
								New Spreadsheet
							</CardTitle>
							<CardDescription>
								Start with a fresh spreadsheet and let AI help you analyze and format your data
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/spreadsheet ">
								<Button variant="outline" className="w-full">
									Create new <LoadingIndicator />
								</Button>
							</Link>
						</CardContent>
					</Card>

					<Card className="hover:shadow-lg transition-shadow">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<FileUp className="h-5 w-5" />
								Upload Spreadsheet
							</CardTitle>
							<CardDescription>
								Upload your existing spreadsheet and enhance it with AI-powered features
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Input type="file" accept=".xlsx,.xls,.csv" className="cursor-pointer" />
							<Button className="w-full" variant="outline">
								Upload & Analyze
							</Button>
						</CardContent>
					</Card>
				</div>

				<div className="text-center text-sm text-muted-foreground">
					<p className="flex items-center justify-center gap-2">
						<Sparkles className="h-4 w-4" />
						Powered by AI for smarter spreadsheet management
					</p>
				</div>
			</div>
		</div>
	)
}
