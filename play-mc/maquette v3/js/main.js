let currentExpandMenuLinks = null;
const expandMenus = document.getElementsByClassName("expand-menu");
if (expandMenus) {
    for (const em of expandMenus) {
        em.addEventListener("mouseenter", openExpandMenu);
        em.addEventListener("mouseleave", closeExpandMenu);
        em.addEventListener("click", openExpandMenu);
    }
}

function openExpandMenu(event) {
    if (closeExpandMenu(event) || event.currentTarget.children.length < 2) {
        return;
    }
    currentExpandMenuLinks = event.currentTarget.children[1];
    if (currentExpandMenuLinks) {
        currentExpandMenuLinks.style.display = "";
    }
    if (event.type === "click") {
        event.stopPropagation();
        window.addEventListener("click", closeExpandMenu);
    }
}

function closeExpandMenu(event, close = false) {
    if (currentExpandMenuLinks) {
        if (event.type === "click") {
            if (event.target.closest(".expand-menu-links")) {
                return false;
            }
            window.removeEventListener("click", closeExpandMenu);
        }
        currentExpandMenuLinks.style.display = "none";
        currentExpandMenuLinks = null;
        
        return true;
    }
}

prepareMobileMenuButton();

function prepareMobileMenuButton() {
    document.getElementById("mobile-menu-button").addEventListener("click", openMobileMenu, { once: true });
}

