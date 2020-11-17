function initiateMainRocketSprite() {
    main_rocket = new Sprite(resources["images/texture_atlas.json"].textures[asset_uris[0]]);
    main_rocket.scale.set(0.15)
    main_rocket.anchor.x = 0;
    main_rocket.anchor.y = 0;
    main_rocket.vx = 1;
    main_rocket.vy = 1;
    main_rocket.shot_delay = 0;

    // position sprite
    // main_rocket.x = Math.ceil((Math.random() * (window.innerWidth) / 2 + (window.innerWidth) / 4));
    // main_rocket.y = Math.ceil((Math.random() * (window.innerHeight) / 4 + 10 * (window.innerHeight) / 16));
    main_rocket.x = 120;
    main_rocket.y = Math.ceil((Math.random() * (window.innerHeight) / 4 + 10 * (window.innerHeight) / 16));

    //Add the mr to the stage
    app.stage.addChild(main_rocket);

}

function initiateEnemyRocketSprites() {
    // TODO: ENEMY SPACESHIPS SHOULD BE IN A DISTANCE ONE FROM ANOTHER
    for (let index = 1; index < asset_uris.length * 10; index++) {
        enemy_rockets.push(
            new Sprite(resources["images/texture_atlas.json"].textures[asset_uris[index % 3 + 1]])
        )
        enemy_rockets[index - 1].x = Math.ceil((Math.random() * (window.innerWidth) / 2 + (window.innerWidth) / 4));
        enemy_rockets[index - 1].y = Math.ceil((Math.random() * (window.innerHeight) / 4 + (window.innerHeight) / 10));
        // enemy_rockets[index - 1].scale.x = 1
        // enemy_rockets[index - 1].scale.y = 1
        enemy_rockets[index - 1].scale.set(0.15);
        enemy_rockets[index - 1].vx = 1;
        enemy_rockets[index - 1].vy = 1;
        enemy_rockets[index - 1].rotation = Math.PI;
        enemies.addChild(enemy_rockets[index - 1]);
    }
    enemies.vx = 1;
    enemies.vy = 1;

    app.stage.addChild(enemies);
}