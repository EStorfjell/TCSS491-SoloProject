class Guard {
    constructor(game) {
        Object.assign(this, { game });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/guard.png");

        this.walkRight = new Animator(this.spritesheet, 14, 146, 23, 46, 4, 0.25, 25, false, true);
    };

    draw(ctx) {
        this.walkRight.drawFrame(this.game.clockTick, ctx, 0, 0, 1);
    };

    update() {

    };
}