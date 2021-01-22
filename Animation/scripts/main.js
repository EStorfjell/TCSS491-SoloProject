var gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/guard.png")

ASSET_MANAGER.downloadAll(function () {
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');

    var guard = new Guard(GameEngine);

    gameEngine.init(ctx);

    gameEngine.addEntity(guard);

    gameEngine.start();
});
