/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Ground {
    constructor(game, color) {
        Object.assign(this, {game, color});
        this.x = -(this.game.surfaceWidth / 2);
        this.y = 0;
        this.width = this.game.surfaceWidth;
        this.height = this.game.surfaceHeight;
    }

    update() {

    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}