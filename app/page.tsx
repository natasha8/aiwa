"use client";

import CityPicker from "@/components/CityPicker";
import { Card, Text, Title, Subtitle, Divider } from "@tremor/react";

export default function Home() {
	return (
		<main className="w-screen h-screen bg-clouds flex flex-col justify-center items-center text-6xl">
			<Card className="max-w-4xl mx-auto font-extrabold tracking-widest text-center">
				<Title className="text-8xl font-bold text-center mb-4 text-">
					AIWA
				</Title>
				<Text className="text-3xl">your AI Weather Checker</Text>
				<Subtitle className="">
					Powered by OpenAi, Next.js, Tailwind, Tremor
				</Subtitle>

				<Divider className="my-12" />
				<Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-xl">
					<CityPicker />
				</Card>
			</Card>
		</main>
	);
}
