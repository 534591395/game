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
        var url = "https://wxgame.dreamrabbit.tech/game/resource/assets/cc.tmx";
        //var url: string = "resource/assets/cc.tmx";
        var urlLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event) {
            var data = egret.XML.parse(event.target.data);
            var tmxTileMap = new tiled.TMXTilemap(2000, 2000, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
            // var bomb = tmxTileMap.getChildByName('bomb');
            // self.bomb(bomb);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            self.enemy(tmxTileMap.getChildByName('enemy'));
            // tmxTileMap.touchEnabled = true;
            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, self.move, self);
            var matrix = [
                [0, 0, 0, 1, 0],
                [1, 0, 0, 0, 1],
                [0, 0, 1, 0, 0]
            ];
            var grid = new PF.Grid(5, 3, matrix);
        }, url);
    };
    // 炸弹
    Map.prototype.bomb = function (bomb) {
        this.bombMap = new BombMap(bomb);
        this.addChild(this.bombMap);
    };
    // 鲨鱼
    Map.prototype.enemy = function (enemy) {
        this.enemyMap = new EnemyMap(enemy);
        this.addChild(this.enemyMap);
    };
    // 获取地图对象的自定义属性
    Map.prototype.getProperties = function (children, name) {
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