/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class SpriteEntity {
    constructor(game, xPos, yPos, direction, width, height, spriteWidth, spriteHeight) {
        Object.assign(this, {game, xPos, yPos, direction, width, height, spriteWidth, spriteHeight});

        this.visible = false;
        this.screenX = 0;
        this.screenY = 0;
        this.screenHeight = this.spriteHeight;
    };

    renderCalc() {
        // TODO: Implement rotation
        // Determine where the skeleton is relative to the player
        let headingFromPlayer;
        let xDiff = this.xPos - this.game.player.xPos;
        let yDiff = this.yPos - this.game.player.yPos;
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

        // Determine if the player can see the skeleton
        // Assume horizontal fov < 180 degrees
        let fovLow = this.game.player.direction - Math.PI / 2;
        let fovHigh = this.game.player.direction + Math.PI / 2;
        if (fovLow < 0) {
            this.visible = headingFromPlayer > fovLow + 2 * Math.PI || headingFromPlayer < fovHigh;
        } else if (fovHigh > 2 * Math.PI) {
            this.visible = headingFromPlayer > fovLow || headingFromPlayer < fovHigh - 2 * Math.PI;
        } else {
            this.visible = headingFromPlayer > fovLow && headingFromPlayer < fovHigh;
        }

        // Determine size, orientation and location of sprite
        if (this.visible) {
            // TODO: Calculate which orientation the sprite should display
            let headingToPlayer = headingFromPlayer + 2 * Math.PI;
            if (headingToPlayer < 0) {
                headingToPlayer += 2 * Math.PI;
            } else if (headingToPlayer < 0) headingToPlayer += 2 * Math.PI;

            let distanceFromPlayer = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

            // Calculate distances for rendering
            // delta from player.direction
            let horizontalViewAngle = headingFromPlayer - this.game.player.direction;
            // left-right component of distance from player
            let distA = distanceFromPlayer * Math.sin(horizontalViewAngle);
            // forward-back component of distance form player
            let distB = distanceFromPlayer * Math.cos(horizontalViewAngle);
            // projecting left-right edges of screen to distB away, this is 1/2 width of the screen
            let distD = distB * Math.tan(PARAMS.HORIZONTAL_FOV / 2);
            // same as above, but vertical
            /*
             Using distB here instead of distanceFromPlayer corrects for fisheye distortion, but provides different
             distortion where things closer to the edges seem closer. This "inverse fisheye" appears to be quite common
             in many video games. Unsure which one is more accurate to real cameras, but this one makes drawing
             polys easier.
             */
            let distX = distB * Math.tan(PARAMS.VERTICAL_FOV / 2);

            // determine scale and y screen position
            let topScreenHeight = PARAMS.CANVAS_HEIGHT * (this.height - PARAMS.CAMERA_HEIGHT) / distX;
            let bottomScreenHeight = PARAMS.CANVAS_HEIGHT * PARAMS.CAMERA_HEIGHT / distX;
            this.screenHeight = topScreenHeight + bottomScreenHeight;
            this.screenY = -(topScreenHeight);

            // determine x position on screen
            let viewCenterX = PARAMS.CANVAS_WIDTH * distA / distD;
            let xOffset = (this.screenHeight * this.spriteWidth / this.spriteHeight) / 2;
            this.screenX = viewCenterX - xOffset;
        }
    };
}