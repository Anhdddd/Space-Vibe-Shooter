/**
 * Stage Manager - Handles stage transitions, intros, and game state
 */

function showStageIntro(scene, currentStage, onComplete) {
    const stageTitle = scene.add.text(400, 250, 'STAGE ' + currentStage, {
        fontSize: '64px', fill: '#00ff00', fontFamily: 'Arial',
        stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    const bossHP = getBossHP(currentStage);
    const subtitle = scene.add.text(400, 320, 'Boss HP: ' + bossHP, {
        fontSize: '24px', fill: '#ff8800', fontFamily: 'Arial'
    }).setOrigin(0.5);

    scene.time.delayedCall(2000, () => {
        scene.tweens.add({
            targets: [stageTitle, subtitle],
            alpha: 0,
            duration: 500,
            onComplete: () => {
                stageTitle.destroy();
                subtitle.destroy();
                if (onComplete) onComplete();
            }
        });
    });
}

function showStageComplete(scene, currentStage, score, onComplete) {
    console.log('=== STAGE ' + currentStage + ' COMPLETE ===');

    const completeText = scene.add.text(400, 250, 'STAGE ' + currentStage + ' CLEAR!', {
        fontSize: '48px', fill: '#00ff00', fontFamily: 'Arial',
        stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    const bonusScore = currentStage * 1000;

    const bonusText = scene.add.text(400, 320, 'Bonus: +' + bonusScore, {
        fontSize: '28px', fill: '#ffff00', fontFamily: 'Arial'
    }).setOrigin(0.5);

    scene.time.delayedCall(2500, () => {
        completeText.destroy();
        bonusText.destroy();
        if (onComplete) onComplete(bonusScore);
    });
}

function showGameOver(scene, stage, score) {
    const gameOverText = scene.add.text(400, 250, 'GAME OVER', {
        fontSize: '64px', fill: '#ff0000', fontFamily: 'Arial',
        stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    const finalText = scene.add.text(400, 320, 'Stage: ' + stage + ' | Score: ' + score, {
        fontSize: '28px', fill: '#fff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    const restartText = scene.add.text(400, 400, 'Click to Restart', {
        fontSize: '24px', fill: '#ffff00', fontFamily: 'Arial'
    }).setOrigin(0.5);

    scene.tweens.add({
        targets: restartText,
        alpha: 0.3,
        duration: 500,
        yoyo: true,
        repeat: -1
    });

    scene.input.once('pointerdown', () => scene.scene.restart());
}

function showGameWin(scene, score) {
    const winText = scene.add.text(400, 200, '🎉 CONGRATULATIONS! 🎉', {
        fontSize: '48px', fill: '#00ff00', fontFamily: 'Arial',
        stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);

    const completeText = scene.add.text(400, 280, 'ALL 10 STAGES CLEARED!', {
        fontSize: '32px', fill: '#ffff00', fontFamily: 'Arial'
    }).setOrigin(0.5);

    const scoreText = scene.add.text(400, 340, 'Final Score: ' + score, {
        fontSize: '28px', fill: '#fff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    const restartText = scene.add.text(400, 420, 'Click to Play Again', {
        fontSize: '24px', fill: '#00ffff', fontFamily: 'Arial'
    }).setOrigin(0.5);

    scene.tweens.add({
        targets: restartText,
        alpha: 0.3,
        duration: 500,
        yoyo: true,
        repeat: -1
    });

    scene.input.once('pointerdown', () => scene.scene.restart());
}

function shouldSpawnBoss(killCount) {
    return killCount >= STAGE_CONFIG.KILLS_TO_SPAWN_BOSS;
}

function isGameComplete(currentStage) {
    return currentStage >= STAGE_CONFIG.MAX_STAGES;
}

function getMaxStages() {
    return STAGE_CONFIG.MAX_STAGES;
}

function getKillsRequired() {
    return STAGE_CONFIG.KILLS_TO_SPAWN_BOSS;
}
