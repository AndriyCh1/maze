import axios from "axios";

export default class HttpService {
  private baseUrl;
  private fetchService;

  constructor(
    baseUrl = process.env.REACT_APP_SERVER_URL,
    fetchService = axios
  ) {
    this.baseUrl = baseUrl;
    this.fetchService = fetchService;
  }

  private buildFullUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  public async get<T>(url: string) {
    return this.fetchService.get<T>(this.buildFullUrl(url));
  }

  public async post<T, D>(url: string, data: D) {
    return this.fetchService.post<T>(this.buildFullUrl(url), data);
  }

  public async put<T, D>(url: string, data: D) {
    return this.fetchService.put<T>(this.buildFullUrl(url), data);
  }

  public async delete<T>(url: string) {
    return this.fetchService.delete<T>(this.buildFullUrl(url));
  }
}

const httpService = new HttpService();
export { httpService };
