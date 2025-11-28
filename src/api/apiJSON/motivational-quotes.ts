import { IMotivationalQuotesData } from '../../types/request_data/master';

export const MOTIVATIONAL_QUOTES_JSON = {
  addMotivationalQuotes: ({ quote, file }: IMotivationalQuotesData) => {
    let form = new FormData();
    if (quote !== undefined) {
      form.append('quote', quote);
    }
    if (file !== undefined && file !== null) {
      form.append('file', file);
    }
    return form
  },
}
