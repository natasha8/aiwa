import { gql } from "@apollo/client";

const fetchWeather = gql`
	query myQuery(
		$current_weather: String
		$daily: String
		$hourly: String
		$latitude: String
		$longitude: String
		$timezone: String
	) {
		myQuery(
			current_weather: $current_weather
			daily: $daily
			hourly: $hourly
			latitude: $latitude
			longitude: $longitude
			timezone: $timezone
		) {
			current_weather {
				is_day
				temperature
				time
				weathercode
				winddirection
				windspeed
			}
			daily {
				apparent_temperature_max
				apparent_temperature_min
				sunrise
				sunset
				temperature_2m_max
				temperature_2m_min
				time
				uv_index_clear_sky_max
				uv_index_max
				weathercode
			}
			daily_units {
				apparent_temperature_max
				apparent_temperature_min
				sunrise
				sunset
				temperature_2m_max
				temperature_2m_min
				time
				uv_index_clear_sky_max
				uv_index_max
				weathercode
			}
			elevation
			generationtime_ms
			hourly {
				is_day
				precipitation
				precipitation_probability
				rain
				relativehumidity_2m
				showers
				snow_depth
				snowfall
				temperature_2m
				time
				uv_index
				uv_index_clear_sky
				windgusts_10m
				apparent_temperature
			}
			hourly_units {
				apparent_temperature
				is_day
				precipitation
				precipitation_probability
				rain
				relativehumidity_2m
				showers
				snow_depth
				snowfall
				temperature_2m
				time
				uv_index
				uv_index_clear_sky
				windgusts_10m
			}
			latitude
			longitude
			timezone
			timezone_abbreviation
			utc_offset_seconds
		}
	}
`;
