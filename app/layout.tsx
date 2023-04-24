import { Bebas_Neue } from "next/font/google";
import "./globals.css";
const bn = Bebas_Neue({
	weight: ["400"],
	subsets: ["latin"],
});

export const metadata = {
	title: "AIWA",
	description: "AI Weather App",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={bn.className }>{children}</body>
		</html>
	);
}
