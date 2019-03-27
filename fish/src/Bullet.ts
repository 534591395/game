/**
 * 子弹类，泡泡鱼
 */

class Bullet extends egret.Bitmap {
    private static cachePool:Object = {};
    // 子弹纹理名称，可能有不同子弹种类
    private textureName:string;

    public constructor(texture:egret.Texture, textureName:string) {
        super(texture);
        this.textureName = textureName;
    }

    // 生成子弹
    public static make(textureName:string) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        const dict:Bullet[] = this.cachePool[textureName];
        let bullet:Bullet;
        if (dict.length) {
            // 从回收池里拿一个子弹
            bullet = dict.pop();
        } else {
            bullet = new Bullet(RES.getRes(textureName),textureName);
        }
        return bullet;
    }

    // 回收子弹
    public static reclaim(bullet:Bullet, textureName:string) {
        if (!this.cachePool[textureName]) {
            this.cachePool[textureName] = [];
        }
        const dict:Bullet[] = this.cachePool[textureName];
        if (dict.indexOf(bullet) === -1) {
            dict.push(bullet);
        }
    }
}