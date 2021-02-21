/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Skeleton extends SpriteEntity {
    static width = 0.5; // diameter in meters
    static height = 1.5; // height in meters
    static walkSpeed = 2; // 2 m/s
    static health = 10;

    // sprite sheet
    static spritesheet = ASSET_MANAGER.getAsset("sprites/skeleton.png");
    static spriteWidth = 25;
    static spriteHeight = 46;

    static animations = null;

    constructor(game, xPos, yPos, direction) {
        super(game, xPos, yPos, direction, Skeleton.width, Skeleton.height, Skeleton.spriteWidth, Skeleton.spriteHeight);

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south

        if (Skeleton.animations == null) {
            Skeleton.loadAnimations();
        }
    };

    update() {
        // TODO: Add Skeleton behavior and collision
        this.renderCalc();
    };

    draw(ctx) {
        if (this.isVisible) {
            let scale = this.screenHeight / Skeleton.spriteHeight;
            Skeleton.animations[this.action][this.facing].drawFrame(this.game.clockTick, ctx, this.screenX, this.screenY, scale);
        }
    };

    static loadAnimations() {
        Skeleton.animations = [];
        for (let i = 0; i < 2; i++) { // two actions
            Skeleton.animations.push([]);
            for (i = 0; i < 4; i++) { // four directions
                Skeleton.animations.push([]);
            }
        }

        // idle
        // east
        Skeleton.animations[0][0] = new Animator(Skeleton.spritesheet, 13, 146, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 1, 0.15, 23, false, true);
        // north
        Skeleton.animations[0][1] = new Animator(Skeleton.spritesheet, 11, 210, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 1, 0.15, 23, false, true);
        // west
        Skeleton.animations[0][2] = new Animator(Skeleton.spritesheet, 10, 82, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 1, 0.15, 23, false, true);
        // south
        Skeleton.animations[0][3] = new Animator(Skeleton.spritesheet, 11, 18, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 1, 0.15, 23, false, true);

        // walking
        // east
        Skeleton.animations[1][0] = new Animator(Skeleton.spritesheet, 13, 146, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 4, 0.15, 23, false, true);
        // north
        Skeleton.animations[1][1] = new Animator(Skeleton.spritesheet, 11, 210, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 4, 0.15, 23, false, true);
        // west
        Skeleton.animations[1][2] = new Animator(Skeleton.spritesheet, 10, 82, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 4, 0.15, 23, false, true);
        // south
        Skeleton.animations[1][3] = new Animator(Skeleton.spritesheet, 11, 18, Skeleton.spriteWidth,
            Skeleton.spriteHeight, 4, 0.15, 23, false, true);
    };
}