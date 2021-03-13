/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class OuterWall {
    static color1 = "dimgrey";
    static color2 = "grey";

    constructor(game, xStart, yStart, xLength, yLength, height) {
        Object.assign(this, {game, xStart, yStart, xLength, yLength, height});

        this.walls = [];
        this.buildWalls();
    }

    update() {
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].update();
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw(ctx);
        }
    }

    buildWalls() {
        for (let i = 0; i < 4; i++) { // four walls
            this.walls.push();
        }

        // north wall
        this.walls[0] = new Wall(this.game, this.xStart, this.yStart, this.xStart + this.xLength, this.yStart,
            this.height, OuterWall.color1);
        // east wall
        this.walls[1] = new Wall(this.game, this.xStart + this.xLength, this.yStart, this.xStart + this.xLength,
            this.yStart + this.yLength, this.height, OuterWall.color2);
        // south wall
        this.walls[2] = new Wall(this.game, this.xStart + this.xLength, this.yStart + this.yLength, this.xStart,
            this.yStart + this.yLength, this.height, OuterWall.color1);
        // west wall
        this.walls[3] = new Wall(this.game, this.xStart, this.yStart + this.yLength, this.xStart, this.yStart,
            this.height, OuterWall.color2);
    }
}