const pixelsOffset = 40;
let elementToBegin = 0;
const texts = document.querySelectorAll('.presentation-text');
const keyframes = new Array(texts.length);
for (let i = 0; i < texts.length; i++) {
    const pList = texts[i].children;
    const firstPPosition = pList[0].getBoundingClientRect().top;
    const classList = texts[i].parentElement.classList;
    const rotation = classList.contains('text-left') ? -5 :
        classList.contains('text-right') ? 5 : 0;
    keyframes[i] = "deploy-" + (rotation === -5 ? "left" : rotation === 5 ? "right" : "top");
    for (let j = 1; j < pList.length; j++) {
        pList[j].style.transform =
            "translateY(" + (firstPPosition - pList[j].getBoundingClientRect().top) + "px) " +
            (rotation !== 0 ? "rotate(" + rotation + "deg)" : "");
    }
}

deployTexts();
window.addEventListener('scroll', deployTexts);
window.addEventListener('resize', deployTexts);

function deployTexts() {
    for (let i = elementToBegin; i < texts.length; i++) {
        if (texts[i].getBoundingClientRect().top > window.innerHeight - pixelsOffset) {
            break;
        }
        const pList = texts[i].children;
        for (let j = 1; j < pList.length; j++) {
            pList[j].style.animation = keyframes[i] + " 0.5s ease forwards";
        }
        elementToBegin++;
    }
    if (elementToBegin === texts.length) {
        window.removeEventListener('scroll', deployTexts);
        window.removeEventListener('resize', deployTexts);
    }
}
