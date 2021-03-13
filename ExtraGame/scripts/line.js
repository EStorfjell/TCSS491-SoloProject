/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Line {
    constructor(game, x1, y1, x2, y2) {
        this.game = game;
        this.point1 = {
            x: x1,
            y: y1
        };
        this.point2 = {
            x: x2,
            y: y2
        };
    }

    slope() {
        let slope;
        if (this.point2.x !== this.point1.x) {
            slope = (this.point2.y - this.point1.y) / (this.point2.x - this.point1.x);
        } else {
            slope = false;
        }
        return slope;
    }

    yIntercept() {
        if (this.point1.x === this.point2.x) return this.point1.x === 0 ? 0 : false;
        if (this.point1.y === this.point2.y) return this.point1.y;
        return this.point1.y - this.slope() * this.point1.x;
    }

    collide(other) {
        if (this.slope() === other.slope()) return false;
        let intersect = {};
        intersect.x = (other.yIntercept() - this.yIntercept()) / (this.slope() - other.slope());
        intersect.y = this.slope() * intersect.x + this.yIntercept();
        return intersect;
    }
}