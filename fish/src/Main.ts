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

class Main extends egret.DisplayObjectContainer {
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

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })

    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
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
        //this.startBtn();
        this.bg.start();
        //this.gameStart();
        
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

    private startBtn() {
        // this.button = new eui.Button();
        // this.button.width = 100;
        // this.button.height = 40;
        // this.button.label = "开始游戏";
        // this.button.skinName = "ButtonSkin.exml";
        // this.button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.gameStart,this);
        // this.addChild(this.button);

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

    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }

    private randomRange(min:number, max:number) {
        return (Math.random()*(max-min))+min;
    }

}