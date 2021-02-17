/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Wall {
    // TODO: Implement collision to replace wall collision in player.js
    constructor(game, xStart, yStart, xEnd, yEnd, height, color) {
        Object.assign(this, {game, xStart, yStart, xEnd, yEnd, height, color});
        this.corners = []; // Bottom-start, top-start, top-end, bottom-end
        this.initCorners();
    };

    update() {
        // Determine if visible
        // Calculate positions of corners
    };

    draw(ctx) {
        // Draw polygon
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 4; i++) { // four corners
            ctx.moveTo(this.corners[i]);
        }
    };

    initCorners() {
        for (let i = 0; i < 4; i++) { // four corners
            this.corners.push({x: 0, y: 0});
        }
    };
}