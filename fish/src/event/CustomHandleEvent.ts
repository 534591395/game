/**
 * 定义自定义事件ClickEvent：按钮点击时，触发 ClickEvent， 关卡选择
 */

class CustomHandleEvent extends egret.Event {
    // 触发游戏开始时调用该事件类型
    public static GameStart:string = '游戏开始';
    // 当点击按钮动画完成后，触发该事件
    public static CompleteAnimation:string = '按钮动画结束';
    // 选择关卡
    public static ChoiceLevel:string = '选择关卡';
    // 选择关卡级别
    public levelNum:number = 1;
    // 返回关卡列表
    public static ReturnLevel:string = '返回关卡';
    public static ReturnLevelAnimation:string = '返回关卡';
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
    }
}