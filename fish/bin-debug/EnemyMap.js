/**
 * 敌人地图：鲨鱼，包含自动寻路、碰到泡泡鱼爆炸吃掉
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
var EnemyMap = (function (_super) {
    __extends(EnemyMap, _super);
    function EnemyMap(map) {
        var _this = _super.call(this) || this;
        _this.map = map;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    EnemyMap.prototype.onAddToStage = function () {
        var fish = new Enemy();
        fish.x = 200;
        fish.y = 100;
        this.addChild(fish);
    };
    return EnemyMap;
}(egret.DisplayObjectContainer));
__reflect(EnemyMap.prototype, "EnemyMap");
