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
                const li1 = document.createElement('td');
                li1.innerText = company.name;
                const li2 = document.createElement('td');
                li2.innerText = company.employees;
                const li3 = document.createElement('td');
                li3.innerText = company.address;
                tr.appendChild(li1);
                tr.appendChild(li2);
                tr.appendChild(li3);
                tr.setAttribute("onclick", `window.location='/company/${company.name}'`);
                companyContainer.append(tr);
            }
        } else {
            // Handles error
            companyContainer.innerText = `${companies.error}`;
        }
    }
    xhr.open('GET', '/api/companies'); // Hits routes/api/companies
    xhr.send();
}

window.addEventListener('DOMContentLoaded', () => {
    getCompanies();
});
