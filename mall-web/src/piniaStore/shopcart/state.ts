export type ShopCartType = {
  userid: number;
  checked: boolean;
  shopcartid?: number;
  bookisbn: string;
  bookname: string;
  bookpicname: string;
  bookprice: number;
  purcharsenum: number;
};

export const initShopcart: ShopCartType[] = [];
