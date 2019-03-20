/**
 * 敌人地图：鲨鱼，包含自动寻路、碰到泡泡鱼爆炸吃掉
 */

class EnemyMap extends egret.DisplayObjectContainer {
    // 鲨鱼右边出生地
    private map_enemy1:Object;
    // 鲨鱼左边出生地
    private map_enemy2:Object;
    //map
    public map;

    public constructor(map) {
        super();
        this.map = map;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage() {
        const fish = new Enemy();
        fish.x = 200;
        fish.y = 100;
        this.addChild(fish);
        this.findPath();
        
        const walkArr = ['01','30','41','22'];
        this.matrixMap(walkArr);
    }

    private matrixMap(walkArr) {
        let matrix = [];
        
        for (let h = 0; h < 3; h++) {
            let tump = [];
            for(let w = 0; w < 5; w ++) {
            if (walkArr.indexOf(''+w+''+h)> -1) {
                tump.push(1);
            } else {
                tump.push(0); 
            }
            }
            matrix.push(tump);
        }
        
        return matrix;
    }

    private findPath() {
        //0代表可走，1代表不可走
        var matrix = [     
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 1, 0, 0]
        ];
        var grid = new PF.Grid(5, 3, matrix);
        var gridBackup = grid.clone();
        var finder = new PF.AStarFinder();
        var path = finder.findPath(1, 2, 4, 2, gridBackup);
        if (path.length) {
            //var newPath = PF.Util.smoothenPath(gridBackup, path);
            console.log(path);
        } else {
            console.log('未找到路径');
        }
    }

    
}