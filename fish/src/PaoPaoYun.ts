
class PaoPaoYun extends egret.DisplayObjectContainer {
    private tmxTileMap;
    private particleSys;
    public constructor(tmxTileMap) {
        super();
        this.tmxTileMap = tmxTileMap;
        this.paopaoyun();
    }

    private paopaoyun() {
        const texture = RES.getRes("paopaoParticle_png");
        const config = RES.getRes("paopaoyun_json");
        this.particleSys = new particle.GravityParticleSystem(texture,config);
        console.log(this.particleSys)

        const paopaoyunMap = this.tmxTileMap.getChildByName('paopaoyun');
        const childrens = paopaoyunMap._childrens || [];        
        childrens.map( (item, i) => {
            if (i == 0) {
                const attributes = item.attributes;
                this.particleSys.x = 0;
                this.particleSys.y = attributes.y - this.particleSys.emitterY; //attributes.y - this.particleSys.emitterY
                this.addChild(this.particleSys);
            }
        });
    }

    public start() {
        this.particleSys.start();
    }

    public stop() {
        this.particleSys.stop();
    }
}