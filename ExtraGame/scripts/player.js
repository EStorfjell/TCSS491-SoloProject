/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Player {
    constructor(game, xPos, yPos, direction) {
        Object.assign(this, {game, xPos, yPos, direction});
        this.game.player = this;

        this.width = 0.5; // diameter in meters
        this.walkSpeed = 3.5; // speed in m/s
        this.turnSpeed = Math.PI / 3; // rads turned in 1 second
    };

    update() {
        // turning
        let rotateAmt = this.turnSpeed * this.game.clockTick;
        if (this.game.right && !this.game.left) {
            this.direction += rotateAmt;
            while (this.direction >= 2 * Math.PI) {
                this.direction -= 2 * Math.PI;
            }
        } else if (this.game.left && !this.game.right) {
            this.direction -= rotateAmt;
            while (this.direction < 0) {
                this.direction += 2 * Math.PI;
            }
        }

        // walking
        let walkLen = this.walkSpeed * this.game.clockTick;
        let delX = 0;
        let delY = 0;
        if (this.game.up && !this.game.down) {
            delX = walkLen * Math.cos(this.direction);
            delY = walkLen * Math.sin(this.direction);
        } else if (this.game.down && !this.game.up) {
            delX = -(walkLen * Math.cos(this.direction));
            delY = -(walkLen * Math.sin(this.direction));
        }

        // TODO: Implement collision
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof OuterWall) {
                let west = entity.xStart;
                let east = entity.xStart + entity.xLength;
                let north = entity.yStart;
                let south = entity.yStart + entity.yLength;

                if (that.xPos + delX <= west) {
                    delX = 0;
                    that.xPos = west;
                } else if (that.xPos + delX >= east) {
                    delX = 0;
                    that.xPos = east;
                }
                if (that.yPos + delY <= north) {
                    delY = 0;
                    that.yPos = north;
                } else if (that.yPos + delY >= south) {
                    delY = 0;
                    that.yPos = south;
                }
            }
        });

        this.xPos += delX;
        this.yPos += delY;
    };

    draw(ctx) {

    };

    setPostition(xPos, yPos, direction) {
        Object.assign(this, {xPos, yPos, direction});
    };

}