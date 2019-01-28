/**
 * 游戏关卡类  visible
 */

class Level extends eui.Component {
   // 未锁住的
   private level_unlock: eui.Group;
   // 锁住的
   private level_lock: eui.Group;
   // level img
   private level_id: eui.Image;
   // 未锁住的关卡按钮动画
   private level: egret.tween.TweenItem;
   // 锁住的关卡按钮动画
   private lock: egret.tween.TweenItem;
   // 当前关卡是否锁住
   private isLock: boolean = true;
   // 当前关卡等级
   private number: number;


    constructor(isLock: boolean, number: number) {
        super();
        this.skinName = "resource/skins/level.exml";
        this.isLock = isLock;
        this.number = number;
        this.init();
    }

    private init() {
        if (this.isLock) {
            this.level_lock.visible = true;
            this.level_unlock.visible = false;
        } else {
            this.level_unlock.visible = true;
            this.level_lock.visible = false;
        }
        console.log(this.level_unlock)
        this.animateEvent();
    }

    private animateEvent() {
       this.level_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.level.play(0);
       }, this);
       this.level_unlock.addEventListener('complete', () => {
          
       }, this);

       this.level_lock.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.lock.play(0);
       }, this);
    }
}