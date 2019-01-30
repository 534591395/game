var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(r,s){function o(t){try{h(n.next(t))}catch(e){s(e)}}function a(t){try{h(n["throw"](t))}catch(e){s(e)}}function h(t){t.done?r(t.value):new i(function(e){e(t.value)}).then(o,a)}h((n=n.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return n([t,e])}}function n(i){if(r)throw new TypeError("Generator is already executing.");for(;h;)try{if(r=1,s&&(o=s[2&i[0]?"return":i[0]?"throw":"next"])&&!(o=o.call(s,i[1])).done)return o;switch(s=0,o&&(i=[0,o.value]),i[0]){case 0:case 1:o=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,s=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(o=h.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){h.label=i[1];break}if(6===i[0]&&h.label<o[1]){h.label=o[1],o=i;break}if(o&&h.label<o[2]){h.label=o[2],h.ops.push(i);break}o[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(n){i=[6,n],s=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var r,s,o,a,h={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e.skinName="resource/skins/loading.exml",e}return __extends(e,t),e.prototype.createView=function(){},e.prototype.onProgress=function(t,e){this.loading.width=t/e*428},e}(eui.Component);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function n(n){e.call(i,n,t)}if(RES.hasRes(t)){var r=RES.getRes(t);r?n(r):RES.getResAsync(t,n,this)}else RES.getResByUrl(t,n,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Fish=function(t){function e(e,i,n,r){var s=t.call(this)||this;return s.gravity=0,s.velX=0,s.velY=0,s.velZ=0,s.counter=0,s.TO_RADIANS=Math.PI/180,s.size=1,s.enabled=!0,s.posX=e,s.posY=i,s.posZ=n,s.fishBitmap=r,s.addChild(r),s}return __extends(e,t),e.prototype.render=function(){var t=.04*Math.sin(.4*this.counter)+this.size,e=.04*Math.sin(Math.PI+.4*this.counter)+this.size;this.x=this.posX,this.y=this.posY,this.scaleX=t,this.scaleY=e},e.prototype.update=function(){this.velY+=this.gravity,this.posX+=this.velX,this.posY+=this.velY,this.posZ+=this.velZ,this.counter++,this.rotate(2)},e.prototype.rotate=function(t,e){var i=Math.cos(t*(e?1:this.TO_RADIANS)),n=Math.sin(t*(e?1:this.TO_RADIANS)),r=this.stage.stageWidth/2,s=this.posX-r;this.posX=s*i-this.posZ*n+r,this.posZ=s*n+this.posZ*i,s=this.velX,this.velX=s*i-this.velZ*n,this.velZ=s*n+this.velZ*i},e}(egret.DisplayObjectContainer);__reflect(Fish.prototype,"Fish");var FishEmitter=function(t){function e(){var e=t.call(this)||this;return e.particles=[],e.spareParticles=[],e}return __extends(e,t),e.prototype.update=function(){for(var t=0;t<this.particles.length;t++){var e=this.particles[t];e.enabled&&(e.update(),e.enabled||this.removeParticle(e))}},e.prototype.removeParticle=function(t){this.removeChild(t),t.enabled=!1,this.spareParticles.push(t)},e.prototype.makeParticle=function(){var t;return this.spareParticles.length>0?(t=this.spareParticles.shift(),this.addChild(t)):(t=new FishParticle,this.particles.push(t),this.addChild(t)),t.enabled=!0,t},e.prototype.makeExplosion=function(t,e){for(var i=0;30>i;i++){var n=this.makeParticle();n.x=t,n.y=e,n.xVel=Math.random()-.5,n.yVel=Math.random()-.5,n.zVel=Math.random()-.5;var r=Math.sqrt(n.xVel*n.xVel+n.yVel*n.yVel+n.zVel*n.zVel);n.xVel*=40/r,n.yVel*=40/r,n.zVel*=40/r,n.size=1.5,n.update()}},e.prototype.clearAll=function(){var t=this;this.particles.map(function(e){e.enabled&&t.removeParticle(e)})},e}(egret.DisplayObjectContainer);__reflect(FishEmitter.prototype,"FishEmitter");var FishParticle=function(t){function e(){var e=t.call(this)||this;return e.xVel=0,e.yVel=0,e.size=1,e.enabled=!0,e.render(),e}return __extends(e,t),e.prototype.render=function(){var t=this.createBitmapByName("orangeParticle_png");this.width=32,this.height=32,this.addChild(t)},e.prototype.update=function(){var t=.84;this.xVel*=t,this.yVel*=t,this.x+=this.xVel,this.y+=this.yVel,this.size*=.9,this.scaleX=this.size,this.scaleY=this.size,this.size<.05&&(this.enabled=!1)},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e.name=t,e},e}(egret.DisplayObjectContainer);__reflect(FishParticle.prototype,"FishParticle");var Game=function(t){function e(){var e=t.call(this)||this;return e.time=1e3,e.timeNum=20,e.counter=0,e.frequencyFish=8,e.delFish=0,e.spareFishes=[],e.fishes=[],e.level=1,e.gravity=-.2,e.originNum=30,e.render(),e}return __extends(e,t),e.prototype.levelChange=function(t){void 0===t&&(t=1),this.level=t,this.timeNum=20,this.gravity=-.2,this.timeNum=this.timeNum-(this.level-1),this.gravity=this.gravity+-this.level/10,this.scorePanel.setOriginNum(29+this.level),this.scorePanel.showStart(),this.timer.repeatCount=this.timeNum},e.prototype.render=function(){this.fishEmitter=new FishEmitter,this.addChild(this.fishEmitter),this.pannelUI(),this.gameTimer(),this.TxtTimer()},e.prototype.pannelUI=function(){this.scorePanel=new ScorePanel,this.scorePanel.touchEnabled=!0,this.scorePanel.x=0,this.scorePanel.y=100,this.addChild(this.scorePanel),this.scorePanel.addEventListener(CustomHandleEvent.GameStart,this.gameStart,this),this.scorePanel.addEventListener(CustomHandleEvent.ReturnLevel,this.returnLevel,this),this.scorePanel.addEventListener(CustomHandleEvent.UpdateLevel,this.updateLevel,this),this.scorePanel.addEventListener(CustomHandleEvent.NextLevel,this.nextLevel,this)},e.prototype.updateLevel=function(){var t=new CustomHandleEvent(CustomHandleEvent.UpdateLevel);t.levelNum=this.level+1,console.log("发起更新通关关卡",this.level+1),this.dispatchEvent(t)},e.prototype.returnLevel=function(){var t=new CustomHandleEvent(CustomHandleEvent.ReturnLevel);this.dispatchEvent(t)},e.prototype.nextLevel=function(t){var e=this.level+1;this.levelChange(e),console.log("下一关关卡"+e)},e.prototype.gameTimer=function(){this.timer=new egret.Timer(this.time,this.timeNum),this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this),this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this)},e.prototype.TxtTimer=function(){this.txt=new egret.TextField,this.txt.width=70,this.txt.height=50,this.txt.textAlign="center",this.txt.textColor=16777215,this.txt.size=30,this.txt.y=20,this.txt.x=20,this.addChild(this.txt)},e.prototype.timerFunc=function(){this.txt.text=this.timer.repeatCount-this.timer.currentCount+"S"},e.prototype.timerComFunc=function(){this.gameEnd()},e.prototype.gameEnd=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.onGameLoop,this),this.scorePanel.showScore(this.delFish),this.addChild(this.scorePanel),this.clearFish(),this.fishEmitter.clearAll()},e.prototype.gameStart=function(){this.txt.text=this.timer.repeatCount+"S",this.timer.reset(),this.timer.start();try{this.removeChild(this.scorePanel)}catch(t){}this.addEventListener(egret.Event.ENTER_FRAME,this.onGameLoop,this)},e.prototype.onGameLoop=function(){var t=this;this.counter++%this.frequencyFish==0&&this.makeFish(),this.fishes.map(function(e){e.enabled&&(e.update(),e.render(),e.posY<-200&&t.removeFish(e))}),this.fishEmitter.update()},e.prototype.makeFish=function(){var t;if(this.spareFishes.length)t=this.spareFishes.pop(),t.enabled=!0,this.addChild(t);else{var e=this.createBitmapByName("orangefish0"+(this.fishes.length%4+1)+"_png");t=new Fish(0,0,0,e),this.fishes.push(t),t.touchEnabled=!0,t.addEventListener(egret.TouchEvent.TOUCH_TAP,this.explodeFish,this),t.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.explodeFish,this),this.addChild(t)}var i=this.stage.stageWidth/2;t.posX=i+this.randomRange(-250,250),t.posY=this.stage.stageHeight+10,t.posZ=this.randomRange(-250,250),t.velX=this.randomRange(-1,1),t.velY=this.randomRange(-1,-2),t.velZ=this.randomRange(-1,1),t.size=1,t.gravity=this.gravity},e.prototype.explodeFish=function(t){var e=t.target;this.fishEmitter.makeExplosion(e.posX,e.posY),this.removeFish(e),this.delFish++},e.prototype.removeFish=function(t){t.enabled=!1,this.removeChild(t),this.spareFishes.push(t)},e.prototype.clearFish=function(){var t=this;this.delFish=0,this.counter=0,this.fishes.map(function(e){e.enabled&&t.removeFish(e)})},e.prototype.randomRange=function(t,e){return Math.random()*(e-t)+t},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e},e}(egret.DisplayObjectContainer);__reflect(Game.prototype,"Game");var Level=function(t){function e(e,i){var n=t.call(this)||this;return n.isLock=!0,n.skinName="resource/skins/level.exml",n.isLock=e,n.number=i,n.width=n.level_lock.width,n.height=n.level_lock.height,n.render(),n.animateEvent(),n}return __extends(e,t),e.prototype.render=function(){this.isLock?(this.level_lock.visible=!0,this.level_unlock.visible=!1):(this.level_unlock.visible=!0,this.level_lock.visible=!1,this.level_id.source="number_"+this.number+"_png")},e.prototype.animateEvent=function(){var t=this;this.level_unlock.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.level.play(0)},this),this.level.addEventListener("complete",function(){var e=new CustomHandleEvent(CustomHandleEvent.ChoiceLevel);e.levelNum=t.number,t.dispatchEvent(e)},this),this.level_lock.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.lock.play(0)},this)},e}(eui.Component);__reflect(Level.prototype,"Level");var LevelGroup=function(t){function e(e,i){void 0===e&&(e=9),void 0===i&&(i=[1]);var n=t.call(this)||this;return n.levels=[],n.levelNum=9,n.unlock=[1],n.rowNum=3,n.levelNum=e,n.unlock=i,n.myGroup=new eui.Group,n.game=new Game,n.addEventListener(egret.Event.ADDED_TO_STAGE,n.render,n),n.game.addEventListener(CustomHandleEvent.ReturnLevel,n.returnLevel,n),n.game.addEventListener(CustomHandleEvent.UpdateLevel,n.updateLevel,n),n}return __extends(e,t),e.prototype.updateLevel=function(t){this.unlockLevel(t.levelNum)},e.prototype.returnLevel=function(){this.addChild(this.myGroup),this.addChild(this.txt),this.removeChild(this.game)},e.prototype.textField=function(){this.txt=new egret.TextField,this.txt.width=this.stage.stageWidth,this.txt.height=200,this.txt.textAlign="center",this.txt.textColor=16777215,this.txt.size=40,this.txt.y=0,this.txt.text="关卡选择",this.addChild(this.txt)},e.prototype.render=function(){this.textField(),this.tLayout();for(var t=0;t<this.levelNum;t+=1){var e=void 0,i=t+1;this.unlock.indexOf(i)>-1?(e=new Level(!1,i),e.addEventListener(CustomHandleEvent.ChoiceLevel,this.gameStartHandle,this)):e=new Level(!0,i),this.levels.push(e),this.myGroup.addChild(e)}this.addChild(this.myGroup)},e.prototype.tLayout=function(){this.myGroup.width=this.stage.stageWidth,this.myGroup.height=400;var t=new eui.TileLayout;t.horizontalGap=0,t.verticalGap=0,t.columnAlign=eui.ColumnAlign.JUSTIFY_USING_WIDTH,t.rowAlign=eui.RowAlign.JUSTIFY_USING_HEIGHT,t.horizontalAlign=egret.HorizontalAlign.CENTER,t.paddingTop=0,t.paddingRight=0,t.paddingLeft=0,t.paddingBottom=10,t.requestedColumnCount=this.rowNum,this.myGroup.layout=t,this.myGroup.y=80},e.prototype.unlockLevel=function(t){var e=this;-1===this.unlock.indexOf(t)&&this.unlock.push(t),this.levels.map(function(t,i){e.unlock.indexOf(i+1)>-1&&t.isLock&&(t.isLock=!1,t.number=i+1,t.render(),t.addEventListener(CustomHandleEvent.ChoiceLevel,e.gameStartHandle,e))})},e.prototype.gameStartHandle=function(t){this.game.levelChange(t.levelNum),this.removeChild(this.myGroup),this.removeChild(this.txt),this.addChild(this.game)},e}(egret.DisplayObjectContainer);__reflect(LevelGroup.prototype,"LevelGroup");var BgMap=function(t){function e(){var e=t.call(this)||this;return e.bgSpeed=20,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);var t=this.stage.stageWidth,e=this.stage.stageHeight;this.textureHeight=e,this.rowCount=Math.ceil(e/this.textureHeight)+1,this.bmpParallaxBackArr=[],this.bmpParallaxFrontArr=[];for(var i=0;i<this.rowCount;i+=1){var n=this.createBitmapByName("parallaxBack_jpg");n.y=this.textureHeight*i-(this.textureHeight*this.rowCount-e),n.width=t,n.height=e,this.bmpParallaxBackArr.push(n),this.addChild(n)}for(var i=0;i<this.rowCount;i+=1){var r=this.createBitmapByName("parallaxFront_png");r.y=this.textureHeight*i-(this.textureHeight*this.rowCount-e),r.width=t,r.height=e,this.bmpParallaxFrontArr.push(r),this.addChild(r)}},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,i=RES.getRes(t);return e.texture=i,e.name=t,e},e.prototype.start=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this),this.addEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e.prototype.pause=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrameHandler,this)},e.prototype.enterFrameHandler=function(t){for(var e=0;e<this.rowCount;e+=1){var i=this.bmpParallaxFrontArr[e];i.y+=2*this.bgSpeed,i.y>this.stage.stageHeight&&(i.y=this.bmpParallaxFrontArr[0].y-this.textureHeight,this.bmpParallaxFrontArr.pop(),this.bmpParallaxFrontArr.unshift(i));var n=this.bmpParallaxBackArr[e];n.y+=this.bgSpeed,n.y>this.stage.stageHeight&&(n.y=this.bmpParallaxBackArr[0].y-this.textureHeight,this.bmpParallaxBackArr.pop(),this.bmpParallaxBackArr.unshift(n))}},e}(egret.DisplayObjectContainer);__reflect(BgMap.prototype,"BgMap");var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)})},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,5,,6]),egret.ImageLoader.crossOrigin="anonymous",[4,RES.loadConfig("default.res.json","https://wxgame.dreamrabbit.tech/game/resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("loading",1)];case 3:return i.sent(),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadGroup("preload",0,t)];case 4:return i.sent(),this.stage.removeChild(t),[3,6];case 5:return e=i.sent(),console.error(e),[3,6];case 6:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var n=new eui.Theme("resource/default.thm.json",t.stage);n.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.createGameScene=function(){this.bg=new BgMap,this.addChild(this.bg),this.bg.start(),this.levelGroup=new LevelGroup(9,[1]),this.addChild(this.levelGroup),this.levelGroup.y=150,this.levelGroup.game.y=-150},e}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ScorePanel=function(t){function e(){var e=t.call(this)||this;return e.originNum=30,e.win=!1,e.render(),e}return __extends(e,t),e.prototype.render=function(){this.defautUI(),this.winUI()},e.prototype.defautUI=function(){this.tipView=new TipView,this.gameStartEvent=new CustomHandleEvent(CustomHandleEvent.GameStart),this.tipView.addEventListener(CustomHandleEvent.CompleteAnimation,this.gameStartHandle,this),this.tipView.addEventListener(CustomHandleEvent.ReturnLevelAnimation,this.returnLevel,this)},e.prototype.returnLevel=function(){var t=new CustomHandleEvent(CustomHandleEvent.ReturnLevel);this.dispatchEvent(t)},e.prototype.updateLevel=function(){var t=new CustomHandleEvent(CustomHandleEvent.UpdateLevel);this.dispatchEvent(t)},e.prototype.setOriginNum=function(t){void 0===t&&(t=30),this.originNum=t},e.prototype.showScore=function(t){var e="";if(t<this.originNum?(e="很遗憾，未达到目标！\n",this.win=!1):this.win=!0,this.win){this.updateLevel(),this.nextUI.enterAnimation(),this.addChild(this.nextUI);try{this.removeChild(this.tipView)}catch(i){}}else{try{this.removeChild(this.nextUI)}catch(i){}this.addChild(this.tipView),this.tipView.setText("您的成绩是："+t+"条\n\n"+e+"\n点击开始再来一次吧")}},e.prototype.showStart=function(){this.win=!1,this.tipView.setText("游戏开始后请滑破"+this.originNum+"条泡泡鱼\n\n点击开始吧");try{this.removeChild(this.nextUI),this.removeChild(this.tipView)}catch(t){}this.addChild(this.tipView)},e.prototype.gameStartHandle=function(){this.dispatchEvent(this.gameStartEvent)},e.prototype.winUI=function(){this.nextUI=new Win,this.nextUI.addEventListener(CustomHandleEvent.NextLevel,this.nextLevel,this),this.nextUI.addEventListener(CustomHandleEvent.ReturnLevelAnimation,this.returnLevel,this)},e.prototype.nextLevel=function(){var t=new CustomHandleEvent(CustomHandleEvent.NextLevel);this.dispatchEvent(t)},e}(egret.Sprite);__reflect(ScorePanel.prototype,"ScorePanel");var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,n){function r(t){e.call(n,t)}function s(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),i.call(n))}var o=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){e.call(n,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(t,i){window.JSONParseClass.setData(t),egret.callLater(function(){e.call(n,generateEUI2)},o)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(t.indexOf(".exml")>-1){var a=t.split("/");a.pop();var h=a.join("/")+"_EUI.json";generateJSON.paths[t]?egret.callLater(function(){e.call(n,generateJSON.paths[t])},this):RES.getResByUrl(h,function(i){window.JSONParseClass.setData(i),egret.callLater(function(){e.call(n,generateJSON.paths[t])},o)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){e.call(n,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,s,null),RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_TEXT)},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var TipView=function(t){function e(){var e=t.call(this)||this;return e.isClick=!1,e.skinName="resource/skins/tip.exml",e.text.textAlign="center",e.text.textColor=16777215,e.text.size=24,e.text.y=100,e.init(),e}return __extends(e,t),e.prototype.init=function(){var t=this,e=new CustomHandleEvent(CustomHandleEvent.CompleteAnimation),i=new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.start.play(0)},this),this.start.addEventListener("complete",function(){t.dispatchEvent(e)},this),this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.returnLevel.play(0)},this),this.returnLevel.addEventListener("complete",function(){t.dispatchEvent(i)},this)},e.prototype.setText=function(t){this.text.text=t},e}(eui.Component);__reflect(TipView.prototype,"TipView");var Win=function(t){function e(){var e=t.call(this)||this;return e.skinName="resource/skins/win.exml",e.init(),e}return __extends(e,t),e.prototype.init=function(){var t=this;this.next.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.nextAnimation.play(0)},this),this.nextAnimation.addEventListener("complete",function(){var e=new CustomHandleEvent(CustomHandleEvent.NextLevel);t.dispatchEvent(e)},this),this.LevelList.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){t.returnLevel.play(0)},this),this.returnLevel.addEventListener("complete",function(){var e=new CustomHandleEvent(CustomHandleEvent.ReturnLevelAnimation);t.dispatchEvent(e)},this)},e.prototype.enterAnimation=function(){var t=this;this.winTextAnimation.play(0),this.winTextAnimation.addEventListener("complete",function(){t.nextShowAnimation.play(0)},this)},e}(eui.Component);__reflect(Win.prototype,"Win");var CustomHandleEvent=function(t){function e(e,i,n){void 0===i&&(i=!1),void 0===n&&(n=!1);var r=t.call(this,e,i,n)||this;return r.levelNum=1,r}return __extends(e,t),e.GameStart="游戏开始",e.CompleteAnimation="按钮动画结束",e.ChoiceLevel="选择关卡",e.ReturnLevel="返回关卡",e.ReturnLevelAnimation="返回关卡",e.NextLevel="进入下一关",e.UpdateLevel="更新通关的关卡信息",e}(egret.Event);__reflect(CustomHandleEvent.prototype,"CustomHandleEvent");