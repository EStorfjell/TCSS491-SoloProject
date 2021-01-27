/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Player {
    constructor(game, xPos, yPos, direction) {
        Object.assign(this, {game, xPos, yPos, direction: direction});
        this.game.player = this;

        this.width = 0.5; // 50 cm diameter
        this.walkSpeed = 2.25; // 2.25 m/s
        this.turnSpeed = Math.PI; // can turn pi rads in 1 second
    };

    update() {
        let rotateAmt = this.turnSpeed * this.game.clockTick;
        if (this.game.turnRight && !this.game.turnLeft) {
            this.direction += rotateAmt;
            while (this.direction >= 2 * Math.PI) {
                this.direction -= 2 * Math.PI;
            }
        } else if (this.game.turnLeft && !this.game.turnRight) {
            this.direction -= rotateAmt;
            while (this.direction < 0) {
                this.direction += 2 * Math.PI;
            }
        }

        let walkLen = this.walkSpeed * this.game.clockTick;
        let delX = 0;
        let delY = 0;
        if (this.game.up && !this.game.down) {
            if (this.game.right && !this.game.left) {
                delY = -(walkLen * Math.cos(this.direction + Math.PI / 4));
                delX = walkLen * Math.sin(this.direction + Math.PI / 4);
            } else if (this.game.left && !this.game.right) {
                delY = -(walkLen * Math.cos(this.direction - Math.PI / 4));
                delX = walkLen * Math.sin(this.direction - Math.PI / 4);
            } else {
                delY = -(walkLen * Math.cos(this.direction));
                delX = walkLen * Math.sin(this.direction);
            }
        } else if (this.game.down && !this.game.up) {
            if (this.game.right && !this.game.left) {
                delY = walkLen * Math.cos(this.direction - Math.PI / 4);
                delX = -(walkLen * Math.sin(this.direction - Math.PI / 4));
            } else if (this.game.left && !this.game.right) {
                delY = walkLen * Math.cos(this.direction + Math.PI / 4);
                delX = -(walkLen * Math.sin(this.direction + Math.PI / 4));
            } else {
                delY = walkLen * Math.cos(this.direction);
                delX = -(walkLen * Math.sin(this.direction));
            }
        } else if (this.game.right && !this.game.left) {
            delX = walkLen * Math.cos(this.direction);
            delY = walkLen * Math.sin(this.direction);
        } else if (this.game.left && !this.game.right) {
            delX = -(walkLen * Math.cos(this.direction));
            delY = -(walkLen * Math.sin(this.direction));
        }

        // TODO: Implement collision
        this.xPos += delX;
        this.yPos += delY;
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.font = "12px sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = "white";
            ctx.fillText("x: " + this.xPos.toFixed(3), -315, -235);
            ctx.fillText("y: " + this.yPos.toFixed(3), -315, -220);
            ctx.fillText("\u03B8: " + this.direction.toFixed(3), -315, -205);
        }
    };

    setPostition(xPos, yPos, direction) {
        Object.assign(this, {xPos, yPos, direction});
    }
}