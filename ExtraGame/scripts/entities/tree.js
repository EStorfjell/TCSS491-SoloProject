/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Tree extends SpriteEntity {
    static width = 1; // diameter in meters
    static height = 3; // height in meters

    // sprite sheet
    static spritesheet = ASSET_MANAGER.getAsset("sprites/tree.png");
    static spriteWidth = 48;
    static spriteHeight = 60;

    static animator = null;

    constructor(game, xPos, yPos, direction) {
        super(game, xPos, yPos, direction, Tree.width, Tree.height, Tree.spriteWidth, Tree.spriteHeight);

        // character states
        this.action = 0; // 0 = idle, 1 = walking
        this.facing = 0; // 0 = east, 1 = north, 2 = west, 3 = south

        if (Tree.animator == null) {
            Tree.animator = new Animator(Tree.spritesheet, 0, 0, Tree.spriteWidth, Tree.spriteHeight, 1, 1, 0, false, true);
        }
    };

    update() {
        // TODO: Add collision
        this.renderCalc();
    };

    draw(ctx) {
        if (this.isVisible) {
            let scale = this.screenHeight / Tree.spriteHeight;
            Tree.animator.drawFrame(this.game.clockTick, ctx, this.screenX, this.screenY, scale);
        }
    };
}