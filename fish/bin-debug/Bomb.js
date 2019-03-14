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
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this) || this;
        _this.k = true;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Bomb.prototype.onAddToStage = function () {
        this.bompImg1 = this.createBitmapByName("bomp_1_png");
        this.bompImg2 = this.createBitmapByName("bomp_2_png");
        this.bompImg1.width = 40;
        this.bompImg2.width = 40;
        this.bompImg1.height = 40;
        this.bompImg2.height = 40;
        this.addChild(this.bompImg1);
        this.addChild(this.bompImg2);
        this.addBomb();
    };
    // 循环变图片
    Bomb.prototype.addBomb = function () {
        var _this = this;
        this.k = !this.k;
        setTimeout(function () {
            // self.removeChild(this.bompImg);
            if (_this.k) {
                _this.bompImg1.visible = false;
                _this.bompImg2.visible = true;
            }
            else {
                _this.bompImg1.visible = true;
                _this.bompImg2.visible = false;
            }
            _this.addBomb();
        }, 500);
    };
    Bomb.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    };
    return Bomb;
}(egret.DisplayObjectContainer));
__reflect(Bomb.prototype, "Bomb");
//# sourceMappingURL=Bomb.js.map