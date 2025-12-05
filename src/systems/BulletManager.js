/**
 * Bullet Manager - Handles player bullets and auto-shooting
 */

function createPlayerBullet(bulletsGroup, x, y, velocityX = 0) {
    const bullet = bulletsGroup.create(x, y, 'bullet');
    bullet.setVelocity(velocityX, -GAME_CONFIG.BULLET_SPEED);
    return bullet;
}

function playerAutoShoot(bulletsGroup, playerX, playerY, pattern) {
    const bulletY = playerY - 25;

    switch (pattern) {
        case 'single':
            createPlayerBullet(bulletsGroup, playerX, bulletY, 0);
            break;

        case 'double':
            createPlayerBullet(bulletsGroup, playerX - 12, bulletY, 0);
            createPlayerBullet(bulletsGroup, playerX + 12, bulletY, 0);
            break;

        case 'triple':
            createPlayerBullet(bulletsGroup, playerX - 20, bulletY, 0);
            createPlayerBullet(bulletsGroup, playerX, bulletY, 0);
            createPlayerBullet(bulletsGroup, playerX + 20, bulletY, 0);
            break;

        case 'fan':
            for (let i = -2; i <= 2; i++) {
                createPlayerBullet(bulletsGroup, playerX, bulletY, i * 60);
            }
            break;
    }
}

function cleanupBullets(bulletsGroup) {
    bulletsGroup.children.each((bullet) => {
        if (bullet.y < -20 || bullet.y > GAME_CONFIG.HEIGHT + 20 ||
            bullet.x < -20 || bullet.x > GAME_CONFIG.WIDTH + 20) {
            bullet.destroy();
        }
    });
}

function cleanupEnemyBullets(enemyBulletsGroup) {
    enemyBulletsGroup.children.each((bullet) => {
        if (bullet.y > GAME_CONFIG.HEIGHT + 20 || bullet.y < -20 ||
            bullet.x < -20 || bullet.x > GAME_CONFIG.WIDTH + 20) {
            bullet.destroy();
        }
    });
}
