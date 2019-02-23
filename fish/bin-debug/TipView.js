/**
 * 游戏开始按钮
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
var TipView = (function (_super) {
    __extends(TipView, _super);
    function TipView() {
        var _this = _super.call(this) || this;
        _this.isClick = false;
        _this.skinName = "resource/skins/tip.exml";
        _this.text.textAlign = "center";
        _this.text.textColor = 0xFFFFFF;
        _this.text.size = 24;
        _this.text.y = 100;
        _this.init();
        return _this;
    }
    TipView.prototype.init = function () {
        var _this = this;
        var customEvent = new CustomHandleEvent(CustomHandleEvent.CompleteAnimation);
        var returnLevelEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);
        // 点击按钮触发按钮动画效果
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.start.play(0);
        }, this);
        this.start.addEventListener('complete', function () {
            _this.dispatchEvent(customEvent);
        }, this);
        // 点击返回关卡列表
        this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.returnLevel.play(0);
        }, this);
        this.returnLevel.addEventListener('complete', function () {
            _this.dispatchEvent(returnLevelEvent);
        }, this);
    };
    TipView.prototype.setText = function (text) {
        this.text.text = text;
    };
    return TipView;
}(eui.Component));
__reflect(TipView.prototype, "TipView");
