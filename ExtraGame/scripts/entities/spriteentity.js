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

        this._isVisible = false;
        this.screenX = 0;
        this.screenY = 0;
        this.screenHeight = this.spriteHeight;

        this._renderDistance = 0;
    };

    renderCalc() {
        // Determine where the sprite is relative to the player
        let headingFromPlayer;
        let xDiff = this.xPos - this.game.player.xPos;
        let yDiff = this.yPos - this.game.player.yPos;
        if (xDiff > 0) {
            headingFromPlayer = Math.atan(yDiff / xDiff);
            if (headingFromPlayer < 0) headingFromPlayer += 2 * Math.PI;
        } else if (xDiff < 0) {
            headingFromPlayer = Math.PI + Math.atan(yDiff / xDiff);
        } else {
            if (yDiff > 0) {
                headingFromPlayer = Math.PI / 2;
            } else {
                headingFromPlayer = 3 * Math.PI / 2;
            }
        }

        // Determine if the player can see the sprite
        // Assume horizontal fov < 180 degrees
        let fovLow = this.game.player.direction - Math.PI / 2;
        let fovHigh = this.game.player.direction + Math.PI / 2;
        if (fovLow < 0) {
            this._isVisible = headingFromPlayer > fovLow + 2 * Math.PI || headingFromPlayer < fovHigh;
        } else if (fovHigh > 2 * Math.PI) {
            this._isVisible = headingFromPlayer > fovLow || headingFromPlayer < fovHigh - 2 * Math.PI;
        } else {
            this._isVisible = headingFromPlayer > fovLow && headingFromPlayer < fovHigh;
        }

        // Determine size, orientation and location of sprite
        if (this._isVisible) {
            // TODO: Calculate which orientation the sprite should display
            this._screenRotation = (3 * Math.PI / 2) - headingFromPlayer + this.direction;
            while (this._screenRotation >= 2 * Math.PI) {
                this._screenRotation -= 2 * Math.PI;
            }
            while (this._screenRotation < 0) {
                this._screenRotation += 2 * Math.PI;
            }

            let distanceFromPlayer = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

            // Calculate distances for rendering
            // delta from player.direction
            let horizontalViewAngle;
            if (headingFromPlayer < this.game.player.direction - Math.PI) {
                horizontalViewAngle = headingFromPlayer + 2 * Math.PI - this.game.player.direction;
            } else {
                horizontalViewAngle = headingFromPlayer - this.game.player.direction;
            }
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
            this._renderDistance = distB;

            // determine scale and y screen position
            let topScreenHeight = PARAMS.CANVAS_HEIGHT * (this.height - PARAMS.CAMERA_HEIGHT) / distX;
            let bottomScreenHeight = PARAMS.CANVAS_HEIGHT * PARAMS.CAMERA_HEIGHT / distX;
            this.screenHeight = topScreenHeight + bottomScreenHeight;
            this.screenY = -(topScreenHeight);

            // determine x position on screen
            let viewCenterX = (PARAMS.CANVAS_WIDTH / 2) * distA / distD;
            let xOffset = (this.screenHeight * this.spriteWidth / this.spriteHeight) / 2;
            this.screenX = viewCenterX - xOffset;
        }
    };

    get renderDistance() {
        return this._renderDistance;
    };

    get isVisible() {
        return this._isVisible;
    };

    get screenRotation() {
        return this._screenRotation;
    }
}