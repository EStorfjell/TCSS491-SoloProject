/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

// returns a random integer between 0 and n-1
function randomInt(n) {
    return Math.floor(Math.random() * n);
}

// returns a string that can be used as a rgb web color
function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

// returns a string that can be used as a hsl web color
function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

// creates an alias for requestAnimationFrame for backwards compatibility
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (/* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
};

function radToDeg(rad) {
    return rad / (Math.PI / 180);
};

// add global parameters here

const PARAMS = {
    VERTICAL_FOV: degToRad(80),
    CAMERA_HEIGHT: 1.5,
    DEBUG: true,
    PRECISION: 0.001
};