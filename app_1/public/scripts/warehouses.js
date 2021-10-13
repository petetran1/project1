function getWarehouses() {
    let company = window.location.href.replace(/.+\/company\//,'');
    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    
    xhr.onload = function() {
        const warehouses = JSON.parse(xhr.response);
        const warehouseContainer = document.getElementById('warehouses');
        
        //console.log(warehouses);
        if (xhr.status === 200) {
            document.getElementById('header').innerText = `${company}'s Warehouses`;
            for (warehouse of warehouses) {
                //console.log(JSON.parse(warehouse));
                const tr = document.createElement('tr');
                const li1 = document.createElement('td');
                li1.innerText = warehouse.name;
                const li2 = document.createElement('td');
                li2.innerText = warehouse.capacity;
                const li3 = document.createElement('td');
                li3.innerText = warehouse.address;
                tr.appendChild(li1);
                tr.appendChild(li2);
                tr.appendChild(li3);
                tr.setAttribute("onclick", `window.location='/warehouse/${warehouse.name}'`);
                warehouseContainer.append(tr);
            }
        } else {
            // Handles error
            warehouseContainer.innerText = `${warehouses.error}`;
        }
    }
    xhr.open('GET', `/api/warehouses/${company}`); 
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    getWarehouses();
});
