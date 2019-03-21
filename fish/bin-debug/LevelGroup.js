/**
 * 关卡网格，默认解锁第一个关卡
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
var LevelGroup = (function (_super) {
    __extends(LevelGroup, _super);
    function LevelGroup(levelNum, unlock) {
        if (levelNum === void 0) { levelNum = 9; }
        if (unlock === void 0) { unlock = [1]; }
        var _this = _super.call(this) || this;
        // 关卡集合
        _this.levels = [];
        // 关卡数量
        _this.levelNum = 9;
        // 已解锁的关卡
        _this.unlock = [1];
        // 一行排版3个
        _this.rowNum = 3;
        _this.levelNum = levelNum;
        _this.unlock = unlock;
        _this.myGroup = new eui.Group();
        _this.game = new Game();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.render, _this);
        // 监听返回关卡列表
        _this.game.addEventListener(CustomHandleEvent.ReturnLevel, _this.returnLevel, _this);
        // 监听关卡更新信息
        _this.game.addEventListener(CustomHandleEvent.UpdateLevel, _this.updateLevel, _this);
        return _this;
    }
    // 监听回调，更新通关信息
    LevelGroup.prototype.updateLevel = function (evt) {
        this.unlockLevel(evt.levelNum);
    };
    // 监听回调，点击返回关卡后，显示关卡
    LevelGroup.prototype.returnLevel = function () {
        this.addChild(this.myGroup);
        this.addChild(this.txt);
        this.removeChild(this.game);
    };
    LevelGroup.prototype.textField = function () {
        this.txt = new egret.TextField();
        this.txt.width = this.stage.stageWidth;
        this.txt.height = 200;
        this.txt.textAlign = "center";
        this.txt.textColor = 0xFFFFFF;
        this.txt.size = 40;
        this.txt.y = 0;
        this.txt.text = "关卡选择";
        this.addChild(this.txt);
    };
    LevelGroup.prototype.render = function () {
        this.textField();
        this.tLayout();
        // 设置每个关卡属性
        for (var i = 0; i < this.levelNum; i += 1) {
            var level_1 = void 0;
            var num = i + 1;
            if (this.unlock.indexOf(num) > -1) {
                level_1 = new Level(false, num);
                // 触发选择关卡自定义事件
                level_1.addEventListener(CustomHandleEvent.ChoiceLevel, this.gameStartHandle, this);
            }
            else {
                level_1 = new Level(true, num);
            }
            this.levels.push(level_1);
            this.myGroup.addChild(level_1);
        }
        this.addChild(this.myGroup);
    };
    // 设置网格布局
    LevelGroup.prototype.tLayout = function () {
        this.myGroup.width = this.stage.stageWidth;
        this.myGroup.height = 400;
        // 网格布局
        var tLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        // horizontalAlign 设置水平对齐方式， 居中
        tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = this.rowNum; /// 设置两列显示
        this.myGroup.layout = tLayout;
        this.myGroup.y = 80;
    };
    // 设置解锁的关卡
    LevelGroup.prototype.unlockLevel = function (unlockNumber) {
        var _this = this;
        if (this.unlock.indexOf(unlockNumber) === -1) {
            this.unlock.push(unlockNumber);
        }
        this.levels.map(function (level, i) {
            // 解锁
            if (_this.unlock.indexOf(i + 1) > -1) {
                // 之前未解锁的，才修改属性。
                if (level.isLock) {
                    level.isLock = false;
                    level.number = i + 1;
                    level.render();
                    // 触发选择关卡自定义事件
                    level.addEventListener(CustomHandleEvent.ChoiceLevel, _this.gameStartHandle, _this);
                }
            }
        });
    };
    // 监听回调，选择某个关卡
    LevelGroup.prototype.gameStartHandle = function (evt) {
        this.game.levelChange(evt.levelNum);
        this.removeChild(this.myGroup);
        this.removeChild(this.txt);
        this.addChild(this.game);
    };
    return LevelGroup;
}(egret.DisplayObjectContainer));
__reflect(LevelGroup.prototype, "LevelGroup");
