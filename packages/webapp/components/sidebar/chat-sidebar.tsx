"use client"

import * as React from "react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar"

function SideBar({ side = "right", ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar side={side} collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
							LOGO
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>Content</SidebarContent>
			<SidebarFooter>Footer</SidebarFooter>
		</Sidebar>
	)
}
export default SideBar
