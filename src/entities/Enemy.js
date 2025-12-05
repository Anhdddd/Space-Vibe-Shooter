/**
 * Enemy System - Handles enemy spawning and behavior
 */

function spawnEnemy(scene, enemiesGroup, currentStage) {
    const spawnCount = Math.min(Math.ceil(currentStage / 2), 3);

    for (let i = 0; i < spawnCount; i++) {
        scene.time.delayedCall(i * 300, () => {
            const type = getRandomEnemyType(currentStage);
            createEnemy(scene, enemiesGroup, type, currentStage);
        });
    }
}

function getRandomEnemyType(stage) {
    const rand = Math.random();
    const tankChance = 0.1 + (stage * 0.03);
    const mediumChance = 0.25 + (stage * 0.03);

    if (rand < tankChance) return 'tank';
    if (rand < tankChance + mediumChance) return 'medium';
    return 'basic';
}

function createEnemy(scene, enemiesGroup, type, currentStage) {
    const config = ENEMY_TYPES[type];
    const x = Phaser.Math.Between(50, GAME_CONFIG.WIDTH - 50);

    const enemy = enemiesGroup.create(x, -config.size, 'enemy_' + type);
    const speedMultiplier = 1 + (currentStage - 1) * 0.1;

    enemy.setVelocityY(config.speed * speedMultiplier);
    enemy.setData('hp', config.hp);
    enemy.setData('maxHp', config.hp);
    enemy.setData('type', type);
    enemy.setData('score', config.score);
    enemy.setData('isBoss', false);

    return enemy;
}

function enemiesShoot(scene, enemiesGroup, bulletsGroup, currentStage) {
    enemiesGroup.children.each((enemy) => {
        if (enemy.getData('isBoss')) return;

        const shootChance = 0.4 + (currentStage * 0.05);
        if (Math.random() < Math.min(shootChance, 0.8) && enemy.y > 50 && enemy.y < 450) {
            const bullet = bulletsGroup.create(enemy.x, enemy.y + 20, 'enemyBullet');
            const speedMultiplier = 1 + (currentStage - 1) * 0.1;
            bullet.setVelocityY(GAME_CONFIG.ENEMY_BULLET_SPEED * speedMultiplier);
        }
    });
}

function cleanupEnemies(enemiesGroup) {
    enemiesGroup.children.each((enemy) => {
        if (enemy.y > GAME_CONFIG.HEIGHT + 50) {
            enemy.destroy();
        }
    });
}
