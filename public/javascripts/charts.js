// Number unique of devices per day chart
genDevicesPerPeriod('%25Y-%25m-%25d', 'numPerDay', 'bar', 'Number of unique devices per day', 'Devices');
// Number of unique devices per hour
genDevicesPerPeriod('%25H', 'timesPerDay', 'bar', 'Number of unique devices per hour', 'Devices');
// Number of unique devices per day of the week (sun - mon)
genDevicesPerPeriod('%25w', 'numPerDayOfWeek', 'bar', 'Number of unique devices per day of week', 'Devices');
// Number of unique devices per week
genDevicesPerPeriod('%25Y-%25m-%25U', 'numPerWeek', 'bar', 'Number of unique devices per week', 'Devices');
// Number of unique devices per month
genDevicesPerPeriod('%25Y-%25m', 'numPerMonth', 'bar', 'Number of unique devices per month', 'Devices');

// Dwell Per day chart
genDwellTime('%25Y-%25m-%25d', 'dayDwellTimes', 'bar', 'Dwell times per day (minutes)', 'Times');
// Dwell Per day chart
genDwellTime('%25Y-%25m-%25U', 'dwellPerWeek', 'bar', 'Dwell times per week (minutes)', 'Times');
// Dwell Per day chart
genDwellTime('%25Y-%25m', 'dwellPerMonth', 'bar', 'Dwell times per month (minutes)', 'Times');
/*
    A method that uses the standardised data returned by the query
    and to further generecise the creation of the devices per 
    period charts
*/
async function genDevicesPerPeriod(period, name, type, title, datasetLabel) {
    let data = await getQueryData(`http://localhost:3000/api/numberOfDevices/${period}`);

    createChart(name, type, title, datasetLabel, data.labels, data.values);
}

/*
    A method that uses the standardised data returned by the query
    and to further generecise the creation of the dwell time charts
*/
async function genDwellTime(period, name, type, title, datasetLabel) {
    let data = await getDwellData(`http://localhost:3000/api/dwellTimes/${period}`);

    createChart(name, type, title, datasetLabel, data.labels, data.values);
}

// async function getDayDwellTime() {
//     let data = await fetch('http://localhost:3000/api/dwellPerDay')
//         .then(data => {
//             return data.json()
//         })
//         .then(response => {
//             return response;
//         });
//     let days = data.map(val => {
//         return val._id.day
//     });
//     let time = data.map(val => {
//         return val.dwellTime
//     })

//     createChart('dwellTimes', 'bar', 'Dwell times per day in minutes', 'Dwell', days, time);
// }

// Returns the standardised data from the queries
async function getQueryData(path) {
    let data = await fetch(path)
        .then(data => {
            return data.json();
        })
        .then(result => {
            return result;
        });
    let labels = data.map(val => {
        return val._id.day;
    });
    let values = data.map(val => {
        return val.scannedDevices;
    });

    return { labels, values }
}

async function getDwellData(path) {
    let data = await fetch(path)
        .then(data => {
            return data.json();
        })
        .then(response => {
            return response;
        });
    let labels = data.map(val => {
        return val._id.period;
    });
    let values = data.map(val => {
        return val.dwellTime;
    });

    return { labels, values }
}

// A method to create a chart
function createChart(name, type, title, datasetLabel, labels, values) {
    let cntx = document.getElementById(name).getContext('2d')

    let chart = new Chart(cntx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                data: values
            }]
        },
        options: {
            title: {
                display: true,
                text: title
            }
        }
    })
}