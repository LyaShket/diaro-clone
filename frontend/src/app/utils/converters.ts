import {HttpParams} from "@angular/common/http";
import {IQuery} from "../shared/interfaces/query";

export function queryToHttpParams(query: IQuery): HttpParams {
  let params = new HttpParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value?.length > 0) {
      params = params.append(key, value);
    }
  });

  return params;
}
