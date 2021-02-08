/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;

        this.click = null;
        this.mouse = null;
        this.wheel = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.turnLeft = false;
        this.turnRight = false;

        this.surfaceWidth = null;
        this.surfaceHeight = null;
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        // Set origin in center of canvas
        this.ctx.translate(this.surfaceWidth / 2, this.surfaceHeight / 2);
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        let that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        let that = this;

        let getXandY = function (e) {
            let x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            let y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return {x: x, y: y};
        };

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            //console.log(getXandY(e));
            that.mouse = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            that.click = getXandY(e);
        }, false);

        this.ctx.canvas.addEventListener("wheel", function (e) {
            //console.log(getXandY(e));
            that.wheel = e;
            //       console.log(e.wheelDelta);
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            //console.log(getXandY(e));
            that.rightclick = getXandY(e);
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "KeyA":
                    that.left = true;
                    break;
                case "KeyD":
                    that.right = true;
                    break;
                case "KeyW":
                    that.up = true;
                    break;
                case "KeyS":
                    that.down = true;
                    break;
                case "ArrowLeft":
                    that.turnLeft = true;
                    break;
                case "ArrowRight":
                    that.turnRight = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "KeyA":
                    that.left = false;
                    break;
                case "KeyD":
                    that.right = false;
                    break;
                case "KeyW":
                    that.up = false;
                    break;
                case "KeyS":
                    that.down = false;
                    break;
                case "ArrowLeft":
                    that.turnLeft = false;
                    break;
                case "ArrowRight":
                    that.turnRight = false;
                    break;
            }
        }, false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(-(this.surfaceWidth / 2), -(this.surfaceHeight / 2), this.surfaceWidth, this.surfaceHeight);
        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }

        this.world.draw(this.ctx);
    };

    update() {
        let i;
        let entitiesCount = this.entities.length;

        for (i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        this.world.update();

        for (i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
}