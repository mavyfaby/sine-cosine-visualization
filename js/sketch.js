/**
 * @author Maverick Fabroa
 * @date 2022-05-19
 */

let sin, cos, combined, radians = 0;
let radiansEl, degreesEl, freqEl, radiansSliderEl, showSinCosCheckboxEl, showSinCosContainerEl;
let frequency = 0.05;
let showSinCos = true;

function setup() {
    // Create canvas
    createCanvas(window.innerWidth, window.innerHeight * 1.8);

    sin = new Sine();
    cos = new Cosine();
    combined = new Combined(100);

    radiansEl = document.getElementById("radians-label");
    degreesEl = document.getElementById("degrees-label");
    freqEl = document.getElementById("freq-label");
    radiansSliderEl = document.getElementById("radians-slider");
    showSinCosCheckboxEl = document.getElementById("show-sin-cos-el");
    showSinCosContainerEl = document.getElementById("show-sin-cos-container");

    // Frequency slider
    radiansSliderEl.addEventListener("input", (e) => {
        frequency = parseFloat(e.target.value);
    });

    // Sine and Cosine checkbox
    showSinCosContainerEl.addEventListener("click", () => {
        showSinCos = !showSinCos;
        showSinCosCheckboxEl.checked = showSinCos;
    }, true);
}

function draw() {
    background(15);

    // Show and update Sine
    sin.show();
    sin.update(radians);

    // Show and update Cosine
    cos.show();
    cos.update(radians);

    // Show and update combined
    combined.show();
    combined.update(radians);

    // Increment radians by frequency
    radians += frequency;

    // Radians
    const parsedRadians = (radians % Math.PI).toFixed(2);
    // Degrees 
    const parsedDegrees = (parsedRadians * (180 / Math.PI)).toFixed(2);

    // Set radians
    radiansEl.innerText = `Radians: ${parsedRadians}`;
    // Set degrees
    degreesEl.innerText = `Degrees: ${parsedDegrees}`;
    // Set frequency in radians
    freqEl.innerText = `Frequency (radians): ${frequency}`;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}