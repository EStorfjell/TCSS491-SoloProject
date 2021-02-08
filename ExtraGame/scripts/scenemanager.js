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

        let wall = new OuterWall(this.game, -10, -10, 20, 20);
        this.game.addEntity(wall);

        // TODO: Change way sprite-based entities are stored so that closest sprites draw first
        let enemy = new Skeleton(this.game, 0, -5, Math.PI);
        this.game.addEntity(enemy);

        this.player.setPostition(0, 5, 0);
        this.game.addEntity(this.player);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {

    }
}