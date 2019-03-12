class Bomb extends egret.DisplayObjectContainer {
	private bompImg1;
	private bompImg2;
	private k:boolean = true;
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
  	private onAddToStage() {
		this.bompImg1 = this.createBitmapByName("bomp_1_png");
		this.bompImg2 = this.createBitmapByName("bomp_2_png");
		this.bompImg1.width = 40;
		this.bompImg2.width = 40;
		this.bompImg1.height = 40;
		this.bompImg2.height = 40;
		this.addChild(this.bompImg1);
		this.addChild(this.bompImg2);
        this.addBomb();
    }

	// 循环变图片
    private addBomb() {
            this.k = !this.k;
			
            setTimeout(() => {
                // self.removeChild(this.bompImg);
				if(this.k) {
					this.bompImg1.visible = false;
					this.bompImg2.visible = true;
				} else {
					this.bompImg1.visible = true;
					this.bompImg2.visible = false;
				}
                this.addBomb();
            }, 500);
    }
	private createBitmapByName(name: string) {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		result.name = name;
		return result;
	}
}