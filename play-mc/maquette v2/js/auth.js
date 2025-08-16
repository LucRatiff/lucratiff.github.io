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

document.getElementById("auth").addEventListener("click", event => {
    event.preventDefault();
    openModal(event, getAuthModal(), () => prepareChangeAuth(true));
});

function getAuthModal() {
    const authModal = document.createElement("div");
    authModal.id = "auth-modal";
    authModal.innerHTML = connectionInnerHtml;
    
    return authModal;
}

function prepareChangeAuth(toSigning) {
    //TODO preventdefault sur le bouton d'envoi
    //TODO faire la validation du formulaire d'inscription
    document.getElementById("change-button").addEventListener("click", () => {
        changeAuth(toSigning);
    });
}

function changeAuth(toSigning) {
    document.getElementById("auth-modal").innerHTML = toSigning ? signingInnerHtml : connectionInnerHtml;
    prepareChangeAuth(!toSigning);
}

