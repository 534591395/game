class Map extends egret.DisplayObjectContainer {
    private enemyMap:EnemyMap;
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
            
            var tmxTileMap:tiled.TMXTilemap = new tiled.TMXTilemap(2000, 2000, data, url);
            

            tmxTileMap.render();
            self.addChild(tmxTileMap);
            
            var bomb = tmxTileMap.getChildByName('bomb');
            self.bomb(bomb);

            self.enemy(tmxTileMap.getChildByName('enemy'));
            
            
            // tmxTileMap.touchEnabled = true;
            // tmxTileMap.addEventListener(egret.TouchEvent.TOUCH_TAP, self.move, self);
        }, url);
        
    }
    
    // 炸弹
    private bomb(bomb) {
        const childrens = bomb._childrens || [];
        childrens.map( (item, i) => {
            let k = i+1;
            let bompImg = this.createBitmapByName("bomp_"+ k +"_png");
      
            const attributes = item.attributes;
            bompImg.x = attributes.x;
            bompImg.y = attributes.y - 40;
            
            bompImg.width = 40;
            bompImg.height = 40;
            this.addChild(bompImg);
        });
    }

    // 鲨鱼
    private enemy(enemy) {
        this.enemyMap = new EnemyMap(enemy);
        
        this.addChild(this.enemyMap);
    }
    

    // 获取地图对象的自定义属性
    private getProperties(children,name:string) {

    }

    private move(event:egret.TouchEvent) {
        event.target.x -= 5;
        event.target.y -= 5;
    }

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
}