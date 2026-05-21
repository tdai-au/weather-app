import os
import sys
import requests


def get_api_key():
    """Retrieve the OpenWeatherMap API key from environment variables."""
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "Missing environment variable OPENWEATHER_API_KEY. "
            "Set it in your Codespace secrets before running the script."
        )
    return api_key


def fetch_weather(api_key):
    """Call OpenWeatherMap and return the JSON response for Melbourne, Australia."""
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": "Melbourne,AU",
        "appid": api_key,
        "units": "metric",
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
    except requests.exceptions.RequestException as exc:
        raise ConnectionError(
            f"Failed to fetch weather data: {exc}"
        ) from exc

    try:
        return response.json()
    except ValueError as exc:
        raise ValueError("Received invalid JSON from the weather API.") from exc


def parse_weather(data):
    """Extract temperature and weather conditions from the API response."""
    if not isinstance(data, dict):
        raise TypeError("Unexpected API response format.")

    main = data.get("main")
    weather_list = data.get("weather")

    if not main or not isinstance(main, dict):
        raise KeyError("Missing 'main' section in API response.")
    if not weather_list or not isinstance(weather_list, list):
        raise KeyError("Missing 'weather' section in API response.")

    temperature = main.get("temp")
    if temperature is None:
        raise KeyError("Missing temperature value in API response.")

    first_weather = weather_list[0]
    description = first_weather.get("description")
    if not description:
        raise KeyError("Missing weather description in API response.")

    return temperature, description.capitalize()


def main():
    """Main application entry point."""
    try:
        api_key = get_api_key()
        weather_data = fetch_weather(api_key)
        temperature, condition = parse_weather(weather_data)

        print("Current weather for Melbourne, Australia:")
        print(f"Temperature: {temperature:.1f} °C")
        print(f"Conditions: {condition}")
    except (EnvironmentError, ConnectionError, KeyError, TypeError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
