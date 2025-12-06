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

        // Shooting is handled by GameScene timer calling playerAutoShoot
        // Moving logic only here

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.sprite.setVelocityY(-this.speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.sprite.setVelocityY(this.speed);
        }
    }

    handleTouch(targetX, targetY) {
        // Smooth movement towards touch position
        const dx = targetX - this.sprite.x;
        const dy = targetY - this.sprite.y;

        // Simple lerp-like movement or direct set velocity
        // For responsiveness, setting velocity is better for physics, 
        // but direct position setting with lerp feels snappier for touch.
        // Let's use physics velocity for consistency with collision system.

        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 10) {
            const speed = distance * 5; // Dynamic speed based on distance
            this.sprite.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        } else {
            this.sprite.setVelocity(0);
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

    heal() {
        if (this.hp < this.maxHP) {
            this.hp++;
            createFlashEffect(this.scene, this.sprite, 100, 1, 0x00ff00);
            return true;
        }
        return false;
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
