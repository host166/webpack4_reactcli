import { request } from '@/common/utils/http';

export async function getProjectList(params){
  let res = await request({
    method: "GET",
    url: `/h5/lesson/getLessonListByGradeId.vpage`,
    querystring: params
  });

  return res;
}