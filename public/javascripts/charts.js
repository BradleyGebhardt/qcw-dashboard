async function func() {
    let data = await fetch('http://localhost:3000/api/manus')
        .then(data => {
            return data.json();
        })
        .then(response => {
            return response;
        });
    let newLabels = data.map(val => {
        return val._id.Manufacturers;
    })
    let newData = data.map(val => {
        return val.uniqueCount.length;
    })

    let cntx = document.getElementById('manufacturers').getContext('2d')

    let chart = new Chart(cntx, {
        type: 'line',
        data: {
            labels: newLabels,
            datasets: [{
                label: 'Manufacturers',
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                data: newData
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Manufacturers and their frequency'
            }
        }
    })

}

// func();

async function numberPerDayChart() {
    let data = await getQueryData('http://localhost:3000/api/numPerDay');

    createChart('numPerDay', 'line', 'Number of unique devices per day', 'Devices', data.labels, data.values);
}

async function getPerHourChart() {
    let data = await getQueryData('http://localhost:3000/api/timesPerDay');

    createChart('timesPerDay', 'bar', 'Number of unique devices per hour', 'Devices', data.labels, data.values);
}

async function getDayDwellTime() {

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

numberPerDayChart();
getPerHourChart();