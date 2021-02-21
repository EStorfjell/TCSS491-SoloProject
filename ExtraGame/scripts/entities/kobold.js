/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Kobold extends SpriteEntity {
    static width = 0.5; // diameter in meters
    static height = 2; // height in meters
    static walkSpeed = 2; // 2 m/s
    static health = 10;

    // sprite sheet
    static spritesheet = ASSET_MANAGER.getAsset("sprites/kobold.png");
    static spriteWidth = 106;
    static spriteHeight = 106;
    static walkAnimSpeed = 0.25; // seconds per frame

    static animations = null;

    constructor(game, xPos, yPos, direction) {
        super(game, xPos, yPos, direction, Kobold.width, Kobold.height, Kobold.spriteWidth, Kobold.spriteHeight);

        // character states
        this.action = 0; // 1 = walking, 2 = attacking
        this.facing = 0; // 0 = E, 1, = SE, 2 = S, 3 = SW, 4 = W, 5 = NW, 6 = N, 7 = NE

        if (Kobold.animations == null) {
            Kobold.loadAnimations();
        }
    };

    update() {
        // TODO: Add Skeleton behavior and collision
        this.renderCalc();
    };

    draw(ctx) {
        if (this.isVisible) {
            // Choose sprite direction
            if (this.screenRotation <= Math.PI / 8 || this.screenRotation >= 15 * Math.PI / 8) {
                this.facing = 0;
            } else if (this.screenRotation < 3 * Math.PI / 8) {
                this.facing = 1;
            } else if (this.screenRotation <= 5 * Math.PI / 8) {
                this.facing = 2;
            } else if (this.screenRotation < 7 * Math.PI / 8) {
                this.facing = 3;
            } else if (this.screenRotation <= 9 * Math.PI / 8) {
                this.facing = 4;
            } else if (this.screenRotation < 11 * Math.PI / 8) {
                this.facing = 5;
            } else if (this.screenRotation <= 13 * Math.PI / 8) {
                this.facing = 6;
            } else {
                this.facing = 7;
            }

            let scale = this.screenHeight / Kobold.spriteHeight;
            Kobold.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx,
                this.screenX, this.screenY, scale);
        }
    };

    static loadAnimations() {
        Kobold.animations = [];
        for (let i = 0; i < 2; i++) { // two actions
            Kobold.animations.push([]);
            for (i = 0; i < 8; i++) { // eight directions
                Kobold.animations.push([]);
            }
        }

        // walking
        // east
        Kobold.animations[0][0] = new Animator(Kobold.spritesheet, 10, 10, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // southeast
        Kobold.animations[0][1] = new Animator(Kobold.spritesheet, 10, 126, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // south
        Kobold.animations[0][2] = new Animator(Kobold.spritesheet, 10, 242, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // southwest
        Kobold.animations[0][3] = new Animator(Kobold.spritesheet, 10, 358, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // west
        Kobold.animations[0][4] = new Animator(Kobold.spritesheet, 10, 474, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // northwest
        Kobold.animations[0][5] = new Animator(Kobold.spritesheet, 10, 590, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // north
        Kobold.animations[0][6] = new Animator(Kobold.spritesheet, 10, 706, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
        // northwest
        Kobold.animations[0][7] = new Animator(Kobold.spritesheet, 10, 822, Kobold.spriteWidth, Kobold.spriteHeight, 4, Kobold.walkAnimSpeed, 10, false, true);
    };
}