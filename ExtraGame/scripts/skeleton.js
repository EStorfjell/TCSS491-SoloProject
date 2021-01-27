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
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");
        this.spriteWidth = 25;
        this.spriteHeight = 46;

        // character states
        this.action = 0 // 0 = idle, 1 = walking
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.visible = false;

        this.animations = [];
        this.loadAnimations();
    };

    update() {

    };

    draw(ctx) {

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