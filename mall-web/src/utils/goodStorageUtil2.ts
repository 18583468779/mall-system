const shopcartList = [
  {
    shopcartid: 551,
    bookisbn: "978-7-255",
    bookname: "字母表谴案.六年级趣味书",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
  {
    shopcartid: 553,
    bookisbn: "978-7-205",
    bookname: "瓦尔登湖:世界上最修心的地方",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
  {
    shopcartid: 555,
    bookisbn: "978-7-206",
    bookname: "活着，有点兴致",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
  {
    shopcartid: 556,
    bookisbn: "978-7-214",
    bookname: "紫图经典文库三岛由纪夫大集合(1册)",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
  {
    shopcartid: 557,
    bookisbn: "978-7-207",
    bookname: "白夜行",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
  {
    shopcartid: 558,
    bookisbn: "978-7-259",
    bookname: "紫图经典文床三岛由纪夫大集合(10册)",
    bookpicname: "紫图经典文库.png",
    bookprice: 33,
  },
];

const newAddShopCart = {
  shopcartid: 559,
  bookisbn: "978-7-104",
  bookname: "cbssda",
  bookpicname: "undefined",
  bookprice: 23,
};
const newAddShopCart2 = {
  shopcartid: 600,
  bookisbn: "978-7-104",
  bookname: "cba",
  bookpicname: "undefined",
  bookprice: 23,
};

type EleOfArr<T> = T extends Array<infer E> ? E : never;
// type SC = keyof EleOfArr<typeof shopcartList>;

function getValArrOfObj<
  T extends Array<any>,
  K extends keyof EleOfArr<T>,
  E = EleOfArr<T>
>(t: T, k: K) {
  return t.map(({ [k]: v }: E) => v, {});
}
