class Guard {
    constructor(game) {
        Object.assign(this, {game});

        // sprite sheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/guard.png");

        // character direction
        this.facing = 0 // 0 = east, 1 = north, 2 = west, 3 = south

        this.animations = [];
        this.loadAnimations();
    };

    draw(ctx) {
        this.animations[this.facing].drawFrame(this.game.clockTick, ctx, 190, 148, 4);
    };

    update() {
        try {
            let mouseX = this.game.mouse.x;
            let mouseY = this.game.mouse.y;
            if ((mouseX >= 240 && mouseY > mouseX) || (mouseX < 240 && mouseY > 480 - mouseX)) {
                this.facing = 3;
            } else if ((mouseX >= 240 && mouseY < 480 - mouseX) || (mouseX < 240 && mouseY < mouseX)) {
                this.facing = 1;
            } else if (mouseX >= 240) {
                this.facing = 0;
            } else {
                this.facing = 2;
            }
        } catch (e) {

        }
    };

    loadAnimations() {
        for (var i = 0; i < 4; i++) { // four directions
            this.animations.push([]);
        }

        // east
        this.animations[0] = new Animator(this.spritesheet, 13, 146, 25, 46, 4, 0.15, 23, false, true);

        // north
        this.animations[1] = new Animator(this.spritesheet, 11, 210, 25, 46, 4, 0.15, 23, false, true);

        // west
        this.animations[2] = new Animator(this.spritesheet, 10, 82, 25, 46, 4, 0.15, 23, false, true);

        // south
        this.animations[3] = new Animator(this.spritesheet, 11, 18, 25, 46, 4, 0.15, 23, false, true);

    }
}