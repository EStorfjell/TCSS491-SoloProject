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

        this.mouseInCanvas = false;
        this.mouseDown = false;
        this.mouse = {x: 0, y: 0};
        this.leftClick = {x: 0, y: 0};
        this.rightClick = {x: 0, y: 0};
        this.wheel = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;

        this.surfaceWidth = null;
        this.surfaceHeight = null;
    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;

        this.ctx.translate(this.surfaceWidth / 2, PARAMS.GAME_CENTER);

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

        this.ctx.canvas.addEventListener("mouseenter", function (e) {
            that.mouseInCanvas = true;
        }, false);

        this.ctx.canvas.addEventListener("mouseleave", function (e) {
            that.mouseInCanvas = false;
        }, false);

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
            that.mouse.x = Math.round(that.mouse.x - PARAMS.CANVAS_WIDTH / 2);
            that.mouse.y = Math.round(that.mouse.y - PARAMS.GAME_CENTER);
        }, false);

        this.ctx.canvas.addEventListener("mousedown", function (e) {
            that.mouseDown = true;
        }, false);

        this.ctx.canvas.addEventListener("mouseup", function (e) {
            that.mouseDown = false;
        }, false);

        this.ctx.canvas.addEventListener("wheel", function (e) {
            that.wheel = e;
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            that.leftClick = getXandY(e);
            that.leftClick.x = Math.round(that.leftClick.x - PARAMS.CANVAS_WIDTH / 2);
            that.leftClick.y = Math.round(that.leftClick.y - PARAMS.GAME_CENTER);
        }, false);

        this.ctx.canvas.addEventListener("contextmenu", function (e) {
            that.rightClick = getXandY(e);
            that.rightClick.x = Math.round(that.rightClick.x - PARAMS.CANVAS_WIDTH / 2);
            that.rightClick.y = Math.round(that.rightClick.y - PARAMS.GAME_CENTER);
            e.preventDefault();
        }, false);

        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = true;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = true;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = true;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = true;
                    break;
            }
        }, false);

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.left = false;
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.right = false;
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.up = false;
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.down = false;
                    break;
            }
        }, false);
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
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

    draw() {
        this.ctx.clearRect(-(this.surfaceWidth / 2), PARAMS.CANVAS_TOP,
            this.surfaceWidth, this.surfaceHeight);

        let background = [];
        let sprites = new Map();
        let foreground = [];
        for (let i = 0; i < this.entities.length; i++) {
            let entity = this.entities[i];
            if (entity instanceof Ground) {
                background.push(entity);
            } else if (entity instanceof OuterWall) {
                background.push(entity);
            } else if (entity instanceof SpriteEntity) {
                sprites.set(entity, entity.renderDistance);
            } else if (entity instanceof HeadsUpDisplay) {
                foreground.push(entity);
            }
        }

        for (let i = 0; i < background.length; i++) {
            background[i].draw(this.ctx);
        }

        let spriteSort = new Map([...sprites.entries()].sort((a, b) => b[1] - a[1]));
        for (let key of spriteSort.keys()) {
            key.draw(this.ctx);
        }

        for (let i = 0; i < foreground.length; i++) {
            foreground[i].draw(this.ctx);
        }

        // for (let i = 0; i < this.entities.length; i++) {
        //     this.entities[i].draw(this.ctx);
        // }

        this.world.draw(this.ctx);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };
}