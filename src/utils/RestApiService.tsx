import { BeerItem } from "./types";

export class RestApiService {
  async fetchApi(url: string, method: string = "GET") {
    const params = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(url, params);
    if (res.status === 400) {
      return Promise.reject(res.statusText);
    }
    return await res.json();
  }

  async getBeers(): Promise<BeerItem[]> {
    try {
      return await this.fetchApi(`https://api.punkapi.com/v2/beers`);
    } catch (e) {
      alert("Ошибка при получении данных");
      throw e;
    }
  }
}

export const restApiService = new RestApiService();
