export const mockData = {
    stats: {
        totalCollected: 12540,
        recyclingRate: 72,
        activeVolunteers: 345,
        carbonSaved: 4200
    },
    wasteTrends: [
        { day: 'Day 1', organic: 1200, recyclable: 800, residual: 500 },
        { day: 'Day 2', organic: 1800, recyclable: 1100, residual: 620 },
        { day: 'Day 3', organic: 2400, recyclable: 1500, residual: 800 },
        { day: 'Day 4', organic: 1900, recyclable: 1200, residual: 650 },
        { day: 'Day 5', organic: 800, recyclable: 600, residual: 300 }
    ],
    predictions: [
        { time: '12:00', predicted: 450, actual: 420 },
        { time: '14:00', predicted: 850, actual: 910 },
        { time: '16:00', predicted: 1200, actual: 1150 },
        { time: '18:00', predicted: 1500, actual: null },
        { time: '20:00', predicted: 2100, actual: null },
        { time: '22:00', predicted: 2600, actual: null }
    ],
    zones: [
        { name: 'Main Stage', status: 'critical', fillLevel: 85 },
        { name: 'Food Court', status: 'warning', fillLevel: 65 },
        { name: 'Camping A', status: 'good', fillLevel: 30 },
        { name: 'Entrance', status: 'good', fillLevel: 45 }
    ],
    comparison: [
        { year: '2022', total: 32000, recyclingRate: 55 },
        { year: '2023', total: 28000, recyclingRate: 64 },
        { year: '2024', total: 24500, recyclingRate: 72 }
    ]
};