function openMobileMenu(event) {
    document.getElementById("mobile-menu").style.display = "";
    event.stopPropagation();
    window.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu(event) {
    if (event.target.closest("#mobile-menu")) {
        return;
    }
    document.getElementById("mobile-menu").style.display = "none";
    window.removeEventListener("click", closeMobileMenu);
    prepareMobileMenuButton();
}

let menuIsFixed = false;
const firstHeaderHeight = document.getElementById("first-header").clientHeight;
window.addEventListener("scroll", fixMenu);
window.addEventListener("resize", fixMenu);

function fixMenu() {
    if (menuIsFixed) {
        if (window.scrollY < firstHeaderHeight) {
            const menu = document.getElementById("middle-section");
            menu.classList.remove("fixed");
            menuIsFixed = false;
        }
    } else if (window.scrollY >= firstHeaderHeight) {
        const menu = document.getElementById("middle-section");
        menu.classList.add("fixed");
        menuIsFixed = true;
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
        top: event.currentTarget.classList.contains("up-scroll-arrow") ? 0 : window.innerHeight - 140,
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
    const exit = document.createElement("div");
    exit.classList.add("exit");
    exit.addEventListener("click", closeModal);
    modal.appendChild(exit);
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
    if (event.type === "keydown" && event.key !== "Escape" || event.type === "click" && event.target.id !== modalBackgroundId && !event.currentTarget.classList.contains("exit")) {
        return;
    }
    modalBackground.remove();
    modalBackground = null;
    window.removeEventListener("keydown", closeModal);
    document.body.style.overflow = "";
}

const theme = getCookie("theme");
if (theme === "dark" || theme === "light") {
    //TODO juste pour la maquette
    if (theme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
        document.getElementById("dark-theme-toggle").style.display = "";
        document.getElementById("light-theme-toggle").style.display = "none";
        document.getElementById("theme-title").innerText = "Thème sombre";
        document.getElementById("toggle-theme").dataset.theme = "dark";
    } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
        document.getElementById("dark-theme-toggle").style.display = "none";
        document.getElementById("light-theme-toggle").style.display = "";
        document.getElementById("theme-title").innerText = "Thème clair";
        document.getElementById("toggle-theme").dataset.theme = "light";
    }
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

const toggleTheme = document.getElementById("toggle-theme");
if (toggleTheme) {
    toggleTheme.style.display = "";
    toggleTheme.addEventListener("click", event => {
        document.cookie = `theme=${event.currentTarget.dataset.theme === "dark" ? "dark":"light" }; path=/; max-age=31536000; Secure; SameSite=Strict`;
    });
}

let currentBubble = null;
let currentBubbleName = null;
let currentBubbleArrow = null;
let currentBubleIdealWidth = 0;
let currentElementToFollow = null;
let elementToFollowScroll = null;

function openBubble(parentElement, elementToFollow, contentElement, name, openedByClick, idealWidth, elementScroll, elementToObserve) {
    if (currentBubble) {
        closeBubble();
        if (openedByClick && name !== null && currentBubbleName === name) {
            currentBubbleName = null;
            return;
        }
    }
    currentBubbleName = name;
    currentElementToFollow = elementToFollow;
    elementToFollowScroll = elementScroll;
    currentBubble = document.createElement("div");
    currentBubble.id = "bubble";
    const cross = document.createElement("div");
    cross.classList.add("exit");
    cross.addEventListener("click", closeBubble);
    currentBubble.appendChild(cross);
    currentBubbleArrow = document.createElement("div");
    currentBubbleArrow.id = "bubble-arrow";
    currentBubbleArrow.dataset.direction = "left";
    currentBubble.appendChild(currentBubbleArrow);
    currentBubble.appendChild(contentElement);
    currentBubleIdealWidth = idealWidth;
    placeBubble();
    parentElement.appendChild(currentBubble);
    elementToFollowScroll.addEventListener("scroll", placeBubble);
    window.addEventListener("resize", placeBubble);
    bubbleParentObserver.observe(elementToObserve, { childList: true, subtree: true });
}

function placeBubble() {
    if (!currentBubble || !currentElementToFollow) {
        closeBubble();
        return;
    }
    const bubbleMinWidth = 350;
    const bubbleGap = 20;
    const totalMinWidth = bubbleMinWidth + bubbleGap;
    const rect = currentElementToFollow.getBoundingClientRect();
    let side = true;
    if (window.innerWidth - rect.right >= totalMinWidth) {
        currentBubble.style.left = (rect.right + bubbleGap) + "px";
        currentBubble.style.right = "";
        currentBubble.style.width = (Math.min(window.innerWidth - (rect.right + bubbleGap), currentBubleIdealWidth)) + "px";
        currentBubble.style.maxHeight = "";
        currentBubbleArrow.dataset.direction = "left";
        currentBubbleArrow.style.right = "100%";
        currentBubbleArrow.style.left = "";
    } else if (rect.left >= totalMinWidth) {
        currentBubble.style.right = (window.innerWidth - rect.left + bubbleGap) + "px";
        currentBubble.style.left = "";
        currentBubble.style.width = (Math.min(rect.left - bubbleGap, currentBubleIdealWidth)) + "px";
        currentBubble.style.maxHeight = "";
        currentBubbleArrow.dataset.direction = "right";
        currentBubbleArrow.style.left = "100%";
        currentBubbleArrow.style.right = "";
    } else {
        currentBubble.style.left = "0";
        currentBubble.style.right = "";
        currentBubble.style.width = "100%";
        side = false;
        currentBubbleArrow.style.left = (rect.width / 2 + rect.left - 10) + "px";
        currentBubbleArrow.style.right = "";
    }
    if (side) {
        if (window.innerHeight - rect.top >= totalMinWidth / 2) {
            currentBubble.style.top = rect.top + "px";
            currentBubble.style.bottom = "";
            currentBubble.style.maxHeight = (window.innerHeight - rect.top) + "px";
            currentBubbleArrow.style.top = "0";
            currentBubbleArrow.style.bottom = "";
        } else {
            currentBubble.style.bottom = (window.innerHeight - rect.top - 40) + "px";
            currentBubble.style.top = "";
            currentBubble.style.maxHeight = (rect.top + bubbleGap) + "px";
            currentBubbleArrow.style.bottom = "0";
            currentBubbleArrow.style.top = "";
        }
    } else {
        if (window.innerHeight - rect.bottom >= totalMinWidth / 2) {
            currentBubble.style.top = (rect.bottom + bubbleGap) + "px";
            currentBubble.style.bottom = "";
            currentBubble.style.maxHeight = (window.innerHeight - rect.bottom + bubbleGap) + "px";
            currentBubbleArrow.dataset.direction = "up";
            currentBubbleArrow.style.bottom = "100%";
            currentBubbleArrow.style.top = "";
        } else {
            currentBubble.style.bottom = (window.innerHeight - rect.top + bubbleGap) + "px";
            currentBubble.style.top = "";
            currentBubble.style.maxHeight = (rect.top - bubbleGap) + "px";
            currentBubbleArrow.dataset.direction = "down";
            currentBubbleArrow.style.top = "100%";
            currentBubbleArrow.style.bottom = "";
        }
    }
}

function closeBubble() {
    if (currentBubble) {
        currentBubble.remove();
        currentBubble = null;
    }
    currentBubbleArrow = null;
    currentElementToFollow = null;
    elementToFollowScroll.removeEventListener("scroll", placeBubble);
    window.removeEventListener("resize", placeBubble);
    bubbleParentObserver.disconnect();
}

const bubbleParentObserver = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.removedNodes.length > 0) {
            for (const node of mutation.removedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = node.querySelector(`#${currentElementToFollow.id}`);
                    if (element) {
                        closeBubble();
                        return;
                    }
                }
            }
        }
    });
});

