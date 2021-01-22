/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Skeleton {
    constructor(game) {
        Object.assign(this, {game});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/skeleton.png");

        // character direction
        this.facing = 3 // 0 = east, 1 = north, 2 = west, 3 = south

        this.animations = [];
        this.loadAnimations();
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    update() {

    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // four directions
            this.animations.push([]);
        }

        // east
        this.animations[0] = new Animator(this.spritesheet, 13, 146, 25, 46, 4, 0.15, 23, false, true);

        // north
        this.animations[1] = new Animator(this.spritesheet, 11, 210, 25, 46, 4, 0.15, 23, false, true);

        // west
        this.animations[2] = new Animator(this.spritesheet, 10, 82, 25, 46, 4, 0.15, 23, false, true);

        // south
        this.animations[3] = new Animator(this.spritesheet, 11, 18, 25, 46, 4, 0.15, 23, false, true);

    }
}