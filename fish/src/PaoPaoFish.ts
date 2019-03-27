/**
 * 泡泡鱼
 * TODO:  包含 敌人类型 --》 触发 投炸弹
 */

class PaoPaoFish extends egret.DisplayObjectContainer {
    // 回收池对象
    private cachePool:Object = {};
    // 泡泡鱼位图
    private bmp:egret.Bitmap;
    // 创建子弹的时间间隔
    private fireDelay:number;
    // 发射子弹的定时器
    private fireTimer:egret.Timer;
    // 泡泡鱼生命值
    private blood:number = 10;

    public constructor(texture:egret.Texture, fireDelay:number) {
        super();
        this.fireDelay = fireDelay;
        this.bmp = new egret.Bitmap(texture);
        this.addChild(this.bmp);
        this.fireTimer = new egret.Timer(this.fireDelay, 0);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }

    // 生成泡泡鱼
    public make(textureName:string, fireDelay:number) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        const dict:PaoPaoFish[] = this.cachePool[textureName];
        let fish:PaoPaoFish;
        if (dict.length) {
            // 从回收池里拿一条鱼
            fish = dict.pop();
        } else {
            fish = new PaoPaoFish(RES.getRes(textureName), fireDelay);
        }
        return fish;
    }

    // 回收泡泡鱼
    public reclaim(fish:PaoPaoFish, textureName:string) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        const dict:PaoPaoFish[] = this.cachePool[textureName];
        if (dict.indexOf(fish) === -1) {
            dict.push(fish);
        }
    }

    // 开火
    public fire() {
        this.fireTimer.start();
    }

    // 停火
    public stopFire(){
        this.fireTimer.stop();
    }

    // 创建子弹
    private createBullet() {
        this.dispatchEventWith("createBullet");
    }
}