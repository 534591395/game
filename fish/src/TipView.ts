/**
 * 游戏开始按钮
 */

class TipView extends eui.Component {
    private btn: eui.Image;
    private text: eui.Label;
    private LevelList: eui.Label;
    private start: egret.tween.TweenItem;
    private returnLevel: egret.tween.TweenItem;
    private isClick: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/tip.exml";
        this.text.textAlign = "center";
        this.text.textColor = 0xFFFFFF;
        this.text.size = 24;
        this.text.y = 100;
        this.init();
    }

    private init() {
       const customEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.CompleteAnimation);
       const returnLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);
       // 点击按钮触发按钮动画效果
       this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.start.play(0);
       }, this);
       this.start.addEventListener('complete', () => {
          this.dispatchEvent(customEvent);
       }, this);

       // 点击返回关卡列表
       this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.returnLevel.play(0);
       }, this);
       this.returnLevel.addEventListener('complete', () => {
          this.dispatchEvent(returnLevelEvent);
       }, this);

    }

    public setText(text:string) {
        this.text.text = text;
    }
    
}