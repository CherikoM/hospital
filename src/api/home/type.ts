import { ResponseData } from "@/api/type"
import { Hospital } from "@/api/type"

// 首页相关类型



// 医院数组类型
export type Hospitals = Hospital[]

// 医院列表接口返回类型
export interface HospitalResponseData extends ResponseData {
  data: {
    content: Hospitals,
    pageable: {
      sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean,
      },
      pageNumber: number,
      pageSize: number,
      offset: number,
      unpaged: boolean,
      paged: boolean,
    },
    totalPages: number,
    last: boolean,
    totalElements: number,
    first: boolean,
    sort: {
      sorted: boolean,
      unsorted: boolean,
      empty: boolean,
    },
    numberOfElements: number,
    size: number,
    number: number,
    empty: boolean,
  },
}

// 医院筛选标签类型
export interface HospitalTag {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number
  param: {},
  parentId: number,
  name: string,
  value: string,
  dictCode: string,
  hasChildren: boolean
}

// 医院筛选标签数组类型
export type HospitalTags = HospitalTag[]

// 医院筛选标签接口返回类型
export interface HospitalTagResponseData extends ResponseData {
  data: HospitalTags
}

export enum Tag {
  LEVEL = "等级",
  REGION = "地区"
}

export interface HospitalSearchResponseData extends ResponseData {
  data: Hospitals
}