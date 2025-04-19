import * as React from "react"

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar"
import ChatBar from "../chatbar"

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent className="p-2">
				<ChatBar />
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}

export default AppSidebar
