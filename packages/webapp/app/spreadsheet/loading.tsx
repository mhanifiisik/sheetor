import { Skeleton } from "@/components/ui/skeleton"

export default function SpreadsheetLoading() {
	return (
		<div className="flex-1">
			<header className="flex h-12 shrink-0 items-center gap-2 border-b">
				<div className="flex w-full items-center justify-end px-4 lg:px-6">
					<Skeleton className="h-8 w-8 rounded-md mr-1" />
				</div>
			</header>
			<div className="flex-1 p-4">
				<Skeleton className="h-[80vh] w-full rounded-md" />
			</div>
		</div>
	)
}
