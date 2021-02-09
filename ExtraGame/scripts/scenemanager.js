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
        this.keyboardImg = ASSET_MANAGER.getAsset("sprites/keyboard.png");

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
        if (PARAMS.DEBUG) {
            ctx.font = "12px sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.player.xPos.toFixed(3), -315, -235);
            ctx.fillText("y: " + this.player.yPos.toFixed(3), -315, -220);
            ctx.fillText("\u03B8: " + this.player.direction.toFixed(3), -315, -205);
            ctx.fillText("MouseDown?: " + this.game.mouseDown, -315, -190);
            ctx.fillText("MouseIn?: " + this.game.mouseInCanvas, -315, -175);
            ctx.fillText("MouseX: " + this.game.mouse.x, -315, -160);
            ctx.fillText("MouseY: " + this.game.mouse.y, -315, -145);

            if (this.game.left) {
                ctx.drawImage(this.keyboardImg, 233, 40, 11, 11, -315, 224, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 221, 40, 11, 11, -315, 224, 11, 11);
            }
            if (this.game.down) {
                ctx.drawImage(this.keyboardImg, 257, 40, 11, 11, -303, 224, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 245, 40, 11, 11, -303, 224, 11, 11);
            }
            if (this.game.right) {
                ctx.drawImage(this.keyboardImg, 281, 40, 11, 11, -291, 224, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 269, 40, 11, 11, -291, 224, 11, 11);
            }
            if (this.game.up) {
                ctx.drawImage(this.keyboardImg, 281, 28, 11, 11, -303, 212, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 269, 28, 11, 11, -303, 212, 11, 11);
            }
        }
    }
}