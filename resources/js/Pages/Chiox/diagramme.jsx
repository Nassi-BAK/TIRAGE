import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

export default function DestinationStats() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/destination-stats').then(response => {
            setData(response.data);
        });
    }, []);

    return (
        <div className="flex flex-col items-center mt-6">
            <h2 className="text-xl font-bold mb-4">Destinations les plus choisies (1er choix)</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    dataKey="value"
                    nameKey="name"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
