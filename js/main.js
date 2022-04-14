const url = new URL(window.location.href);
const params = url.searchParams;
const page = params.get('page');
const sectionPage = params.get('section');
let documentationHomePage = page == "documentation";
let selectionVerified = page == null || documentationHomePage;
let title = 'Welcome';
const isDocumentation = page != null;
let previousPage;
let nextPage;

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

let selectionId = null;

function deploySections(nameId) {
    if (selectionId != null) {
        document.getElementById(selectionId).nextSibling.remove();
    }

    if (selectionId == nameId) {
        selectionId = null;
    } else {
        selectionId = nameId;
        document.getElementById(selectionId).after(
            constructSections(nameId)
        );
    }
}

function constructSections(nameId) {
    let ul = document.createElement("ul");
    let elements = sections[nameId];
    for (let i = 0; i < elements.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute('href', '?page=' + nameId + '&section=' + elements[i]);
        let name = elements[i].charAt(0).toUpperCase() + elements[i].slice(1).replace('_', ' ');
        a.innerHTML = name;
        li.appendChild(a);
        if (!selectionVerified && page == nameId) {
            title = name;
            li.setAttribute("class", 'selected');
            selectionVerified = true;
			if (i > 0) {
                previousPage = '?page=' + nameId + '&section=' + elements[i - 1];
            }
            if (i < elements.length - 1) {
                nextPage = '?page=' + nameId + '&section=' + elements[i + 1];
            }
        }
        ul.appendChild(li);
    }

    return ul;
}

if (sectionPage == null) {
    let s = sections[page];
    if (s != undefined) {
        sectionPage = s[0];
    }
}

if (isDocumentation && !documentationHomePage) {
    try {
        deploySections(page);
        document.getElementsByTagName('title').innerHTML = title;
    } catch(e) {}
}

const parentSections = document.getElementsByClassName("category");
for (let i = 0; i < parentSections.length; i++) {
    parentSections[i].addEventListener("click", function() {
        let nameId = parentSections[i].id;
        deploySections(nameId);
    });
}

if (isDocumentation) {
	document.getElementById('main').innerHTML =
		'<div id="upperpart"><p>Documentation</p><div id="pages"></div></div><div id="content"></div>';
	if (!documentationHomePage) {
		if (typeof previous != 'undefined') {
		    let previousA = document.createElement('a');
		    previousA.href = previousPage;
		    previousA.innerHTML = '>&lt; previous';
		    document.getElementById('pages').appendChild(previousA);
		}

		if (typeof next != 'undefined') {
		    let nextA = document.createElement('a');
		    nextA.href = nextPage;
		    nextA.innerHTML = 'next &gt;';
		    document.getElementById('pages').appendChild(nextA);
		}
	}
} else {
	document.body.style.backgroundColor = '#7596cc';
	document.getElementById('main').style.textAlign = 'center';
}

const fileName = 'https://lucratiff.github.io/resources/' +
	(page == null ? 'home' :  page + (documentationHomePage ? '' : '/' + sectionPage)) + '.html';
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
