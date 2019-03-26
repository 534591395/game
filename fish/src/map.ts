class Map extends egret.DisplayObjectContainer {
    private enemyMap:EnemyMap;
    private bombMap:BombMap;
    private paopaoyun:PaoPaoYun;
    private fish:Fish;
    //当前触摸状态，按下时，值为true
    private touchStatus:boolean = false;
    //鼠标点击时，鼠标全局坐标与_bird的位置差    http://developer.egret.com/cn/example/egret2d/index.html#060-interact-drag-drop
    private distance:egret.Point = new egret.Point();
    // 虚拟摇杆
    private vj:VirtualJoystick;
    // 泡泡鱼移动速度
	private speedX = 0;         
	private speedY = 0;
	private speed = 10;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        var self = this;
        //var url: string = "https://wxgame.dreamrabbit.tech/game/resource/assets/cc.tmx";
        var url: string = "resource/assets/cc.tmx";
        var urlLoader:egret.URLLoader = new egret.URLLoader();
        urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        urlLoader.load(new egret.URLRequest(url));
        //load complete
        urlLoader.addEventListener(egret.Event.COMPLETE, function (event:egret.Event):void {

            
            
            var data:any = egret.XML.parse(event.target.data);
            
            var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(800, 480, data, url);
            
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
   
    }

    // 虚拟摇杆
    private setVJ() {
        this.vj = new VirtualJoystick();
        this.vj.x = this.vj.width/2;
        this.vj.y = this.stage.stageHeight - this.vj.height/2;
        this.addChild(this.vj);
		this.vj.start();
		this.vj.addEventListener("vj_start",this.onVJStart, this);
		this.vj.addEventListener("vj_move", this.onVJChange, this);
		this.vj.addEventListener("vj_end", this.onVJEnd, this);
    }
    
    // 摇杆启动，泡泡鱼开始根据摇杆移动
    private onVJStart() {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

	// 触摸摇杆的角度改变，泡泡鱼的移动速度方向也随之改变
	private onVJChange(e:egret.Event){
		const angle = e.data;
		this.speedX = Math.cos(angle)*this.speed;
		this.speedY = Math.sin(angle)*this.speed;
	}

	// 停止摇杆，泡泡鱼停止移动
	private onVJEnd(){
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	//每帧更新，泡泡鱼移动
	private onEnterFrame(){
        this.fish.x += this.speedX;
        this.fish.y += this.speedY;
        if (this.fish.x > (this.stage.stageWidth - this.fish.width/4)) {
            this.fish.x = this.stage.stageWidth - this.fish.width/4;
        }
        if (this.fish.x < 0) {
            this.fish.x = 0;
        }
        if (this.fish.y < 0) {
            this.fish.y = 0;
        }
        if (this.fish.y > (this.stage.stageHeight - this.fish.height/2)) {
            this.fish.y = this.stage.stageHeight - this.fish.height/2;
        }
	}
    
    // 水泡泡（从下往上）
    private paopao() {
        var texture = RES.getRes("paopaoParticle_png");
        var config = RES.getRes("paopaoParticle_json");
        var particleSys = new particle.GravityParticleSystem(texture,config);
        this.addChild(particleSys);
        particleSys.start();

        setTimeout(() => {
            particleSys.stop();
        }, 2000);
    }

    // 泡泡弹床
    private setPaopaoyun(tmxTileMap) {
        this.paopaoyun = new PaoPaoYun(tmxTileMap);
        this.addChild(this.paopaoyun);
        this.paopaoyun.start();
        let y = this.paopaoyun.y;

        let callback = () => {
            setTimeout(() => {
                egret.Tween.get(this.paopaoyun)
                .to({y: y-20}, 500, egret.Ease.quartInOut)
            }, 2000);
        };

        //callback();
    }


    // 炸弹
    private bomb(bomb) {
        this.bombMap = new BombMap(bomb);
        
        this.addChild(this.bombMap);
    }

    // 鲨鱼地图
    private setEnemyMap(tmxTileMap) {
        this.enemyMap = new EnemyMap(tmxTileMap);
        
        this.addChild(this.enemyMap);
    }

    // 泡泡鱼
    private setFish() {
        // 泡泡鱼（纹理）种类：orangefish01 ,..., orangefish04
        let fishBitmap:egret.Bitmap = this.createBitmapByName('orangefish01_png');
        // 实例一个泡泡鱼
        this.fish = new Fish(0,0,0, fishBitmap);
        this.fish.scaleX = 0.3;
        this.fish.scaleY = 0.3;
        this.fish.touchEnabled = true;
        this.fish.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
        this.fish.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        this.addChild(this.fish);
    }
    
    private down(evt:egret.TouchEvent) {
        this.touchStatus = true;
        this.distance.x = evt.stageX - this.fish.x;
        this.distance.y = evt.stageY - this.fish.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
    }

    private up(evt:egret.TouchEvent) {
        this.touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.move, this);
    }

    private move(evt:egret.TouchEvent) {
        if( this.touchStatus ) {
            this.fish.x = evt.stageX - this.distance.x;
            this.fish.y = evt.stageY - this.distance.y;
            this.enemyMap.setTarget(this.fish.x, this.fish.y);
        }
    }


    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
}