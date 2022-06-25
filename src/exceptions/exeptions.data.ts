export interface ExceptionsDataInterface {
  [key: string]: { page: string; data: { [key: string]: any } };
}

export const ExceptionsData: ExceptionsDataInterface = {
  '403': {
    page: 'pages/Forbidden/Forbidden.hbs',
    data: { css: ['Forbidden'], login: true },
  },
};
