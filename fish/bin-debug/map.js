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
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Map.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var self = this;
        //var url: string = "https://wxgame.dreamrabbit.tech/game/resource/assets/cc.tmx";
        var url = "resource/assets/cc.tmx";
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var data = egret.XML.parse(event.target.data);
            var tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            // tmxTileMap.touchEnabled = true;
            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, self.move, self);
        }, url);
    };
    Map.prototype.bomb = function (bomb) {
        var _this = this;
        var childrens = bomb._childrens;
        childrens.map(function (item, i) {
            var k = i + 1;
            var bompImg = _this.createBitmapByName("bomp_" + k + "_png");
            var attributes = item.attributes;
            bompImg.x = attributes.x;
            bompImg.y = attributes.y;
            debugger;
            bompImg.width = attributes.width;
            bompImg.height = attributes.height;
            _this.addChild(bompImg);
        });
    };
    Map.prototype.move = function (event) {
        event.target.x -= 5;
        event.target.y -= 5;
    };
    Map.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    return Map;
}(egret.DisplayObjectContainer));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=map.js.map