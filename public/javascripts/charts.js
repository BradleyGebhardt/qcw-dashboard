getDayDwellTime();
// getNumPerWeek();
// getNumPerMonth();

devicesPerPeriod('%25Y-%25m-%25d', 'numPerDay', 'line', 'Number of unique devices per day', 'Devices');
devicesPerPeriod('%25H', 'timesPerDay', 'bar', 'Number of unique devices per hour', 'Devices');
devicesPerPeriod('%25Y-%25U', 'numPerWeek', 'bar', 'Number of unique devices per week', 'Devices');
devicesPerPeriod('%25Y-%25m', 'numPerMonth', 'bar', 'Number of unique devices per month', 'Devices');
devicesPerPeriod('%25w', 'numPerDayOfWeek', 'bar', 'Number of unique devices per day of week', 'Devices');

async function devicesPerPeriod(period, name, type, title, datasetLabel) {
    let data = await getQueryData(`http://localhost:3000/api/numberOfDevices/${period}`);

    createChart(name, type, title, datasetLabel, data.labels, data.values);
}

async function getDayDwellTime() {
    let data = await fetch('http://localhost:3000/api/dwellPerDay')
        .then(data => {
            return data.json()
        })
        .then(response => {
            return response;
        });
    let days = data.map(val => {
        return val._id.day
    });
    let time = data.map(val => {
        return val.dwellTime
    })

    createChart('dwellTimes', 'bar', 'Dwell times per day in minutes', 'Dwell', days, time);
}

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