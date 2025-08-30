const connectionInnerHtml = `
<h2>Connexion</h2>
<div id="connection-mode-section"></div>
<div id="auth-modal-change">
    <p>Vous n'avez pas de compte ?</p>
    <div id="change-button" class="button">Inscription</div>
</div>
`;
const connectionModes = `
<div id="connection-modes">
    <a href="" data-mode="email">
        <span class="mode-img">
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
        <span>Email</span>
    </a>
    <a href="" data-mode="google">
        <span class="mode-img">
            <img src="res/icons/google.webp" alt="google">
        </span>
        <span>Google</span>
    </a>
    <a href="" data-mode="microsoft">
        <span class="mode-img">
            <img src="res/icons/microsoft.webp" alt="microsoft">
        </span>
        <span>Microsoft</span>
    </a>
    <a href="" data-mode="discord">
        <span class="mode-img">
            <svg viewBox="0 0 127.14 96.36"><defs><style>.cls-1{fill:currentColor;}</style></defs><path class="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
        </span>
        <span>Discord</span>
    </a>
</div>
`;
const signinEmail = `
<form action="" method="post" id="auth-form" data-auth="signin">
    <div class="form-section">
        <label for="email">Adresse email :</label>
        <div class="input-container">
            <input id="input-email" type="email" name="email" required>
        </div>
    </div>
    <div class="form-section">
        <label for="pass">Mot de passe :</label>
        <div class="input-container">
            <input id="input-pass" type="password" name="pass" required>
            <div class="see-pass-button"></div>
        </div>
    </div>
    <div id="auth-submit" class="input-container">
        <input type="submit" class="button" value="Connexion">
    </div>
    <div class="other-auth-button">
        <div id="back-to-connection-modes" class="button">Autre méthode</div>
    </div>
</form>
`;
const signupInnerHtml = `
<h2>Inscription</h2>
<form action="" method="post" id="auth-form" data-auth="signup">
    <div class="form-section">
        <label for="text">Nom d'utilisateur :</label>
        <div class="input-container">
            <input id="input-pseudo" type="text" name="text" required>
        </div>
    </div>
    <div class="form-section">
        <label for="email">Adresse email :</label>
        <div class="input-container">
            <input id="input-email" type="email" name="email" required>
        </div>
    </div>
    <div class="form-section">
        <label for="email2">Confirmez l'adresse email :</label>
        <div class="input-container">
            <input id="input-email2" type="email" name="email2" required>
        </div>
    </div>
    <div class="form-section">
        <label for="pass">Mot de passe :</label>
        <div class="input-container">
            <input id="input-pass" type="password" name="pass" required>
            <div class="see-pass-button"></div>
        </div>
        <div id="pass-checker">
            <div id="pass-checker-notation">
                <div id="pass-checker-levels">
                    <div></div><div></div><div></div><div></div>
                </div>
                <p id="pass-checker-comment"></p>
            </div>
            <div id="pass-checker-infos" class="button" tabindex="0">?</div>
        </div>
    </div>
    <div class="form-section">
        <label for="pass2">Confirmez le mot de passe :</label>
        <div class="input-container">
            <input id="input-pass2" type="password" name="pass2" required>
            <div class="see-pass-button"></div>
        </div>
    </div>
    <div id="auth-submit" class="input-container">
        <input type="submit" class="button" value="Inscription">
    </div>
</form>
<div id="auth-modal-change">
    <p>Vous avez déjà un compte ?</p>
    <div id="change-button" class="button">Connexion</div>
</div>
`;

const signupFormName = "signup";
const signinFormName = "signin";

addFormValidation(signupFormName, {
    "input-pseudo": {
        "status": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validatePseudo, "error": ""
    },
    "input-email": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validateEmailFormat, "error": ""
    },
    "input-email2": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validateEmailConfirmation, "error": ""
    },
    "input-pass": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validatePass1, "error": ""
    },
    "input-pass2": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validatePass2, "error": ""
    }
});

addFormValidation(signinFormName, {
    "input-email": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validateEmailFormat, "error": ""
    },
    "input-pass": {
        "valid": validationStatus.UNCHECKED, "timeoutId": 0, "validation": validateBlank, "error": ""
    }
});

const passNotationObject = {
    0: [ "Trop faible", "var(--form-pass-0)" ],
    1: [ "Insuffisant", "var(--form-pass-1)" ],
    2: [ "Pas assez fort", "var(--form-pass-2)" ],
    3: [ "Bon", "var(--form-pass-3)" ],
    4: [ "Très bon !", "var(--form-pass-4)" ]
}


const passScriptUrl = "https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js";
let passScriptIsIncluded = false;
let passScriptLoaded = false;

