/**
 * 泡泡鱼粒子发送器
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
var FishEmitter = (function (_super) {
    __extends(FishEmitter, _super);
    function FishEmitter() {
        var _this = _super.call(this) || this;
        _this.particles = [];
        // 回收站的粒子
        _this.spareParticles = [];
        return _this;
    }
    FishEmitter.prototype.update = function () {
        for (var i = 0; i < this.particles.length; i++) {
            var particle_1 = this.particles[i];
            if (!particle_1.enabled)
                continue;
            particle_1.update();
            if (!particle_1.enabled)
                this.removeParticle(particle_1);
        }
    };
    FishEmitter.prototype.removeParticle = function (particle) {
        this.removeChild(particle);
        particle.enabled = false;
        this.spareParticles.push(particle);
    };
    FishEmitter.prototype.makeParticle = function () {
        var particle;
        if (this.spareParticles.length > 0) {
            particle = this.spareParticles.shift();
            this.addChild(particle);
        }
        else {
            particle = new FishParticle();
            this.particles.push(particle);
            this.addChild(particle);
        }
        particle.enabled = true;
        return particle;
    };
    // 爆炸效果
    FishEmitter.prototype.makeExplosion = function (xpos, ypos) {
        for (var i = 0; i < 30; i++) {
            var particle_2 = this.makeParticle();
            particle_2.x = xpos;
            particle_2.y = ypos;
            particle_2.xVel = Math.random() - 0.5;
            particle_2.yVel = Math.random() - 0.5;
            particle_2.zVel = Math.random() - 0.5;
            var speed = Math.sqrt((particle_2.xVel * particle_2.xVel) + (particle_2.yVel * particle_2.yVel) + (particle_2.zVel * particle_2.zVel));
            particle_2.xVel *= 40 / speed;
            particle_2.yVel *= 40 / speed;
            particle_2.zVel *= 40 / speed;
            particle_2.size = 1.5;
            particle_2.update();
        }
    };
    // 清除所有界面上的粒子
    FishEmitter.prototype.clearAll = function () {
        var _this = this;
        this.particles.map(function (particle) {
            if (particle.enabled) {
                _this.removeParticle(particle);
            }
        });
    };
    return FishEmitter;
}(egret.DisplayObjectContainer));
__reflect(FishEmitter.prototype, "FishEmitter");
