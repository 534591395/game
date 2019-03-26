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
        // 泡泡鱼移动速度
        _this.speedX = 0;
        _this.speedY = 0;
        _this.speed = 10;
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
            var tmxTileMap = new tiled.TMXTilemap(800, 480, data, url);
            tmxTileMap.render();
            //self.stage.stageHeight
            self.addChild(tmxTileMap);
            self.addChild(tmxTileMap);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);
            self.setEnemyMap(tmxTileMap);
            // 泡泡鱼
            self.setFish();
            self.paopao();
            self.setPaopaoyun(tmxTileMap);
            self.setVJ();
            // tmxTileMap.touchEnabled = true;
            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, self.move, self);
        }, url);
    };
    // 虚拟摇杆
    Map.prototype.setVJ = function () {
        this.vj = new VirtualJoystick();
        this.vj.x = this.vj.width / 2;
        this.vj.y = this.stage.stageHeight - this.vj.height / 2;
        this.addChild(this.vj);
        this.vj.start();
        this.vj.addEventListener("vj_start", this.onVJStart, this);
        this.vj.addEventListener("vj_move", this.onVJChange, this);
        this.vj.addEventListener("vj_end", this.onVJEnd, this);
    };
    // 摇杆启动，泡泡鱼开始根据摇杆移动
    Map.prototype.onVJStart = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    // 触摸摇杆的角度改变，人泡泡鱼的移动速度方向也随之改变
    Map.prototype.onVJChange = function (e) {
        var angle = e.data;
        this.speedX = Math.cos(angle) * this.speed;
        this.speedY = Math.sin(angle) * this.speed;
    };
    // 停止摇杆，泡泡鱼停止移动
    Map.prototype.onVJEnd = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    //每帧更新，泡泡鱼移动
    Map.prototype.onEnterFrame = function () {
        this.fish.x += this.speedX;
        this.fish.y += this.speedY;
    };
    // 水泡泡（从下往上）
    Map.prototype.paopao = function () {
        var texture = RES.getRes("paopaoParticle_png");
        var config = RES.getRes("paopaoParticle_json");
        var particleSys = new particle.GravityParticleSystem(texture, config);
        this.addChild(particleSys);
        particleSys.start();
        setTimeout(function () {
            particleSys.stop();
        }, 2000);
    };
    // 泡泡弹床
    Map.prototype.setPaopaoyun = function (tmxTileMap) {
        var _this = this;
        this.paopaoyun = new PaoPaoYun(tmxTileMap);
        this.addChild(this.paopaoyun);
        this.paopaoyun.start();
        var y = this.paopaoyun.y;
        var callback = function () {
            setTimeout(function () {
                egret.Tween.get(_this.paopaoyun)
                    .to({ y: y - 20 }, 500, egret.Ease.quartInOut);
            }, 2000);
        };
        //callback();
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
