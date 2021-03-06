/**
 * 游戏主逻辑
 */
declare var wx: any;
class Game extends egret.DisplayObjectContainer {
    
    // 计时器
    private timer:egret.Timer;
    // 倒计时频率（默认1s）
    private time:number = 1000;
    // 当前关卡的通关时间（默认20s）
    public timeNum:number = 20;
    // 倒计时显示的文案控件
    private txt:egret.TextField;
    // 控制生成泡泡鱼个数（通过除以一个整数），当前帧率变动时，不断累加
    private counter:number = 0;
    // 生成界面上泡泡鱼个数频率
    private frequencyFish:number = 8;
    // 被用户点破的泡泡鱼数量（分数）
    private delFish:number = 0;
    // 回收站里的泡泡鱼
    private spareFishes:Fish[] = [];
    // 已生成的泡泡鱼实例（new Fish）, 通过 fish.enabled 属性确定该泡泡鱼是否在界面上
    private fishes:Fish[] = [];
    // 泡泡鱼爆炸后的粒子发射器（粒子效果）
    private fishEmitter:FishEmitter;
    // UI面板
    private scorePanel:ScorePanel;
    // 难度等级
    private level:number = 1;
    // 泡泡鱼往上移动的速率控制
    private gravity:number = -0.2;
    // 规定时间内需达到的分数
    private originNum:number = 30;
    // 微信广告
    private bannerAd:any;

