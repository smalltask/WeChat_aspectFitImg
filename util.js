
module.exports = {
  isNull: isNull,
  aspectFitImg: aspectFitImg
}

/

//==== 数据检查 & 数据处理 ====
function isNull(str) {
  if (!str || str == "") return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}

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

/**
 * 返回一个json层级下的节点内容
 * root ： 要被读取的json节点的root节点
 * jsonStr ： 要被读取的节点的字符串形式
 * defaultValue : 如果要被读取的节点不存在或为空，则返回该值
 * 
 *  // demo
 *  var jsonStr = '{"res":{"data":null}}';
 *  var jsonRoot = JSON.parse(jsonStr);
 *  var str = utils.jsonObj(jsonRoot,"res.data.userInfo.card.name",undefined);
 */
function jsonObj(root, jsonStr, defaultValue) {
  if (!root) {
    return defaultValue;
  } else {
    try {
      var nodeNameArray = jsonStr.split('.');
      var tmpRoot = root;
      var i = 0;
      for (var i = 0; i < nodeNameArray.length; i++) {
        var tmpNodeName = nodeNameArray[i];
        var tmpNode = tmpRoot[tmpNodeName];
        if (tmpNode) {
          // console.log("." + tmpNodeName);
          tmpRoot = tmpNode;
        } else {
          //发生异常了
          console.log("解析失败," + jsonStr + " 的值为：" + defaultValue);
          return defaultValue;
        }
      }
      //解析完成,tmpRoot即为所求
      console.log(jsonStr + " 的值为：" + tmpNode);
      return tmpNode;
    } catch (e) {
      console.log("try catch." + e);
      return defaultValue;
    }
  }
}