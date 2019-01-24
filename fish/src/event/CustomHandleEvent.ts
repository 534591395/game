/**
 * 定义自定义事件ClickEvent：按钮点击时，触发 ClickEvent
 */

class CustomHandleEvent extends egret.Event {
    // 触发游戏开始时调用该事件类型
    public static GameStart:string = '游戏开始';
    // 当点击按钮动画完成后，触发该事件
    public static CompleteAnimation:string = '按钮动画结束';
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
    }
}