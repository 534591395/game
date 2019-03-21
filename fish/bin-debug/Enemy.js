/**
 * 敌人：鲨鱼
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
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.gravity = 0;
        // 移动加速度
        _this.velX = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Enemy.prototype.onAddToStage = function () {
        var fishBitmap = this.createBitmapByName("bomp_3_png");
        fishBitmap.width = 40;
        fishBitmap.height = 40;
        fishBitmap.rotation = 0;
        this.addChild(fishBitmap);
    };
    // 泡泡鱼运动
    Enemy.prototype.render = function () {
        this.x = this.posX;
    };
    Enemy.prototype.update = function () {
        this.velX += this.gravity;
        this.posX += this.velX;
    };
    Enemy.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    return Enemy;
}(egret.DisplayObjectContainer));
__reflect(Enemy.prototype, "Enemy");
