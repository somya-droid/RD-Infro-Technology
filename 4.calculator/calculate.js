let currentInput = "";
let operator = "";
let previousInput = "";
let history = document.getElementById("history");
let display = document.getElementById("current");
let themeToggle = document.getElementById("themeToggle");

// Check local storage for user preference
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.checked = true;
}

themeToggle.addEventListener("change", function() {
    document.body.classList.toggle("light-mode");
    
    // Save theme preference in local storage
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

function appendNumber(number) {
    if (currentInput.length >= 9) return;
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (!currentInput) return;
    if (operator) calculateResult();
    previousInput = currentInput;
    operator = op;
    currentInput = "";
}

function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

function negate() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function percentage() {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = "";
    operator = "";
    previousInput = "";
    history.innerText = "";
    updateDisplay();
}

function calculateResult() {
    if (!operator || !previousInput || !currentInput) return;
    let result = eval(previousInput + operator + currentInput);
    history.innerText = previousInput + " " + operator + " " + currentInput + " =";
    currentInput = result.toString().slice(0, 9);
    operator = "";
    previousInput = "";
    updateDisplay();
}

function updateDisplay() {
    display.innerText = currentInput || "0";
}
