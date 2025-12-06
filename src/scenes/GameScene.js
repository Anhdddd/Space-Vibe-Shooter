/**
 * GameScene - Main game scene orchestrating all modules
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Load Kenney Assets
        this.load.setPath('kenney_space-shooter-redux/');

        // Background
        this.load.image('background', 'Backgrounds/darkPurple.png');

        // Player
        this.load.image('player', 'PNG/playerShip1_blue.png');

        // Enemies
        this.load.image('enemy_basic', 'PNG/Enemies/enemyBlack1.png');
        this.load.image('enemy_medium', 'PNG/Enemies/enemyBlue1.png');
        this.load.image('enemy_tank', 'PNG/Enemies/enemyGreen1.png');
        this.load.image('boss', 'PNG/ufoRed.png');

        // Bullets
        this.load.image('bullet', 'PNG/Lasers/laserBlue01.png');
        this.load.image('enemyBullet', 'PNG/Lasers/laserRed01.png');

        // Power-ups
        this.load.image('powerup_double', 'PNG/Power-ups/powerupYellow_bolt.png');
        this.load.image('powerup_triple', 'PNG/Power-ups/powerupBlue_bolt.png');
        this.load.image('powerup_fan', 'PNG/Power-ups/powerupRed_bolt.png');
        this.load.image('powerup_hp', 'PNG/Power-ups/pill_green.png');

        // Audio
        this.load.audio('sfx_shoot', 'Bonus/sfx_laser1.ogg');
        this.load.audio('sfx_enemy_shoot', 'Bonus/sfx_laser2.ogg');
        this.load.audio('sfx_explosion', 'Bonus/sfx_twoTone.ogg');
        this.load.audio('sfx_powerup', 'Bonus/sfx_shieldUp.ogg');
    }

    create() {
        // Add scrolling background
        this.bg = this.add.tileSprite(400, 300, 800, 600, 'background');

        this.initializeGameState();
        // createStarfield(this); // Disabled starfield in favor of background image
        this.createEntities();
        this.createGroups();
        this.setupTimers();
        this.setupCollisions();
        this.createUI();
        showStageIntro(this, this.currentStage, () => {
            this.isPaused = false;
        });
    }

    initializeGameState() {
        this.currentStage = 1;
        this.killCount = 0;
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = true;
        this.bossInstance = null;
    }

    createEntities() {
        this.playerEntity = new Player(this);
        this.player = this.playerEntity.create();
    }

    createGroups() {
        this.playerBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
        this.powerUps = this.physics.add.group();
    }

    setupTimers() {
        this.time.addEvent({
            delay: GAME_CONFIG.AUTO_SHOOT_DELAY,
            callback: () => {
                if (this.isGameOver || this.isPaused) return;
                playerAutoShoot(
                    this,
                    this.playerBullets,
                    this.playerEntity.x,
                    this.playerEntity.y,
                    this.playerEntity.bulletPattern
                );
            },
            callbackScope: this,
            loop: true
        });

        this.enemySpawnTimer = this.time.addEvent({
            delay: GAME_CONFIG.ENEMY_SPAWN_DELAY,
            callback: () => {
                if (this.isGameOver || this.bossInstance?.isActive || this.isPaused) return;
                spawnEnemy(this, this.enemies, this.currentStage);
            },
            callbackScope: this,
            loop: true
        });

        this.time.addEvent({
            delay: GAME_CONFIG.ENEMY_SHOOT_DELAY,
            callback: () => {
                if (this.isGameOver || this.isPaused) return;
                enemiesShoot(this, this.enemies, this.enemyBullets, this.currentStage);
            },
            callbackScope: this,
            loop: true
        });
    }

    setupCollisions() {
        this.physics.add.overlap(
            this.playerBullets,
            this.enemies,
            this.handleBulletEnemyCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.enemyBullets,
            this.player,
            this.handleEnemyBulletPlayerCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.powerUps,
            this.handlePowerUpCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.handlePlayerEnemyCollision,
            null,
            this
        );
    }

    createUI() {
        this.ui = new GameUI(this);
        this.ui.create(this.playerEntity.hp);
    }

    update() {
        if (this.isGameOver || this.isPaused) return;

        // Scroll background
        this.bg.tilePositionY -= 0.5;

        // Handle Touch/Mouse Input
        if (this.input.activePointer.isDown) {
            // "Finger" follows logic: Ship is slightly above finger
            const targetX = this.input.activePointer.x;
            const targetY = this.input.activePointer.y - 50;

            this.playerEntity.handleTouch(targetX, targetY);
        } else {
            this.playerEntity.update(); // Keyboard fallback
        }

        cleanupBullets(this.playerBullets);
        cleanupEnemyBullets(this.enemyBullets);
        cleanupEnemies(this.enemies);
        cleanupPowerUps(this.powerUps);
    }

    // ==================== Collision Handlers ====================

    handleBulletEnemyCollision(bullet, enemy) {
        if (enemy.getData && enemy.getData('isBoss')) return;

        bullet.destroy();
        const hp = enemy.getData('hp') - 1;
        enemy.setData('hp', hp);

        if (hp <= 0) {
            const score = enemy.getData('score');
            this.score += score;
            this.ui.updateScore(this.score);

            // Play explosion sound
            this.sound.play('sfx_explosion', { volume: 0.5 });

            createExplosion(this, enemy.x, enemy.y);

            this.killCount++;
            this.ui.updateKillCount(this.killCount);

            if (Math.random() < 0.2) {
                spawnPowerUp(this, this.powerUps, enemy.x, enemy.y);
            }

            enemy.destroy();

            if (shouldSpawnBoss(this.killCount) && !this.bossInstance?.isActive) {
                this.spawnBoss();
            }
        } else {
            this.tweens.add({
                targets: enemy,
                alpha: 0.3,
                duration: 50,
                yoyo: true,
                repeat: 2
            });
        }
    }

    handleEnemyBulletPlayerCollision(player, bullet) {
        bullet.destroy();
        this.playerTakeDamage();
    }

    handlePlayerEnemyCollision(player, enemy) {
        if (enemy.getData('isBoss')) return;
        this.playerTakeDamage();
        createExplosion(this, enemy.x, enemy.y);
        enemy.destroy();
    }

    handlePowerUpCollision(player, powerUp) {
        this.sound.play('sfx_powerup', { volume: 0.5 });
        const type = collectPowerUp(powerUp);

        if (type === 'hp') {
            const healed = this.playerEntity.heal();
            if (healed) {
                this.ui.showPowerUp('❤️ HP UP!');
                this.ui.updateHP(this.playerEntity.hp);
            } else {
                this.ui.showPowerUp('HP FULL!');
            }
        } else {
            this.playerEntity.setPowerUp(type);
            this.ui.showPowerUp(getPowerUpName(type));
        }
    }

    handleBulletBossCollision(objA, objB) {
        // Phaser may swap parameters, need to figure out which is bullet
        let bullet = objA;
        let bossSprite = objB;

        // Debug: Log what we received
        console.log('=== COLLISION ===');
        console.log('objA texture:', objA.texture?.key);
        console.log('objB texture:', objB.texture?.key);

        // Swap if needed
        if (objA.texture?.key === 'boss') {
            bullet = objB;
            bossSprite = objA;
        }

        if (!this.bossInstance || !this.bossInstance.sprite?.active) {
            if (bullet && bullet.active) bullet.destroy();
            return;
        }

        // Destroy bullet first
        if (bullet && bullet.active) {
            bullet.destroy();
        }

        const defeated = this.bossInstance.takeDamage();

        this.ui.updateBossHP(
            this.bossInstance.getCurrentHP(),
            this.bossInstance.getMaxHP()
        );

        if (defeated) {
            this.defeatBoss();
        }
    }

    handlePlayerBossCollision(player, boss) {
        this.playerTakeDamage();
    }

    // ==================== Game Logic ====================

    playerTakeDamage() {
        const isDead = this.playerEntity.takeDamage();
        this.ui.updateHP(this.playerEntity.hp);
        this.ui.hidePowerUp();

        if (isDead) {
            this.gameOver();
        }
    }

    spawnBoss() {
        this.enemySpawnTimer.paused = true;
        this.enemies.clear(true, true);

        this.bossInstance = new Boss(this);
        this.bossInstance.spawn(this.currentStage, (boss) => {
            const bulletCollider = this.physics.add.overlap(
                this.playerBullets,
                boss.getSprite(),
                this.handleBulletBossCollision,
                null,
                this
            );

            const playerCollider = this.physics.add.overlap(
                this.player,
                boss.getSprite(),
                this.handlePlayerBossCollision,
                null,
                this
            );

            boss.setColliders(bulletCollider, playerCollider);
            this.ui.showBossHP(this.currentStage);
        });
    }

    defeatBoss() {
        const score = this.bossInstance.getScore();
        this.score += score;
        this.ui.updateScore(this.score);

        this.bossInstance.defeat(() => {
            this.ui.hideBossHP();
            this.showStageComplete();
        });
    }

    showStageComplete() {
        this.isPaused = true;
        showStageComplete(this, this.currentStage, this.score, (bonusScore) => {
            this.score += bonusScore;
            this.ui.updateScore(this.score);

            if (isGameComplete(this.currentStage)) {
                this.gameWin();
            } else {
                this.nextStage();
            }
        });
    }

    nextStage() {
        this.currentStage++;
        this.killCount = 0;
        this.bossInstance = null;

        this.ui.updateStage(this.currentStage);
        this.ui.updateKillCount(0);

        this.enemySpawnTimer.paused = false;

        showStageIntro(this, this.currentStage, () => {
            this.isPaused = false;
        });
    }

    gameOver() {
        this.isGameOver = true;
        this.playerEntity.hide();

        if (this.bossInstance?.shootTimer) {
            this.bossInstance.shootTimer.remove();
        }

        showGameOver(this, this.currentStage, this.score);
    }

    gameWin() {
        this.isPaused = true;
        showGameWin(this, this.score);
    }
}
