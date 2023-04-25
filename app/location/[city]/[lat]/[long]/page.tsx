import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityCharts from "@/components/HumidityCharts";
import InfoPanel from "@/components/InfoPanel";
import RainCharts from "@/components/RainCharts";
import StatusCard from "@/components/StatusCard";
import TempCharts from "@/components/TempCharts";
import fetchWeather from "@/graphql/queries/fetchWeather";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import { Divider } from "@tremor/react";

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

	const { data } = await client.query({
		query: fetchWeather,
		variables: {
			current_weather: "true",
			longitude: long,
			latitude: lat,
			timezone: "GMT",
		},
	});

	const results: Root = data.myQuery;

	const dataToSend = cleanData(results, city);
	//console.log("TOSEND:", dataToSend);

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
		<div className="flex flex-col min-h-screen xl:flex-row bg-clouds tracking-wider">
			<InfoPanel city={city} long={long} lat={lat} results={results} />
			<div className="flex-1 p-5 lg:p-10">
				<div className="p-5">
					<div className="pb-5">
						<h2 className="text-3xl font-bold">Todays Overview</h2>
						<p className="text-sm text-gray-400">
							Last Updated at:{" "}
							{new Date(
								results.current_weather.time
							).toLocaleString()}{" "}
							({results.timezone})
						</p>
					</div>
					<div className="m-2">
						<CalloutCard message={content} />
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
								metric={results.daily.uv_index_max[0].toFixed(
									1
								)}
								color="yellow"
							/>
							{Number(results.daily.uv_index_max[0].toFixed(1)) >
								5 && (
								<CalloutCard
									message={
										"The UV is high today, be sure to wear SPF!"
									}
									warning
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
				</div>
				<Divider className="w-11/12" />
				<div className="space-y-3 px-4">
					<TempCharts results={results} />
					<RainCharts results={results} />
					<HumidityCharts results={results} />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
