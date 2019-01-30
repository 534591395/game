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
    // 选择关卡级别（当只有手动选择关卡时，以及game类里发起更新通关才使用）
    public levelNum:number = 1;
    // 返回关卡列表
    public static ReturnLevel:string = '返回关卡';
    public static ReturnLevelAnimation:string = '返回关卡';
    // 点击进入游戏下一关
    public static NextLevel:string = '进入下一关';
    // 更新通关关卡信息
    public static UpdateLevel:string = '更新通关的关卡信息';
    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false) {
        super(type, bubbles, cancelable);
    }
}