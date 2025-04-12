interface FlatCategory {
  firstctgyId: number;
  firstctgyname: string;
  secondctgyid: number;
  secctgyname: string;
  thirdctgyid: number;
  thirdctgyname: string;
}

interface ThirdCtgy {
  thirdctgyid: number;
  thirdctgyname: string;
}

interface SecondCtgy {
  secondctgyid: number;
  secctgyname: string;
  thirdCtgys?: ThirdCtgy[];
}

interface FirstCtgy {
  firstctgyId: number;
  firstctgyname: string;
  secondCtgys: SecondCtgy[];
}

export function convertToTree(
  flatData: FlatCategory[],
  haveThird = true
): FirstCtgy[] {
  // 使用 Map 存储一级分类
  const firstCtgyMap = new Map<number, FirstCtgy>();

  for (const item of flatData) {
    // 处理一级分类
    let firstCtgy = firstCtgyMap.get(item.firstctgyId);
    if (!firstCtgy) {
      firstCtgy = {
        firstctgyId: item.firstctgyId,
        firstctgyname: item.firstctgyname,
        secondCtgys: [],
      };
      firstCtgyMap.set(item.firstctgyId, firstCtgy);
    }

    // 处理二级分类
    let secondCtgy = firstCtgy.secondCtgys.find(
      (s) => s.secondctgyid === item.secondctgyid
    );
    if (!secondCtgy && haveThird) {
      secondCtgy = {
        secondctgyid: item.secondctgyid,
        secctgyname: item.secctgyname,
        thirdCtgys: [],
      };
    } else {
      secondCtgy = {
        secondctgyid: item.secondctgyid,
        secctgyname: item.secctgyname,
      };
    }

    firstCtgy.secondCtgys.push(secondCtgy);

    if (haveThird) {
      // 处理三级分类
      secondCtgy?.thirdCtgys?.push({
        thirdctgyid: item.thirdctgyid,
        thirdctgyname: item.thirdctgyname,
      });
    }
  }

  return Array.from(firstCtgyMap.values());
}
