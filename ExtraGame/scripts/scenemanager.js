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


        this.loadLevelOne();
    };

    loadLevelOne() {
        this.game.entities = [];

        this.player = new Player(this.game, 0, 10, degToRad(270, 100), 100);
        this.game.addEntity(this.player);

        let ground = new Ground(this.game, "green");
        this.game.addEntity(ground);

        let wall = new OuterWall(this.game, -20, -20, 40, 40, 3);
        this.game.addEntity(wall);

        let tree = new Tree(this.game, -10, -10, 0);
        this.game.addEntity(tree);
        tree = new Tree(this.game, 10, -10, 0);
        this.game.addEntity(tree);
        tree = new Tree(this.game, -10, 10, 0);
        this.game.addEntity(tree);
        tree = new Tree(this.game, 10, 10, 0);
        this.game.addEntity(tree);

        let enemy = new Kobold(this.game, 0, -10, degToRad(225));
        this.game.addEntity(enemy);

        let hud = new HeadsUpDisplay(this.game, -(PARAMS.CANVAS_WIDTH / 2), PARAMS.HUD_TOP, PARAMS.CANVAS_WIDTH,
            PARAMS.HUD_HEIGHT);
        this.game.addEntity(hud);
    };

    updateAudio() {
        let mute = document.getElementById("mute").checked;
        let volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);
    };

    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        this.updateAudio();
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            let top = PARAMS.CANVAS_TOP;
            let left = -(PARAMS.CANVAS_WIDTH / 2);
            let bottom = PARAMS.HUD_TOP;

            ctx.font = "12px sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.player.xPos.toFixed(3), left + 5, top + 5);
            ctx.fillText("y: " + this.player.yPos.toFixed(3), left + 5, top + 20);
            ctx.fillText("\u03B8: " + this.player.direction.toFixed(3), left + 5, top + 35);
            ctx.fillText("MouseIn?: " + this.game.mouseInCanvas, left + 5, top + 50);
            ctx.fillText("MouseX: " + this.game.mouse.x, left + 5, top + 65);
            ctx.fillText("MouseY: " + this.game.mouse.y, left + 5, top + 80);
            ctx.fillText("LeftMouseDown?: " + this.game.leftMouseDown, left + 5, top + 95);
            ctx.fillText("RightMouseDown?: " + this.game.rightMouseDown, left + 5, top + 110);

            if (this.game.left) {
                ctx.drawImage(this.keyboardImg, 233, 40, 11, 11, left + 5, bottom - 16, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 221, 40, 11, 11, left + 5, bottom - 16, 11, 11);
            }
            if (this.game.down) {
                ctx.drawImage(this.keyboardImg, 257, 40, 11, 11, left + 17, bottom - 16, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 245, 40, 11, 11, left + 17, bottom - 16, 11, 11);
            }
            if (this.game.right) {
                ctx.drawImage(this.keyboardImg, 281, 40, 11, 11, left + 29, bottom - 16, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 269, 40, 11, 11, left + 29, bottom - 16, 11, 11);
            }
            if (this.game.up) {
                ctx.drawImage(this.keyboardImg, 281, 28, 11, 11, left + 17, bottom - 28, 11, 11);
            } else {
                ctx.drawImage(this.keyboardImg, 269, 28, 11, 11, left + 17, bottom - 28, 11, 11);
            }
        }
    };
}