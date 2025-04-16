import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.tsx"),
			name: "Spreadsheet",
			fileName: format => `index.${format === "es" ? "js" : format}`,
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "jsxRuntime",
				},
			},
		},
	},
})
