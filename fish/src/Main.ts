//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    // 计时器
    private timer:egret.Timer;

    private counter:number = 0;

    private delFish:number = 0;

    private bg:BgMap;

    private button:eui.Button;

    private shp:Btn;

    private time:number = 1000;

    private timeNum:number = 20;

    private timeTxtNum:number = 0;

    private txt:egret.TextField;

    // 回收站的鱼
    private spareFishes = [];
    // 运动中的鱼
    private fishes = [];

    private emitter: FishEmitter;

    private scorePanel: ScorePanel;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;

        // let topMask = new egret.Shape();
        // topMask.graphics.beginFill(0x000000, 0.5);
        // topMask.graphics.drawRect(0, 0, stageW, 172);
        // topMask.graphics.endFill();
        // topMask.y = 33;
        // this.addChild(topMask);

        // let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        // this.addChild(icon);
        // icon.x = 26;
        // icon.y = 33;

        // let line = new egret.Shape();
        // line.graphics.lineStyle(2, 0xffffff);
        // line.graphics.moveTo(0, 0);
        // line.graphics.lineTo(0, 117);
        // line.graphics.endFill();
        // line.x = 172;
        // line.y = 61;
        // this.addChild(line);


        // let colorLabel = new egret.TextField();
        // colorLabel.textColor = 0xffffff;
        // colorLabel.width = stageW - 172;
        // colorLabel.textAlign = "center";
        // colorLabel.text = "Hello Egret";
        // colorLabel.size = 24;
        // colorLabel.x = 172;
        // colorLabel.y = 80;
        // this.addChild(colorLabel);

        // let textfield = new egret.TextField();
        // this.addChild(textfield);
        // textfield.alpha = 0;
        // textfield.width = stageW - 172;
        // textfield.textAlign = egret.HorizontalAlign.CENTER;
        // textfield.size = 24;
        // textfield.textColor = 0xffffff;
        // textfield.x = 172;
        // textfield.y = 135;
        // this.textfield = textfield;

        // let button = new eui.Button();
        // button.label = "Click!";
        // button.horizontalCenter = 0;
        // button.verticalCenter = 0;
        // this.addChild(button);
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        this.bg = new BgMap();
        this.addChild(this.bg);
        this.emitter = new FishEmitter();
        this.addChild(this.emitter);
        this.scorePanel = new ScorePanel();
        this.scorePanel.touchEnabled = true;
        this.scorePanel.x = (this.stage.stageWidth-this.scorePanel.width)/2;
        this.scorePanel.y = 100;
        this.scorePanel.showStart();
        this.scorePanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.addChild(this.scorePanel);
        this.timerS();
        this.timerTxt();
        // 初始化开始按钮
        this.bg.start();

        this.addChild(new StartBtnView())

    }

    private timerTxt() {
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
    
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }

    private startBtn() {
        this.shp = new Btn();
        this.shp.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
        this.addChild(this.shp);
    }
    // 计时器
    private timerS() {
        this.timer = new egret.Timer(this.time, this.timeNum);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
    }

    // 计时
    private timerFunc() {
        this.txt.text = --this.timeTxtNum + 'S';
        console.log(egret.getTimer());
    }

    // 计时结束
    private timerComFunc() {
        this.gameEnd();
    }

    private gameStart() {
        this.clearFish();
        this.timeTxtNum = this.timeNum;
        this.txt.text = this.timeTxtNum + 'S';
        this.timer.reset();
        this.timer.start();
        try {
            this.removeChild(this.scorePanel);
        } catch (error) {
            
        }
        
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onGameLoop, this);
    }

    private gameEnd() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onGameLoop, this);
        this.scorePanel.showScore(this.delFish);
        this.addChild(this.scorePanel);
    }    

    private onGameLoop() {
        if(this.counter++ % 10 == 0) {
            this.makeFish();
        }
        for( let i=0; i<this.fishes.length; i++ ){
            const fish = this.fishes[i];
            if(!fish.enabled) continue;

            fish.update();

            fish.render();

            if(fish.posY <-200) {
                this.removeFish(fish);
            };
        }
        this.emitter.update();
    }

    private makeFish() {
        let fish;
        if (this.spareFishes.length) {
            fish = this.spareFishes.pop();
            fish.enabled = true;
            this.addChild(fish);
        } else {
             let fishBitmap = this.createBitmapByName('orangefish0'+ ( (this.fishes.length%4) + 1 )+'_png');
             fish = new Fish(0,0,0, fishBitmap); 
             this.fishes.push(fish);
             fish.touchEnabled = true;
             fish.addEventListener( egret.TouchEvent.TOUCH_TAP, this.explodeFish, this );
             fish.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.explodeFish, this );

             this.addChild(fish);
        }
        const HALFWIDTH = this.stage.stageWidth/2;
        fish.posX = HALFWIDTH + this.randomRange(-250,250);
        fish.posY = this.stage.stageHeight + 10;
        fish.posZ = this.randomRange(-250,250);

        fish.velX = this.randomRange(-1,1);
        fish.velY = this.randomRange(-1,-2);
        fish.velZ = this.randomRange(-1,1);

        fish.size = 1;
        fish.gravity = -0.3;
    }

    // 泡泡鱼爆炸效果
    private explodeFish(event:egret.Event) {
        const fish = event.target;
        this.emitter.makeExplosion(fish.posX, fish.posY);
        this.removeFish(fish);
        this.delFish ++;
    }

    private removeFish(fish) {
        fish.enabled = false;
        this.removeChild(fish);
        this.spareFishes.push(fish);
    }

    private clearFish() {
        this.delFish = 0;
        this.counter = 0;
        this.spareFishes = [];
        this.fishes.map((fish) => {
            try {
                this.removeChild(fish);
            } catch (error) {
                
            }
            
        });
        this.fishes = [];
    }

    private randomRange(min:number, max:number) {
        return (Math.random()*(max-min))+min;
    }

}
