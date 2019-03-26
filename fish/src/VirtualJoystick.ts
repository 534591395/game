/**
 * 虚拟摇杆
 */

class VirtualJoystick extends eui.Component {
    // 小球（中间控制）
    private ball:eui.Image;
    // 圆环
    private circle:eui.Image;
    // 圆环半径
    private circleRadius:number = 0;
    // 小球半径
    private ballRadius:number = 0;
    // 中心点坐标
    private centerX:number = 0;
    private centerY:number = 0;
    // 触摸ID
    private touchID:number;

    public constructor() {
        super();
        this.skinName = "resource/skins/VirtualJoystickSkin.exml";
    }

    public childrenCreated() {
		//获取圆环和小球半径
		this.circleRadius = this.circle.height/2;
		this.ballRadius = this.ball.height/2;
		//获取中心点
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		//设置锚点
		this.anchorOffsetX = this.circleRadius;
		this.anchorOffsetY = this.circleRadius;
		//设置小球初始位置
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
    }

    public start() {
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }

    public stop() {
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
    
    // 触摸开始
    private onTouchBegin(e:egret.TouchEvent) {
		// if(this.parent){
		// 	return;
		// }
        // 说明：当按下时，不停移动，若放开表示
        this.touchID = e.touchPointID;
        this.dispatchEvent(new egret.Event("vj_start"));
    }

    // 触摸结束
    private onTouchEnd(e:egret.TouchEvent) {
		if(this.touchID != e.touchPointID){
			return;
		}
        this.dispatchEvent(new egret.Event("vj_end"));
    }
    
	//触摸移动，设置小球的位置
	private p1:egret.Point = new egret.Point();
	private p2:egret.Point = new egret.Point();
    
    private onTouchMove(e:egret.TouchEvent) {
		if(this.touchID != e.touchPointID){
			return;
		}
        //获取手指和虚拟摇杆的距离
		this.p1.x = this.x;
		this.p1.y = this.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		const dist = egret.Point.distance(this.p1, this.p2);
        const angle:number = Math.atan2(e.stageY - this.y, e.stageX - this.x);
		// 手指距离在圆环范围内
		if(dist <= (this.circleRadius - this.ballRadius)){
			this.ball.x = this.centerX + e.stageX - this.x;
			this.ball.y = this.centerY + e.stageY - this.y;
		// 手指距离在圆环范围外
		}else{
			this.ball.x = Math.cos(angle)*(this.circleRadius - this.ballRadius) + this.centerX;
			this.ball.y = Math.sin(angle)*(this.circleRadius - this.ballRadius) + this.centerY;
		}

        this.dispatchEventWith("vj_move", false, angle);
    }

}