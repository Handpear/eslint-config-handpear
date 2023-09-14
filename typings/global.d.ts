/** 索引键类型 */
type Key = string | number | symbol;
/** 索引对象类型 */
type Recordable<K extends Key = Key, T = any> = Record<K, T>;
/** 描述对象类型 */
interface Obj<T = any> {
  [key: Key]: T;
}
/** 描述函数类型 */
type Fn = (...args: any[]) => any;