document.getElementById("auth").addEventListener("click", event => {
    event.preventDefault();
    if (!passScriptIsIncluded) {
        const script = document.createElement("script");
        script.addEventListener("load", () => { passScriptLoaded = true });
        script.src = passScriptUrl;
        document.body.appendChild(script);
        passScriptIsIncluded = true;
    }
    openModal(event, getAuthModal(), () => prepareAuthActions(true, true));
});

function getAuthModal() {
    const authModal = document.createElement("div");
    authModal.id = "auth-modal";
    authModal.innerHTML = connectionInnerHtml;
    
    return authModal;
}

function prepareAuthActions(toSignin, first = false) {
    document.getElementById("change-button").addEventListener("click", () => {
        changeAuth(toSignin);
    });
    if (first) {
        prepareConnectionModes();
    }
}

function validateEmailConfirmation(formName, id) {
    const input = document.getElementById(id).value;
    if (input === document.getElementById("input-email").value) {
        return validationStatus.VALID;
    } else {
        globalValidationObject[formName][id].error = "Les adresses email ne sont pas identiques";
        
        return validationStatus.ERROR;
    }
}

function validatePass1(formName, id) {
    if (!passScriptLoaded) {
        return validationStatus.UNCHECKED;
    }
    const input = document.getElementById(id).value;
    const score = zxcvbn(input).score;
    const passElements = document.getElementById("pass-checker-levels").children;
    if (score > 0) {
        for (let i = 1; i < 5; i++) {
            passElements[i - 1].style.background = (i <= score ? passNotationObject[score][1] : "");
        }
    }
    const passComment = document.getElementById("pass-checker-comment");
    passComment.innerText = passNotationObject[score][0];
    passComment.style.color = passNotationObject[score][1];
    
    if (score < 4) {
        globalValidationObject[formName][id].error = "Veuillez choisir un meilleur mot de passe";
    }
    
    return score >= 3 ? validationStatus.VALID : validationStatus.ERROR;
}

function validatePass2(formName, id) {
    const input = document.getElementById(id).value;
    if (input === document.getElementById("input-pass").value) {
        return validationStatus.VALID;
    } else {
        globalValidationObject[formName][id].error = "Les mots de passe ne sont pas identiques";
        
        return validationStatus.ERROR;
    }
}

function changeAuth(toSigning) {
    document.getElementById("auth-modal").innerHTML = toSigning ? signupInnerHtml : connectionInnerHtml;
    prepareAuthActions(!toSigning);
    if (toSigning) {
        prepareValidation(signupFormName);
        //TODO compléter
        document.getElementById("pass-checker-infos").addEventListener("click", event => {
            openBubble(modalBackground, event.currentTarget, getPassInfosElement(), "pass-infos", true, 500, document.getElementById("modal"), document.getElementById("auth-modal"));
        });
        prepareFormSubmit("auth-form", submitAuth);
        prepareSeePassButtons(document.getElementById("auth-form"));
    } else {
        prepareConnectionModes();
    }
}

function getPassInfosElement() {
    const p = document.createElement("p");
    p.innerHTML = `Un mot de passe sécurisé doit contenir des lettres minuscules, majuscules, des chiffres et des caractères spéciaux. Il existe des méthodes pour stocker et générer des mots de passe de façon efficace et sécurisée. <a href="">Plus d'infos ici</a>`;
    return p;
}

function prepareConnectionModes() {
    document.getElementById("connection-mode-section").innerHTML = connectionModes;
    const modes = document.getElementById("connection-modes").children;
    for (let mode of modes) {
        mode.addEventListener("click", selectConnectionMode);
    }
}

function selectConnectionMode(event) {
    const mode = event.currentTarget.dataset.mode;
    if (mode === "email") {
        event.preventDefault();
        document.getElementById("connection-mode-section").innerHTML = signinEmail;
        prepareValidation(signinFormName);
        prepareFormSubmit("auth-form", submitAuth);
        document.getElementById("back-to-connection-modes").addEventListener("click", prepareConnectionModes);
        prepareSeePassButtons(document.getElementById("auth-form"));
    } else {
        event.preventDefault();
        //TODO
    }
}

function submitAuth(event) {
    event.preventDefault();
    const signup = event.currentTarget.dataset.auth === "signup";
    const formName = signup ? signupFormName : signinFormName;
    if (fetchValidationObject[formName].fetching) {
        return;
    }
    if (signup) {
        let valid = true;
        for (let id in globalValidationObject[formName]) {
            validateField(id, false);
            if (globalValidationObject[formName][id].status !== validationStatus.VALID) {
                valid = false;
            }
            if (validateBlank(formName, id, true) !== validationStatus.VALID) {
                errorMessage(document.getElementById(id), formName, id);
            }
        }
        if (!valid) {
            return;
        }
    } else {
        
    }
    
    fetchForm(event.currentTarget, formName);
}

