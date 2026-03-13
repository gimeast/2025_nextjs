export const API_URL = 'http://localhost:3000';

//QueryKey Factory 라고 부른다.
export const QUERY_KEYS = {
  todo: {
    all: ['todo'],
    list: ['todo', 'list'],
    detail: (id: string) => ['todo', 'detail', id],
  },
};
