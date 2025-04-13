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

interface FlatCategory {
  firstctgyid: number;
  firstctgyname: string;
  secondctgyid: number | null; // 允许null值
  secctgyname: string | null;
  thirdctgyid: number | null;
  thirdctgyname: string | null;
}

export function convertToTree(
  flatData: FlatCategory[],
  showThird = true
): FirstCtgy[] {
  // 创建一级分类Map
  const firstMap = new Map<number, FirstCtgy>();

  // 第一遍遍历：创建所有一级分类
  flatData.forEach((item) => {
    if (!firstMap.has(item.firstctgyid)) {
      firstMap.set(item.firstctgyid, {
        firstctgyId: item.firstctgyid,
        firstctgyname: item.firstctgyname,
        secondCtgys: [],
      });
    }
  });

  // 第二遍遍历：处理二级分类
  const secondMap = new Map<string, SecondCtgy>();
  flatData.forEach((item) => {
    if (item.secondctgyid !== null) {
      const key = `${item.firstctgyid}-${item.secondctgyid}`;
      if (!secondMap.has(key)) {
        let obj: SecondCtgy = {
          secondctgyid: item.secondctgyid,
          secctgyname: item.secctgyname || "未命名二级分类",
        };
        if (showThird) {
          obj.thirdCtgys = [];
        }
        secondMap.set(key, obj);

        // 挂载到一级分类
        const first = firstMap.get(item.firstctgyid)!;
        first.secondCtgys.push(secondMap.get(key)!);
      }
    }
  });

  // 第三遍遍历：处理三级分类
  flatData.forEach((item) => {
    if (item.thirdctgyid !== null && item.secondctgyid !== null) {
      const key = `${item.firstctgyid}-${item.secondctgyid}`;
      const second = secondMap.get(key);
      if (second && showThird) {
        second.thirdCtgys?.push({
          thirdctgyid: item.thirdctgyid,
          thirdctgyname: item.thirdctgyname || "未命名三级分类",
        });
      }
    }
  });

  return Array.from(firstMap.values());
}
