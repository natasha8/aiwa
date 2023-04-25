import { getClient } from "@/apollo-client";
import HumidityCharts from "@/components/HumidityCharts";
import InfoPanel from "@/components/InfoPanel";
import RainCharts from "@/components/RainCharts";
import StatusCard from "@/components/StatusCard";
import TempCharts from "@/components/TempCharts";
import fetchWeather from "@/graphql/queries/fetchWeather";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import { Callout, Divider } from "@tremor/react";
import Summary from "@/components/Summary";
import { ExclamationIcon } from "@heroicons/react/solid";

import { getTimeZone } from "@/lib/getTimeZone";
import { useEffect, useState } from "react";

export const revalidate = 60;

type Props = {
	params: {
		city: string;
		lat: string;
		long: string;
	};
};

async function HomePage({ params: { city, lat, long } }: Props) {
	const client = getClient();
	const timezone: Timezone = await getTimeZone({ lat, long });

	const { data } = await client.query({
		query: fetchWeather,
		variables: {
			current_weather: "true",
			longitude: long,
			latitude: lat,
			timezone: timezone.timezoneId,
		},
	});

	const results: Root = data.myQuery;

	const dataToSend = cleanData(results, city);
	console.log("TOSEND:", dataToSend);

	const res = await fetch(`${getBasePath()}/api/getSummary`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			weatherData: dataToSend,
		}),
	});
	if (!res.ok) {
		console.error(`HTTP error ${res.status}`);
	}

	const GPTdata = await res.json();

	const { content } = GPTdata;

	return (
		<div className="flex flex-col min-h-screen xl:flex-row bg-clouds tracking-wider scrollbar-hide">
			{timezone && (
				<InfoPanel
					city={city}
					long={long}
					lat={lat}
					results={results}
					timezone={timezone}
				/>
			)}
			<div className="flex-1 px-6 py-3">
				<div className="p-4 bg-white/50 rounded-md mx-2">
					<h2 className="text-2xl xl:text-6xl font-bold">
						Todays Overview
					</h2>
					<p className="text-sm text-gray-800 pl-1">
						Last Updated at:{" "}
						{new Date(
							results.current_weather.time
						).toLocaleString()}{" "}
						({results.timezone})
					</p>
				</div>
				<div className="m-2">
					<Summary message={content} />
				</div>
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
					<StatusCard
						title="Max Temperature"
						metric={`${results.daily.temperature_2m_max[0].toFixed(
							1
						)}°`}
						color="red"
					/>

					<StatusCard
						title="Min Temperature"
						metric={`${results.daily.temperature_2m_min[0].toFixed(
							1
						)}°`}
						color="teal"
					/>

					<div>
						<StatusCard
							title="UV Index"
							metric={results.daily.uv_index_max[0].toFixed(1)}
							color="yellow"
						/>
						{Number(results.daily.uv_index_max[0].toFixed(1)) >
							5 && (
							<Callout
								className="h-12 mt-4"
								icon={ExclamationIcon}
								color="rose"
								title={
									"The UV is high today, be sure to wear SPF!"
								}
							/>
						)}
					</div>

					<div className="flex space-x-3">
						<StatusCard
							title="Wind Speed"
							metric={`${results.current_weather.windspeed.toFixed(
								1
							)}m/s`}
							color="cyan"
						/>

						<StatusCard
							title="Wind Direction"
							metric={`${results.current_weather.winddirection.toFixed(
								1
							)}°`}
							color="violet"
						/>
					</div>
				</div>

				<Divider className="w-11/12" />
				<div className="space-y-3 px-2">
					<TempCharts results={results} />
					<RainCharts results={results} />
					<HumidityCharts results={results} />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
