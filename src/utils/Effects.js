/**
 * Visual Effects - Explosions, starfield, and other effects
 */

function createExplosion(scene, x, y) {
    for (let i = 0; i < 8; i++) {
        const particle = scene.add.circle(x, y, 5, 0xffaa00);
        const angle = (i / 8) * Math.PI * 2;
        scene.tweens.add({
            targets: particle,
            x: x + Math.cos(angle) * 50,
            y: y + Math.sin(angle) * 50,
            alpha: 0,
            scale: 0,
            duration: 300,
            onComplete: () => particle.destroy()
        });
    }
}

function createStarfield(scene) {
    for (let i = 0; i < 100; i++) {
        const x = Phaser.Math.Between(0, GAME_CONFIG.WIDTH);
        const y = Phaser.Math.Between(0, GAME_CONFIG.HEIGHT);
        const size = Phaser.Math.Between(1, 3);
        const alpha = Phaser.Math.FloatBetween(0.3, 1);
        const star = scene.add.circle(x, y, size, 0xffffff, alpha);

        scene.tweens.add({
            targets: star,
            y: GAME_CONFIG.HEIGHT + 20,
            duration: Phaser.Math.Between(3000, 8000),
            repeat: -1,
            onRepeat: () => {
                star.y = -10;
                star.x = Phaser.Math.Between(0, GAME_CONFIG.WIDTH);
            }
        });
    }
}

function createFlashEffect(scene, target, duration = 50, repeat = 1) {
    scene.tweens.add({
        targets: target,
        alpha: 0.3,
        duration: duration,
        yoyo: true,
        repeat: repeat,
        onComplete: () => {
            if (target && target.active) {
                target.alpha = 1;
            }
        }
    });
}
