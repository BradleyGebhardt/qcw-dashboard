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

console.log(findAll());