let currentExpandMenu = null;
const expandMenus = document.getElementsByClassName("expand-menu");
if (expandMenus) {
    for (const em of expandMenus) {
        em.addEventListener("mouseenter", openExpandMenu);
        em.addEventListener("mouseleave", closeExpandMenu);
    }
}

function openExpandMenu(event) {
    closeExpandMenu();
    if (event.target.children.length < 2) {
        return;
    }
    currentExpandMenu = event.target.children[1];
    if (currentExpandMenu) {
        currentExpandMenu.style.display = "flex";
    }
}

function closeExpandMenu() {
    if (currentExpandMenu) {
        currentExpandMenu.style.display = "";
        currentExpandMenu = null;
    }
}

let currentMouseTooltip = null;
const ips = document.getElementsByClassName("ip");
if (ips) {
    for (const ip of ips) {
        ip.addEventListener("mouseenter", event => {
            openMouseTooltip(event, "Cliquez pour copier", false);
        });
        ip.addEventListener("mouseleave", removeMouseTooltipIfNotTemp);
        ip.addEventListener("click", copyIpToClipboard);
    }
}

function openMouseTooltip(mouseEvent, text, temp) {
    if (removeMouseTooltipIfNotTemp()) {
        return;
    }
    currentMouseTooltip = document.createElement("div");
    currentMouseTooltip.id = "tooltip";
    currentMouseTooltip.innerHTML = text;
    document.body.appendChild(currentMouseTooltip);
    if (temp) {
        currentMouseTooltip.classList.add("removal");
        setTimeout(removeMouseTooltip, 2000);
    }
    followingMouse(mouseEvent);
    window.addEventListener("mousemove", followingMouse);
}

function followingMouse(mouseEvent) {
    if (!currentMouseTooltip) {
        window.removeEventListener("mousemove", followingMouse);
        return;
    }
    if (window.innerHeight - mouseEvent.clientY > 32) {
        currentMouseTooltip.style.top = mouseEvent.pageY + "px";
    } else {
        currentMouseTooltip.style.top = mouseEvent.pageY - 32 + "px";
    }
    if (window.innerWidth - mouseEvent.clientX > 222) {
        currentMouseTooltip.style.left = mouseEvent.pageX + "px";
        currentMouseTooltip.style.right = "";
    } else {
        currentMouseTooltip.style.right = "0";
        currentMouseTooltip.style.left = "";
    }
}

function removeMouseTooltipIfNotTemp() {
    if (currentMouseTooltip) {
        if (currentMouseTooltip.classList.contains("removal")) {
            return true;
        } else {
            removeMouseTooltip();
            return false;
        }
    } else {
        return false;
    }
}

function removeMouseTooltip() {
    if (currentMouseTooltip) {
        currentMouseTooltip.remove();
        currentMouseTooltip = null;
    }
}

function copyIpToClipboard(event) {
    const mcServerUrl = event.target.innerHTML.split(" ")[1];
    navigator.clipboard.writeText(mcServerUrl).then(() => {
        openMouseTooltip(event, "Adresse copiée !", true);
    });
}

const scrollArrows = document.getElementsByClassName("scroll-arrow");
if (scrollArrows) {
    for (const arrow of scrollArrows) {
        arrow.addEventListener("click", scrollArrow);
    }
}

function scrollArrow(event) {
    window.scrollTo({
        top: event.currentTarget.classList.contains("up-scroll-arrow") ? 0 : window.innerHeight,
        behavior: "smooth"
    });
}

let modalBackground = null;
const modalBackgroundId = "modal-background";

document.querySelectorAll("figure img.click").forEach(e => {
    e.addEventListener("click", event => {
        openModal(event, getImgModal(event.currentTarget));
    });
});

function getImgModal(img, gallery = false) {
    const newFigure = img.parentNode.cloneNode(true);
    newFigure.removeAttribute("id");
    for (const child of newFigure.children) {
        child.removeAttribute("id");
        if (child.localName === "figcaption") {
            child.removeAttribute("hidden");
        } else {
            child.classList.remove("click");
        }
    }
    const imgModal = document.createElement("div");
    imgModal.id = "img-modal";
    const upperPart = document.createElement("div");
    upperPart.id = "img-modal-upper-part";
    upperPart.innerHTML = `
    <a href="${img.getAttribute("src")}" target="_blank" rel="noopener noreferrer" id="img-new-tab" class="button">Ouvrir dans un nouvel onglet</a>
    `;
    if (gallery) {
        //TODO galerie
    }
    imgModal.appendChild(upperPart);
    imgModal.appendChild(newFigure);
    
    return imgModal;
}

function openModal(event, elementToInclude, callback = null) {
    if (modalBackground) {
        return;
    }
    modalBackground = document.createElement("div");
    modalBackground.id = modalBackgroundId;
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.appendChild(elementToInclude);
    modalBackground.appendChild(modal);
    document.body.appendChild(modalBackground);
    modalBackground.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModal);
    document.body.style.overflow = "hidden";
    if (typeof callback === "function") {
        callback();
    }
}

function closeModal(event) {
    if (event.type === "keydown" && event.key !== "Escape" || event.type === "click" && event.target.id !== modalBackgroundId) {
        return;
    }
    modalBackground.remove();
    modalBackground = null;
    window.removeEventListener("keydown", closeModal);
    document.body.style.overflow = "";
}

const theme = getCookie("theme");
if (theme === "dark" || theme === "light") {
    document.documentElement.classList.add(theme);
}

function getCookie(name) {
    if (!document.cookie) {
        return null;
    }
    const cookies =  document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    
    return null;
}

