/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Wall {
    // TODO: Implement collision to replace wall collision in player.js
    // TODO: Implement collision to replace wall collision in player.js
    constructor(game, xStart, yStart, xEnd, yEnd, height, color) {
        Object.assign(this, {game, xStart, yStart, xEnd, yEnd, height, color});
        this.corners = []; // Bottom-start, top-start, top-end, bottom-end
        this.initCorners();
    };

    update() {
        // Determine if the player can see edges of walls
        let startVisible = this.checkEdgeVisible(this.xStart, this.yStart);
        let endVisible = this.checkEdgeVisible(this.xEnd, this.yEnd);

        // Calculate positions of corners
        if (startVisible && endVisible) {
            // Both edges of the wall are in front of the player and wall can just be drawn corner to corner

        } else if (startVisible) {
            // "Start" edge can be drawn simply and line intersection required for rest

        } else if (endVisible) {
            // "End" edge can be drawn simply and line intersection required for rest

        } else {
            // Line intersections needed to be calculated to see if wall is visible

        }
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
            this.corners.push({screenX: 0, screenY: 0});
        }
    };

    checkEdgeVisible(xPos, yPos) {
        // Determine where the wall end is relative to the player
        let headingFromPlayer;
        let xDiff = xPos - this.game.player.xPos;
        let yDiff = yPos - this.game.player.yPos;
        if (yDiff < 0) {
            headingFromPlayer = -(Math.atan(xDiff / yDiff));
            if (headingFromPlayer < 0) headingFromPlayer += 2 * Math.PI;
        } else if (yDiff > 0) {
            headingFromPlayer = Math.PI - Math.atan(xDiff / yDiff);
        } else {
            if (xDiff > 0) {
                headingFromPlayer = Math.PI / 2;
            } else {
                headingFromPlayer = -(Math.PI / 2);
            }
        }

        // Determine if the player can see the wall end
        let visible;
        // Assume horizontal fov < 180 degrees
        let fovLow = this.game.player.direction - Math.PI / 2;
        let fovHigh = this.game.player.direction + Math.PI / 2;
        if (fovLow < 0) {
            visible = headingFromPlayer > fovLow + 2 * Math.PI || headingFromPlayer < fovHigh;
        } else if (fovHigh > 2 * Math.PI) {
            visible = headingFromPlayer > fovLow || headingFromPlayer < fovHigh - 2 * Math.PI;
        } else {
            visible = headingFromPlayer > fovLow && headingFromPlayer < fovHigh;
        }

        return visible;
    };
}