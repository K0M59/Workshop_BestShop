const prices = {
    products: 0.5,
    orders: 0.25,
    package: {
        basic: 4,
        professional: 25,
        premium: 60
    },
    accounting: 35,
    terminal: 5
};
const form = document.querySelector(".calc__form");
const products = form.querySelector("#products");
const orders = form.querySelector("#orders");
const selectPackage = form.querySelector("#package");
const accounting = form.querySelector("#accounting");
const terminal = form.querySelector("#terminal");
const calcSummary = document.querySelector(".calc__summary");
products.addEventListener("change", changeHandler);
products.addEventListener("blur", blurHandler);
products.addEventListener("focus", focusHandler);
orders.addEventListener("change", changeHandler);
orders.addEventListener("blur", blurHandler);
orders.addEventListener("focus", focusHandler);
selectPackage.addEventListener("click", clickHandler);
accounting.addEventListener("change", checkboxHandler);
terminal.addEventListener("change", checkboxHandler);
function changeHandler(event) {
    const targetId = event.target.id;
    const summaryEquivalent = calcSummary.querySelector(`[data-id=${targetId}]`);
    const enteredValue = parseFloat(event.target.value);
    if (enteredValue > 0 && Number.isInteger(enteredValue)) {
        //shows the summary element
        summaryEquivalent.classList.add("open");
        //generates a string with calculation
        const itemCalc = summaryEquivalent.querySelector(".item__calc");
        itemCalc.innerText = enteredValue + " * $" + prices[targetId];
        //calculates the element s price
        const itemPrice = summaryEquivalent.querySelector(".item__price");
        itemPrice.innerText = "$" + enteredValue * prices[targetId];
    }
    if (!enteredValue) summaryEquivalent.classList.remove("open");
    // updates total
    calculateTotal();
}
function calculateTotal() {
    const summaryTotal = document.querySelector("#total-price");
    const summaryTotalPrice = summaryTotal.querySelector(".total__price");
    let sumTotal = 0;
    const shownItems = Array.from(calcSummary.querySelectorAll("li.open"));
    shownItems.forEach(function(el) {
        const regex = /(?<=\$)\d+\.?\d*/;
        const elPrice = el.lastElementChild.innerText.match(regex);
        sumTotal += +elPrice;
    });
    if (sumTotal > 0) {
        summaryTotal.classList.add("open");
        summaryTotalPrice.innerText = "$" + sumTotal;
    }
    if (shownItems.length === 0) summaryTotal.classList.remove("open");
}
function clickHandler(event) {
    const selectDropdown = selectPackage.querySelector(".select__dropdown");
    selectDropdown.style.margin = "0";
    const computedDisplay = window.getComputedStyle(selectDropdown).getPropertyValue("display");
    if (computedDisplay === "none") selectDropdown.style.display = "block";
    if (computedDisplay === "block") selectDropdown.style.display = "none";
    if (Object.keys(prices.package).includes(event.target.innerText.toLowerCase())) {
        const packageSelected = event.target.innerText.toLowerCase();
        const selectInput = selectPackage.querySelector(".select__input");
        selectInput.innerText = packageSelected;
        // modify the summary element
        const summaryEquivalent = calcSummary.querySelector("[data-id=package]");
        //generates a string with calculation
        const itemCalc = summaryEquivalent.querySelector(".item__calc");
        itemCalc.innerText = packageSelected;
        //calculates the element s price
        const itemPrice = summaryEquivalent.querySelector(".item__price");
        itemPrice.innerText = "$" + prices.package[packageSelected];
        //shows the summary element
        summaryEquivalent.classList.add("open");
        // updates total
        calculateTotal();
    }
}
function checkboxHandler(event) {
    const targetId = event.target.id;
    const summaryEquivalent = calcSummary.querySelector(`[data-id=${targetId}]`);
    const itemPrice = summaryEquivalent.querySelector(".item__price");
    if (event.target.checked) {
        summaryEquivalent.classList.add("open");
        itemPrice.innerText = "$" + prices[targetId];
    }
    if (!event.target.checked) summaryEquivalent.classList.remove("open");
    calculateTotal();
}
function blurHandler(event) {
    const inputValue = event.target.value;
    if (inputValue.trim() !== "") {
        if (!Number.isInteger(parseFloat(inputValue))) {
            event.target.style.borderColor = "red";
            event.target.style.marginBottom = "calc(20px - 1rem)";
            const errorMessage = document.createElement("div");
            errorMessage.classList.add("error");
            errorMessage.innerText = "The number has to be an integer";
            errorMessage.style.height = "1rem";
            errorMessage.style.color = "red";
            errorMessage.style.fontSize = ".65rem";
            event.target.parentNode.appendChild(errorMessage);
        }
    }
}
function focusHandler(event) {
    const lastChild = event.target.parentNode.lastElementChild;
    if (lastChild.classList.contains("error")) {
        event.target.parentNode.removeChild(lastChild);
        event.target.style.borderColor = "#08a6e4";
        event.target.style.marginBottom = "20px";
    }
}

//# sourceMappingURL=index.cea00a9b.js.map
