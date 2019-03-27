/**
 * 泡泡鱼
 * TODO:  包含 敌人类型 --》 触发 投炸弹
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PaoPaoFish = (function (_super) {
    __extends(PaoPaoFish, _super);
    function PaoPaoFish(texture, fireDelay) {
        var _this = _super.call(this) || this;
        // 回收池对象
        _this.cachePool = {};
        // 泡泡鱼生命值
        _this.blood = 10;
        _this.fireDelay = fireDelay;
        _this.bmp = new egret.Bitmap(texture);
        _this.addChild(_this.bmp);
        _this.fireTimer = new egret.Timer(_this.fireDelay, 0);
        _this.fireTimer.addEventListener(egret.TimerEvent.TIMER, _this.createBullet, _this);
        return _this;
    }
    // 生成泡泡鱼
    PaoPaoFish.prototype.make = function (textureName, fireDelay) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        var dict = this.cachePool[textureName];
        var fish;
        if (dict.length) {
            // 从回收池里拿一条鱼
            fish = dict.pop();
        }
        else {
            fish = new PaoPaoFish(RES.getRes(textureName), fireDelay);
        }
        return fish;
    };
    // 回收泡泡鱼
    PaoPaoFish.prototype.reclaim = function (fish, textureName) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        var dict = this.cachePool[textureName];
        if (dict.indexOf(fish) === -1) {
            dict.push(fish);
        }
    };
    // 开火
    PaoPaoFish.prototype.fire = function () {
        this.fireTimer.start();
    };
    // 停火
    PaoPaoFish.prototype.stopFire = function () {
        this.fireTimer.stop();
    };
    // 创建子弹
    PaoPaoFish.prototype.createBullet = function () {
        this.dispatchEventWith("createBullet");
    };
    return PaoPaoFish;
}(egret.DisplayObjectContainer));
__reflect(PaoPaoFish.prototype, "PaoPaoFish");
