/**
 * 通关关卡提示
 */

class Win extends eui.Component {
    private winTextAnimation: egret.tween.TweenItem;
    private nextAnimation: egret.tween.TweenItem;
    private nextShowAnimation: egret.tween.TweenItem;
    private returnLevel: egret.tween.TweenItem;
    private next: eui.Image;
    private LevelList: eui.Label;

    constructor() {
        super();
        this.skinName = "resource/skins/win.exml";
        this.init();
    }
    private init() {
        // 点击下一关
        this.next.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.nextAnimation.play(0);
       }, this);
       this.nextAnimation.addEventListener('complete', () => {
           const nextEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.NextLevel);
           this.dispatchEvent(nextEvent);
       }, this);

       // 点击返回关卡列表
       this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.returnLevel.play(0);
       }, this);
       this.returnLevel.addEventListener('complete', () => {
          const returnLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);
          this.dispatchEvent(returnLevelEvent);
       }, this);
    }

    public enterAnimation() {
        // 先文案动画播放，完毕后再按钮动画播放
        this.winTextAnimation.play(0);
        this.winTextAnimation.addEventListener('complete', () => {
            this.nextShowAnimation.play(0); 
        }, this);
    }
}