    public constructor() {
        super();
        this.render();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onCreateBannerAd, this);
    }

    private onCreateBannerAd() {
        try {
            if (this.bannerAd) {
                this.bannerAd.destroy()
            }
            this.bannerAd = wx.createBannerAd({
                adUnitId: 'adunit-e808c74164a5538a',
                style: {
                    left: 0,
                    top: this.stage.stageHeight/2 -50,
                    width: this.stage.stageWidth,
                    height: 120
                }
            }); 
            this.bannerAd.onError(err => {
              //console.log(err, '初始化微信广告失败');
            });
        } catch (error) {
            console.log(error);
        }
    }

    // 关卡调整
    public levelChange(level:number = 1) {
        this.level = level;
        this.timeNum = 20;
        this.gravity = -0.2;
        this.timeNum = this.timeNum - (this.level -1);
        this.gravity = this.gravity + (- this.level/ 10);
        // 设置当前关卡分数
        this.scorePanel.setOriginNum(29+this.level);
        // 显示面板开始文案
        this.scorePanel.showStart();
        this.timer.repeatCount = this.timeNum;
    }

    private render() {
        this.fishEmitter = new FishEmitter();
        this.addChild(this.fishEmitter);
        
        this.pannelUI();
        this.gameTimer();
        this.TxtTimer();

    }
    
    // 操作以及提示面板
    private pannelUI() {
        this.scorePanel = new ScorePanel();
        this.scorePanel.touchEnabled = true;
        this.scorePanel.x = 0;
        this.scorePanel.y = 100;
        this.addChild(this.scorePanel);
        // 监听触发游戏开始
        this.scorePanel.addEventListener(CustomHandleEvent.GameStart, this.gameStart, this);
        // 监听返回关卡列表
        this.scorePanel.addEventListener(CustomHandleEvent.ReturnLevel, this.returnLevel, this);
        // 监听关卡更新信息
        this.scorePanel.addEventListener(CustomHandleEvent.UpdateLevel, this.updateLevel, this);
        // 监听游戏进入下一关事件
        this.scorePanel.addEventListener(CustomHandleEvent.NextLevel, this.nextLevel, this);
    }
    // 监听回调，发起更新通关信息
    private updateLevel() {
        const updateLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.UpdateLevel);
        // this.level 表示当前通关的关卡，通关后，通知 levelGroup 类，更新已通关的关卡
        updateLevelEvent.levelNum = this.level + 1;
        console.log('发起更新通关关卡', this.level + 1);
        this.dispatchEvent(updateLevelEvent);
    }
    // 监听回调，返回关卡
    private returnLevel() {
        const returnLevelEvent:CustomHandleEvent = new CustomHandleEvent(CustomHandleEvent.ReturnLevel);
        this.dispatchEvent(returnLevelEvent);
    }
    //监听回调，当前游戏进入下一关
    private nextLevel(evt:CustomHandleEvent) {
        const num = this.level + 1;
        this.levelChange(num);
        console.log('下一关关卡'+num);
    }
    

    // 游戏计时器（倒计时）
    private gameTimer() {
        this.timer = new egret.Timer(this.time, this.timeNum);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    }

    // 倒计时文案提示组件（显示在界面左上角）
    private TxtTimer() {
        this.txt = new egret.TextField();
        this.txt.width = 70;
        this.txt.height = 50;
        this.txt.textAlign = "center";
        this.txt.textColor = 0xFFFFFF;
        this.txt.size = 30;
        this.txt.y = 20;
        this.txt.x = 20;
        this.addChild(this.txt);
    }

    // 计时器回调，设置当前倒计时
    private timerFunc() {
        this.txt.text = this.timer.repeatCount - this.timer.currentCount + 'S';
    }

    // 计时器回调，倒计时完成后（当前关卡已到规定时间）
    private timerComFunc() {
        this.gameEnd();
    }

    // 当前游戏关卡结束
    private gameEnd() {
        // 关卡已结束，移除监听帧率
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onGameLoop, this);
        // 显示得分
        this.scorePanel.showScore(this.delFish);
        // 添加操作界面UI
        this.addChild(this.scorePanel);
        this.clearFish();
        // 清除界面上的粒子
        this.fishEmitter.clearAll();
        try {
            setTimeout(() => {
                this.bannerAd.show();
            }, 1000);
            console.log('显示广告');
        } catch (error) {
            console.log(error);
        }
    }
    
    // 开始当前游戏关卡
    private gameStart() {
        try {
            this.bannerAd.hide();
            console.log('隐藏广告');
            this.onCreateBannerAd();
            console.log('重新拉取广告');
        } catch (error) {
            console.log(error);
        }
        // 重新设置当前关卡剩余倒计时
        // 设置倒计时显示组件的文案
        this.txt.text = this.timer.repeatCount + 'S';
        // 计时器重置
        this.timer.reset();
        // 开始关卡倒计时
        this.timer.start();
        try {
            // 游戏开始后，移除操作界面UI
            this.removeChild(this.scorePanel);
        } catch (error) {}
        // 开始监听帧率，不断在界面上生成泡泡鱼
        this.addEventListener(egret.Event.ENTER_FRAME, this.onGameLoop, this);
    }

    // 帧率回调：执行onGameLoop
    private onGameLoop() {
        // 每隔 frequencyFish数，界面上显示一个泡泡鱼
        if(this.counter++ % this.frequencyFish == 0) {
            this.makeFish();
        }
        // 每个泡泡鱼更新属性（坐标，缩放，移除）
        this.fishes.map( fish => {
            // 只有在界面上的泡泡鱼才更新属性
            if (fish.enabled) {
               // 更新属性坐标，（旋转效果未实现，z轴问题）
               fish.update();
               // 更新属性后，设置变动的属性，表现为泡泡鱼在做运动（移动，缩放）
               fish.render();

               // 当泡泡鱼往上移动到屏幕外面时，移除屏幕
               if (fish.posY < -200) {
                   this.removeFish(fish);
               }
            }
        });
        // 实时更新粒子
        this.fishEmitter.update();
    }

    // 创造泡泡鱼
    private makeFish() {
        let fish:Fish;
        // 先使用回收站里的泡泡鱼实例
        if (this.spareFishes.length) {
            // 从最后一个取
            fish = this.spareFishes.pop();
            fish.enabled = true;
            this.addChild(fish);
        } else {
            // 泡泡鱼（纹理）种类：orangefish01 ,..., orangefish04
            let fishBitmap:egret.Bitmap = this.createBitmapByName('orangefish0'+ ( (this.fishes.length%4) + 1 )+'_png');
            // 实例一个泡泡鱼
            fish = new Fish(0,0,0, fishBitmap);
            // 加入
            this.fishes.push(fish);
            // 设置可触摸（触摸后爆炸效果）
            fish.touchEnabled = true;
            // 监听触摸事件，触发爆炸效果
            fish.addEventListener( egret.TouchEvent.TOUCH_TAP, this.explodeFish, this );
            fish.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.explodeFish, this );
            // 加入界面
            this.addChild(fish);
        }

        // 设置泡泡鱼初始属性
        const HALFWIDTH = this.stage.stageWidth/2;
        fish.posX = HALFWIDTH + this.randomRange(-250,250);
        fish.posY = this.stage.stageHeight + 10;
        fish.posZ = this.randomRange(-250,250);
        
        // 更新位置频率（累加值）
        fish.velX = this.randomRange(-1,1);
        fish.velY = this.randomRange(-1,-2);
        fish.velZ = this.randomRange(-1,1);
        // 缩放比
        fish.size = 1;
        // 重力加速度
        fish.gravity = this.gravity;
    }

    // 泡泡鱼爆炸（粒子效果）
    private explodeFish(event: egret.Event) {
        const fish:Fish = event.target;
        // 根据爆炸位置，创建n个小粒子，实现爆炸效果（粒子发送器）
        this.fishEmitter.makeExplosion(fish.posX, fish.posY);
        this.removeFish(fish);
        // 累加戳破泡泡鱼
        this.delFish ++;
    }
    
    //移除界面上的泡泡鱼
    private removeFish(fish: Fish) : any {
        // 设置属性（不可用）后，每次帧率变动时候，不再更新该 fish 属性
        fish.enabled = false;
        // 界面上移除
        this.removeChild(fish);
        // 放入回收站
        this.spareFishes.push(fish);
    }

    // 关卡游戏结束后，清除所有界面上的泡泡鱼
    private clearFish() : any {
        // 戳破的泡泡鱼计数清零
        this.delFish = 0;
        // 累加器清零
        this.counter = 0;
        this.fishes.map( fish => {
            if (fish.enabled) {
                this.removeFish(fish);
            }
        });
    }
    
    //随机数
    private randomRange(min:number, max:number) : number {
        return (Math.random()*(max-min))+min;
    }
    
    // 取指定纹理
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}