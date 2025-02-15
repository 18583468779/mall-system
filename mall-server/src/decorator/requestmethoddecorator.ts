import "reflect-metadata";
export function reProcess(methodType: string) {
  return function (reqPath: string) {
    /**
     *  保存方法和路径，提供后面的类装饰器使用
     */
    return function MyMethodDecorator(
      targetClassPrototype: any,
      methodname: string,
      methodDecri: PropertyDescriptor
    ) {
      Reflect.defineMetadata("path", reqPath, targetClassPrototype, methodname);
      Reflect.defineMetadata(
        "methodType",
        methodType,
        targetClassPrototype,
        methodname
      );
    };
  };
}

const get = reProcess("get");
const post = reProcess("post");
const put = reProcess("put");
const del = reProcess("delete");

export { get, post, put, del };
