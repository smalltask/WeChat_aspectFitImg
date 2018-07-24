/**
 * imgSourceWidth,imgSourceHeight : 图片的原始高度；
 * fitWidth,fitHeight: 图片保持比例缩放后，要能够塞进这个大小范围内；
 * 返回对象为适配处理后的图片尺寸，改尺寸是可以装到fitWidth和fitHeight中的
 * 返回示例：{width:100,height:100}
 * 如果计算失败，返回null
 */
function aspectFitImg(imgSourceWidth, imgSourceHeight, fitWidth, fitHeight) {
  if (isNull(imgSourceWidth) || isNull(imgSourceHeight) || isNull(fitWidth) || isNull(fitHeight)) {
    return null;
  }
  if (imgSourceWidth > fitWidth) {
    let d = imgSourceWidth / fitWidth;
    let th = imgSourceHeight / d;
    return this.aspectFitImg(fitWidth, th, fitWidth, fitHeight);
  } else if (imgSourceHeight > fitHeight) {
    let d = imgSourceHeight / fitHeight;
    let tw = imgSourceWidth / d;
    return this.aspectFitImg(tw, fitHeight, fitWidth, fitHeight);
  } else if (imgSourceWidth <= fitWidth && imgSourceHeight <= fitHeight) {
    return { width: imgSourceWidth, height: imgSourceHeight };
  } else {
    return this.aspectFitImg(imgSourceWidth, imgSourceWidth, fitWidth, fitHeight);
  }
}