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
   public isLock: boolean = true;
   // 当前关卡等级
   public number: number;
   // 当前关卡的宽度
   public width: number;
   public height: number;


    constructor(isLock: boolean, number: number) {
        super();
        this.skinName = "resource/skins/level.exml";
        this.isLock = isLock;
        this.number = number;
        this.width = this.level_lock.width;
        this.height = this.level_lock.height;
        this.render();
        this.animateEvent();
    }

    public render() {
        if (this.isLock) {
            this.level_lock.visible = true;
            this.level_unlock.visible = false;   
        } else {
            this.level_unlock.visible = true;
            this.level_lock.visible = false;
            // 显示被解锁的关卡等级
            this.level_id.source = 'number_'+ this.number +'_png';
        }
    }

    private animateEvent() {
       const customEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.ChoiceLevel);
       this.level_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.level.play(0);
       }, this);
       this.level.addEventListener('complete', () => {
          customEvent.levelNum = this.number;
          this.dispatchEvent(customEvent);
       }, this);

       this.level_lock.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
           this.lock.play(0);
       }, this);
    }
}