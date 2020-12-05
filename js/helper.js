const helperTextStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 128,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
});

function displayHelperText(element) {
    element.message = new PIXI.Text(`${enemies.toGlobal(element.position).x} x ${enemies.toGlobal(element.position).y}`, helperTextStyle);
    element.addChild(element.message);
}