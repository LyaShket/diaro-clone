import {ITag} from "./tag";

export interface IEntry {
  id?: string
  title?: string
  author?: string
  body?: string
  text?: string
  tags?: ITag[]
  category?: string
  mood?: string
  created?: number
  updated?: number
}
