/**
 * 游戏关卡类  visible
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
var Level = (function (_super) {
    __extends(Level, _super);
    function Level(isLock, number) {
        var _this = _super.call(this) || this;
        // 当前关卡是否锁住
        _this.isLock = true;
        _this.skinName = "resource/skins/level.exml";
        _this.isLock = isLock;
        _this.number = number;
        _this.width = _this.level_lock.width;
        _this.height = _this.level_lock.height;
        _this.render();
        _this.animateEvent();
        return _this;
    }
    Level.prototype.render = function () {
        if (this.isLock) {
            this.level_lock.visible = true;
            this.level_unlock.visible = false;
        }
        else {
            this.level_unlock.visible = true;
            this.level_lock.visible = false;
            // 显示被解锁的关卡等级
            this.level_id.source = 'number_' + this.number + '_png';
        }
    };
    Level.prototype.animateEvent = function () {
        var _this = this;
        this.level_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.level.play(0);
        }, this);
        this.level.addEventListener('complete', function () {
            var customEvent = new CustomHandleEvent(CustomHandleEvent.ChoiceLevel);
            customEvent.levelNum = _this.number;
            _this.dispatchEvent(customEvent);
        }, this);
        this.level_lock.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.lock.play(0);
        }, this);
    };
    return Level;
}(eui.Component));
__reflect(Level.prototype, "Level");
