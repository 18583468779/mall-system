import ShopcartModel from "../../../modules/decormodel/shopcart";

export type ShopCartRaw = Pick<
  ShopcartModel,
  | "bookisbn"
  | "bookname"
  | "bookprice"
  | "userid"
  | "purcharsenum"
  | "bookpicname"
>;
