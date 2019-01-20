/**
 * 背景图片平行视图滚动
 */

class BgMap extends egret.DisplayObjectContainer {
    private timeOnEnterFrame = 0;
    // 滚动速度
    private bgSpeed:number = 0.5;

    // 图片数量
    private rowCount:number;
    
    // 纹理本身的高度
    private textureHeight:number;

    // 图片引用
    private bmpParallaxBackArr:egret.Bitmap[];
    private bmpParallaxFrontArr:egret.Bitmap[];

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        const stageW = this.stage.stageWidth;
        const stageH = this.stage.stageHeight;
        this.textureHeight = stageH;
        this.rowCount = Math.ceil(stageH/this.textureHeight)+1;
        this.bmpParallaxBackArr = [];
        this.bmpParallaxFrontArr = [];
        for (let i:number = 0; i < this.rowCount; i += 1) {
            let parallaxBack = this.createBitmapByName("parallaxBack_jpg");
            parallaxBack.y = this.textureHeight * i - ( this.textureHeight * this.rowCount - stageH );
            parallaxBack.width = stageW;
            parallaxBack.height = stageH;
            this.bmpParallaxBackArr.push(parallaxBack);
            this.addChild(parallaxBack);
        }
        for (let i:number = 0; i < this.rowCount; i += 1) {
            let parallaxFront = this.createBitmapByName("parallaxFront_png");
            parallaxFront.y = this.textureHeight * i - ( this.textureHeight * this.rowCount - stageH );
            parallaxFront.width = stageW;
            parallaxFront.height = stageH;
            this.bmpParallaxFrontArr.push(parallaxFront);
            this.addChild(parallaxFront);
        }
        this.timeOnEnterFrame = egret.getTimer();
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }

    // 开始滚动
    public start() {
        this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this);
    }

    // 暂停滚动
    public pause() {
       this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this); 
    }

    // 逐帧运动
    private enterFrameHandler(event:egret.Event) {
        const now = egret.getTimer();
        const pass = now - this.timeOnEnterFrame;
        for (let i:number = 0; i < this.rowCount; i += 1) {
            let bmpParallaxFront:egret.Bitmap = this.bmpParallaxFrontArr[i];
            bmpParallaxFront.y += 2 * this.bgSpeed * pass;
            
            // 判断超出屏幕后，回到队首，这样来实现循环反复
            if (bmpParallaxFront.y > this.stage.stageHeight) {
                bmpParallaxFront.y = this.bmpParallaxFrontArr[0].y - this.textureHeight;
                this.bmpParallaxFrontArr.pop();
                this.bmpParallaxFrontArr.unshift(bmpParallaxFront);
            }


            let bmpParallaxBack:egret.Bitmap = this.bmpParallaxBackArr[i];
            bmpParallaxBack.y += this.bgSpeed * pass;
            
            // 判断超出屏幕后，回到队首，这样来实现循环反复
            if (bmpParallaxBack.y > this.stage.stageHeight) {
                bmpParallaxBack.y = this.bmpParallaxBackArr[0].y - this.textureHeight;
                this.bmpParallaxBackArr.pop();
                this.bmpParallaxBackArr.unshift(bmpParallaxBack);
            }
        }
        this.timeOnEnterFrame = now;
    }
}