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
        _this.speed = 15;
        // 泡泡鱼子弹
        _this.paopaoFishBullets = [];
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Map.prototype.onAddToStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.preCreatedBullet();
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
    // 触摸摇杆的角度改变，泡泡鱼的移动速度方向也随之改变
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
        // this.fish.x += this.speedX;
        // this.fish.y += this.speedY;
        // if (this.fish.x > (this.stage.stageWidth - this.fish.width/4)) {
        //     this.fish.x = this.stage.stageWidth - this.fish.width/4;
        // }
        // if (this.fish.x < 0) {
        //     this.fish.x = 0;
        // }
        // if (this.fish.y < 0) {
        //     this.fish.y = 0;
        // }
        // if (this.fish.y > (this.stage.stageHeight - this.fish.height/2)) {
        //     this.fish.y = this.stage.stageHeight - this.fish.height/2;
        // }
        this.paopaoFish.x += this.speedX;
        this.paopaoFish.y += this.speedY;
        if (this.paopaoFish.x > (this.stage.stageWidth - this.paopaoFish.width / 4)) {
            this.paopaoFish.x = this.stage.stageWidth - this.paopaoFish.width / 4;
        }
        if (this.paopaoFish.x < 0) {
            this.paopaoFish.x = 0;
        }
        if (this.paopaoFish.y < 0) {
            this.paopaoFish.y = 0;
        }
        if (this.paopaoFish.y > (this.stage.stageHeight - this.paopaoFish.height / 2)) {
            this.paopaoFish.y = this.stage.stageHeight - this.paopaoFish.height / 2;
        }
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
        this.fish.scaleX = 0.3;
        this.fish.scaleY = 0.3;
        this.fish.touchEnabled = true;
        this.fish.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.fish.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.addChild(this.fish);
        this.paopaoFish = new PaoPaoFish(RES.getRes('orangefish02_png'), 100);
        this.paopaoFish.x = this.stage.stageWidth / 2;
        this.paopaoFish.y = this.stage.stageHeight - this.paopaoFish.height / 2;
        this.paopaoFish.scaleX = 0.4;
        this.paopaoFish.scaleY = 0.4;
        this.paopaoFish.addEventListener("createBullet", this.createBulletHandler, this);
        this.addChild(this.paopaoFish);
        // 开火
        this.paopaoFish.fire();
        // 游戏画面更新
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
    };
    // 预先创建子弹，减少时间
    Map.prototype.preCreatedBullet = function () {
        var i = 0;
        var objArr = [];
        var bullet;
        for (i = 0; i < 20; i++) {
            bullet = Bullet.make("paopao_png");
            objArr.push(bullet);
        }
        for (i = 0; i < 20; i++) {
            bullet = objArr.pop();
            Bullet.reclaim(bullet, "paopao_png");
        }
    };
    // 创建子弹
    Map.prototype.createBulletHandler = function (e) {
        var bullet;
        if (e.target === this.paopaoFish) {
            for (var i = 0; i < 2; i++) {
                bullet = Bullet.make("paopao_png");
                bullet.x = i == 0 ? (this.paopaoFish.x + 5) : (this.paopaoFish.x + this.paopaoFish.width * 0.4 - 20);
                bullet.y = this.paopaoFish.y - 10;
                this.addChildAt(bullet, this.numChildren - 1);
                this.paopaoFishBullets.push(bullet);
            }
        }
    };
    // 游戏画面更新
    Map.prototype.gameViewUpdate = function (e) {
        //为了防止FPS下降造成回收慢，生成快，进而导致DRAW数量失控，需要计算一个系数，当FPS下降的时候，让运动速度加快
        var nowTime = egret.getTimer();
        var fps = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        var speedOffset = 60 / fps;
        //我的子弹运动
        var i = 0;
        var bullet;
        var papaoFishBulletsCount = this.paopaoFishBullets.length;
        for (; i < papaoFishBulletsCount; i++) {
            bullet = this.paopaoFishBullets[i];
            if (bullet.y < -bullet.height) {
                this.removeChild(bullet);
                Bullet.reclaim(bullet, "ball_png");
                this.paopaoFishBullets.splice(i, 1);
                i--;
                papaoFishBulletsCount--;
            }
            bullet.y -= 12 * speedOffset;
        }
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
