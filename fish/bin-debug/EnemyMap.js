/**
 * 敌人地图：鲨鱼，包含自动寻路、碰到泡泡鱼爆炸吃掉
 */
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
var EnemyMap = (function (_super) {
    __extends(EnemyMap, _super);
    function EnemyMap(tmxTileMap) {
        var _this = _super.call(this) || this;
        _this.map = tmxTileMap;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    EnemyMap.prototype.onAddToStage = function () {
        this.enemyFish = new Enemy();
        this.enemyFish.x = 1 * 40;
        this.enemyFish.y = 3 * 40;
        this.addChild(this.enemyFish);
        this.matrixs = this.matrixMap();
        this.grid = new PF.Grid(this.matrixs[0].length, this.matrixs.length, this.matrixs);
        this.siteMap();
    };
    EnemyMap.prototype.setTarget = function (targetX, targetY) {
        var fishW = Math.ceil(targetX / 40);
        var FishH = Math.ceil(targetY / 40);
        var enemyFishW = Math.ceil(this.enemyFish.x / 40);
        var enemyFishY = Math.ceil(this.enemyFish.y / 40);
        var pathArr = this.findPath(enemyFishW, enemyFishY, fishW, FishH) || [];
        this.animation(pathArr);
    };
    // 设置出身地和目的地
    EnemyMap.prototype.siteMap = function () {
    };
    // 动画
    EnemyMap.prototype.animation = function (pathArr) {
        var _this = this;
        var isFinish = false;
        var tw = egret.Tween.get(this.enemyFish);
        var length = pathArr.length;
        var i = 1;
        var callback = function () {
            tw.to({ x: pathArr[i][0] * 40, y: pathArr[i][1] * 40 }, 500, egret.Ease.quartInOut).call(function () {
                i++;
                if (i >= length) {
                    _this.checked();
                }
                else {
                    callback();
                }
            });
        };
        if (i < length) {
            callback();
        }
    };
    // 检测是否跟fish碰撞
    EnemyMap.prototype.checked = function () {
    };
    EnemyMap.prototype.matrixMap = function () {
        var layerData = this.map.getChildByName('enemyLoad').layerData;
        var walkArr = [];
        var matrix = [];
        // 首先创建行
        for (var y = 0; y < layerData[0].length; y++) {
            matrix.push([]);
        }
        // 列
        for (var x = 0; x < layerData.length; x++) {
            // 行
            for (var y = 0; y < layerData[x].length; y++) {
                var tump = matrix[y];
                // 若有值，表示可通行
                if (layerData[x][y]) {
                    tump.push(0);
                }
                else {
                    tump.push(1);
                }
            }
        }
        return matrix;
    };
    EnemyMap.prototype.findPath = function (startX, startY, targetX, targetY) {
        //0代表可走，1代表不可走
        //console.log('矩形',this.matrixs)
        var newPath = [];
        var gridBackup = this.grid.clone();
        var finder = new PF.AStarFinder();
        var path = finder.findPath(startX, startY, targetX, targetY, gridBackup);
        if (path.length) {
            // smoothenPath 平滑路径
            newPath = PF.Util.smoothenPath(gridBackup, path);
            //console.log('路径',path, newPath);
        }
        else {
            //console.log('未找到路径');
        }
        return newPath;
    };
    return EnemyMap;
}(egret.DisplayObjectContainer));
__reflect(EnemyMap.prototype, "EnemyMap");
