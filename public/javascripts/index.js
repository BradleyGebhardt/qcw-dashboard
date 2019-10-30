async function fetchData() {
    await fetch('http://localhost:3000/api/manu')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data[0]._id.manufacturer);
        });
}

async function findAll() {
    await fetch('http://localhost:3000/api/all')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
        });
}

// console.log(findAll());
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});