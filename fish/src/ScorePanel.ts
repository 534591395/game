/**
 * 显示成绩
 */

class ScorePanel extends egret.Sprite {
    private txt:egret.TextField;
    
    private originNum:number = 30;

    public constructor() {
        super();
        this.render();
    }

    private render() {
        let g:egret.Graphics = this.graphics;
        g.beginFill(0x000000,0.8);
        g.drawRect(0,0,400,200);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.width = 410;
        this.txt.height = 250;
        this.txt.textAlign = "center";
        this.txt.textColor = 0xFFFFFF;
        this.txt.size = 24;
        this.txt.y = 60;
        this.addChild(this.txt);
    }

    public showScore(value:number) {
        let str = '';
        if (value < this.originNum) {
            str = '很遗憾，未达到目标！\n';
        }
        this.txt.text = "您的成绩是："+value + "条\n\n"+ str +"\n点击再来一次吧";
    }

    public showStart() {
        this.txt.text = "游戏开始后请刺破"+ this.originNum +"条泡泡鱼\n\n点击开始";
    }
}
