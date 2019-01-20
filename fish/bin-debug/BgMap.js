/**
 * 背景图片平行视图滚动
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
var BgMap = (function (_super) {
    __extends(BgMap, _super);
    function BgMap() {
        var _this = _super.call(this) || this;
        _this.timeOnEnterFrame = 0;
        // 滚动速度
        _this.bgSpeed = 0.5;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BgMap.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.textureHeight = stageH;
        this.rowCount = Math.ceil(stageH / this.textureHeight) + 1;
        this.bmpParallaxBackArr = [];
        this.bmpParallaxFrontArr = [];
        for (var i = 0; i < this.rowCount; i += 1) {
            var parallaxBack = this.createBitmapByName("parallaxBack_jpg");
            parallaxBack.y = this.textureHeight * i - (this.textureHeight * this.rowCount - stageH);
            parallaxBack.width = stageW;
            parallaxBack.height = stageH;
            this.bmpParallaxBackArr.push(parallaxBack);
            this.addChild(parallaxBack);
        }
        for (var i = 0; i < this.rowCount; i += 1) {
            var parallaxFront = this.createBitmapByName("parallaxFront_png");
            parallaxFront.y = this.textureHeight * i - (this.textureHeight * this.rowCount - stageH);
            parallaxFront.width = stageW;
            parallaxFront.height = stageH;
            this.bmpParallaxFrontArr.push(parallaxFront);
            this.addChild(parallaxFront);
        }
        this.timeOnEnterFrame = egret.getTimer();
    };
    BgMap.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    // 开始滚动
    BgMap.prototype.start = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    // 暂停滚动
    BgMap.prototype.pause = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    // 逐帧运动
    BgMap.prototype.enterFrameHandler = function (event) {
        var now = egret.getTimer();
        var pass = now - this.timeOnEnterFrame;
        for (var i = 0; i < this.rowCount; i += 1) {
            var bmpParallaxFront = this.bmpParallaxFrontArr[i];
            bmpParallaxFront.y += 2 * this.bgSpeed * pass;
            // 判断超出屏幕后，回到队首，这样来实现循环反复
            if (bmpParallaxFront.y > this.stage.stageHeight) {
                bmpParallaxFront.y = this.bmpParallaxFrontArr[0].y - this.textureHeight;
                this.bmpParallaxFrontArr.pop();
                this.bmpParallaxFrontArr.unshift(bmpParallaxFront);
            }
            var bmpParallaxBack = this.bmpParallaxBackArr[i];
            bmpParallaxBack.y += this.bgSpeed * pass;
            // 判断超出屏幕后，回到队首，这样来实现循环反复
            if (bmpParallaxBack.y > this.stage.stageHeight) {
                bmpParallaxBack.y = this.bmpParallaxBackArr[0].y - this.textureHeight;
                this.bmpParallaxBackArr.pop();
                this.bmpParallaxBackArr.unshift(bmpParallaxBack);
            }
        }
        this.timeOnEnterFrame = now;
    };
    return BgMap;
}(egret.DisplayObjectContainer));
__reflect(BgMap.prototype, "BgMap");
//# sourceMappingURL=BgMap.js.map