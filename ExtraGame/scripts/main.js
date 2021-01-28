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

ASSET_MANAGER.downloadAll(function () {
    let canvas = document.getElementById("gameWorld");
    let ctx = canvas.getContext("2d");
    // Nice, crisp pixels
    ctx.imageSmoothingEnabled = false;
    PARAMS.HORIZONTAL_FOV = PARAMS.VERTICAL_FOV * ctx.canvas.width / ctx.canvas.height;
    PARAMS.CANVAS_WIDTH = canvas.width;
    PARAMS.CANVAS_HEIGHT = canvas.height;

    gameEngine.init(ctx);

    new SceneManager(gameEngine);

    gameEngine.start();
});