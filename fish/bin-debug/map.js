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
        //当前触摸状态，按下时，值为true
        _this.touchStatus = false;
        //鼠标点击时，鼠标全局坐标与_bird的位置差    http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop
        _this.distance = new egret.Point();
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
            var tmxTileMap = new tiled.TMXTilemap(800, 480, data, url);
            tmxTileMap.render();
            self.addChild(tmxTileMap);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            self.setEnemyMap(tmxTileMap);
            // 泡泡鱼
            self.setFish();
            // tmxTileMap.touchEnabled = true;
            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, self.move, self);
        }, url);
    };
    // 炸弹
    Map.prototype.bomb = function (bomb) {
        this.bombMap = new BombMap(bomb);
        this.addChild(this.bombMap);
    };
    // 鲨鱼地图
    Map.prototype.setEnemyMap = function (tmxTileMap) {
        this.enemyMap = new EnemyMap(tmxTileMap);
        this.addChild(this.enemyMap);
    };
    // 泡泡鱼
    Map.prototype.setFish = function () {
        // 泡泡鱼（纹理）种类：orangefish01 ,..., orangefish04
        var fishBitmap = this.createBitmapByName('orangefish01_png');
        // 实例一个泡泡鱼
        this.fish = new Fish(0, 0, 0, fishBitmap);
        this.fish.scaleX = 0.5;
        this.fish.scaleY = 0.5;
        this.fish.touchEnabled = true;
        this.fish.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.fish.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.addChild(this.fish);
    };
    Map.prototype.down = function (evt) {
        this.touchStatus = true;
        this.distance.x = evt.stageX - this.fish.x;
        this.distance.y = evt.stageY - this.fish.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
    };
    Map.prototype.up = function (evt) {
        this.touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
    };
    Map.prototype.move = function (evt) {
        if (this.touchStatus) {
            this.fish.x = evt.stageX - this.distance.x;
            this.fish.y = evt.stageY - this.distance.y;
            this.enemyMap.setTarget(this.fish.x, this.fish.y);
        }
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
