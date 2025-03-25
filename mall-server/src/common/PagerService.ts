import { Sequelize } from "sequelize";

// 分页查询的通用接口
interface IPaginationOptions<T> {
  page: number; // 当前页码
  pageSize: number; // 每页大小
  sortField?: string; // 排序字段
  ascOrDesc?: "asc" | "desc"; // 排序方式
  where?: any; // 查询条件
  model: any; // 模型
  attributes?: string[]; // 需要查询的字段
}

interface IPaginationResult<T> {
  total: number; // 总记录数
  totalPages: number; // 总页数
  currentPage: number; // 当前页码
  data: T[]; // 当前页数据
}

class PaginationService {
  /**
   * 通用分页查询方法
   * @param options 分页查询选项
   * @returns 分页查询结果
   */
  static async paginate<T>(
    options: IPaginationOptions<T>
  ): Promise<IPaginationResult<T>> {
    const { page, pageSize, sortField, ascOrDesc, where, model, attributes } =
      options;

    const offset = (page - 1) * pageSize;

    const queryOptions: any = {
      raw: true,
      offset,
      limit: pageSize,
      where: where || {},
    };

    if (sortField && ascOrDesc) {
      queryOptions.order = [[sortField, ascOrDesc]];
    }

    if (attributes) {
      queryOptions.attributes = attributes;
    }

    try {
      // 构建查询 SQL
      let querySql = `SELECT * FROM ${model.getTableName()}`;

      // 添加 WHERE 条件
      if (where && Object.keys(where).length > 0) {
        querySql +=
          " WHERE " +
          Object.keys(where)
            .map((key) => `${key} = :${key}`)
            .join(" AND ");
      }

      // 添加排序
      if (sortField && ascOrDesc) {
        querySql += ` ORDER BY ${sortField} ${ascOrDesc}`;
      }

      // 添加分页
      querySql += ` LIMIT ${pageSize} OFFSET ${offset}`;

      // 执行查询
      const [results] = await model.sequelize!.query(querySql, {
        replacements: where,
        raw: true,
      });

      // 查询总记录数
      const countResult = await model.count({
        where: where,
      });

      return {
        total: countResult,
        totalPages: Math.ceil(countResult / pageSize),
        currentPage: page,
        data: results,
      };
    } catch (error) {
      console.error("分页查询失败：", error);
      throw error;
    }
  }
}

export default PaginationService;
