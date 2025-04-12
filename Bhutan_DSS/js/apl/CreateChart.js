export const createBarChart = (barNode) => {
  const chart = new Chart(barNode, {
    type: "bar",
    data: {
      labels: ["Hazard", "Vulnerability", "Exposure"],
      datasets: [{
        label: "Risk Components",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(247, 135, 33, 0.8)",
          "rgba(117, 85, 155, 0.8)",
          "rgba(30, 144, 255, 0.8)"
        ],
        borderColor: [
          "rgba(247, 135, 33, 1)",
          "rgba(117, 85, 155, 1)",
          "rgba(30, 144, 255, 1)"
        ],
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw.toFixed(1)}`,
            title: () => 'Risk Score'
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: { size: 14, weight: 'bold' },
          bodyFont: { size: 12 },
          padding: 12,
          cornerRadius: 6
        },
        datalabels: {
          display: true,
          color: '#fff',
          anchor: 'end',
          align: 'right',
          formatter: (value) => value.toFixed(1)
        }
      },
      scales: {
        x: {
          min: 0,
          max: 10,
          ticks: { stepSize: 2 },
          grid: { color: "rgba(0, 0, 0, 0.1)" },
          title: {
            display: true,
            text: 'Risk Score (0-10)',
            font: { size: 12, weight: 'bold' }
          }
        },
        y: {
          grid: { display: false },
          ticks: { font: { size: 13, weight: '600' } }
        }
      },
      layout: {
        padding: { top: 10, right: 15, bottom: 10, left: 15 }
      }
    },
    plugins: [ChartDataLabels]
  });

  // Helper methods
  chart.updateData = function(data) {
    // Scale the values from 0-1 to 1-10
    const scaledData = data.map(value => (value * 9) + 1);
    this.data.datasets[0].data = scaledData;
    this.update();
  };

  chart.clearData = function() {
    this.data.datasets[0].data = [0, 0, 0];
    this.update();
  };

  return chart;
};