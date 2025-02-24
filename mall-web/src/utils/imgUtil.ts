import goodStorage from "good-storage";
export class ImgUtil {
  static imgList: Record<string, string> = {};

  static getImg(imgName: string) {
    return ImgUtil.imgList[imgName];
  }
  static storageImaList() {
    ImgUtil.imgList = goodStorage.get("imgList") || {};
    if (ImgUtil.isEmpty(ImgUtil.imgList)) {
      // 如果是空
      ImgUtil.loadAllImg();
      goodStorage.set("imgList", ImgUtil.imgList);
    }
  }

  static isEmpty(list: Object) {
    return Object.keys(list).length === 0 ? true : false;
  }

  static loadAllImg() {
    const imgMap = import.meta.glob("../assets/img/**/*.png", {
      eager: true,
    });
    let absolutePath: string = ""; //绝对路径
    let imgName: string = ""; // 图片名
    for (let relativePath in imgMap) {
      absolutePath = (imgMap[relativePath] as any).default;
      if (!absolutePath) return;
      imgName = absolutePath.substring(absolutePath.lastIndexOf("/") + 1);
      this.imgList[imgName] = absolutePath;
    }
  }
}
