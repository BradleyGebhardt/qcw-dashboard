async function fetchData() {
    await fetch('http://localhost:3000/api/mac', { cache: 'force-cache' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            populateList(data);
        });
}

async function findByMac(macAddress) {
    await fetch(`http://localhost:3000/api/mac/${macAddress}`, { cache: 'force-cache' })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(macAddress + ' Time difference: ' + new Date(new Date(data[data.length - 1].time).getTime() - new Date(data[0].time).getTime()));
        });
}

function populateList(data) {
    // let list = $('.list_macs');
    // data.forEach(doc => {
    //     findByMac(doc);
    // });
    for (let i = 0; i < 60; i++) {
        findByMac(data[i]._id.mac);
    }
}

fetchData();

async function fetchManufacturers() {
    await fetch('http://localhost:3000/api/manufacturers')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data.length);
        })
}