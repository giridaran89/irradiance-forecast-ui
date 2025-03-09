import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Input, Button } from "@/components/ui/button";

export default function IrradianceForecast() {
    const [city, setCity] = useState("Chennai");
    const [lat, setLat] = useState(13.0827);
    const [lon, setLon] = useState(80.2707);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(`https://yourapp-name.up.railway.app/forecast?city=${city}&lat=${lat}&lon=${lon}`);
        const result = await response.json();
        setData(result.forecast);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Solar Irradiance Forecast</h2>
            <div className="flex gap-2 mb-4">
                <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <Input type="number" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
                <Input type="number" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="Longitude" />
                <Button onClick={fetchData} disabled={loading}>{loading ? "Loading..." : "Get Forecast"}</Button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tickFormatter={(tick) => tick.split(" ")[1]} />
                    <YAxis label={{ value: 'W/m²', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="irradiance_wm2" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
