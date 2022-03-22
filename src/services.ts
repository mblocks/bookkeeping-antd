import { request } from 'umi';

export async function queryBookkeeping(params): Promise<any> {
  return await request('/api/bookkeeping', { params });
}

export async function queryBookkeepingSummary(): Promise<any> {
  const res = await request('/api/bookkeeping/summary');
  return {
    ...res,
    trend: res.trend.map((v) => ({ ...v, date: v.month + '-01' })),
  };
}

export async function queryBookkeepingStatistics(name: string[]): Promise<any> {
  return await request('/api/bookkeeping/statistics', { params: { name } });
}

export async function ImportBookkeeping(data): Promise<any> {
  return await request('/api/bookkeeping/import', {
    method: 'post',
    data,
    requestType: 'form',
  });
}

export async function removeBookkeeping(data): Promise<any> {
  const res = await request(`/api/bookkeeping/${data.id}/delete`, {
    method: 'post',
    data,
    getResponse: true,
  });
  return { result: res.response.status == 200 };
}

export async function createBookkeeping(data): Promise<any> {
  const res = await request(`/api/bookkeeping`, {
    method: 'post',
    data,
    getResponse: true,
  });
  return { result: res.response.status == 200 };
}

export async function updateBookkeeping(data): Promise<any> {
  const res = await request(`/api/bookkeeping/${data.id}`, {
    method: 'post',
    data,
    getResponse: true,
  });
  return { result: res.response.status == 200 };
}
