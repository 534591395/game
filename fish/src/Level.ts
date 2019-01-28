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


    constructor() {
        super();
        this.skinName = "resource/skins/level.exml";
        this.init();
    }

    private init() {
        
    }
}