const leftMargin = 100, rightMargin = 100, topMargin = 100, bottomMargin = Math.floor(window.innerHeight /2);


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
                // console.log(`${enemies.toGlobal(element.position).x} x ${enemies.toGlobal(element.position).y}`);
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
            if (enemyBombs[index].gy > window.innerHeight) {
                app.stage.removeChild(enemyBombs[index]);
            }

        }
    }
}


function rotateMainRocket(direction) {
    main_rocket.rotation = direction == "cw" ? main_rocket.rotation + (Math.PI / 20) : main_rocket.rotation - (Math.PI / 20)
}

function moveEnemies() {
    let steering_wheel = Math.random() > 0.5;
    // Check if move is possible based on the steering wheel?
    let dx = enemies.x;
    if (steering_wheel && enemies.x + enemies.vx < window.innerWidth - enemies.width - rightMargin) {
        dx = enemies.x + enemies.vx;
    } else if(enemies.x - enemies.vx < leftMargin) {
        dx = enemies.x - enemies.vx
    }

    // Check if move is possible based on the steering wheel?
    let dy = enemies.y;
    if (steering_wheel && enemies.y + enemies.vy < window.innerHeight - enemies.height - bottomMargin) {
        dy = enemies.y + enemies.vy;
    } else if( enemies.y - enemies.vy > topMargin) {
        dy = enemies.y - enemies.vy;
    }

    enemies.position.set(dx, dy);
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
    app.stage.getChildByName(gameScene).removeChildren();
}

function checkHits() {
    enemyBombs.forEach(bomb => {
        if (b.hit(bomb, main_rocket, false, false, false)) {
            endGame()
        }
    });
}