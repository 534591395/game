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
var PaoPaoYun = (function (_super) {
    __extends(PaoPaoYun, _super);
    function PaoPaoYun(tmxTileMap) {
        var _this = _super.call(this) || this;
        _this.tmxTileMap = tmxTileMap;
        _this.paopaoyun();
        return _this;
    }
    PaoPaoYun.prototype.paopaoyun = function () {
        var _this = this;
        var texture = RES.getRes("paopaoParticle_png");
        var config = RES.getRes("paopaoyun_json");
        this.particleSys = new particle.GravityParticleSystem(texture, config);
        console.log(this.particleSys);
        var paopaoyunMap = this.tmxTileMap.getChildByName('paopaoyun');
        var childrens = paopaoyunMap._childrens || [];
        childrens.map(function (item, i) {
            if (i == 0) {
                var attributes = item.attributes;
                _this.particleSys.x = 0;
                _this.particleSys.y = attributes.y - _this.particleSys.emitterY - 20; //attributes.y - this.particleSys.emitterY
                _this.addChild(_this.particleSys);
            }
        });
    };
    PaoPaoYun.prototype.start = function () {
        this.particleSys.start();
    };
    PaoPaoYun.prototype.stop = function () {
        this.particleSys.stop();
    };
    return PaoPaoYun;
}(egret.DisplayObjectContainer));
__reflect(PaoPaoYun.prototype, "PaoPaoYun");
