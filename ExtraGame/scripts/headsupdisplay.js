/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class HeadsUpDisplay {
    // sprite sheet
    static facesheet = ASSET_MANAGER.getAsset("sprites/face.png");
    static spriteWidth = 24;
    static spriteHeight = 29;

    static faceAnimSpeed = 1; // seconds per frame

    static animations = null;

    constructor(game, screenX, screenY, width, height) {
        Object.assign(this, {game, screenX, screenY, width, height});

        this.playerState = 0;
        this.healthRatio = 1;

        if (HeadsUpDisplay.animations == null) {
            HeadsUpDisplay.loadAnimations();
        }
    }

    update() {
        this.healthRatio = this.game.player.health / this.game.player.maxHealth;
        if (this.healthRatio > 0.75) {
            this.playerState = 0;
        } else if (this.healthRatio > 0.5) {
            this.playerState = 1;
        } else if (this.healthRatio > 0.25) {
            this.playerState = 2;
        } else {
            this.playerState = 3;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "darkslategrey";
        ctx.fillRect(this.screenX, this.screenY, this.width, this.height);

        this.drawFace(ctx);
        this.drawStats(ctx);
        this.drawHealth(ctx);
        this.drawToolArea(ctx);
        this.drawMinimap(ctx);
    }

    drawFace(ctx) {
        ctx.fillStyle = "#223030";
        ctx.fillRect(this.screenX + 2, this.screenY + 2, 72, 87);
        HeadsUpDisplay.animations[this.playerState].drawFrame(this.game.clockTick, ctx, this.screenX + 2,
            this.screenY + 2, 3);
    }

    drawStats(ctx) {
        ctx.font = "10px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.fillText("HP: " + this.game.player.health + " / " + this.game.player.maxHealth, this.screenX + 76,
            this.screenY + 2);
        ctx.fillText("ATK: " + this.game.player.attackDamage, this.screenX + 76, this.screenY + 14);
    }

    drawHealth(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.screenX + 2, this.screenY + 91, 180, 27);
        ctx.fillStyle = "black";
        ctx.fillRect(this.screenX + 3, this.screenY + 92, 178, 25);
        if (this.game.player.health >= 0) {
            ctx.fillStyle = "#d40c28";
            ctx.fillRect(this.screenX + 3, this.screenY + 92, Math.ceil(this.healthRatio * 178), 25);
        }
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
        HeadsUpDisplay.animations[0] = new Animator(HeadsUpDisplay.facesheet, 2, 2,
            HeadsUpDisplay.spriteWidth, HeadsUpDisplay.spriteHeight, 4, HeadsUpDisplay.faceAnimSpeed,
            2, false, true);
        // light damage
        HeadsUpDisplay.animations[1] = new Animator(HeadsUpDisplay.facesheet, 2, 33,
            HeadsUpDisplay.spriteWidth, HeadsUpDisplay.spriteHeight, 4, HeadsUpDisplay.faceAnimSpeed,
            2, false, true);
        // medium damage
        HeadsUpDisplay.animations[2] = new Animator(HeadsUpDisplay.facesheet, 2, 64,
            HeadsUpDisplay.spriteWidth, HeadsUpDisplay.spriteHeight, 4, HeadsUpDisplay.faceAnimSpeed,
            2, false, true);
        // heavy damage
        HeadsUpDisplay.animations[3] = new Animator(HeadsUpDisplay.facesheet, 2, 96,
            HeadsUpDisplay.spriteWidth, HeadsUpDisplay.spriteHeight, 4, HeadsUpDisplay.faceAnimSpeed,
            2, false, true);
    }
}