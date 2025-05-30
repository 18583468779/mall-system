const secThrCtgys = {
  data: [
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 7,
      thirdname: "图画故事",
      secctgyid: 1,
    },
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 8,
      thirdname: "认知卡片",
      secctgyid: 1,
    },
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 9,
      thirdname: "益智游戏书",
      secctgyid: 1,
    },
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 10,
      thirdname: "布书",
      secctgyid: 1,
    },
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 11,
      thirdname: "儿歌童谣",
      secctgyid: 1,
    },
    {
      secondctgyid: 1,
      secctgyname: "0-2岁",
      firstctgyId: 1,
      thirdctgyid: 12,
      thirdname: "亲子阅读",
      secctgyid: 1,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 13,
      thirdname: "绘本故事",
      secctgyid: 2,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 14,
      thirdname: "科普百科",
      secctgyid: 2,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 15,
      thirdname: "数学启蒙",
      secctgyid: 2,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 16,
      thirdname: "手工制作",
      secctgyid: 2,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 17,
      thirdname: "拼音学习",
      secctgyid: 2,
    },
    {
      secondctgyid: 2,
      secctgyname: "3-6岁",
      firstctgyId: 1,
      thirdctgyid: 18,
      thirdname: "英语启蒙",
      secctgyid: 2,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 19,
      thirdname: "儿童文学",
      secctgyid: 3,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 20,
      thirdname: "历史故事",
      secctgyid: 3,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 21,
      thirdname: "科学实验",
      secctgyid: 3,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 22,
      thirdname: "艺术绘画",
      secctgyid: 3,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 23,
      thirdname: "写作指导",
      secctgyid: 3,
    },
    {
      secondctgyid: 3,
      secctgyname: "7-10岁",
      firstctgyId: 1,
      thirdctgyid: 24,
      thirdname: "数学思维",
      secctgyid: 3,
    },
  ],
  msg: "",
  code: 200,
};

type ThirdCategory = {
  thirdctgyid: number;
  thirdname: string;
};

type SecondCategory = {
  secondctgyid: number;
  secctgyname: string;
  thirdCategories: ThirdCategory[];
};

type DataItem = {
  secondctgyid: number;
  secctgyname: string;
  firstctgyId: number;
  thirdctgyid: number;
  thirdname: string;
  secctgyid: number;
};

type ApiResponse = {
  data: DataItem[];
  msg: string;
  code: number;
};

function transformData(apiResponse: ApiResponse): SecondCategory[] {
  const groupedData: { [key: number]: SecondCategory } = {};

  apiResponse.data.forEach((item) => {
    if (!groupedData[item.secondctgyid]) {
      groupedData[item.secondctgyid] = {
        secondctgyid: item.secondctgyid,
        secctgyname: item.secctgyname,
        thirdCategories: [],
      };
    }

    groupedData[item.secondctgyid].thirdCategories.push({
      thirdctgyid: item.thirdctgyid,
      thirdname: item.thirdname,
    });
  });

  return Object.values(groupedData);
}

const transformedData = transformData(secThrCtgys);
console.dir(JSON.stringify(transformedData));
