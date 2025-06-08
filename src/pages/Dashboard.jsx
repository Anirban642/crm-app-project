import React from 'react';
import { Paper, Typography, Box, Grid, useTheme } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const theme = useTheme();

  // Bar chart data (Monthly Sales)
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [120, 190, 300, 250, 220, 280, 350, 400],
        backgroundColor: theme.palette.mode === 'dark' ? '#90caf9' : '#1976d2',
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary,
          font: { weight: 'bold' },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        ticks: { color: theme.palette.text.primary },
        grid: { display: false },
      },
      y: {
        ticks: { color: theme.palette.text.primary },
        grid: { color: theme.palette.divider },
      },
    },
  };

  // Pie chart data (Category distribution)
  const pieData = {
    labels: ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Toys'],
    datasets: [
      {
        label: 'Category Sales',
        data: [300, 150, 100, 80, 50],
        backgroundColor: [
          '#42a5f5',
          '#66bb6a',
          '#ffa726',
          '#ab47bc',
          '#ef5350',
        ],
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: theme.palette.text.primary,
          font: { weight: 'bold' },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Paper
      sx={{
        width: '60%',
        margin: 'auto',
        p: 4,
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        bgcolor: 'background.paper',
      }}
      elevation={4}
    >
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Monthly Sales Bar Chart */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>
            Monthly Sales
          </Typography>
          <Box sx={{ height: 320 }}>
            <Bar data={barData} options={barOptions} />
          </Box>
        </Grid>

        {/* Category Distribution Pie Chart */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Sales by Category
          </Typography>
          <Box sx={{ width: 250, height: 250, margin: 'auto' }}>
            <Pie data={pieData} options={pieOptions} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;