"use client"

import { Button } from "@/components/ui/button"

export default function SpreadsheetError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
			<h2 className="text-2xl font-bold">Something went wrong!</h2>
			<p className="text-muted-foreground text-center">{error.message || "An unexpected error occurred"}</p>
			<Button onClick={reset}>Try again</Button>
		</div>
	)
}
