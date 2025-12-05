/**
 * Player Entity - Handles player movement, shooting, and damage
 */

class Player {
    constructor(scene) {
        this.scene = scene;
        this.sprite = null;
        this.hp = PLAYER_CONFIG.MAX_HP;
        this.maxHP = PLAYER_CONFIG.MAX_HP;
        this.speed = GAME_CONFIG.PLAYER_SPEED;
        this.bulletPattern = 'single';
        this.cursors = null;
        this.wasd = null;
    }

    create() {
        this.sprite = this.scene.physics.add.sprite(
            PLAYER_CONFIG.START_X,
            PLAYER_CONFIG.START_Y,
            'player'
        );
        this.sprite.setCollideWorldBounds(true);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        return this.sprite;
    }

    update() {
        this.sprite.setVelocity(0);

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.sprite.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.sprite.setVelocityX(this.speed);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.sprite.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.sprite.setVelocityY(this.speed);
        }
    }

    takeDamage() {
        this.hp--;
        if (this.bulletPattern !== 'single') {
            this.bulletPattern = 'single';
        }
        createFlashEffect(this.scene, this.sprite, 100, 3);
        return this.hp <= 0;
    }

    setPowerUp(pattern) {
        this.bulletPattern = pattern;
    }

    resetPowerUp() {
        this.bulletPattern = 'single';
    }

    reset() {
        this.hp = PLAYER_CONFIG.MAX_HP;
        this.bulletPattern = 'single';
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }

    hide() {
        this.sprite.setVisible(false);
    }
}
