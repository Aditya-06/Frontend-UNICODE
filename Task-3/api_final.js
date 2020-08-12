// making sure the javascript file is connected to the HTML file
console.log("Javascript is connected properly");

// fetching the coronovirus stats api from given url
fetch(`https://corona-virus-world-and-india-data.p.rapidapi.com/api?rapidapi-key=fdada6a561mshc7e2679b6cb784bp100570jsnf43926ecc169`) 
.then(function (response) {
    return response.json();
})
.then(function(data) {

    // runs the function appendBar which converts the JSON data fetched from the API call to an array of objects 
    appendBar(data);

    // function used to plot the bar graph (From Chart.js) (target element- canvas tag with id="BarChart")
    var barChart = new Chart(BarChart, {
        type: 'bar',
        data: {

            // labelling the X-Axis
            labels: country_name_bar,

            
            datasets: [
                // first plot on the graph denoting the total number of cases
                {
                    label: 'total cases',
                    data: cases_bar,
                    backgroundColor: "rgb(255, 0, 0, 0.7",    
                    
                },

                // second plot denoting the total recoveries
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

    // function used to plot the pie chart (target element- canvas tag with id="PieChart")
    var pieChart = new Chart(PieChart, {
        type: 'pie',
        data: {
            datasets: [{

                // specifying that area will be calculated based on the total cases of coronavirus in a country
                data: cases_bar,
                backgroundColor: getColors(26)
            }],

            // labels will be the name of thecountry
            labels: country_name_bar
        }
    })


    // these commands do not have any function. They are strictly for sanity checks (Whether appendData function has successfully converted the JSON data into useable arrays)

    // =======================================================
    console.log(cases_bar);
    console.log(recovered_bar);
    console.log(country_name_bar);
    console.log(contents)
    // =========================================================

    // sorting the contents array based on the deaths suffered per 1,000,000 people 
    contents.sort(function(a, b) {

        // makes sure sorting takes place based on desired parameter
        return b.Deaths_per_capita - a.Deaths_per_capita;
    })

    // selecting the table
    let table = document.querySelector("table");

    // storing data which will go on the be the heading of the table
    let table_data = Object.keys(contents[0]);

    // function to generate table Headers
    generateTableHead(table, table_data);

    // function the generate table contents
    generateTable(table, contents);


})
.catch(function (error) {
    console.log(error);
})

// selecting the canvas elements
const BarChart = document.getElementById('barChart').getContext('2d');
const PieChart = document.getElementById('pieChart').getContext('2d');

// variable declaration
var country_name_bar = [];
var cases_bar = [];
var recovered_bar = [];
var contents = [];
var counter = 25


function appendBar(data) {
    for(var k = 0; k < data.countries_stat.length; k++) {

        // data of the top 25 countires
        if (k < 25) {
            
            var n_cases = parseFloat(data.countries_stat[k].cases.split(",").join(""));
            
            var n_recovered = parseFloat(data.countries_stat[k].total_recovered.split(",").join(""));
            cases_bar.push(n_cases);
            country_name_bar.push(data.countries_stat[k].country_name);
            recovered_bar.push(n_recovered);
            contents.push({country: country_name_bar[k], cases: cases_bar[k], Deaths_per_capita: data.countries_stat[k].deaths_per_1m_population });
            if (k == 24) {
                recovered_bar[25] = 0;
                cases_bar[25]= 0;
                country_name_bar.push("Other")
            }

            // combined data of countries outside of the top 25 countries affected
        } else {

            cases_bar[25] = cases_bar[25] + parseFloat(data.countries_stat[k].cases.split(",").join(""));

            if (!isNaN(n_recovered)) {
                recovered_bar[25] = recovered_bar[25] + parseFloat(data.countries_stat[k].total_recovered.split(",").join(""))
            }
            
        }

        
        
    }
}



// function used to generate bright colors which look good on a pie chart
function getColors(length){
    let pallet = ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"];
    let colors = [];

    for(let i = 0; i < length; i++) {
      colors.push(pallet[i % pallet.length]);
    }

    return colors;
  }


//  generates table Header
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        
        th.appendChild(text);
        th.classList = "table-header"
        row.appendChild(th);
    }
}
// generates table body
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {

            // display colour-coded cells based on severity of the nation affected
            if (element.Deaths_per_capita > 500) {
                row.className = "table-danger";
            } else if(element.Deaths_per_capita > 200) {
                row.className = "table-warning";
            } else if (element.Deaths_per_capita > 50) {
                row.className = "table-light"
            } else if (element.Deaths_per_capita < 50) {
                row.className = "table-success";
            }
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        } 
    }
}
  

 

