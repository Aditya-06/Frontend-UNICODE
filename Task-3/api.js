
console.log("Javascript is connected properly");


fetch(`https://corona-virus-world-and-india-data.p.rapidapi.com/api_india_timeline?rapidapi-key=fdada6a561mshc7e2679b6cb784bp100570jsnf43926ecc169`) 
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendLine(data);
    console.log(YAxisLine);
    var myChart = new Chart(Charts, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August"],
            datasets: [{
                label: '# of cases',
                data: YAxisLine,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  })

.catch(function (error) {
    console.log(error);
})


fetch(`https://corona-virus-world-and-india-data.p.rapidapi.com/api?rapidapi-key=fdada6a561mshc7e2679b6cb784bp100570jsnf43926ecc169`) 
.then(function (response) {
    return response.json();
})
.then(function(data) {
    appendBar(data);
    var barChart = new Chart(BarChart, {
        type: 'bar',
        data: {
            labels: country_name_bar,
            datasets: [{
                label: 'total cases',
                data: cases_bar,
                backgroundColor: "rgba(230, 0, 0, 0.7)",    
                
            },
            {
                label: 'total recoveries',
                data: recovered_bar,
                backgroundColor: "rgba(0, 230, 0, 0.7)", 

            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
    console.log(cases_bar);
    console.log(recovered_bar);
    console.log(country_name_bar);
})
.catch(function (error) {
    console.log(error);
})






var YAxisLine = [0, 0, 0, 0, 0, 0, 0, 0];

function appendLine(data) {
    for (var i = 0; i < data.length; i++) {
        var cases = parseInt(data[i].dailyconfirmed);
        var month = data[i].date.split(" ")[1];
        if (month === "January") {
            YAxisLine[0] = YAxisLine[0] + cases;
        } else if (month === "February") {
            YAxisLine[1] = YAxisLine[1] + cases;
        } else if (month === "March") {
            YAxisLine[2] = YAxisLine[2] + cases;
        } else if (month === "April") {
            YAxisLine[3] = YAxisLine[3] + cases;
        } else if (month === "May") {
            YAxisLine[4] = YAxisLine[4] + cases;
        } else if (month === "June") {
            YAxisLine[5] = YAxisLine[5] + cases;
        } else if (month === "July") {
            YAxisLine[6] = YAxisLine[6] + cases;
        } else if (month === "August") {
            YAxisLine[7] = YAxisLine[7] + cases;
        }

    }
    for (var j = 0; j < YAxisLine.length - 1; j++) {
        YAxisLine[j + 1] = YAxisLine[j] + YAxisLine[j+1];
    }
}
    
const Charts = document.getElementById('lineChart').getContext('2d');

const BarChart = document.getElementById('barChart').getContext('2d');

var country_name_bar = [];
var cases_bar = [];
var recovered_bar = [];

function appendBar(data) {
    for(var k = 0; k < 20; k++) {
        country_name_bar.push(data.countries_stat[k].country_name);
        var n_cases = parseFloat(data.countries_stat[k].cases.split(",").join(""));
        cases_bar.push(n_cases);
        var n_recovered = parseFloat(data.countries_stat[k].total_recovered.split(",").join(""));
        recovered_bar.push(n_recovered);
    }
}
