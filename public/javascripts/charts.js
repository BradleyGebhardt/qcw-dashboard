let ctx = document.getElementById('overallChart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Samsung', 'Sony', 'Xiaomi', 'Apple', 'Google'],
        datasets: [{
            label: 'Number of devices',
            backgroundColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            data: [102, 157, 56, 205, 69]
        }]
    },
    options: {
        // responsive: true
        title: {
            display: true,
            text: 'Number of devices by manufacturer'
        }
    }
})