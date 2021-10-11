function getCompanies() {

    // AJAX -> Asynchronous JavaScript And XML
    const xhr = new XMLHttpRequest();
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
                tr.setAttribute("onclick", `window.location='/company-detail/${company.name}'`);
                //tr.addEventListener("click", getWarehouses);
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

window.addEventListener('DOMContentLoaded', () => {
    getCompanies();
});
