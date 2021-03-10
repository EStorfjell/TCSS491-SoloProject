/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class HeadsUpDisplay {
    // sprite sheet
    static spritesheet = ASSET_MANAGER.getAsset("sprites/face.png");
    static spriteWidth = 24;
    static spriteHeight = 29;

    static faceAnimSpeed = 1; // seconds per frame

    static animations = null;

    constructor(game, screenX, screenY, width, height) {
        Object.assign(this, {game, screenX, screenY, width, height});

        this.playerState = 0;

        if (HeadsUpDisplay.animations == null) {
            HeadsUpDisplay.loadAnimations();
        }
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = "darkslategrey";
        ctx.fillRect(this.screenX, this.screenY, this.width, this.height);

        this.drawFace(ctx);
        this.drawHealth(ctx);
        this.drawToolArea(ctx);
        this.drawMinimap(ctx);
    }

    drawFace(ctx) {
        ctx.fillStyle = "#223030";
        ctx.fillRect(this.screenX + 2, this.screenY + 2, 72, 87);
        HeadsUpDisplay.animations[0].drawFrame(this.game.clockTick, ctx, this.screenX + 2, this.screenY + 2, 3);
    }

    drawHealth(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.screenX + 2, this.screenY + 91, 180, 27);
        ctx.fillStyle = "black";
        ctx.fillRect(this.screenX + 3, this.screenY + 92, 178, 25);
        ctx.fillStyle = "#d40c28";
        let healthFill = Math.ceil((this.game.player.health / this.game.player.maxHealth) * 178);
        ctx.fillRect(this.screenX + 3, this.screenY + 92, healthFill, 25);
    }

    drawToolArea(ctx) {
        ctx.fillStyle = "#223030";
        ctx.fillRect(this.screenX + 184, this.screenY + 2, 336, 116);
    }

    drawMinimap(ctx) {
        ctx.fillStyle = "#4d5e63";
        ctx.fillRect(this.screenX + 522, this.screenY + 2, 116, 116);
        ctx.fillStyle = "black";
        ctx.fillRect(this.screenX + 523, this.screenY + 3, 114, 114);
    }

    static loadAnimations() {
        HeadsUpDisplay.animations = [];
        for (let i = 0; i < 4; i++) { // four player states
            HeadsUpDisplay.animations.push([]);
        }

        // undamaged
        HeadsUpDisplay.animations[0] = new Animator(HeadsUpDisplay.spritesheet, 2, 2,
            HeadsUpDisplay.spriteWidth, HeadsUpDisplay.spriteHeight, 3, HeadsUpDisplay.faceAnimSpeed,
            2, false, true);
    };
}