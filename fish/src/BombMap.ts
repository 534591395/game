// 炸弹地图

class BombMap extends egret.DisplayObjectContainer {
	// 地图
	public map;

	public constructor(bomb) {
		super();
		this.map = bomb;
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage() {
		console.log('BombMap success');
		const childrens = this.map._childrens || [];

        childrens.map( (item, i) => {
            let k = i+1;
            // let bompImg = this.createBitmapByName("bomp_"+ k +"_png");
        
            const attributes = item.attributes;
            
			const bomb = new Bomb();
 			bomb.x = attributes.x;
            bomb.y = attributes.y - 40;
            
			// console.log(bomb)
			this.addChild(bomb);
        });
	}
	private createBitmapByName(name: string) {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		result.name = name;
		return result;
	}
}