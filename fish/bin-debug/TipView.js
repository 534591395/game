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
        _this.init();
        return _this;
    }
    TipView.prototype.init = function () {
        var _this = this;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.start.play(0);
        }, this);
        this.start.addEventListener('complete', function () {
            //this.GameLayer.removeChild(this);
        }, this);
    };
    return TipView;
}(eui.Component));
__reflect(TipView.prototype, "TipView");
//# sourceMappingURL=TipView.js.map