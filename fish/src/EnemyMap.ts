/**
 * 敌人地图：鲨鱼，包含自动寻路、碰到泡泡鱼爆炸吃掉
 */

class EnemyMap extends egret.DisplayObjectContainer {
    // 鲨鱼右边目的地
    private map_enemy1:Object;
    // 鲨鱼左边出生地
    private map_enemy2:Object;
    // 地图矩形 0表示可通行，1表示不可通行
    private matrixs:number[][];
    // 格子地图
    private grid:any;
    // 敌人
    private enemyFish:Enemy;
    //map
    public map;

    public constructor(tmxTileMap) {
        super();
        this.map = tmxTileMap;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        this.enemyFish = new Enemy();
        this.enemyFish.x = 1*40;
        this.enemyFish.y = 3*40;
        this.addChild(this.enemyFish);
        
        this.matrixs = this.matrixMap();
        this.grid = new PF.Grid(this.matrixs[0].length, this.matrixs.length, this.matrixs);

        this.siteMap();
    }

    public setTarget(targetX, targetY) {
        const fishW = Math.ceil(targetX/40);
        const FishH = Math.ceil(targetY/40);

        const enemyFishW = Math.ceil(this.enemyFish.x/40);
        const enemyFishY = Math.ceil(this.enemyFish.y/40);

        const pathArr = this.findPath(enemyFishW,enemyFishY,fishW,FishH) || [];
        

        this.animation(pathArr);
    }

    // 设置出身地和目的地
    private siteMap() {

    }
    
    // 动画
    private animation(pathArr) {
        let isFinish = false;
        let tw = egret.Tween.get(this.enemyFish);
        let length = pathArr.length;
        let i = 1;
        let callback = () => {
            tw.to({x: pathArr[i][0]*40, y: pathArr[i][1]*40}, 500, egret.Ease.quartInOut).call(() => {
                i++;
                if (i >= length) {
                    this.checked();
                } else {
                    callback();
                }
            });
        }
        if ( i < length) {
            callback();
        }
    }

    // 检测是否跟fish碰撞
    private checked() {

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
        //console.log('矩形',this.matrixs)
        let newPath:any = [];
        let gridBackup = this.grid.clone();
        const finder = new PF.AStarFinder();
        const path = finder.findPath(startX, startY, targetX, targetY, gridBackup);
        if (path.length) {
            // smoothenPath 平滑路径
            newPath = PF.Util.smoothenPath(gridBackup, path);
            //console.log('路径',path, newPath);
        } else {
            //console.log('未找到路径');
        }
        return newPath;
    }

    
}