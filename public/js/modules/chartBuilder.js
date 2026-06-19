// note for the future when this gets iterated on in react
// This import was annoying because docs have a bundle, ended up needing to serve
// this via cdn bc it's a static page, but once it's jsx I can just:
// import Chart from 'chart.js/auto'
// and not worry about manual registration

import {
  Chart,
  registerables,
} from "https://cdn.jsdelivr.net/npm/chart.js@4/+esm";
Chart.register(...registerables);

(async function () {
  const data = [
    // default data from tutorial, will be replaced with list of objects from api
    // when portfolio calcs are ready
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(document.getElementById("holdings-chart"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Portfolio Value",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
})();
