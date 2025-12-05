/**
 * Game UI - Handles all UI elements
 */

class GameUI {
    constructor(scene) {
        this.scene = scene;
        this.scoreText = null;
        this.hpText = null;
        this.powerUpText = null;
        this.stageText = null;
        this.killCountText = null;
        this.bossHPBar = null;
        this.bossHPBarBg = null;
        this.bossNameText = null;
    }

    create(playerHP) {
        this.scoreText = this.scene.add.text(16, 16, 'Score: 0', {
            fontSize: '24px', fill: '#fff', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 2
        });

        this.hpText = this.scene.add.text(16, 50, '❤️'.repeat(playerHP), {
            fontSize: '24px'
        });

        this.powerUpText = this.scene.add.text(400, 580, '', {
            fontSize: '18px', fill: '#ffff00', fontFamily: 'Arial'
        }).setOrigin(0.5, 1);

        this.stageText = this.scene.add.text(784, 16, 'Stage 1/' + STAGE_CONFIG.MAX_STAGES, {
            fontSize: '20px', fill: '#00ff00', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(1, 0);

        this.killCountText = this.scene.add.text(784, 45, 'Kills: 0/' + STAGE_CONFIG.KILLS_TO_SPAWN_BOSS, {
            fontSize: '16px', fill: '#ffaa00', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0);
    }

    updateScore(score) {
        this.scoreText.setText('Score: ' + score);
    }

    updateHP(hp) {
        this.hpText.setText('❤️'.repeat(Math.max(0, hp)));
    }

    updateStage(stage) {
        this.stageText.setText('Stage ' + stage + '/' + STAGE_CONFIG.MAX_STAGES);
    }

    updateKillCount(kills) {
        this.killCountText.setText('Kills: ' + kills + '/' + STAGE_CONFIG.KILLS_TO_SPAWN_BOSS);
    }

    showPowerUp(name) {
        this.powerUpText.setText('🔥 ' + name + ' SHOT!');
    }

    hidePowerUp() {
        this.powerUpText.setText('');
    }

    showBossHP(stage) {
        this.bossHPBarBg = this.scene.add.rectangle(400, 30, 300, 20, 0x333333).setDepth(100);
        this.bossHPBar = this.scene.add.rectangle(400, 30, 300, 20, 0x00ff00).setDepth(100);
        this.bossNameText = this.scene.add.text(400, 55, 'BOSS - Stage ' + stage, {
            fontSize: '14px', fill: '#ff0000', fontFamily: 'Arial'
        }).setOrigin(0.5, 0).setDepth(100);
    }

    updateBossHP(currentHP, maxHP) {
        if (!this.bossHPBar) return;

        const hpPercent = currentHP / maxHP;
        this.bossHPBar.width = 300 * hpPercent;

        if (hpPercent < 0.3) {
            this.bossHPBar.fillColor = 0xff0000;
        } else if (hpPercent < 0.6) {
            this.bossHPBar.fillColor = 0xffaa00;
        } else {
            this.bossHPBar.fillColor = 0x00ff00;
        }
    }

    hideBossHP() {
        if (this.bossHPBar) this.bossHPBar.destroy();
        if (this.bossHPBarBg) this.bossHPBarBg.destroy();
        if (this.bossNameText) this.bossNameText.destroy();
        this.bossHPBar = null;
        this.bossHPBarBg = null;
        this.bossNameText = null;
    }
}
