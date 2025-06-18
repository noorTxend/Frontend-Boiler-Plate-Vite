import { getAdminApiUrl } from "@/utils/apiUtils";
import adminAxiosInstance from "./adminInterceptors";
import { requestMethods } from "@/constants/constant";

const getRequestWrapper = async (method: string, url: string) => {
  try {
    const response = await adminAxiosInstance({
      method,
      url: getAdminApiUrl(url),
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const GetRequest = (url: string) =>
  getRequestWrapper(requestMethods.GET, url);
