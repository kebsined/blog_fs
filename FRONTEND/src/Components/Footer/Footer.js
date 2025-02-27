import { useEffect, useState } from 'react';
import { WeatherInfo, Info, DateNow } from './Components';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Minsk&units=metric&lang=ru&appid=981e576f8e69f05c0c195829b4f32951',
		)
			.then((response) => response.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<footer className={className}>
			<Info />
			<WeatherInfo>
				<DateNow />
				<div>Населенный пункт: {city}</div>
				<div>
					Температура: {temperature}&deg;C, {weather}
				</div>
			</WeatherInfo>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	bottom: 0;
	width: 1100px;
	height: 130px;
	box-shadow: 0 0 30px #000;
	background-color: #fbf5df;
	display: flex;
	justify-content: space-between;
	padding: 0 73px 0 53px;
	align-items: center;
	/* position: relative; */
`;
