function shotABomb() {
    if (main_rocket.shot_delay == 0 && gameScene.visible) {
        main_rocket.shot_delay = 10;
        let tmp = new Sprite(resources["images/texture_atlas.json"].textures[bomb_uri])
        tmp.scale.set(0.1);
        tmp.x = main_rocket.x + (main_rocket.width - tmp.width) / 2;
        tmp.y = main_rocket.y;
        tmp.anchor.x = 0;
        tmp.anchor.y = 0;
        tmp.vx = 1;
        tmp.vy = 1;
        bombs.push(tmp);
        app.stage.addChild(tmp);
    }
}

function shotEnemyBomb() {
    if (gameScene.visible) {
        enemy_rockets.forEach(element => {
            let willEnemyShoot = Math.random() > 0.9995 ? true : false;
            if (willEnemyShoot) {
                let tmp = new Sprite(resources["images/texture_atlas.json"].textures[bomb_uri])
                tmp.scale.set(0.1);
                tmp.x = enemies.toGlobal(element.position).x - Math.ceil(((element.width + tmp.width) / 2));
                tmp.y = enemies.toGlobal(element.position).y;
                console.log(`${enemies.toGlobal(element.position).x} x ${enemies.toGlobal(element.position).y}`);
                tmp.anchor.x = 0;
                tmp.anchor.y = 0;
                tmp.vy = -1;
                enemyBombs.push(tmp);
                app.stage.addChild(tmp);
            }
        });
    }
}

function moveBombs() {
    bombs.forEach(element => {
        // element.x -= element.vx;
        element.y -= element.vy;
    });
    enemyBombs.forEach(element => {
        // element.x -= element.vx;
        element.y -= element.vy;
    });
}

function destroyBombsOutsideStage() {
    if (bombs.length > 0) {
        for (let index = 0; index < bombs.length; index++) {
            if (bombs[index].y < 0 || bombs[index].y > window.innerHeight) {
                app.stage.removeChild(bombs[index]);
                bombs.shift();
            }

        }
    }
    if (enemyBombs.length > 0) {
        for (let index = 0; index < enemyBombs.length; index++) {
            if (enemyBombs[index].y < 0 || enemyBombs[index].y > window.innerHeight) {
                app.stage.removeChild(enemyBombs[index]);
                enemyBombs.shift();
            }

        }
    }
}


function rotateMainRocket(direction) {
    main_rocket.rotation = direction == "cw" ? main_rocket.rotation + (Math.PI / 20) : main_rocket.rotation - (Math.PI / 20)
}

function moveEnemies() {
    let steering_wheel = Math.random();
    let xp = steering_wheel > 0.5 ? enemies.x + enemies.vx : enemies.x - enemies.vx;
    // xp = enemies.xp < 0 ? 0 : enemies.x
    let yp = (Math.ceil(steering_wheel * 100) % 2) == 0 ? enemies.y + enemies.vy : enemies.y - enemies.vy;
    // yp = enemies.yp < 0 ? 0 : enemies.y
    enemies.position.set(xp, yp);
    // enemy_rockets.forEach(element => {
    //     element.message.text = `${enemies.toGlobal(element.position).x} x ${enemies.toGlobal(element.position).y}`
    // });
}

function checkEnemiesHits() {
    bombs.forEach(bomb => {
        enemy_rockets.forEach((er, index) => {
            if (b.hit(bomb, er, false, false, true)) {
                enemies.removeChild(er);
                enemy_rockets.splice(index, 1)
                game_score += 1;
            }
        });
    });
}

function endGame() {
    // TODO extend what "end game" is
    gameOverScene.visible = true;
    gameScene.visible = false;
    bombs = [];
    enemyBombs = [];
    app.stage.removeChild
}

function checkHits() {
    enemyBombs.forEach(bomb => {
        if (b.hit(bomb, main_rocket, false, false, false)) {
            endGame()
        }
    });
}