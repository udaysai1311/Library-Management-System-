let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let headEl = document.getElementById("head");
let headingEl = document.createElement("h1");

function toDisplay(result, searchResults) {
    spinnerEl.classList.add("d-none");
    let imageCon = document.createElement("div");
    imageCon.classList.add("ml-3");
    searchResultsEl.appendChild(imageCon);
    let imageEl = document.createElement("img");
    imageEl.setAttribute("src", searchResults[result].imageLink);
    imageCon.appendChild(imageEl);
    let paraEl = document.createElement("p");
    paraEl.textContent = searchResults[result].author;
    paraEl.style.textAlign = "center";
    paraEl.style.fontSize = "12px";
    paraEl.style.fontWeight = "600";
    paraEl.style.fontFamily = "Roboto";
    imageCon.appendChild(paraEl);
}

function createAndAppend(searchResults) {
    if (searchResults.length === 0) {
        headingEl.textContent = "No results found";
        headingEl.classList.add("heading");
        headEl.style.textAlign = "center";
        headEl.appendChild(headingEl);

        spinnerEl.classList.add("d-none");
    } else {
        for (let result in searchResults) {
            toDisplay(result, searchResults);
        }
        headingEl.textContent = "Popular Books";
        headingEl.classList.add("heading");
        headEl.appendChild(headingEl);
        console.log(headEl);
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        headingEl.textContent = "";
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let input = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + input;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                createAndAppend(jsonData.search_results);
            });
    }
});