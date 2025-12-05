/**
 * Boss Entity - Handles boss spawning, behavior, and attacks
 */

class Boss {
    constructor(scene) {
        this.scene = scene;
        this.sprite = null;
        this.shootTimer = null;
        this.collider = null;
        this.playerCollider = null;
        this.isActive = false;
        this.isDefeated = false;
        this.canTakeDamage = false; // Only true after entry complete
        this.lastDamageTime = 0;
        this.damageCooldown = 50; // ms between damage hits
    }

    getHP(stage) {
        return getBossHP(stage);
    }

    spawn(stage, onBossCreated) {
        console.log('=== SPAWN BOSS ===');
        this.isActive = true;
        this.isDefeated = false;

        const warning = this.scene.add.text(400, 300, '⚠️ BOSS INCOMING ⚠️', {
            fontSize: '36px', fill: '#ff0000', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: warning,
            alpha: 0.3,
            duration: 200,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                warning.destroy();
                this.create(stage, onBossCreated);
            }
        });
    }

    create(stage, onBossCreated) {
        console.log('=== CREATE BOSS ===');
        const bossHP = this.getHP(stage);
        console.log('Boss HP:', bossHP);

        this.sprite = this.scene.physics.add.sprite(400, -80, 'boss');
        this.sprite.setData('hp', bossHP);
        this.sprite.setData('maxHp', bossHP);
        this.sprite.setData('isBoss', true);
        this.sprite.setData('isDefeated', false);
        this.sprite.setData('score', getBossScore(stage));
        this.sprite.setDepth(10);

        this.scene.tweens.add({
            targets: this.sprite,
            y: 120,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Boss entry complete - damage enabled');
                this.canTakeDamage = true; // Enable damage after entry
                this.startBehavior(stage);
                if (onBossCreated) onBossCreated(this);
            }
        });
    }

    startBehavior(stage) {
        if (!this.sprite || !this.sprite.active) return;

        this.scene.tweens.add({
            targets: this.sprite,
            x: { from: 150, to: 650 },
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        this.shootTimer = this.scene.time.addEvent({
            delay: Math.max(800, 1500 - stage * 80),
            callback: () => this.shoot(stage),
            callbackScope: this,
            loop: true
        });
    }

    shoot(stage) {
        if (!this.sprite || !this.sprite.active || this.scene.isGameOver) return;

        const enemyBullets = this.scene.enemyBullets;
        const player = this.scene.playerEntity;

        if (stage <= 3) {
            for (let i = -1; i <= 1; i++) {
                const bullet = enemyBullets.create(this.sprite.x + i * 30, this.sprite.y + 50, 'enemyBullet');
                bullet.setVelocityY(GAME_CONFIG.ENEMY_BULLET_SPEED);
            }
        } else if (stage <= 6) {
            for (let i = -2; i <= 2; i++) {
                const bullet = enemyBullets.create(this.sprite.x, this.sprite.y + 50, 'enemyBullet');
                bullet.setVelocity(i * 40, GAME_CONFIG.ENEMY_BULLET_SPEED);
            }
        } else {
            for (let i = -3; i <= 3; i++) {
                const bullet = enemyBullets.create(this.sprite.x, this.sprite.y + 50, 'enemyBullet');
                bullet.setVelocity(i * 50, GAME_CONFIG.ENEMY_BULLET_SPEED * 1.2);
            }
            const angle = Phaser.Math.Angle.Between(
                this.sprite.x, this.sprite.y,
                player.x, player.y
            );
            const aimed = enemyBullets.create(this.sprite.x, this.sprite.y + 50, 'enemyBullet');
            aimed.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
        }
    }

    takeDamage() {
        // Don't take damage if destroyed, defeated, or still in entry animation
        if (!this.sprite || !this.sprite.active || this.isDefeated || !this.canTakeDamage) {
            console.log('Damage blocked:', !this.sprite ? 'no sprite' : !this.sprite.active ? 'not active' : this.isDefeated ? 'defeated' : 'entry not complete');
            return false;
        }

        // Cooldown check to prevent multiple bullets hitting in same frame
        const now = Date.now();
        if (now - this.lastDamageTime < this.damageCooldown) {
            return false;
        }
        this.lastDamageTime = now;

        let hp = this.sprite.getData('hp') - 1;
        this.sprite.setData('hp', hp);

        console.log('Boss HP:', hp, '/', this.sprite.getData('maxHp'));

        createFlashEffect(this.scene, this.sprite, 50, 1);

        if (hp <= 0 && !this.isDefeated) {
            this.isDefeated = true;
            this.sprite.setData('isDefeated', true);
            return true;
        }

        return false;
    }

    getCurrentHP() {
        return this.sprite ? this.sprite.getData('hp') : 0;
    }

    getMaxHP() {
        return this.sprite ? this.sprite.getData('maxHp') : 0;
    }

    getScore() {
        return this.sprite ? this.sprite.getData('score') : 0;
    }

    defeat(onComplete) {
        console.log('=== DEFEAT BOSS ===');
        if (!this.sprite) return;

        const bossX = this.sprite.x;
        const bossY = this.sprite.y;

        for (let i = 0; i < 20; i++) {
            this.scene.time.delayedCall(i * 50, () => {
                const ox = Phaser.Math.Between(-40, 40);
                const oy = Phaser.Math.Between(-30, 30);
                createExplosion(this.scene, bossX + ox, bossY + oy);
            });
        }

        this.scene.time.delayedCall(1000, () => {
            this.cleanup();
            if (onComplete) onComplete();
        });
    }

    cleanup() {
        if (this.collider) this.collider.destroy();
        if (this.playerCollider) this.playerCollider.destroy();
        if (this.shootTimer) this.shootTimer.remove();
        if (this.sprite) this.sprite.destroy();

        this.sprite = null;
        this.isActive = false;
        this.collider = null;
        this.playerCollider = null;
        this.shootTimer = null;
    }

    setColliders(bulletCollider, playerCollider) {
        this.collider = bulletCollider;
        this.playerCollider = playerCollider;
    }

    getSprite() {
        return this.sprite;
    }
}
