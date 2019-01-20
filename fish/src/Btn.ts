class Btn extends egret.DisplayObjectContainer {
    private shp:egret.Shape;

    constructor() {
        super();
        this.render();
    }

    render() {
        this.shp = new egret.Shape();
        this.shp.graphics.beginFill( 0xff0000, 1);
        this.shp.graphics.drawRect( 0, 0, 100, 200 );
        this.shp.graphics.endFill();
        this.width = 100;
        this.height = 200;
        this.x = 0;
        this.y = 0;
        this.addChild(this.shp);
    }
}