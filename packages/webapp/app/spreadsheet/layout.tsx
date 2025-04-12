import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import SideBar from "@/components/sidebar/chat-sidebar"

export default function SpreadsheetLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider>
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-mr-1 ml-auto rotate-180" />
				</header>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-2">{children}</div>
			</SidebarInset>
			<SideBar side="right" />
		</SidebarProvider>
	)
}
