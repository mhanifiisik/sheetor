import { useMemo } from "react"

export interface Data {
	[key: number]: {
		companyName: string
		country: string
		name: string
		sellDate: string
		orderId: string
		inStock: boolean
		quantity: number
		progress: number
		rating: number
	}
}

const companies = [
	"Tagcat",
	"Zoomzone",
	"Meeveo",
	"Buzzdog",
	"Katz",
	"Jaxbean",
	"Wikido",
	"Browsedrive",
	"Twinder",
	"Jetwire",
]
const countries = [
	"United Kingdom",
	"Indonesia",
	"United States",
	"Philippines",
	"India",
	"China",
	"Brazil",
	"Egypt",
	"Russia",
	"Thailand",
]
const products = [
	"Classic Vest",
	"Cycling Cap",
	"Full-Finger Gloves",
	"HL Mountain Frame",
	"Half-Finger Gloves",
	"HL Road Frame",
	"HL Touring Frame",
	"LL Mountain Frame",
	"LL Road Frame",
	"LL Touring Frame",
]

const generateRandomDate = () => {
	const start = new Date(2020, 0, 1)
	const end = new Date(2020, 11, 31)
	const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
	return date.toLocaleDateString("en-GB")
}

const generateRandomId = () => {
	return `${Math.floor(Math.random() * 100)
		.toString()
		.padStart(2, "0")}-${Math.floor(Math.random() * 1000000)
		.toString()
		.padStart(7, "0")}`
}

const generateRandomData = () => {
	const data = useMemo(() => {
		return Array.from({ length: 100 }, () => [
			Math.random() > 0.5,
			companies[Math.floor(Math.random() * companies.length)],
			countries[Math.floor(Math.random() * countries.length)],
			products[Math.floor(Math.random() * products.length)],
			generateRandomDate(),
			generateRandomId(),
			Math.random() > 0.3,
			Math.floor(Math.random() * 200).toString(),
			Math.floor(Math.random() * 10) + 1,
			Math.floor(Math.random() * 5) + 1,
		])
	}, [])
	return data
}

export default generateRandomData
