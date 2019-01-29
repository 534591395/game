/**
 * 关卡网格，默认解锁第一个关卡
 */

class LevelGroup extends egret.DisplayObjectContainer {
    private  myGroup:eui.Group;
    // 关卡集合
    private levels:Level[] = [];
    // 关卡数量
    private levelNum:number = 9;
    // 已解锁的关卡
    public unlock:number[] = [1];
    // 一行排版3个
    private rowNum:number = 3;

    constructor(levelNum:number = 9, unlock:number[] = [1]) {
        super();
        this.levelNum = levelNum;
        this.unlock = unlock;
        this.myGroup = new eui.Group();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.render, this);
    }

    private render() {
        this.myGroup.width = this.stage.stageWidth;
        this.myGroup.height = 400;
        
        const stageWidth = this.stage.stageWidth;
        const unitNum = stageWidth / this.rowNum;
        const top = 50;
        // 当前的行数
        let row = 0;
        let offset = 0;
        let width = 0;
        // 网格布局
        let tLayout:eui.TileLayout = new eui.TileLayout();
        tLayout.horizontalGap = 0;
        tLayout.verticalGap = 0;
        tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        // horizontalAlign 设置水平对齐方式， 居中
        tLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        tLayout.paddingTop = 0;
        tLayout.paddingRight = 0;
        tLayout.paddingLeft = 0;
        tLayout.paddingBottom = 10;
        tLayout.requestedColumnCount = this.rowNum;  /// 设置两列显示
        this.myGroup.layout = tLayout;    /// 网格布局

        for (let i = 0; i < this.levelNum; i += 1) {
            let level;
            let num = i+1;
            if (this.unlock.indexOf(num) > -1) {
                level = new Level(false, num);
            } else {
                level = new Level(true, num);
            }
             
            this.levels.push(level);
            this.myGroup.addChild(level);
        }

        this.addChild(this.myGroup);
    }

    // 设置解锁的关卡
    public unlockLevel(unlockNumber:number) {
        if (this.unlock.indexOf(unlockNumber) === -1) {
            this.unlock.push(unlockNumber);
        }
        this.levels.map((level, i) => {
            // 解锁
            if (this.unlock.indexOf(i+1) > -1) {
                level.isLock = false;
                level.number = i+1;
                level.render();
            }
        });
    }
}