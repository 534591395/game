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
        _this.render();
        return _this;
    }
    ScorePanel.prototype.render = function () {
        var g = this.graphics;
        g.beginFill(0x000000, 0.8);
        g.drawRect(0, 0, 400, 200);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.width = 410;
        this.txt.height = 250;
        this.txt.textAlign = "center";
        this.txt.textColor = 0xFFFFFF;
        this.txt.size = 24;
        this.txt.y = 60;
        this.addChild(this.txt);
    };
    ScorePanel.prototype.showScore = function (value) {
        var str = '';
        if (value < this.originNum) {
            str = '很遗憾，未达到目标！\n';
        }
        this.txt.text = "您的成绩是：" + value + "条\n\n" + str + "\n点击再来一次吧";
    };
    ScorePanel.prototype.showStart = function () {
        this.txt.text = "游戏开始后请刺破" + this.originNum + "条泡泡鱼\n\n点击开始";
    };
    return ScorePanel;
}(egret.Sprite));
__reflect(ScorePanel.prototype, "ScorePanel");
//# sourceMappingURL=ScorePanel.js.map