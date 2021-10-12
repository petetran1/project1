function getItems() {
    let warehouse = window.location.href.replace(/.+\/warehouse-detail\//,'');
    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        //add_btn.onclick = createItem;
        const items = JSON.parse(xhr.response);
        const itemContainer = document.getElementById('items');
        let add_btn = document.getElementById('addItem');
        add_btn.onclick = createItem;
        if (xhr.status === 200) {
            document.getElementById('header').innerText = `${warehouse}'s Warehouses`;
            for (item of items) {
                const tr = document.createElement('tr');
                tr.setAttribute('id', item._id);
                const li1 = document.createElement('td');
                li1.innerText = item.name;
                const li2 = document.createElement('td');
                li2.innerText = item.quantity;
                const li3 = document.createElement('td');
                li3.innerText = item.description;
                const li4 = document.createElement('td');
                li4.innerText = item.price;
                const li5 = document.createElement('td');
                li5.innerText = item.date_in;
                const li6 = document.createElement('td');
                const li7 = document.createElement('td');
                
                const delete_btn = document.createElement('button');
                delete_btn.classList.add('btn','btn-danger');
                delete_btn.value = item._id;
                delete_btn.addEventListener('click', _ => {
                    fetch(`/item/${item._id}`, {
                      method: 'delete',
                    }).then( _ => document.getElementById(item._id).remove());
                })
                delete_btn.innerText = "DELETE";
                const update_btn = document.createElement('button');
                update_btn.classList.add('btn','btn-primary');
                update_btn.value = item._id;
                update_btn.onclick = updateItem;
                update_btn.innerText = "UPDATE";
                li6.appendChild(delete_btn);
                li7.appendChild(update_btn);
                tr.appendChild(li1);
                tr.appendChild(li2);
                tr.appendChild(li3);
                tr.appendChild(li4);
                tr.appendChild(li5);
                tr.appendChild(li6);
                tr.appendChild(li7);

                itemContainer.append(tr);
            }
        } else {
            // Handles error
            itemContainer.innerText = `${items.error}`;
        }
    }
    xhr.open('GET', `/item/${warehouse}`); // Hits routes/api/movie.js
    xhr.send();
}
/*
<a href='#'>
    <button type="button" class="btn btn-outline-info btn-sm m-0 waves-effect">View</button>
</a> 
*/



function updateItem(e) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        console.log(JSON.parse(xhr.response));
        if (xhr.status === 200) {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        }
    }
    xhr.open('DELETE', `/warehouse-detail/${e.target.value}`);
    xhr.send();
}

function createItem(e) {
    const warehouse = window.location.href.replace(/.+\/warehouse-detail\//,'');
    const warehouseContainer = document.getElementById('warehouses');
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        //console.log(xhr.response);
        if (xhr.status === 200) {
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
            tr.setAttribute("onclick", `window.location='/warehouse-detail/${warehouse}'`);
            warehouseContainer.append(tr);
        }
    }
    xhr.open('GET', `/warehouse-detail/${e.target.value}`);
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    getItems();
});


