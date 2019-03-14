/**
 * 通关关卡提示
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
var Win = (function (_super) {
    __extends(Win, _super);
    function Win() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/win.exml";
        _this.init();
        return _this;
    }
    Win.prototype.init = function () {
        var _this = this;
        // 点击下一关
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.nextAnimation.play(0);
        }, this);
        this.nextAnimation.addEventListener('complete', function () {
            var nextEvent = new CustomHandleEvent(CustomHandleEvent.NextLevel);
            _this.dispatchEvent(nextEvent);
        }, this);
        // 点击返回关卡列表
        this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.returnLevel.play(0);
        }, this);
        this.returnLevel.addEventListener('complete', function () {
            var returnLevelEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);
            _this.dispatchEvent(returnLevelEvent);
        }, this);
    };
    Win.prototype.enterAnimation = function () {
        var _this = this;
        // 先文案动画播放，完毕后再按钮动画播放
        this.winTextAnimation.play(0);
        this.winTextAnimation.addEventListener('complete', function () {
            _this.nextShowAnimation.play(0);
        }, this);
    };
    return Win;
}(eui.Component));
__reflect(Win.prototype, "Win");
//# sourceMappingURL=Win.js.map