/**
 * Texture Generator - Creates all game textures procedurally
 */

function generatePlayerTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x00ff00, 1);
    g.fillTriangle(20, 0, 0, 40, 40, 40);
    g.generateTexture('player', 40, 40);
    g.destroy();
}

function generateBulletTextures(scene) {
    let g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x00ffff, 1);
    g.fillRect(0, 0, 6, 15);
    g.generateTexture('bullet', 6, 15);
    g.destroy();

    g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xff3333, 1);
    g.fillCircle(5, 5, 5);
    g.generateTexture('enemyBullet', 10, 10);
    g.destroy();
}

function generateEnemyTextures(scene) {
    for (const type in ENEMY_TYPES) {
        const config = ENEMY_TYPES[type];
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(config.color, 1);
        g.fillRect(0, 0, config.size, config.size);
        g.lineStyle(2, 0xffffff, 0.5);
        g.strokeRect(0, 0, config.size, config.size);
        g.generateTexture('enemy_' + type, config.size, config.size);
        g.destroy();
    }
}

function generateBossTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xff0066, 1);
    g.fillRect(0, 0, BOSS_CONFIG.WIDTH, BOSS_CONFIG.HEIGHT);
    g.fillStyle(0xff3388, 1);
    g.fillRect(10, 10, 100, 60);
    g.lineStyle(4, 0xffff00, 1);
    g.strokeRect(0, 0, BOSS_CONFIG.WIDTH, BOSS_CONFIG.HEIGHT);
    g.generateTexture('boss', BOSS_CONFIG.WIDTH, BOSS_CONFIG.HEIGHT);
    g.destroy();
}

function generatePowerUpTextures(scene) {
    for (const type in POWER_UP_TYPES) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(POWER_UP_TYPES[type].color, 1);
        g.fillCircle(12, 12, 12);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(12, 12, 6);
        g.generateTexture('powerup_' + type, 24, 24);
        g.destroy();
    }
}

function generateAllTextures(scene) {
    generatePlayerTexture(scene);
    generateBulletTextures(scene);
    generateEnemyTextures(scene);
    generateBossTexture(scene);
    generatePowerUpTextures(scene);
}
