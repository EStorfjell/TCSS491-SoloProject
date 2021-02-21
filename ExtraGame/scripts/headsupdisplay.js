/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class HeadsUpDisplay {
    constructor(game, screenX, screenY, width, height) {
        Object.assign(this, {game, screenX, screenY, width, height});
    };

    update() {

    };

    draw(ctx) {
        ctx.fillStyle = "darkslategrey";
        ctx.fillRect(this.screenX, this.screenY, this.width, this.height);

        ctx.font = "24px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "red";
        ctx.fillText("Health: " + this.game.player.health, this.screenX + 5, this.screenY + 5);
    };
}