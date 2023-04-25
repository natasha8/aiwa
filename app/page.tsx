"use client";

import CityPicker from "@/components/CityPicker";
import { Card, Text, Title, Subtitle } from "@tremor/react";

export default function Home() {
	return (
		<main className="w-screen h-screen bg-clouds flex flex-col justify-center items-center text-6xl">
			<Card className="h-screen xl:h-auto max-w-xl mx-auto font-extrabold tracking-widest text-center bg-opacity-40">
				<Title className="text-8xl font-bold text-center mb-4 text-[#294572]">
					AIWA
				</Title>
				<Text className="text-3xl text-[#1D2951]">
					your AI Weather Checker
				</Text>
				<Subtitle className="text-blue-200 -tracking-normal">
					Powered by OpenAi, Next.js, Tailwind, Tremor
				</Subtitle>

				<Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E] text-xl mt-8">
					<CityPicker />
				</Card>
			</Card>
		</main>
	);
}
