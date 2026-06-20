// note for the future when this gets iterated on in react
// This import was annoying because docs have a bundle, ended up needing to serve
// this via cdn bc it's a static page, but once it's jsx I can just:
// import Chart from 'chart.js/auto'
// and not worry about manual registration

import { getAllHoldings } from "./api.js";

import {
  Chart,
  registerables,
} from "https://cdn.jsdelivr.net/npm/chart.js@4/+esm";

Chart.register(...registerables);

const chartElement = document.getElementById("holdings-chart");

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

async function loadPortfolioChart() {
  if (!chartElement) {
    return;
  }

  try {
    const data = await getAllHoldings();
    const portfolioHistory = data.portfolioHistory || [];

    if (portfolioHistory.length === 0) {
      console.log("No portfolio history to chart yet.");
      return;
    }

    new Chart(chartElement, {
      type: "line",
      data: {
        labels: portfolioHistory.map((row) => formatDate(row.date)),
        datasets: [
          {
            label: "Portfolio Value",
            data: portfolioHistory.map((row) => row.value),
          },
        ],
      },
    });
  } catch (error) {
    console.error("Failed to load portfolio chart:", error.message);
  }
}

loadPortfolioChart();
