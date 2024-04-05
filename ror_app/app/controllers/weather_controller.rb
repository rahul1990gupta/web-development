class WeatherController < ApplicationController
  def index
    city = params[:city] || 'Jaipur'
    # Get the weather data from the OpenWeather API
    response = HTTParty.get("https://api.openweathermap.org/data/2.5/weather?q=#{city}&appid=#{ENV['OPEN_WEATHER_API_KEY']}")
    @weather_data = JSON.parse(response.body)
    @weather = {
      humidity: @weather_data['main']['humidity'],
      temperature: @weather_data['main']['temp'],
      condition: @weather_data['weather'][0]['description'],
      icon: @weather_data['weather'][0]['icon']
    }
  end
end
