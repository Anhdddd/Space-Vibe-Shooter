/**
 * Game Configuration Constants
 */

// Game dimensions and core settings
const GAME_CONFIG = {
    WIDTH: 800,
    HEIGHT: 600,
    PLAYER_SPEED: 300,
    BULLET_SPEED: 400,
    ENEMY_BULLET_SPEED: 150,
    AUTO_SHOOT_DELAY: 200,
    ENEMY_SPAWN_DELAY: 1500,
    ENEMY_SHOOT_DELAY: 2000
};

// Player settings
const PLAYER_CONFIG = {
    MAX_HP: 3,
    START_X: 400,
    START_Y: 550
};

// Stage settings
const STAGE_CONFIG = {
    MAX_STAGES: 10,
    KILLS_TO_SPAWN_BOSS: 10
};

// Enemy type definitions
const ENEMY_TYPES = {
    basic: { hp: 1, color: 0xff0000, speed: 100, size: 40, score: 10 },
    medium: { hp: 2, color: 0xff8800, speed: 80, size: 50, score: 25 },
    tank: { hp: 3, color: 0x8800ff, speed: 60, size: 60, score: 50 }
};

// Power-up definitions
const POWER_UP_TYPES = {
    double: { color: 0xffff00, name: 'DOUBLE' },
    triple: { color: 0x0088ff, name: 'TRIPLE' },
    fan: { color: 0xff00ff, name: 'FAN' }
};

// Boss settings
const BOSS_CONFIG = {
    BASE_HP: 100,
    HP_PER_STAGE: 50,
    BASE_SCORE: 500,
    SCORE_PER_STAGE: 100,
    WIDTH: 120,
    HEIGHT: 80
};

function getBossHP(stage) {
    return BOSS_CONFIG.BASE_HP + (stage - 1) * BOSS_CONFIG.HP_PER_STAGE;
}

function getBossScore(stage) {
    return BOSS_CONFIG.BASE_SCORE + stage * BOSS_CONFIG.SCORE_PER_STAGE;
}
