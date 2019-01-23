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
var Btn = (function (_super) {
    __extends(Btn, _super);
    function Btn() {
        var _this = _super.call(this) || this;
        _this.render();
        return _this;
    }
    Btn.prototype.render = function () {
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill(0xff0000, 1);
        this.shp.graphics.drawRect(0, 0, 100, 200);
        this.shp.graphics.endFill();
        this.width = 100;
        this.height = 200;
        this.x = 0;
        this.y = 0;
        this.addChild(this.shp);
    };
    return Btn;
}(egret.DisplayObjectContainer));
__reflect(Btn.prototype, "Btn");
//# sourceMappingURL=Btn.js.map