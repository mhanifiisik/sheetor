import Toolbar from "./toolbar"
import { SidebarTrigger } from "./ui/sidebar"

function Header() {
	return (
		<header className="flex w-full h-12 items-center gap-2 border-b px-4">
			<Toolbar />
			<SidebarTrigger className="-mr-1 ml-auto rotate-180 hover:cursor-pointer" />
		</header>
	)
}
export default Header
