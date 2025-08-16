const connectionInnerHtml = `
<h2>Connexion</h2>
<form action="" method="post">
    <div>
        <label for="email">Adresse email :</label>
        <input type="email" name="email" required>
    </div>
    <div>
        <label for="pass">Mot de passe :</label>
        <input type="password" name="pass" required>
    </div>
    <div id="auth-submit">
        <input type="submit" class="button" value="Connexion">
    </div>
</form>
<div id="auth-modal-change">
    <p>Vous n'avez pas de compte ?</p>
    <div id="change-button" class="button">Inscription</div>
</div>
`;
const signingInnerHtml = `
<h2>Inscription</h2>
<form action="" method="post">
    <div>
        <label for="text">Nom d'utilisateur :</label>
        <input type="text" name="text" required>
    </div>
    <div>
        <label for="email">Adresse email :</label>
        <input type="email" name="email" required>
    </div>
    <div>
        <label for="email2">Confirmez l'adresse email :</label>
        <input type="email" name="email2" required>
    </div>
    <div>
        <label for="pass">Mot de passe :</label>
        <input type="password" name="pass" required>
    </div>
    <div>
        <label for="pass2">Confirmez le mot de passe :</label>
        <input type="password" name="pass2" required>
    </div>
    <div id="auth-submit">
        <input type="submit" class="button" value="Inscription">
    </div>
</form>
<div id="auth-modal-change">
    <p>Vous avez déjà un compte ?</p>
    <div id="change-button" class="button">Connexion</div>
</div>
`;

let authModalBackground;
prepareModalOpening();

function prepareModalOpening() {
    document.getElementById("auth").addEventListener("click", openAuthModal, { once: true});
}

function openAuthModal() {
    authModalBackground = document.createElement("div");
    authModalBackground.id = "auth-modal-background";
    const authModal = document.createElement("div");
    authModal.id = "auth-modal";
    authModal.innerHTML = connectionInnerHtml;
    authModalBackground.appendChild(authModal);
    document.body.style.overflow = "hidden";
    document.body.appendChild(authModalBackground);
    authModalBackground.addEventListener("click", closeAuthModal);
    window.addEventListener("keydown", closeAuthModal);
    prepareChangeAuth(true);
}

function closeAuthModal(event) {
    if (event.type === "keydown" && event.key !== "Escape" || event.type === "click" && event.target.id !== "auth-modal-background") {
        return;
    }
    authModalBackground.removeEventListener("click", closeAuthModal);
    window.removeEventListener("keydown", closeAuthModal);
    authModalBackground.remove();
    authModalBackground = null;
    document.body.style.overflow = "";
    prepareModalOpening();
}

function prepareChangeAuth(toSigning) {
    document.getElementById("change-button").addEventListener("click", () => {
        changeAuth(toSigning);
    });
}

function changeAuth(toSigning) {
    document.getElementById("auth-modal").innerHTML = toSigning ? signingInnerHtml : connectionInnerHtml;
    prepareChangeAuth(!toSigning);
}

