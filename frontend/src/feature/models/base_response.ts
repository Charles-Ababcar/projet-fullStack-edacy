export type BaseResponse<T>={
  imagePath: unknown;
    status:boolean;
sessionExpired:boolean;
totalPage?:number;
data:T
}