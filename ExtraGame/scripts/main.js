/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

let gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("sprites/skeleton.png");
ASSET_MANAGER.queueDownload("sprites/kobold.png");
ASSET_MANAGER.queueDownload("sprites/tree.png");
ASSET_MANAGER.queueDownload("sprites/face.png");
ASSET_MANAGER.queueDownload("sprites/keyboard.png");

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById("gameWorld");
    let ctx = canvas.getContext("2d");
    // Nice, crisp pixels
    ctx.imageSmoothingEnabled = false;
    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;
    PARAMS.GAME_CENTER = (PARAMS.CANVAS_HEIGHT - PARAMS.HUD_HEIGHT) / 2;
    PARAMS.CANVAS_TOP = -(PARAMS.GAME_CENTER);
    PARAMS.CANVAS_BOTTOM = PARAMS.CANVAS_TOP + PARAMS.CANVAS_HEIGHT;
    PARAMS.HUD_TOP = PARAMS.GAME_CENTER;

    gameEngine.init(ctx);

    new SceneManager(gameEngine);

    gameEngine.start();
});