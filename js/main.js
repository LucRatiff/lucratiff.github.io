const url = new URL(window.location.href);
const params = url.searchParams;
const page = params.get('page');
const sectionPage = params.get('section');
let documentationHomePage = page == "documentation";
const isDocumentation = page != null;
let selectionVerified = !isDocumentation || documentationHomePage;
let title = 'Welcome';
let previousPage = null;
let nextPage = null;

const sections = {
    awesomekeys: [
        "overview",
        "configuration",
        "locks",
        "keys",
        "commands",
        "permissions",
        "logs",
        "language",
        "source_code"
    ]
}

if (isDocumentation) {
    page = page.toLowerCase();
    if (typeof sections[page] == 'undefined') {
        page = 'documentation';
        documentationHomePage = true;
    }
}

if (sectionPage == null && isDocumentation && !documentationHomePage) {
    sectionPage = sections[page][0];
}

if (isDocumentation && !documentationHomePage) {
    deploySections(page);
}

document.getElementsByTagName('title').innerHTML = title;

let selectionId = null;
function deploySections(projectName) {
    if (selectionId != null) {
        document.getElementById(selectionId).nextSibling.remove();
    }

    if (selectionId == projectName) {
        selectionId = null;
    } else {
        selectionId = projectName;
        document.getElementById(selectionId).after(
            constructSections(projectName)
        );
    }
}

function constructSections(projectName) {
    let ul = document.createElement("ul");
    let elements = sections[projectName];
    for (let i = 0; i < elements.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute('href', '?page=' + page + '&section=' + elements[i]);
        let name = elements[i].charAt(0).toUpperCase() + elements[i].slice(1).replace('_', ' ');
        a.innerHTML = name;
        li.appendChild(a);
        if (!selectionVerified && projectName == page && sectionPage == elements[i]) { //TODO
            title = name;
            li.setAttribute("class", 'selected');
            selectionVerified = true;
            if (i > 0) {
                previousPage = '?page=' + page + '&section=' + elements[i - 1];
            }
            if (i < elements.length - 1) {
                nextPage = '?page=' + page + '&section=' + elements[i + 1];
            }
        }
        ul.appendChild(li);
    }

    return ul;
}

const projects = document.getElementsByClassName("category");
for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener("click", function() {
        let projectName = projects[i].id;
        deploySections(projectName);
    });
}

if (isDocumentation) {
    document.getElementById('main').innerHTML =
    '<div id="upperpart"><p>Documentation</p><div id="pages"></div></div><div id="content"></div>';
    if (!documentationHomePage) {
        if (previousPage != null) {
            let previousA = document.createElement('a');
            previousA.setAttribute('href', previousPage);
            previousA.innerHTML = '&lt; previous';
            document.getElementById('pages').appendChild(previousA);
        }

        if (nextPage != null) {
            let nextA = document.createElement('a');
            nextA.setAttribute('href', nextPage);
            nextA.innerHTML = 'next &gt;';
            document.getElementById('pages').appendChild(nextA);
        }
    }
} else {
    document.body.style.backgroundColor = '#7596cc';
    document.getElementById('main').style.textAlign = 'center';
}

const fileName = 'https://lucratiff.github.io/resources/' +
(isDocumentation ? page + (documentationHomePage ? '' : '/' + sectionPage) : 'home') + '.html';
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(request.readyState === 4 && (request.status === 200 || request.status == 0)) {
        document.getElementById(isDocumentation ? 'content' : 'main').innerHTML = request.responseText;
    }
}
request.open("GET", fileName);
request.send();

let burgerDeployed = false;
function deployBurger() {
    if (burgerDeployed) {
        document.getElementById('burgermenu').style.left = '-300px';
        burgerDeployed = false;
    } else {
        document.getElementById('burgermenu').style.left = '0';
        burgerDeployed = true;

    }
}

document.getElementById('burger').addEventListener("click", function() {
    deployBurger();
});
