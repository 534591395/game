/**
 * 游戏开始按钮
 */

class StartBtnView extends eui.Component {
    private btn: eui.Image;
    private start: egret.tween.TweenItem;
    private isClick: boolean = false;

    public  GameLayer: egret.DisplayObjectContainer;

    public constructor() {
        super();
        this.skinName = "resource/skins/startBtn.exml";
        this.init();
    }

    private init() {
       this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.start.play(0);
       }, this);
       this.start.addEventListener('complete', () => {
        //this.GameLayer.removeChild(this);
       }, this);
    }
    
}