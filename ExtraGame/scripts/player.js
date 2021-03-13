/*
 * Author: Espen Storfjell
 * Course: TCSS 491 A Wi 21 - Computational Worlds
 * School: University of Washington Tacoma
 *
 * Copyright (c) 2021.
 */

class Player {
    constructor(game, xPos, yPos, direction, maxHealth) {
        Object.assign(this, {game, xPos, yPos, direction, maxHealth});
        this.game.player = this;

        this.health = this.maxHealth;

        this.width = 0.5; // diameter in meters
        this.walkSpeed = 4; // speed in m/s
        this.turnSpeed = Math.PI / 2; // rads turned in 1 second

        this.selectedAction = 0; // 0 = attack

        this.attackCooldown = 1; // second between attacks
        this.attackTimer = 0;
        this.canAttack = true;

        this.attackDamage = 4;
        this.attackReach = 3;
    }

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

        if (this.canAttack) {
            if (this.game.useItem && this.selectedAction == 0 && this.game.leftClick.y < PARAMS.HUD_TOP) {
                this.game.useItem = false;
                this.canAttack = false;
                this.attack();
            }
        } else if (this.attackTimer < this.attackCooldown) {
            this.attackTimer += this.game.clockTick;
            this.game.useItem = false;
        } else {
            this.canAttack = true;
            this.attackTimer = 0;
        }
    }

    draw(ctx) {

    }

    attack() {
        let that = this;
        this.game.entities.forEach(function (entity) {
            if (entity instanceof SpriteEntity) {
                let relToPlayer = entity.relationToTarget(that);
                if (relToPlayer.distance <= that.attackReach) {
                    entity.takeDamage(that.attackDamage);
                }
            }
        });
    }

    takeDamage(amount) {
        if (this.health > 0) {
            this.health -= amount;
            if (this.health <= 0) {
                ASSET_MANAGER.playAsset("sfx/explode.mp3");
                console.log("Player died");
                this.game.world.loadLevelOne();
            } else {
                ASSET_MANAGER.playAsset("sfx/hit2.mp3");
            }
        }
    }
}