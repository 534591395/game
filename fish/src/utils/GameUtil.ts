/**
 * 帮助类
 */

module fighter {
    export class GameUtil {
        // 基于矩形的碰撞检测
        public hitTest(obj1:egret.DisplayObject, obj2:egret.DisplayObject):boolean {
            // 获取边界
            const rect1:egret.Rectangle = obj1.getBounds();
            const rect2:egret.Rectangle = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            return rect1.intersects(rect2);
        }
    }

    export function createBitmapByName(name: string):egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.name = name;
        return result;
    }
}