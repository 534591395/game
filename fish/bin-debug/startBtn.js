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
var StartBtnView = (function (_super) {
    __extends(StartBtnView, _super);
    function StartBtnView() {
        var _this = _super.call(this) || this;
        _this.isClick = false;
        _this.skinName = "resource/skins/startBtn.exml";
        _this.init();
        return _this;
    }
    StartBtnView.prototype.init = function () {
        var _this = this;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.start.play(0);
        }, this);
        this.start.addEventListener('complete', function () {
            _this.GameLayer.removeChild(_this);
        }, this);
    };
    return StartBtnView;
}(eui.Component));
__reflect(StartBtnView.prototype, "StartBtnView");
//# sourceMappingURL=startBtn.js.map