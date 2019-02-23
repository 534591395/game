/**
 * 显示成绩
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
var ScorePanel = (function (_super) {
    __extends(ScorePanel, _super);
    function ScorePanel() {
        var _this = _super.call(this) || this;
        _this.originNum = 30;
        // 当前关卡是否达到预期分数
        _this.win = false;
        _this.render();
        return _this;
    }
    ScorePanel.prototype.render = function () {
        this.defautUI();
        this.winUI();
    };
    // 开始以及失败操作UI
    ScorePanel.prototype.defautUI = function () {
        this.tipView = new TipView();
        this.gameStartEvent = new CustomHandleEvent(CustomHandleEvent.GameStart);
        // 监听开始按钮动画
        this.tipView.addEventListener(CustomHandleEvent.CompleteAnimation, this.gameStartHandle, this);
        // 监听返回关卡列表
        this.tipView.addEventListener(CustomHandleEvent.ReturnLevelAnimation, this.returnLevel, this);
    };
    // 推送返回关卡列表消息 
    ScorePanel.prototype.returnLevel = function () {
        var returnLevelEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevel);
        this.dispatchEvent(returnLevelEvent);
    };
    // 发起更新通关信息
    ScorePanel.prototype.updateLevel = function () {
        var updateLevelEvent = new CustomHandleEvent(CustomHandleEvent.UpdateLevel);
        this.dispatchEvent(updateLevelEvent);
    };
    // 设置当前关卡目标（分数）
    ScorePanel.prototype.setOriginNum = function (originNum) {
        if (originNum === void 0) { originNum = 30; }
        this.originNum = originNum;
    };
    // 显示通关结果
    ScorePanel.prototype.showScore = function (value) {
        var str = '';
        if (value < this.originNum) {
            str = '很遗憾，未达到目标！\n';
            this.win = false;
        }
        else {
            this.win = true;
        }
        // 通关显示通关UI
        if (this.win) {
            // 更新通关关卡信息
            this.updateLevel();
            this.nextUI.enterAnimation();
            this.addChild(this.nextUI);
            try {
                this.removeChild(this.tipView);
            }
            catch (error) { }
        }
        else {
            try {
                this.removeChild(this.nextUI);
            }
            catch (error) { }
            this.addChild(this.tipView);
            this.tipView.setText("您的成绩是：" + value + "条\n\n" + str + "\n点击开始再来一次吧");
        }
    };
    // 每次关卡开始后显示的游戏开始文案
    ScorePanel.prototype.showStart = function () {
        this.win = false;
        this.tipView.setText("游戏开始后请滑破" + this.originNum + "条泡泡鱼\n\n点击开始吧");
        try {
            this.removeChild(this.nextUI);
            this.removeChild(this.tipView);
        }
        catch (error) { }
        this.addChild(this.tipView);
    };
    // 推送游戏开始事件
    ScorePanel.prototype.gameStartHandle = function () {
        this.dispatchEvent(this.gameStartEvent);
    };
    // 胜利通关UI
    ScorePanel.prototype.winUI = function () {
        this.nextUI = new Win();
        // 监听点击下一关按钮
        this.nextUI.addEventListener(CustomHandleEvent.NextLevel, this.nextLevel, this);
        // 监听返回关卡列表
        this.nextUI.addEventListener(CustomHandleEvent.ReturnLevelAnimation, this.returnLevel, this);
    };
    // 监听回调，下一关
    ScorePanel.prototype.nextLevel = function () {
        var nextLevelEvent = new CustomHandleEvent(CustomHandleEvent.NextLevel);
        this.dispatchEvent(nextLevelEvent);
    };
    return ScorePanel;
}(egret.Sprite));
__reflect(ScorePanel.prototype, "ScorePanel");
