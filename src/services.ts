import { request } from 'umi';

export async function queryBookkeeping(params): Promise<any> {
  return await request('/api/bookkeeping', { params });
}

export async function queryBookkeepingSummary(): Promise<any> {
  return await request('/api/bookkeeping/summary');
}

export async function ImportBookkeeping(data): Promise<any> {
  return await request('/api/bookkeeping/import', {
    method: 'post',
    data,
    requestType: 'form',
  });
}

export async function removeBookkeeping(data): Promise<any> {
  return await request(`/api/bookkeeping/${data.id}/delete`, {
    method: 'post',
    data,
  });
}

export async function createBookkeeping(data): Promise<any> {
  return await request(`/api/bookkeeping`, {
    method: 'post',
    data,
  });
}

export async function updateBookkeeping(data): Promise<any> {
  return await request(`/api/bookkeeping/${data.id}`, {
    method: 'post',
    data,
  });
}
