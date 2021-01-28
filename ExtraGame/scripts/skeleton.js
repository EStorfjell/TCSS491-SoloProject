/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Skeleton {
    constructor(game, xPos, yPos, direction) {
        Object.assign(this, {game, xPos, yPos, direction});

        this.width = 0.5; // 50 cm diameter
        this.height = 2; // 200 cm tall

        this.walkSpeed = 2; // 2 m/s

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("sprites/skeleton.png");
        this.spriteWidth = 25;
        this.spriteHeight = 46;

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 3; // 0 = east, 1 = north, 2 = west, 3 = south

        this.visible = false;
        this.screenX = 0;
        this.screenY = 0;
        this.screenHeight = 46;

        this.animations = [];
        this.loadAnimations();
    };

    update() {
        // TODO: Add Skeleton behavior and collision

        // TODO: Implement rendering
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
        } else this.visible = headingFromPlayer > fovLow && headingFromPlayer < fovHigh;

        // Determine size and location of sprite
        let viewCenterX;
        if (this.visible) {
            let distanceFromPlayer = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
            let viewAngle = headingFromPlayer - this.game.player.direction;
            let distA = distanceFromPlayer * Math.sin(viewAngle);
            let distB = distanceFromPlayer * Math.cos(viewAngle);
            let distD = distB * Math.tan(PARAMS.HORIZONTAL_FOV / 2);
            viewCenterX = PARAMS.CANVAS_WIDTH * distA / distD;
        }
        let xOffset = (this.screenHeight * this.spriteWidth / this.spriteHeight) / 2;
        this.screenX = viewCenterX - xOffset;
    };

    draw(ctx) {
        if (this.visible) {
            let scale = this.screenHeight / this.spriteHeight;
            this.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.screenX, this.screenY, scale);
        }
    };

    loadAnimations() {
        for (let i = 0; i < 2; i++) { // two actions
            this.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                this.animations.push([]);
            }
        }

        // idle
        // east
        this.animations[0][0] = new Animator(this.spritesheet, 13, 146, this.spriteWidth, this.spriteHeight, 1, 0.15, 23, false, true);
        // north
        this.animations[0][1] = new Animator(this.spritesheet, 11, 210, this.spriteWidth, this.spriteHeight, 1, 0.15, 23, false, true);
        // west
        this.animations[0][2] = new Animator(this.spritesheet, 10, 82, this.spriteWidth, this.spriteHeight, 1, 0.15, 23, false, true);
        // south
        this.animations[0][3] = new Animator(this.spritesheet, 11, 18, this.spriteWidth, this.spriteHeight, 1, 0.15, 23, false, true);

        // walking
        // east
        this.animations[1][0] = new Animator(this.spritesheet, 13, 146, this.spriteWidth, this.spriteHeight, 4, 0.15, 23, false, true);
        // north
        this.animations[1][1] = new Animator(this.spritesheet, 11, 210, this.spriteWidth, this.spriteHeight, 4, 0.15, 23, false, true);
        // west
        this.animations[1][2] = new Animator(this.spritesheet, 10, 82, this.spriteWidth, this.spriteHeight, 4, 0.15, 23, false, true);
        // south
        this.animations[1][3] = new Animator(this.spritesheet, 11, 18, this.spriteWidth, this.spriteHeight, 4, 0.15, 23, false, true);
    };
}