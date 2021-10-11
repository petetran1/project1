function getCompanies() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
    console.log('Before Loading')
    xhr.onload = function() {
        const companies = JSON.parse(xhr.response);
        const companyContainer = document.getElementById('companies');
        if (xhr.status === 200) {
            // title, director, year
            for (company of companies) {
                const tr = document.createElement('tr');
                //ul.classList.add('list-group', 'list-group-horizontal-sm');
                const li1 = document.createElement('td');
                //li1.classList.add('list-group-item');
                li1.innerText = company.name;
                const li2 = document.createElement('td');
                //li2.classList.add('list-group-item');
                li2.innerText = company.employees;
                const li3 = document.createElement('td');
                //li3.classList.add('list-group-item');
                li3.innerText = company.address;
                //div.innerText = `Name: ${company.name}\n Address: ${company.address}\n Employees: ${company.employees}\n\n`;
                tr.appendChild(li1);
                tr.appendChild(li2);
                tr.appendChild(li3);
                //const button = document.createElement('button');
                //button.value = company.title;
                //button.onclick = delete;
                //button.innerText = "DELETE ";
                //div.append(button);
                tr.setAttribute("onclick", `window.location='/warehouse/${company.name}'`);
                companyContainer.append(tr);
            }
        } else {
            // Handles error
            companyContainer.innerText = `${companies.error}`;
        }
    }
    xhr.open('GET', '/company'); // Hits routes/api/movie.js
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
        const companies = JSON.parse(xhr.response);
        const companyContainer = document.getElementById('companies');
        console.log(companies);
        if (xhr.status === 200) {
            // title, director, year
            for (company of companies) {
                const div = document.createElement('div');
                div.innerText = `Title: ${company.name}\n Director: ${company.address}\n Year: ${company.state}\n\n`;
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
    getCompanies();
});
