/**
 * Power-Up Manager - Handles power-up spawning and collection
 */

function spawnPowerUp(scene, powerUpsGroup, x, y) {
    const types = Object.keys(POWER_UP_TYPES);
    const type = Phaser.Utils.Array.GetRandom(types);
    // const type = 'hp'; // FORCE HP FOR TESTING

    const powerUp = powerUpsGroup.create(x, y, 'powerup_' + type);
    powerUp.setVelocityY(80);
    powerUp.setData('type', type);

    scene.tweens.add({
        targets: powerUp,
        scale: 1.3,
        duration: 300,
        yoyo: true,
        repeat: -1
    });

    return powerUp;
}

function getPowerUpName(type) {
    return POWER_UP_TYPES[type]?.name || type.toUpperCase();
}

function collectPowerUp(powerUp) {
    const type = powerUp.getData('type');
    powerUp.destroy();
    return type;
}

function cleanupPowerUps(powerUpsGroup) {
    powerUpsGroup.children.each((powerUp) => {
        if (powerUp.y > GAME_CONFIG.HEIGHT + 20) {
            powerUp.destroy();
        }
    });
}
