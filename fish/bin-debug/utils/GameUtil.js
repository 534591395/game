/**
 * 帮助类
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fighter;
(function (fighter) {
    var GameUtil = (function () {
        function GameUtil() {
        }
        // 基于矩形的碰撞检测
        GameUtil.prototype.hitTest = function (obj1, obj2) {
            // 获取边界
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        };
        return GameUtil;
    }());
    fighter.GameUtil = GameUtil;
    __reflect(GameUtil.prototype, "fighter.GameUtil");
    function createBitmapByName(name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
    fighter.createBitmapByName = createBitmapByName;
})(fighter || (fighter = {}));
