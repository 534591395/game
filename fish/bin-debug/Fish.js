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
/**
 * 泡泡鱼
 */
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(posx, posy, posz, fishBitmap) {
        var _this = _super.call(this) || this;
        // 重力加速度
        _this.gravity = 0;
        _this.velX = 0;
        _this.velY = 0;
        _this.velZ = 0;
        _this.counter = 0;
        _this.TO_RADIANS = Math.PI / 180;
        _this.size = 1;
        // 该泡泡鱼是否被回收（是否可用）
        _this.enabled = true;
        _this.posX = posx;
        _this.posY = posy;
        _this.posZ = posz;
        _this.fishBitmap = fishBitmap;
        //this.anchorOffsetX = fishBitmap.width/2;
        _this.addChild(fishBitmap);
        return _this;
    }
    // 泡泡鱼运动
    Fish.prototype.render = function () {
        var sx = Math.sin(this.counter * 0.4) * 0.04 + this.size;
        var sy = Math.sin(Math.PI + this.counter * 0.4) * 0.04 + this.size;
        this.x = this.posX;
        this.y = this.posY;
        this.scaleX = sx;
        this.scaleY = sy;
    };
    Fish.prototype.update = function () {
        this.velY += this.gravity;
        this.posX += this.velX;
        this.posY += this.velY;
        this.posZ += this.velZ;
        this.counter++;
        this.rotate(2);
    };
    // 泡泡鱼旋转效果
    Fish.prototype.rotate = function (angle, useRadians) {
        var cosRY = Math.cos(angle * (useRadians ? 1 : this.TO_RADIANS));
        var sinRY = Math.sin(angle * (useRadians ? 1 : this.TO_RADIANS));
        var HALFWIDTH = this.stage.stageWidth / 2;
        var tempx = this.posX - HALFWIDTH;
        this.posX = (tempx * cosRY) - (this.posZ * sinRY) + HALFWIDTH;
        this.posZ = (tempx * sinRY) + (this.posZ * cosRY);
        tempx = this.velX;
        this.velX = (tempx * cosRY) - (this.velZ * sinRY);
        this.velZ = (tempx * sinRY) + (this.velZ * cosRY);
    };
    return Fish;
}(egret.DisplayObjectContainer));
__reflect(Fish.prototype, "Fish");
