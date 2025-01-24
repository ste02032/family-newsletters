import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Authentication from './Components/Authentication';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Components/Contacts';
import Families from './Components/Families';
import NewsletterDefinitionList from './Components/NewsletterDefinitionList';
import SystemSettings from './Components/SystemSettings';
import Newsletters from './Components/Newsletters';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <Navbar />
            <Authentication />
            <div>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/families" element={<Families />} />
                    <Route path="/newsletter-definitions" element={<NewsletterDefinitionList />} />
                    <Route path="/system-settings" element={<SystemSettings />} />
                    <Route path="/newsletters" element={<Newsletters />} />
                </Routes>
            </div>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        if (response.ok) {
            const data = await response.json();
            setForecasts(data);
        }
    }
}

export default App;