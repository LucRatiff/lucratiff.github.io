const maxTimeout = 500;
let formIsFetching = false;

const validationStatus = {
    UNCHECKED: "unchecked",
    WAIT: "wait",
    VALID: "valid",
    ERROR: "error"
}

const globalValidationObject = {
    "example": {
        "input-id": {
            "status": validationStatus.UNCHECKED, "timeoutId": 0, "validation": null, "error": ""
        }
    }
}

const fetchValidationObject = {
    "example" : {
        "fetching": false
    }
}

function addFormValidation(formName, validationObject) {
    globalValidationObject[formName] = validationObject;
    fetchValidationObject[formName] = { "fetching": false };
}

function prepareFormSubmit(formId, callback) {
    document.getElementById(formId).addEventListener("submit", callback);
}

function prepareValidation(formName) {
    for (let i in globalValidationObject[formName]) {
        document.getElementById(i).addEventListener("input", () => {
            validateField(formName, i);
        });
    }
}

function validateField(formName, id, delay = true) {
    if (delay) {
        clearTimeout(globalValidationObject[formName][id].timeoutId);
        setTimeout(() => { executeValidation(formName, id) }, maxTimeout);
    } else {
        executeValidation(formName, id);
    }
}

function executeValidation(formName, id) {
    const element = document.getElementById(id);
    const status = globalValidationObject[formName][id].validation(formName, id);
    if (status === validationStatus.VALID) {
        grantValidity(element, formName, id);
    } else if (status === validationStatus.ERROR) {
        errorMessage(element, formName, id);
    } else if (status === validationStatus.WAIT) {
        removeError(id);
        setValidationStatus(element, formName, id, status);
    }
}

function validatePseudo(formName, id) {
    const element = document.getElementById(id);
    const input = element.value;
    //TODO api pseudos
    clearTimeout(globalValidationObject[formName][id].timeoutId);
    if (/(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,}$/.test(input)) {
        globalValidationObject[formName][id].timeoutId = setTimeout(() => {
            grantValidity(element, formName, id);
        }, maxTimeout * 10);

        return validationStatus.WAIT;
    } else {
        globalValidationObject[formName][id].error = "Le pseudo doit contenir au moins 3 caractères dont une lettre, et ne peut contenir que lettres, chiffres, \"-\" et \"_\"";

        return validationStatus.ERROR;
    }
}

function validateEmailFormat(formName, id) {
    if (document.getElementById(id).validity.valid) {
        return validationStatus.VALID;
    } else {
        globalValidationObject[formName][id].error = "L'adresse email n'est pas au bon format";

        return validationStatus.ERROR;
    }
}

function validateBlank(formName, id, required = false) {
    const input = document.getElementById(id);
    if (input.value.length !== 0 || !required) {
        return validationStatus.VALID;
    } else {
        globalValidationObject[formName][id].error = "Ce champ est obligatoire";
        
        return validationStatus.ERROR;
    }
}

function errorMessage(element, formName, inputId) {
    const id = "error-" + inputId;
    let error = document.getElementById(id);
    if (error) {
        error.innerText = globalValidationObject[formName][inputId].error;
    } else {
        error = document.createElement("p");
        error.id = id;
        error.classList.add("form-error");
        error.innerText = globalValidationObject[formName][inputId].error;
        element.parentNode.parentNode.appendChild(error);
    }
    setValidationStatus(element, formName, inputId, validationStatus.ERROR);
}

function grantValidity(element, formName, inputId) {
    removeError(inputId);
    setValidationStatus(element, formName, inputId, validationStatus.VALID);
}

function removeError(inputId) {
    const errorElement = document.getElementById("error-" + inputId);
    if (errorElement) {
        errorElement.remove();
    }
}

function setValidationStatus(element, formName, id, status) {
    if (globalValidationObject[formName][id].status !== status) {
        element.parentNode.dataset.status = status.toLowerCase();
    }
}

const seePassSvg = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C7.5 5 3.7 7.5 2 12C3.7 16.5 7.5 19 12 19C16.5 19 20.3 16.5 22 12C20.3 7.5 16.5 5 12 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
</svg>
`;
const unseePassSvg = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5C7.5 5 3.7 7.5 2 12C3.7 16.5 7.5 19 12 19C16.5 19 20.3 16.5 22 12C20.3 7.5 16.5 5 12 5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
    <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

function prepareSeePassButtons(form) {
    form.querySelectorAll('.see-pass-button').forEach(button => {
        button.innerHTML = seePassSvg;
        button.addEventListener("click", seePass);
    });
}

function seePass(event) {
    const input =  event.currentTarget.parentNode.querySelector("input");
    if (input.getAttribute("type") === "password") {
        input.setAttribute("type", "text");
        event.currentTarget.innerHTML = unseePassSvg;
    } else {
        input.setAttribute("type", "password");
        event.currentTarget.innerHTML = seePassSvg;
    }
}

function fetchForm(form, formName) {
    //TODO fetch
    const button = form.querySelector("input[type=submit]");
    if (button) {
        button.setAttribute("disabled", true);
        button.parentNode.classList.add("wait");
        button.style.color = "transparent";
        button.style.textShadow = "unset";
    }
    fetchValidationObject[formName].fetching = true;
    setTimeout(() => {
        window.location.reload();
    }, 5000);
}

