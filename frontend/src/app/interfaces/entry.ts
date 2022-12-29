import {ITag} from "./tag";
import {ICategory} from "./category";

export interface IEntry {
  id?: string
  title?: string
  author?: string
  body?: string
  text?: string
  tags?: ITag[]
  category?: ICategory
  mood?: string
  public?: boolean
  created?: number
  updated?: number
}
