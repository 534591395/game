/**
 * 显示成绩
 */

class ScorePanel extends egret.Sprite {

    private originNum:number = 30;

    private tipView: TipView;

    private gameStartEvent:CustomHandleEvent;

    public constructor() {
        super();
        this.render();
    }

    private render() {

        this.tipView = new TipView();
        this.addChild(this.tipView);

        this.gameStartEvent = new CustomHandleEvent(CustomHandleEvent.GameStart);

        // 监听开始按钮动画
        this.tipView.addEventListener(CustomHandleEvent.CompleteAnimation, this.gameStartHandle, this);     
    }

    public showScore(value:number) {
        let str = '';
        if (value < this.originNum) {
            str = '很遗憾，未达到目标！\n';
        }
        this.tipView.setText("您的成绩是："+value + "条\n\n"+ str +"\n点击开始再来一次吧");
    }

    public showStart() {
        this.tipView.setText("游戏开始后请刺破"+ this.originNum +"条泡泡鱼\n\n点击开始吧");
    }

    private gameStartHandle() {
        console.log('按钮动画结束了');
        this.dispatchEvent(this.gameStartEvent);
    }
}
