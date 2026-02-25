import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TopJuicesChart = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Juices</h3>
                <div className="text-center py-8 text-gray-500">
                    No sales data available
                </div>
            </div>
        );
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF'
        }).format(value);
    };

    const colors = [
        '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6',
        '#06b6d4', '#8b5a2b', '#ec4899', '#14b8a6', '#f97316'
    ];

    const chartData = {
        labels: data.map(juice => juice.name),
        datasets: [
            {
                label: 'Units Sold',
                data: data.map(juice => parseFloat(juice.total_sold || 0)),
                backgroundColor: colors.slice(0, data.length),
                borderColor: colors.slice(0, data.length),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    afterLabel: function(context) {
                        const juice = data[context.dataIndex];
                        return [
                            `Sold: ${juice.total_sold} units`,
                            `Revenue: ${formatCurrency(parseFloat(juice.revenue))}`,
                        ];
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Juices</h3>
            <div style={{ height: '300px' }}>
                <Bar data={chartData} options={options} />
            </div>
            <div className="mt-4 space-y-2">
                {data.map((juice, index) => (
                    <div key={juice.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                            <div 
                                className="w-4 h-4 rounded" 
                                style={{ backgroundColor: colors[index % colors.length] }}
                            />
                            <span className="text-sm font-medium text-gray-900">{juice.name}</span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">{juice.total_sold} sold</div>
                            <div className="text-xs text-gray-500">{formatCurrency(parseFloat(juice.revenue))}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopJuicesChart;
