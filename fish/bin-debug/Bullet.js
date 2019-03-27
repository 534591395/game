/**
 * 子弹类，泡泡鱼
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
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(texture, textureName) {
        var _this = _super.call(this, texture) || this;
        _this.textureName = textureName;
        return _this;
    }
    // 生成子弹
    Bullet.make = function (textureName) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        var dict = this.cachePool[textureName];
        var bullet;
        if (dict.length) {
            // 从回收池里拿一个子弹
            bullet = dict.pop();
        }
        else {
            bullet = new Bullet(RES.getRes(textureName), textureName);
        }
        return bullet;
    };
    // 回收子弹
    Bullet.reclaim = function (bullet, textureName) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        var dict = this.cachePool[textureName];
        if (dict.indexOf(bullet) === -1) {
            dict.push(bullet);
        }
    };
    Bullet.cachePool = {};
    return Bullet;
}(egret.Bitmap));
__reflect(Bullet.prototype, "Bullet");
