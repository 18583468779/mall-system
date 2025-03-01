interface style {
  left: number;
  top: number;
}

export interface BookInfo {
  ISBN: string;
  bookname: string;
  author: string;
  publishid: number;
  publishername: string;
  monthsalecount: number; //月销量
  purcharsenum: number;
  bookpicname: string;
  secondctgyid: number;
  thirdctgyid: number;
  discountprice: number;
  discount: number; //折扣
  disPercent: number; //折扣*1gg
  originalprice: number;
  integerpart: number; //整数部分
  fractpart: number; //小数部分
  isDecimal: boolean; //是否是小数
  ranking: number;
}
