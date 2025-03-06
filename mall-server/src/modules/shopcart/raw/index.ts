import ShopcartModel from "../../decormodel/shopcart";

export type ShopCartRaw = Pick<
  ShopcartModel,
  | "bookisbn"
  | "bookname"
  | "bookprice"
  | "userid"
  | "purcharsenum"
  | "bookpicname"
>;

export type ShopCartRaw_ = Pick<
  ShopcartModel,
  | "shopcartid"
  | "bookisbn"
  | "bookname"
  | "bookprice"
  | "userid"
  | "purcharsenum"
  | "bookpicname"
>;
