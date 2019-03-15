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
    }

    private findPath() {
        var matrix = [     
            [0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1],
            [0, 0, 1, 0, 0]
        ];
        var grid = new PF.Grid(5, 3, matrix);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(1, 2, 4, 2, grid);
        var newPath = PF.Util.smoothenPath(grid, path);
        console.log(newPath);
    }

    
}