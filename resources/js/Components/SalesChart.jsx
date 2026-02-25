import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesChart = ({ data, title, type = 'line', color = '#10b981' }) => {
    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
                <div className="text-center py-8 text-gray-500">
                    No data available
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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const formatMonth = (monthString) => {
        const date = new Date(monthString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    const chartData = {
        labels: data.map(item => item.date ? formatDate(item.date) : formatMonth(item.month)),
        datasets: [
            {
                label: 'Sales',
                data: data.map(item => parseFloat(item.total || item.value || 0)),
                borderColor: color,
                backgroundColor: type === 'bar' ? color : `${color}20`,
                borderWidth: 2,
                fill: type === 'bar' ? true : false,
                tension: 0.1,
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
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += formatCurrency(context.parsed.y);
                        }
                        return label;
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

    const ChartComponent = type === 'bar' ? Bar : Line;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
            <div style={{ height: '300px' }}>
                <ChartComponent data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SalesChart;
