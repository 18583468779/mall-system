// 类型定义层
interface Reply {
  replyid: number | null;
  replycontent: string | null;
  replydate: string | null;
  evalid: number | null;
  replyor: string | null;
}

interface Evaluation {
  evaluateid: number;
  content: string;
  evaluator: string;
  isbn: string;
  headportrait: string;
  givealikenum: number;
  evaluatedegree: number;
  pubdate: string;
  isanonymous: boolean;
  replies: Reply[]; // 嵌套回复数组
}

// 数据处理工具函数
export class EvaluationTransformer {
  static transform(rawData: any[]) {
    const evaluationMap = new Map<number, Evaluation>();

    rawData.forEach((item) => {
      const evalId = item.evaluateid;

      // 初始化评价主体
      if (!evaluationMap.has(evalId)) {
        evaluationMap.set(evalId, {
          evaluateid: evalId,
          content: item.content,
          evaluator: item.evaluator,
          isbn: item.isbn,
          headportrait: item.headportrait,
          givealikenum: item.givealikenum,
          evaluatedegree: item.evaluatedegree,
          pubdate: item.pubdate,
          isanonymous: Boolean(item.isanonymous),
          replies: [],
        });
      }

      // 处理回复数据
      if (item.replyid !== null) {
        const reply: Reply = {
          replyid: item.replyid,
          replycontent: item.replycontent,
          replydate: item.replydate,
          evalid: item.evalid,
          replyor: item.replyor,
        };

        evaluationMap.get(evalId)?.replies.push(reply);
      }
    });

    return Array.from(evaluationMap.values());
  }
}
