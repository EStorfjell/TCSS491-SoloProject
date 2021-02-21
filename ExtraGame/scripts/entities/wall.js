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

        this._isVisible = false;
    };

    update() {
        // Determine if the player can see edges of walls
        let startVisible = this.checkEdgeVisible(this.xStart, this.yStart, PARAMS.HORIZONTAL_FOV);
        let endVisible = this.checkEdgeVisible(this.xEnd, this.yEnd, PARAMS.HORIZONTAL_FOV);

        // Calculate positions of corners
        this._isVisible = true;
        if (startVisible && endVisible) {
            // Both edges of the wall are in front of the player and wall can just be drawn corner to corner
            let startEdge = this.renderEdge(this.xStart, this.yStart);
            this.corners[0] = startEdge.bottomScreenCorner;
            this.corners[1] = startEdge.topScreenCorner;
            let endEdge = this.renderEdge(this.xEnd, this.yEnd);
            this.corners[3] = endEdge.bottomScreenCorner;
            this.corners[2] = endEdge.topScreenCorner;
        } else {
            // TODO: FIX
            let wallLine = new Line(this.game, this.xStart, this.yStart, this.xEnd, this.yEnd);
            let viewTargets = {
                leftX: this.game.player.xPos + 10 * Math.cos(this.game.player.direction - (PARAMS.HORIZONTAL_FOV / 2)),
                leftY: this.game.player.yPos + 10 * Math.sin(this.game.player.direction - (PARAMS.HORIZONTAL_FOV / 2)),
                rightX: this.game.player.xPos + 10 * Math.cos(this.game.player.direction + (PARAMS.HORIZONTAL_FOV / 2)),
                rightY: this.game.player.yPos + 10 * Math.sin(this.game.player.direction + (PARAMS.HORIZONTAL_FOV / 2))
            };
            let leftView = new Line(this.game, this.game.player.xPos, this.game.player.yPos, viewTargets.leftX,
                viewTargets.leftY);
            let rightView = new Line(this.game, this.game.player.xPos, this.game.player.yPos, viewTargets.rightX,
                viewTargets.rightY);

            let leftIntersect = wallLine.collide(leftView);
            let rightIntersect = wallLine.collide(rightView);

            let leftEdge = null;
            let rightEdge = null;

            if (leftIntersect !== false && this.checkEdgeVisible(leftIntersect.x, leftIntersect.y, Math.PI)) {
                leftEdge = this.renderEdge(leftIntersect.x, leftIntersect.y);
            }
            if (rightIntersect !== false && this.checkEdgeVisible(rightIntersect.x, rightIntersect.y, Math.PI)) {
                rightEdge = this.renderEdge(rightIntersect.x, rightIntersect.y);
            }

            if (startVisible) {
                // "Start" edge can be drawn simply and line intersection required for rest
                let startEdge = this.renderEdge(this.xStart, this.yStart);
                this.corners[0] = startEdge.bottomScreenCorner;
                this.corners[1] = startEdge.topScreenCorner;

                if (leftEdge !== null) {
                    this.corners[3] = leftEdge.bottomScreenCorner;
                    this.corners[2] = leftEdge.topScreenCorner;
                } else if (rightEdge !== null) {
                    this.corners[3] = rightEdge.bottomScreenCorner;
                    this.corners[2] = rightEdge.topScreenCorner;
                }
            } else if (endVisible) {
                // "End" edge can be drawn simply and line intersection required for rest
                let endEdge = this.renderEdge(this.xEnd, this.yEnd);
                this.corners[3] = endEdge.bottomScreenCorner;
                this.corners[2] = endEdge.topScreenCorner;

                if (leftEdge !== null) {
                    this.corners[0] = leftEdge.bottomScreenCorner;
                    this.corners[1] = leftEdge.topScreenCorner;
                } else if (rightEdge !== null) {
                    this.corners[0] = rightEdge.bottomScreenCorner;
                    this.corners[1] = rightEdge.topScreenCorner;
                }
            } else {
                if (leftEdge !== null) {
                    this.corners[0] = leftEdge.bottomScreenCorner;
                    this.corners[1] = leftEdge.topScreenCorner;
                } else {
                    this._isVisible = false;
                }
                if (rightEdge !== null) {
                    this.corners[3] = rightEdge.bottomScreenCorner;
                    this.corners[2] = rightEdge.topScreenCorner;
                } else {
                    this._isVisible = false;
                }
            }
        }
    };

    draw(ctx) {
        if (this._isVisible) {
            // Draw polygon
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.corners[0].screenX, this.corners[0].screenY);
            for (let i = 1; i < 4; i++) { // four corners
                ctx.lineTo(this.corners[i].screenX, this.corners[i].screenY);
            }
            ctx.closePath();
            ctx.fill();
        }
    };

    initCorners() {
        for (let i = 0; i < 4; i++) { // four corners
            this.corners.push({screenX: 0, screenY: 0});
        }
    };

    get isVisible() {
        return this._isVisible;
    };

    checkEdgeVisible(xPos, yPos, fov) {
        // Determine where the wall end is relative to the player
        let headingFromPlayer = this.calcHeadingFromPlayer(xPos, yPos);

        // Determine if the player can see the wall end
        let visible;
        let fovLow = this.game.player.direction - fov / 2;
        let fovHigh = this.game.player.direction + fov / 2;
        // Assume horizontal fov < 180 degrees
        if (fovLow < 0) {
            visible = headingFromPlayer > fovLow + 2 * Math.PI || headingFromPlayer < fovHigh;
        } else if (fovHigh > 2 * Math.PI) {
            visible = headingFromPlayer > fovLow || headingFromPlayer < fovHigh - 2 * Math.PI;
        } else {
            visible = headingFromPlayer > fovLow && headingFromPlayer < fovHigh;
        }

        return visible;
    };

    calcHeadingFromPlayer(xPos, yPos) {
        let headingFromPlayer;
        let xDiff = xPos - this.game.player.xPos;
        let yDiff = yPos - this.game.player.yPos;
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
        return headingFromPlayer;
    };

    renderEdge(xPos, yPos) {
        let headingFromPlayer = this.calcHeadingFromPlayer(xPos, yPos);
        let xDiff = xPos - this.game.player.xPos;
        let yDiff = yPos - this.game.player.yPos;
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
        let distX = distB * Math.tan(PARAMS.VERTICAL_FOV / 2);

        // determine height and y screen position
        let screenYTop = -(PARAMS.CANVAS_HEIGHT * (this.height - PARAMS.CAMERA_HEIGHT) / distX);
        let screenYBottom = PARAMS.CANVAS_HEIGHT * PARAMS.CAMERA_HEIGHT / distX;

        // determine x position on screen
        let screenX = (PARAMS.CANVAS_WIDTH / 2) * distA / distD;

        let bottomScreenCorner = {screenX: screenX, screenY: screenYBottom};
        let topScreenCorner = {screenX: screenX, screenY: screenYTop};

        return {bottomScreenCorner, topScreenCorner};
    };
}