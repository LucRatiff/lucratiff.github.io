let expandMenuOpen = null;
let expandMenuOpenNumber = 0;
const expands = document.getElementsByClassName("expand-menu");
for (let i = 0; i < expands.length; i++) {
    expands[i].addEventListener("click", () => {
        toggleExpandMenu(expands[i], i);
    });
}

function toggleExpandMenu(expand, number) {
    toggleArrow(expand);
    if (expandMenuOpen != null) {
        closeExpandMenuAndRemovePrepareClose();
        if (expandMenuOpenNumber !== number) {
            openExpandMenuAndPrepareClose(expand);
            expandMenuOpen = expand;
            expandMenuOpenNumber = number;
        } else {
            expandMenuOpen = null;
        }
    } else {
        openExpandMenuAndPrepareClose(expand);
        expandMenuOpen = expand;
        expandMenuOpenNumber = number;
    }
}

function toggleArrow(expand) {
    const children = expand.children;
    for (const child of children) {
        if (child.classList.contains("arrow")) {
            child.classList.toggle("rotated");
            break;
        }
    }
}

function closeExpandMenuAndRemovePrepareClose() {
    expandMenuOpen.classList.remove("selected");
    document.removeEventListener("click", closeExpandMenuFromDocument);
    document.removeEventListener("keydown", closeExpandMenuFromDocument);
}

function openExpandMenuAndPrepareClose(expand) {
    expand.classList.add("selected");
    document.addEventListener("click", closeExpandMenuFromDocument);
    document.addEventListener("keydown", closeExpandMenuFromDocument);
}

function closeExpandMenuFromDocument(event) {
    if (event.type === "keydown") {
        if (event.key !== "Escape") {
            return;
        }
    } else {
        if (event.target.closest(".expand-menu")) {
            return;
        }
    }
    toggleArrow(expandMenuOpen);
    closeExpandMenuAndRemovePrepareClose();
    expandMenuOpen = null;
}

const menu = document.getElementById("header-menu");
const home = document.getElementById("home");
const auth = document.getElementById("auth");
const menuPosition = menu.offsetTop + 10;
let menuIsStick = window.scrollY < menuPosition;
window.addEventListener('scroll', topMenuSticky);
window.addEventListener('resize', topMenuSticky);

function topMenuSticky() {
    if (menuIsStick) {
        if (window.scrollY <= menuPosition) {
            menu.classList.remove("stick");
            home.classList.remove("stick");
            auth.classList.remove("stick");
            menuIsStick = false;
        }
    } else {
        if (window.scrollY > menuPosition) {
            menu.classList.add("stick");
            home.classList.add("stick");
            auth.classList.add("stick");
            menuIsStick = true;
        }
    }
}

let toast;
let timeoutToastId;
document.querySelectorAll(".ip").forEach(ip => {
    ip.addEventListener("click", copyServerToClipboard);
});

function copyServerToClipboard(event) {
    navigator.clipboard.writeText("play-mc.fr").then(() => {
        if (toast) {
            toast.remove();
            clearTimeout(timeoutToastId);
        }
        toast = document.createElement("div");
        toast.id = "clipboard-toast";
        toast.innerHTML = "L'adresse a bien été copiée !";
        if (window.innerHeight - event.clientY > 32) {
            toast.style.top = event.pageY + "px";
        } else {
            toast.style.top = event.pageY - 32 + "px";
        }
        if (window.innerWidth - event.clientX > 222) {
            toast.style.left = event.pageX + "px";
        } else {
            toast.style.right = "0";
        }
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            if (toast) {
                toast.remove();
                toast = null;
            }
        }, 2000);
    });
}

let mobileAsideIsOpen = false;
prepareMobileMenuOpening();

function prepareMobileMenuOpening() {
    document.getElementById("burger-menu").addEventListener("click", openMobileMenu, { once: true });
    document.getElementById("aside-arrow").addEventListener("click", openMobileAside, { once: true });
}

function openMobileMenu() {
    createMobileMenuBackground();
    document.getElementById("header-mobile-menu").style.display = "block";
    document.getElementById("burger-menu").style.display = "none";
    document.getElementById("aside-arrow").style.display = "none";
    document.getElementById("mobile-menu-arrow").addEventListener("click", closeMobileModal, { once: true });
    window.addEventListener("keydown", closeMobileModal);
}

function openMobileAside() {
    createMobileMenuBackground();
    const aside = document.querySelector("aside");
    aside.style.left = "unset";
    aside.style.right = "0";
    mobileAsideIsOpen = true;
    const asideArrow = document.getElementById("aside-arrow");
    asideArrow.addEventListener("click", closeMobileModal, { once: true });
    asideArrow.classList.add("rotated");
    asideArrow.children[0].classList.add("rotated");
    window.addEventListener("keydown", closeMobileModal);
}

function createMobileMenuBackground() {
    const mobileMenuBackground = document.createElement("div");
    mobileMenuBackground.id = "mobile-menu-background";
    document.body.appendChild(mobileMenuBackground);
    document.body.style.overflow = "hidden";
    mobileMenuBackground.addEventListener("click", closeMobileModal);
}

function closeMobileModal(event) {
    if (event.type === "keydown" && event.key !== "Escape" ||
        event.type === "click" && event.target.id !== "mobile-menu-background" &&
        event.target.id !== "mobile-menu-arrow" && event.target.id !== "aside-arrow" &&
        event.target.parentElement.id !== "mobile-menu-arrow" && event.target.parentElement.id !== "aside-arrow") {
        return;
    }
    window.removeEventListener("keydown", closeMobileModal);
    document.getElementById("mobile-menu-background").remove();
    document.body.style.overflow = "";
    if (mobileAsideIsOpen) {
        const aside = document.querySelector("aside");
        aside.style.left = "";
        aside.style.right = "";
        const asideArrow = document.getElementById("aside-arrow");
        asideArrow.classList.remove("rotated");
        asideArrow.children[0].classList.remove("rotated");
        mobileAsideIsOpen = false;
    } else {
        document.getElementById("header-mobile-menu").style.display = "";
        document.getElementById("burger-menu").style.display = "";
        document.getElementById("aside-arrow").style.display = "";
    }
    prepareMobileMenuOpening();
}

