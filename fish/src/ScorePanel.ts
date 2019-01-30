/**
 * 显示成绩
 */

class ScorePanel extends egret.Sprite {

    private originNum:number = 30;
    // 游戏开始以及失败提示操作界面
    private tipView: TipView;

    private gameStartEvent:CustomHandleEvent;
    
    // 当前关卡是否达到预期分数
    public win:boolean = false;

    //通关UI操作界面
    private nextUI:Win;

    public constructor() {
        super();
        this.render();
    }

    private render() {
        this.defautUI();
        this.winUI();  
    }

    // 开始以及失败操作UI
    private defautUI() {
        this.tipView = new TipView();
        this.gameStartEvent = new CustomHandleEvent(CustomHandleEvent.GameStart);
        // 监听开始按钮动画
        this.tipView.addEventListener(CustomHandleEvent.CompleteAnimation, this.gameStartHandle, this); 
        // 监听返回关卡列表
        this.tipView.addEventListener(CustomHandleEvent.ReturnLevelAnimation, this.returnLevel, this);  
    }
    // 推送返回关卡列表消息 
    private returnLevel() {
        const returnLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevel);
        this.dispatchEvent(returnLevelEvent);
    }
    // 发起更新通关信息
    private updateLevel() {
        const updateLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.UpdateLevel);
        this.dispatchEvent(updateLevelEvent);
    }
    // 设置当前关卡目标（分数）
    public setOriginNum(originNum:number = 30) {
        this.originNum = originNum;
    }
    // 显示通关结果
    public showScore(value:number) {
        let str = '';
        if (value < this.originNum) {
            str = '很遗憾，未达到目标！\n';
            this.win = false;
        } else {
            this.win = true;
        }
        // 通关显示通关UI
        if (this.win) {
            // 更新通关关卡信息
            this.updateLevel();
            this.nextUI.enterAnimation();
            this.addChild(this.nextUI);
            try {
                this.removeChild(this.tipView);
            } catch (error) {}
        } else {
            try {
                this.removeChild(this.nextUI);
            } catch (error) {}
            this.addChild(this.tipView);
            this.tipView.setText("您的成绩是："+value + "条\n\n"+ str +"\n点击开始再来一次吧");
        }
    }
    // 每次关卡开始后显示的游戏开始文案
    public showStart() {
        this.win = false;
        this.tipView.setText("游戏开始后请滑破"+ this.originNum +"条泡泡鱼\n\n点击开始吧");
        try {
          this.removeChild(this.nextUI);
          this.removeChild(this.tipView);
        } catch (error) {}
        this.addChild(this.tipView);
    }
    // 推送游戏开始事件
    private gameStartHandle() {
        this.dispatchEvent(this.gameStartEvent);
    }

    // 胜利通关UI
    private winUI() {
        this.nextUI = new Win();
        // 监听点击下一关按钮
        this.nextUI.addEventListener(CustomHandleEvent.NextLevel, this.nextLevel, this);
        // 监听返回关卡列表
        this.nextUI.addEventListener(CustomHandleEvent.ReturnLevelAnimation, this.returnLevel, this); 
    }

    // 监听回调，下一关
    private nextLevel() {
        const nextLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.NextLevel);
        this.dispatchEvent(nextLevelEvent);
    }
    
}
