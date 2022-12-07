import { ITag } from '../../interfaces/tag';

export class AddTag {
  static readonly type = '[Tag] Add Tag';
  constructor(public tag: ITag) {}
}

export class LoadTags {
  static readonly type = '[Tag] Load Tags';
}

export class LoadTagsComplete {
  static readonly type = '[Tag] Load Tags Complete';
  constructor(public tags: ITag[]) {}
}

export class LoadTagsError {
  static readonly type = '[Tag] Load Tags Error';
  constructor(public error: any) {}
}
