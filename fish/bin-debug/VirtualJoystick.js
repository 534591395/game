/**
 * 虚拟摇杆
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
var VirtualJoystick = (function (_super) {
    __extends(VirtualJoystick, _super);
    function VirtualJoystick() {
        var _this = _super.call(this) || this;
        // 圆环半径
        _this.circleRadius = 0;
        // 小球半径
        _this.ballRadius = 0;
        // 中心点坐标
        _this.centerX = 0;
        _this.centerY = 0;
        //触摸移动，设置小球的位置
        _this.p1 = new egret.Point();
        _this.p2 = new egret.Point();
        _this.skinName = "resource/skins/VirtualJoystickSkin.exml";
        return _this;
    }
    VirtualJoystick.prototype.childrenCreated = function () {
        //获取圆环和小球半径
        this.circleRadius = this.circle.height / 2;
        this.ballRadius = this.ball.height / 2;
        //获取中心点
        this.centerX = this.circleRadius;
        this.centerY = this.circleRadius;
        //设置锚点
        this.anchorOffsetX = this.circleRadius;
        this.anchorOffsetY = this.circleRadius;
        //设置小球初始位置
        this.ball.x = this.centerX;
        this.ball.y = this.centerY;
    };
    VirtualJoystick.prototype.start = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    VirtualJoystick.prototype.stop = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    // 触摸开始
    VirtualJoystick.prototype.onTouchBegin = function (e) {
        // if(this.parent){
        // 	return;
        // }
        // 说明：当按下时，不停移动，若放开表示
        this.touchID = e.touchPointID;
        this.dispatchEvent(new egret.Event("vj_start"));
    };
    // 触摸结束
    VirtualJoystick.prototype.onTouchEnd = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        this.dispatchEvent(new egret.Event("vj_end"));
    };
    VirtualJoystick.prototype.onTouchMove = function (e) {
        if (this.touchID != e.touchPointID) {
            return;
        }
        //获取手指和虚拟摇杆的距离
        this.p1.x = this.x;
        this.p1.y = this.y;
        this.p2.x = e.stageX;
        this.p2.y = e.stageY;
        var dist = egret.Point.distance(this.p1, this.p2);
        var angle = Math.atan2(e.stageY - this.y, e.stageX - this.x);
        // 手指距离在圆环范围内
        if (dist <= (this.circleRadius - this.ballRadius)) {
            this.ball.x = this.centerX + e.stageX - this.x;
            this.ball.y = this.centerY + e.stageY - this.y;
            // 手指距离在圆环范围外
        }
        else {
            this.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
            this.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
        }
        this.dispatchEventWith("vj_move", false, angle);
    };
    return VirtualJoystick;
}(eui.Component));
__reflect(VirtualJoystick.prototype, "VirtualJoystick");
