/**
 * 泡泡鱼粒子发送器
 */

class FishEmitter extends egret.DisplayObjectContainer {
    private particles = [];
    // 回收站的粒子
    private spareParticles = [];

    public constructor() {
        super();
    }

    public update()  {
        for(let i=0; i<this.particles.length; i++){
            let particle = this.particles[i];
            if(!particle.enabled) continue;
            particle.update();
            if(!particle.enabled) this.removeParticle(particle);
        }
    }

    private removeParticle(particle) {
        this.removeChild(particle);
        particle.enabled = false;
        this.spareParticles.push(particle);
    }

    private makeParticle() {
        let particle;

        if(this.spareParticles.length>0){
            particle = this.spareParticles.shift();
            this.addChild(particle);

        } else {
            particle = new FishParticle();
            this.particles.push(particle);
            this.addChild(particle);
        }

        particle.enabled = true;

        return particle;
    }

    // 爆炸效果
    public makeExplosion(xpos, ypos) {
        for(let i=0; i<30; i++) {
            let particle = this.makeParticle();
            particle.x = xpos;
            particle.y = ypos;

            particle.xVel = Math.random() - 0.5;
            particle.yVel = Math.random() - 0.5;
            particle.zVel = Math.random() - 0.5;

            let speed = Math.sqrt((particle.xVel * particle.xVel)+(particle.yVel * particle.yVel)+(particle.zVel * particle.zVel));
            particle.xVel *= 40/speed;
            particle.yVel *= 40/speed;
            particle.zVel *= 40/speed;

            particle.size = 1.5;

            particle.update();

        }
    }

    // 清除所有界面上的粒子
    public clearAll() {
        this.particles.map( particle => {
            if(particle.enabled) {
                this.removeParticle(particle);
            }
        });
    }
}