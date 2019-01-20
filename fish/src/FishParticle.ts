/**
 * 泡泡鱼粒子效果
 */

class FishParticle extends egret.DisplayObjectContainer {

    public xVel:number = 0;
    public yVel:number = 0;
    private size:number = 1;
    private enabled:boolean = true;

    public constructor() {
        super();
        this.render();
    }

    private render() {
        const fishParticleBitmap = this.createBitmapByName('orangeParticle_png');
        this.width = 32;
        this.height = 32;
        this.addChild(fishParticleBitmap);
    }

    public update() {
        const drag = 0.84;

        this.xVel*=drag;
        this.yVel*=drag;

        this.x+=this.xVel;
        this.y+=this.yVel;

        this.size*=0.9;

        this.scaleX = this.size;
        this.scaleY = this.size;

        if(this.size<0.05) {
            this.enabled = false
        };
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
}