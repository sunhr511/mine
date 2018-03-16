import {LODOP} from '../../../static/vendor/a'
export function asd (LogName, OrdBillID, GoodsCode, StarTime, Send, SendTel, End, EndTel, RecName, RecTel, GoodsName, GoodsNum, GoodsPack, Pay, PayType, Collection, CollectionType, Freight, Insured, Count, Consignor, ConsignorTel, Advertisement) {
  let Tm = 10 // 小票上边距
  let Lm = 12
  let pageWidth = 800 // 小票宽度
  let rowHeight = 20 // 小票行距
  LODOP.PRINT_INIT('优道小票打印')
  // LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)
  // LODOP.ADD_PRINT_IMAGE(Tm, Lm + 20, 80, 80, 'D:/桌面/文档/Work/tmsdemo/src/assets/shouyeImg/appand.png')
  // LODOP.SET_PRINT_STYLEA(0, 'Stretch', 1)
  // // LODOP.SET_SHOW_MODE('BKIMG_LEFT', 32)
  // // LODOP.SET_SHOW_MODE('BKIMG_TOP', 10)
  // // LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '21.17mm')
  // // LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '21.17mm')
  // // LODOP.SET_SHOW_MODE('BKIMG_PRINT', true)
  // LODOP.ADD_PRINT_TEXT(Tm, 135, 110, 80, '微信扫描二维码关注优合联运公众平台')
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  // LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  // LODOP.SET_PRINT_STYLEA(0, 'LineSpacing', 10)
  // Tm += 90
  // LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  // Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm, 246, rowHeight, LogName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(Tm + 5, 210, pageWidth, rowHeight, '(存根)')
  Tm += rowHeight
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '咨询电话:')
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // // LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  // LODOP.ADD_PRINT_TEXT(Tm + 2, 95, pageWidth, rowHeight, LogTel)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '运单号:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 84, pageWidth, rowHeight, OrdBillID)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '货号:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 72, pageWidth, rowHeight, GoodsCode)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '受理日期:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 101, pageWidth, rowHeight, StarTime)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 5, 95, rowHeight, Send)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  LODOP.ADD_PRINT_TEXT(Tm - 3, 117, 35, 20, '--')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 128, 95, rowHeight, End)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  Tm += rowHeight
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 5, 95, rowHeight, SendTel)
  // LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 128, 95, rowHeight, EndTel)
  // LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '收货人:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 65, pageWidth, rowHeight, RecName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 120, pageWidth, rowHeight, '电话:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 150, pageWidth, rowHeight, RecTel)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '发货人:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 65, pageWidth, rowHeight, Consignor)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 120, pageWidth, rowHeight, '电话:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 150, pageWidth, rowHeight, ConsignorTel)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '名称:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, GoodsName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '件数:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, GoodsNum)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '包装:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, GoodsPack)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '运费:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Pay)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '方式:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, PayType)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '代收:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Collection)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '方式:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, CollectionType)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '送货:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Freight)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '保价:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, Insured)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '应收:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Count)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  // LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  // Tm += 9
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '发货人:')
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, Consignor)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // Tm += rowHeight
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '发货电话:')
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, ConsignorTel)
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  Tm += 15
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '客户签字:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += 8
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  // Tm += 8
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, Advertisement)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // Tm += rowHeight
  // LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  LODOP.ADD_PRINT_TEXT(Tm + 2, Lm + 100, pageWidth, rowHeight, (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString())
  Tm += rowHeight
  Tm += 8
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 3, 1)
  // 客户联
  // Tm += 9
  Tm += rowHeight
  LODOP.ADD_PRINT_IMAGE(Tm, Lm + 20, 80, 80, "<img border='0' src='http://www.iun56.com/images/uhgzh.jpg' />")
  LODOP.SET_PRINT_STYLEA(0, 'Stretch', 1)
  // LODOP.ADD_PRINT_SETUP_BKIMG('D:\\桌面\\文档\\Work\\tmsdemo\\src\\assets\\shouyeImg\\appand.png')
  // LODOP.SET_SHOW_MODE('BKIMG_LEFT', Lm + 20)
  // LODOP.SET_SHOW_MODE('BKIMG_TOP', Tm)
  // LODOP.SET_SHOW_MODE('BKIMG_WIDTH', '21.17mm')
  // LODOP.SET_SHOW_MODE('BKIMG_HEIGHT', '21.17mm')
  // LODOP.SET_SHOW_MODE('BKIMG_PRINT', true)
  LODOP.ADD_PRINT_TEXT(Tm, 135, 110, 80, '微信扫描二维码关注优合联运公众平台')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'LineSpacing', 10)
  Tm += 90
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm, 246, rowHeight, LogName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(Tm + 5, 210, pageWidth, rowHeight, '(客户联)')
  // Tm += rowHeight
  // LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '咨询电话:')
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  // LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  // // LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  // LODOP.ADD_PRINT_TEXT(Tm + 2, 95, pageWidth, rowHeight, LogTel)
  // LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '运单号:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 84, pageWidth, rowHeight, OrdBillID)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '货号:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 72, pageWidth, rowHeight, GoodsCode)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '受理日期:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, 101, pageWidth, rowHeight, StarTime)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 5, 95, rowHeight, Send)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  LODOP.ADD_PRINT_TEXT(Tm - 3, 117, 35, 20, '--')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 13)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 128, 95, rowHeight, End)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 5, 95, rowHeight, SendTel)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 128, 95, rowHeight, EndTel)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 255, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '收货人:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, RecName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '收货电话:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, RecTel)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '名称:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, GoodsName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '件数:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, GoodsNum)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '包装:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, GoodsPack)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '运费:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Pay)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '方式:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, PayType)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '代收:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Collection)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '方式:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, CollectionType)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '送货:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Freight)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 140, pageWidth, rowHeight, '保价:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 180, pageWidth, rowHeight, Insured)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '应收:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 60, pageWidth, rowHeight, Count)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  Tm += 9
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '发货人:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, Consignor)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '发货电话:')
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 88, pageWidth, rowHeight, ConsignorTel)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  Tm += 8
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, Advertisement)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 10)
  Tm += rowHeight
  LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  LODOP.ADD_PRINT_TEXT(Tm + 2, Lm + 100, pageWidth, rowHeight, (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString())
  Tm += rowHeight
  LODOP.ADD_PRINT_TEXT(Tm, Lm + 21, pageWidth, rowHeight, '')
  // Tm += rowHeight * 3
  // LODOP.ADD_PRINT_LINE(Tm, Lm, Tm + 1, 258, 2, 1)
  LODOP.SET_PRINT_PAGESIZE(3, pageWidth, 45, '')
}
export function def (LogName, Send, End, OrdBillID, GoodsNum, RecName, Num) {
  let Tm = 10 // 小票上边距
  let Lm = 12
  let pageWidth = 800 // 小票宽度
  let rowHeight = 20 // 小票行距
  LODOP.PRINT_INITA(0, -2, pageWidth, 200, '优合联运标签打印')
  LODOP.SET_PRINT_PAGESIZE(3, pageWidth, 200, '')
  LODOP.ADD_PRINT_TEXT(Tm + 2, Lm + 100, pageWidth, rowHeight, (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString())
  LODOP.ADD_PRINT_TEXT(40, 60, 181, 50, LogName)
  LODOP.SET_PRINT_STYLEA(0, 'FontName', '微软雅黑')
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_STYLEA(0, 'Bold', 1)
  LODOP.ADD_PRINT_TEXT(91, 41, 100, 36, Send)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(91, 142, 20, 20, '→')
  LODOP.ADD_PRINT_TEXT(91, 163, 100, 37, End)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(127, 93, 123, 20, OrdBillID)
  LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(154, 164, 67, 20, GoodsNum + '件')
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.ADD_PRINT_TEXT(153, 50, 100, 20, RecName + '收')
  LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
  LODOP.SET_PRINT_COPIES(Num)
}