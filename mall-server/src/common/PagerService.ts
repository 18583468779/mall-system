// src/common/PagerService.ts
interface IPaginationOptions<T> {
  page: number;
  pageSize: number;
  sortField?: string;
  ascOrDesc?: "asc" | "desc";
  where?: any;
  model: any;
  attributes?: string[];
  include?: any[]; // 新增关联配置
}

export class PaginationService {
  static async paginate<T>(
    options: IPaginationOptions<T>
  ): Promise<any> {
    const { 
      page, 
      pageSize, 
      sortField, 
      ascOrDesc, 
      where, 
      model, 
      attributes,
      include // 接收关联配置
    } = options;

    const offset = (page - 1) * pageSize;

    try {
      // 使用Sequelize的findAndCountAll代替原始SQL
      const { count, rows } = await model.findAndCountAll({
        attributes,
        where,
        include, // 包含关联配置
        order: sortField ? [[sortField, ascOrDesc]] : undefined,
        offset,
        limit: pageSize,
        distinct: true, // 避免count统计错误
        raw: false, // 保持实例格式以便处理关联
        nest: true // 嵌套关联数据
      });

      return {
        total: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: page,
        data: rows.map((item: any) => item.get({ plain: true })) // 转换为普通对象
      };
    } catch (error) {
      console.error("分页查询失败：", error);
      throw error;
    }
  }
}
