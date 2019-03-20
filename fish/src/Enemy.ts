/**
 * 敌人：鲨鱼
 */

class Enemy extends egret.DisplayObjectContainer {
    public gravity:number = 0;
    // 泡泡鱼的x轴坐标
    public posX:number;
    // 泡泡鱼的y轴坐标
    public posY:number;
    // 移动加速度
    public velX:number = 0;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        let fishBitmap = this.createBitmapByName("bomp_3_png");
        fishBitmap.width = 40;
        fishBitmap.height = 40;
        fishBitmap.rotation = 0;
        this.addChild(fishBitmap);
    }

    // 泡泡鱼运动
    public render() {
        this.x = this.posX;
    }

    public update() {
        this.velX += this.gravity;
        this.posX += this.velX;
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
}