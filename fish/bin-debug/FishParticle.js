/**
 * 泡泡鱼粒子效果
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
var FishParticle = (function (_super) {
    __extends(FishParticle, _super);
    function FishParticle() {
        var _this = _super.call(this) || this;
        _this.xVel = 0;
        _this.yVel = 0;
        _this.size = 1;
        _this.enabled = true;
        _this.render();
        return _this;
    }
    FishParticle.prototype.render = function () {
        var fishParticleBitmap = this.createBitmapByName('orangeParticle_png');
        this.width = 32;
        this.height = 32;
        this.addChild(fishParticleBitmap);
    };
    FishParticle.prototype.update = function () {
        var drag = 0.84;
        this.xVel *= drag;
        this.yVel *= drag;
        this.x += this.xVel;
        this.y += this.yVel;
        this.size *= 0.9;
        this.scaleX = this.size;
        this.scaleY = this.size;
        if (this.size < 0.05) {
            this.enabled = false;
        }
        ;
    };
    FishParticle.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    return FishParticle;
}(egret.DisplayObjectContainer));
__reflect(FishParticle.prototype, "FishParticle");
