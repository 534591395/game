// 炸弹地图
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
var BombMap = (function (_super) {
    __extends(BombMap, _super);
    function BombMap(bomb) {
        var _this = _super.call(this) || this;
        _this.map = bomb;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    BombMap.prototype.onAddToStage = function () {
        var _this = this;
        console.log('BombMap success');
        var childrens = this.map._childrens || [];
        childrens.map(function (item, i) {
            var k = i + 1;
            // let bompImg = this.createBitmapByName("bomp_"+ k +"_png");
            var attributes = item.attributes;
            var bomb = new Bomb();
            bomb.x = attributes.x;
            bomb.y = attributes.y - 40;
            // console.log(bomb)
            _this.addChild(bomb);
        });
    };
    BombMap.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    return BombMap;
}(egret.DisplayObjectContainer));
__reflect(BombMap.prototype, "BombMap");
