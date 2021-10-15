function getItems() {
    let warehouse = window.location.href.replace(/.+(\/warehouse\/|\/api\/items\/)/,'').replace(/\/.+/,'').replace(/\?.+/,'');
    let query = window.location.href.replace(/.+(\/warehouse\/|\/api\/items\/)/,'');
    console.log('value of warehouse in getItems', warehouse);
    console.log('value of query is', query);
    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const items = JSON.parse(xhr.response);
        //console.log('list of item in getItems xhr', items)
        const itemContainer = document.getElementById('items');
        if (xhr.status === 200) {
            document.getElementById('header').innerText = `${warehouse}'s Items`;
            const add_btn = document.getElementById('addItem');
            //add_btn.addEventListener('click',createItem);
            const search_btn = document.getElementById('search-btn');

            
            search_btn.addEventListener('click', getItems);
            
            
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
                // Button handles delete
                let delete_btn = document.createElement('button');
                delete_btn.classList.add('btn','btn-danger');
                delete_btn.value = item._id;
                delete_btn.addEventListener('click', deleteItem);
                delete_btn.innerText = "DELETE";
                // Button trigger modal to add an item 
                const update_btn = document.createElement('button');
                update_btn.classList.add('btn','btn-primary');
                update_btn.value = item._id;
                update_btn.setAttribute('data-bs-toggle', 'modal');
                update_btn.setAttribute('data-bs-target', '#updateItemModal');
                update_btn.value = item._id;
                update_btn.innerText = "UPDATE";
                update_btn.onclick = (e) => {
                    //document.getElementById('updateItem').value = e.target.value;
                    document.getElementById('updateItemForm').setAttribute('action',`/api/items/${warehouse}/${e.target.value}`);
                    document.getElementById('itemId').value = e.target.value;
                    document.getElementById('updateItem').value = e.target.value;

                }   
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
            const save_btn = document.getElementById('updateItem');
            save_btn.onclick = updateItem;
            
        } else {
            // Handles error
            itemContainer.innerText = `${items.error}`;
        }
    }
    if (query.includes('?')) {
        //query = query.replace(/\/*?/,'/?');
        //console.log('value of query is', query);
        xhr.open('GET', `/api/items/${query}`);
    } else {
        xhr.open('GET', `/api/items/${warehouse}`);
    }
    
    xhr.send();
}



function updateItem(e) {
    let warehouse = window.location.href.replace(/.+(\/warehouse\/|\/api\/items\/)/,'').replace(e.target.value,'');
    const xhr = new XMLHttpRequest();
    const item = document.getElementById('itemId').value;
    console.log('this is value of item in updateItem scripts', item);
    xhr.onreadystatechange = function() {
        if (xhr.status === 200) {
            const tr = document.getElementById(item);
            
        }
    }

    xhr.open('POST', `/api/items/${warehouse}/${item}`, true);
    xhr.send();
}


function deleteItem(e) {
    let warehouse = window.location.href.replace(/.+(\/warehouse\/|\/api\/items\/)/,'').replace(/\/.+/,'');
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status === 200) {
            let elem = document.getElementById(e.target.value);
            elem.remove();
        }
    }
    xhr.open('DELETE', `/api/items/${warehouse}/${e.target.value}`, true);
    xhr.send();
}

function createItem() {
    let warehouse = window.location.href.replace(/.+(\/warehouse\/|\/api\/items\/)/,'').replace(/\?.+/,'');
    const warehouseContainer = document.getElementById('warehouses');
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.status === 200) {
            console.log("Item is successfully created!")
            /*
            const itemContainer = document.getElementById('items');
            let tr = document.createElement('tr');
            tr.setAttribute('id', e.target.value);
            const li1 = document.createElement('td');
            li1.innerText = e.name;
            const li2 = document.createElement('td');
            li2.innerText = e.quantity;
            const li3 = document.createElement('td');
            li3.innerText = e.description;
            const li4 = document.createElement('td');
            li4.innerText = e.price;
            const li5 = document.createElement('td');
            li5.innerText = e.date_in;
            const li6 = document.createElement('td');
            const li7 = document.createElement('td');
            // Button handles delete
            let delete_btn = document.createElement('button');
            delete_btn.classList.add('btn','btn-danger');
            delete_btn.value = e._id;
            delete_btn.addEventListener('click', deleteItem);
            delete_btn.innerText = "DELETE";
            // Button trigger modal to update an item 
            const update_btn = document.createElement('button');
            update_btn.classList.add('btn','btn-primary');
            update_btn.setAttribute('data-bs-toggle', 'modal');
            update_btn.setAttribute('data-bs-target', '#updateItemModal');
            update_btn.value = e._id;
            const save_btn = document.getElementById('updateItem');
            save_btn.addEventListener('click', updateItem);
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
            */

        }
    }
    xhr.open('POST', `/api/items/${warehouse}`, true);
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    getItems();
});


