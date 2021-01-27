/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class SceneManager {
    constructor(game) {
        Object.assign(this, {game});
        this.game.world = this;

        this.player = new Player(this.game, 0, 0, 0);

        this.loadLevelOne();
    };

    loadLevelOne() {
        this.game.entities = [];

        let ground = new Ground(this.game, "green");
        this.game.addEntity(ground);

        this.enemy = new Skeleton(this.game, 0, -5, Math.PI);

        this.player.setPostition(0, 5, 0);
        this.game.addEntity(this.player);
    };
}

class Ground {
    constructor(game, color) {
        Object.assign(this, {game, color});
        this.x = -(this.game.surfaceWidth / 2);
        this.y = 0;
        this.width = this.game.surfaceWidth;
        this.height = this.game.surfaceHeight;
    };

    update() {

    };

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
}