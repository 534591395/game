/**
 * 泡泡鱼
 */
class Fish extends egret.DisplayObjectContainer {
    // 泡泡鱼的x轴坐标
    public posX:number;
    // 泡泡鱼的y轴坐标
    public posY:number;
    // 泡泡鱼的z轴坐标
    public posZ:number;
    // 泡泡鱼的图片类型
    private fishBitmap:egret.Bitmap;
    // 重力加速度
    public gravity:number = 0;
    public velX:number = 0;
    public velY:number = 0;
    public velZ:number = 0;
    private counter:number = 0;
    private TO_RADIANS:number = Math.PI/180;
    public size:number = 1;
    // 该泡泡鱼是否被回收（是否可用）
    public enabled:boolean = true;

    public constructor(posx:number, posy:number, posz: number, fishBitmap:egret.Bitmap ) {
        super();

        this.posX = posx;
        this.posY = posy;
        this.posZ = posz;
        this.fishBitmap = fishBitmap;
        //this.anchorOffsetX = fishBitmap.width/2;
        this.addChild(fishBitmap);
        
    }

    // 泡泡鱼运动
    public render() {
        const sx = Math.sin(this.counter * 0.4) * 0.04 + this.size;
        const sy = Math.sin(Math.PI + this.counter * 0.4) * 0.04 + this.size;
        this.x = this.posX;
        this.y = this.posY;
        this.scaleX = sx;
        this.scaleY = sy;
    }

    public update() {
        this.velY += this.gravity;

        this.posX += this.velX;
        this.posY += this.velY;
        this.posZ += this.velZ;

        this.counter++;
        this.rotate(2);
    }
    
    // 泡泡鱼旋转效果
    private rotate(angle:number, useRadians?:boolean) {
        const cosRY = Math.cos(angle * (useRadians ? 1 : this.TO_RADIANS));
        const sinRY = Math.sin(angle * (useRadians ? 1 : this.TO_RADIANS));
        const HALFWIDTH = this.stage.stageWidth/2;
        let tempx = this.posX-HALFWIDTH;
        this.posX = (tempx*cosRY)-(this.posZ*sinRY)+HALFWIDTH;
        this.posZ = (tempx*sinRY)+(this.posZ*cosRY);

        tempx = this.velX;
        this.velX = (tempx*cosRY)-(this.velZ*sinRY);
        this.velZ = (tempx*sinRY)+(this.velZ*cosRY);
    }

}

