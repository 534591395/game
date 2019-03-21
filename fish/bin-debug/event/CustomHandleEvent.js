/**
 * 定义自定义事件ClickEvent：按钮点击时，触发 ClickEvent， 关卡选择
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
var CustomHandleEvent = (function (_super) {
    __extends(CustomHandleEvent, _super);
    function CustomHandleEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        // 选择关卡级别（当只有手动选择关卡时，以及game类里发起更新通关才使用）
        _this.levelNum = 1;
        return _this;
    }
    // 触发游戏开始时调用该事件类型
    CustomHandleEvent.GameStart = '游戏开始';
    // 当点击按钮动画完成后，触发该事件
    CustomHandleEvent.CompleteAnimation = '按钮动画结束';
    // 选择关卡
    CustomHandleEvent.ChoiceLevel = '选择关卡';
    // 返回关卡列表
    CustomHandleEvent.ReturnLevel = '返回关卡';
    CustomHandleEvent.ReturnLevelAnimation = '返回关卡';
    // 点击进入游戏下一关
    CustomHandleEvent.NextLevel = '进入下一关';
    // 更新通关关卡信息
    CustomHandleEvent.UpdateLevel = '更新通关的关卡信息';
    return CustomHandleEvent;
}(egret.Event));
__reflect(CustomHandleEvent.prototype, "CustomHandleEvent");
