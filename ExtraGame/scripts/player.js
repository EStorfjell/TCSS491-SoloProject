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

        let walkOrth = this.walkSpeed * this.game.clockTick;
        let walkDiag = walkOrth / Math.SQRT2;
        let delX = 0;
        let delY = 0;
        let sine = Math.sin(this.direction);
        let cosine = Math.cos(this.direction);
        if (this.game.up && !this.game.down) {
            if (this.game.right && !this.game.left) {
                // TODO: Move forward-right
            } else if (this.game.left && !this.game.right) {
                // TODO: Move forward-left
            } else {
                delY = -(walkOrth * cosine);
                delX = walkOrth * sine;
            }
        } else if (this.game.down && !this.game.up) {
            if (this.game.right && !this.game.left) {
                // TODO: Move backward-right
            } else if (this.game.left && !this.game.right) {
                // TODO: Move backward-left
            } else {
                delY = walkOrth * cosine;
                delX = -(walkOrth * sine);
            }
        } else if (this.game.right && !this.game.left) {
            delX = walkOrth * cosine;
            delY = walkOrth * sine;
        } else if (this.game.left && !this.game.right) {
            delX = -(walkOrth * cosine);
            delY = -(walkOrth * sine);
        }

        // TODO: Implement collision
        this.xPos += delX;
        this.yPos += delY;
    };

    draw(ctx) {
        ctx.font = "12px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillStyle = "white";
        ctx.fillText("x: " + this.xPos.toFixed(3), -315, -235);
        ctx.fillText("y: " + this.yPos.toFixed(3), -315, -220);
        ctx.fillText("\u03B8: " + this.direction.toFixed(3), -315, -205);
    };

    setPostition(xPos, yPos, direction) {
        Object.assign(this, {xPos, yPos, direction});
    }
}