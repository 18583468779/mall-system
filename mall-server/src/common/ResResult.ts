/**
 * 相应处理
 */

enum Code {
  SUCCESS = 200,
  ERROR = 500,
  TOKENERROR = 401,
}

class ResResult {
  static success(data: any = undefined, msg: any = "") {
    const code: Code = Code.SUCCESS;
    return { data, msg, code };
  }
  static fail(msg: any = "", isAuth = false) {
    const code: Code = isAuth ? Code.TOKENERROR : Code.ERROR;
    return { undefined, msg, code };
  }
}

export let { success, fail } = ResResult;
