function getWarehouses() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    let company = window.location.href.replace(/.+\/company-detail\//,'');

    xhr.onload = function() {
        const warehouses = JSON.parse(xhr.response);
        const warehouseContainer = document.getElementById('warehouses');
        
        //console.log(warehouses);
        if (xhr.status === 200) {
            document.getElementById('header').innerText = `${company}'s warehouses`;
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
                warehouseContainer.append(tr);
            }
        } else {
            // Handles error
            warehouseContainer.innerText = `${warehouses.error}`;
        }
    }
    
    xhr.open('GET', `/warehouse/${company}`); // Hits routes/api/movie.js
    xhr.send();
}
/*
function deleteItem(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    xhr.open('DELETE', `/movies/${e.target.value}`);
    xhr.send();
}

function updateItem(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    xhr.open('DELETE', `/movies/${e.target.value}`);
    xhr.send();
}

function getItems() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const warehouses = JSON.parse(xhr.response);
        const warehouseContainer = document.getElementById('warehouses');
        console.log(warehouses);
        if (xhr.status === 200) {
            // title, director, year
            for (warehouse of warehouses) {
                const div = document.createElement('div');
                div.innerText = `Title: ${warehouse.name}\n Director: ${warehouse.address}\n Year: ${warehouse.state}\n\n`;
                const button = document.createElement('button');
                button.value = movie.title;
                button.onclick = deleteMovie;
                button.innerText = "DELETE MOVIE";
                div.append(button);
                movieContainer.append(div);
            }
        } else {
            // Handles error
            movieContainer.innerText = `${movies.error}`;
        }
    }
    xhr.open('GET', '/movies'); // Hits routes/api/movie.js
    xhr.send();
}
*/
window.addEventListener('DOMContentLoaded', () => {
    getWarehouses();
});
