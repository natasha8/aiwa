"use client";
import CityPicker from "@/components/CityPicker";
import weatherCodeToString from "@/lib/weatherCodeToString";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import { Divider } from "@tremor/react";
import Image from "next/image";

type Props = {
	city: string;
	results: Root;
	lat: string;
	long: string;
	timezone: Timezone;
};
async function InfoPanel({ city, lat, long, results, timezone }: Props) {
	console.log(timezone);
	return (
		<div className="bg-white/20 xl:w-1/5 p-8 ">
			<div className="pb-5">
				<h1 className="text-4xl font-bold">{decodeURI(city)}</h1>
				<p className="text-xs text-gray-400">
					Long/Lat: {long}, {lat}
				</p>
			</div>
			<CityPicker />
			<Divider />
			<div className="flex flex-col justify-between items-center space-x-8 bg-white/40 p-2 rounded-md shadow-2xl">
				<div className="w-full">
					<p className="text-xl">
						{new Date().toLocaleString("en-Gb", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className="font-extralight">
						Timezone: {timezone.timezoneId}
					</p>
					<p className="text-3xl font-bold uppercase">
						{new Date(timezone.time).toLocaleTimeString("en-GB", {
							hour: "numeric",
							minute: "numeric",
							hour12: true,
						})}
					</p>
				</div>
			</div>
			<Divider />
			<div className="w-full flex justify-between items-center bg-white/40 px-2 rounded-md shadow-2xl">
				<div className="w-full flex justify-between">
					<Image
						src={`https:www.weatherbit.io/static/img/icons/${
							weatherCodeToString[
								results.current_weather.weathercode
							].icon
						}.png`}
						alt={
							weatherCodeToString[
								results.current_weather.weathercode
							].label
						}
						width={75}
						height={75}
					/>
					<div className="w-full flex flex-col items-end justify-center px-2">
						<p className="text-4xl font-semibold">
							{results.current_weather.temperature.toFixed(1)}°C
						</p>

						<p className="text-right font-extralight hidden xl:inline">
							{
								weatherCodeToString[
									results.current_weather.weathercode
								].label
							}
						</p>
					</div>
				</div>
			</div>
			<div className="space-y-2 py-4">
				<div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
					<SunIcon className="h-10 w-10 text-gray-400" />

					<div className="flex-1 flex justify-between items-center">
						<p className="font-extralight">Sunrise</p>
						<p className="uppercase text-2xl">
							{new Date(timezone.sunrise).toLocaleTimeString(
								"en-GB",
								{
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								}
							)}
						</p>
					</div>
				</div>
				<div className="flex items-center space-x-2 px-4 py-3 border border-[#6F90CD] rounded-md bg-[#405885]">
					<MoonIcon className="h-10 w-10 text-gray-400" />

					<div className="flex-1 flex justify-between items-center">
						<p className="font-extralight">Sunset</p>
						<p className="uppercase text-2xl">
							{new Date(timezone.sunset).toLocaleTimeString(
								"en-GB",
								{
									hour: "numeric",
									minute: "numeric",
									hour12: true,
								}
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoPanel;
