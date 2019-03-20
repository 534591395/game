/**
 * 敌人地图：鲨鱼，包含自动寻路、碰到泡泡鱼爆炸吃掉
 */

class EnemyMap extends egret.DisplayObjectContainer {
    // 鲨鱼右边出生地
    private map_enemy1:Object;
    // 鲨鱼左边出生地
    private map_enemy2:Object;
    // 地图矩形 0表示可通行，1表示不可通行
    private matrixs:number[][];
    // 格子地图
    private grid:any;
    //map
    public map;

    public constructor(tmxTileMap) {
        super();
        this.map = tmxTileMap;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        const fish = new Enemy();
        fish.x = 200;
        fish.y = 100;
        this.addChild(fish);
        
        this.matrixs = this.matrixMap();
        this.grid = new PF.Grid(this.matrixs[0].length, this.matrixs.length, this.matrixs);

        this.findPath(1,2,4,5);
    }

    

    private matrixMap() {
        const layerData = this.map.getChildByName('enemyLoad').layerData;
        let walkArr = [];
        let matrix = [];

        // 首先创建行
        for (let y = 0; y < layerData[0].length; y ++) {
            matrix.push([]);
        }

        // 列
        for (let x = 0; x < layerData.length; x++) {
           // 行
           for (let y = 0; y <layerData[x].length; y++) {
               let tump = matrix[y];
               // 若有值，表示可通行
               if (layerData[x][y]) {
                   tump.push(0);
               } else {
                   tump.push(1);
               }
           } 
        }
        
        return matrix;
    }

    private findPath(startX:number, startY:number, targetX:number, targetY:number) {
        //0代表可走，1代表不可走
        console.log('矩形',this.matrixs)
        let newPath:any = [];
        let gridBackup = this.grid.clone();
        const finder = new PF.AStarFinder();
        const path = finder.findPath(startX, startY, targetX, targetY, gridBackup);
        if (path.length) {
            // smoothenPath 平滑路径
            newPath = PF.Util.smoothenPath(gridBackup, path);
            console.log('路径',path, newPath);
        } else {
            console.log('未找到路径');
        }
        return newPath;
    }

    
}