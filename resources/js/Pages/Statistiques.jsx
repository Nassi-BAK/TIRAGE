import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { usePage } from '@inertiajs/react';

// Palette de couleurs plus harmonieuse et professionnelle
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Statistiques() {
    const { data, totalUsers } = usePage().props;
    const [chartType, setChartType] = useState('pie'); // État pour basculer entre les types de graphiques

    // Vérification et formatage des données
    const formattedData = Array.isArray(data) ? data.map((item, index) => ({
        name: item.nom || 'Sans nom',
        value: item.total_users || 0,
        percentage: totalUsers > 0 ? ((item.total_users / totalUsers) * 100).toFixed(2) : 0,
        color: COLORS[index % COLORS.length]
    })) : [];

    // Personnalisation du label du graphique en camembert
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius * 1.1;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text 
                x={x} 
                y={y} 
                fill={COLORS[index % COLORS.length]}
                textAnchor={x > cx ? 'start' : 'end'} 
                dominantBaseline="central"
                fontSize="12"
                fontWeight="500"
            >
                {`${name}: ${percent * 100}%`}
            </text>
        );
    };

    // Calcul des statistiques de base
    const totalDestinations = formattedData.length;
    const topDestination = formattedData.length > 0 ? 
        formattedData.reduce((prev, current) => (prev.value > current.value) ? prev : current) : 
        { name: 'N/A', value: 0, percentage: 0 };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Statistiques des destinations</h2>
                
                {/* Sélecteur de type de graphique */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg dark:bg-gray-700">
                    <button 
                        onClick={() => setChartType('pie')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            chartType === 'pie' 
                                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' 
                                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                        }`}
                    >
                        Camembert
                    </button>
                    <button 
                        onClick={() => setChartType('bar')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            chartType === 'bar' 
                                ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600 dark:text-blue-400' 
                                : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                        }`}
                    >
                        Barres
                    </button>
                </div>
            </div>
            
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 dark:bg-gray-700 dark:border-gray-600">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total des utilisateurs</p>
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{totalUsers}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 dark:bg-gray-700 dark:border-gray-600">
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Destinations disponibles</p>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-300">{totalDestinations}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 dark:bg-gray-700 dark:border-gray-600">
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Destination la plus populaire</p>
                    <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">{topDestination.name}</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">{topDestination.percentage}% des utilisateurs</p>
                </div>
            </div>

            {formattedData.length > 0 ? (
                <div className="relative">
                    {/* Panneau de visualisation */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                {chartType === 'pie' ? (
                                    <PieChart>
                                        <Pie
                                            data={formattedData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={renderCustomizedLabel}
                                            outerRadius={140}
                                            fill="#8884d8"
                                            dataKey="value"
                                            animationDuration={1000}
                                            animationBegin={0}
                                            animationEasing="ease"
                                        >
                                            {formattedData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} 
                                                    stroke="#fff"
                                                    strokeWidth={2}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '8px 12px'
                                            }}
                                            formatter={(value, name, props) => [
                                                `${value} utilisateurs (${props.payload.percentage}%)`,
                                                props.payload.name
                                            ]}
                                            labelStyle={{ fontWeight: 'bold' }}
                                        />
                                        <Legend 
                                            layout="horizontal"
                                            verticalAlign="bottom"
                                            align="center"
                                            iconType="circle"
                                            iconSize={10}
                                            wrapperStyle={{ paddingTop: '20px' }}
                                        />
                                    </PieChart>
                                ) : (
                                    <BarChart
                                        data={formattedData}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            angle={-45} 
                                            textAnchor="end"
                                            height={70}
                                            tickMargin={25}
                                        />
                                        <YAxis name="Utilisateurs" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                border: 'none',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '8px 12px'
                                            }}
                                            formatter={(value) => [`${value} utilisateurs`, 'Total']}
                                        />
                                        <Bar 
                                            dataKey="value" 
                                            name="Utilisateurs" 
                                            animationDuration={1500}
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {formattedData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={COLORS[index % COLORS.length]} 
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-center text-gray-500 dark:text-gray-300 text-lg">Aucune donnée disponible</p>
                    <p className="text-center text-gray-400 dark:text-gray-400 mt-2">Les statistiques apparaîtront ici une fois que des utilisateurs auront choisi leurs destinations.</p>
                </div>
            )}
            
            {/* Tableau de données */}
            {formattedData.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">Détails des destinations</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-600 dark:text-gray-300">Destination</th>
                                    <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-600 dark:text-gray-300">Utilisateurs</th>
                                    <th className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-600 dark:text-gray-300">Pourcentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formattedData.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">{item.value}</td>
                                        <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">{item.percentage}%</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-50 dark:bg-gray-700">
                                    <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-500 font-medium">Total</td>
                                    <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-500 font-medium">{totalUsers}</td>
                                    <td className="py-3 px-4 border-t-2 border-gray-300 dark:border-gray-500 font-medium">100%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}