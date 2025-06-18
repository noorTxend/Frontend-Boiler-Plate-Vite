import { getRolloverBaseUrl } from "@/utils/apiUtils";
import axiosInstance from "./interceptors";
import { requestMethods } from "@/constants/constant";

const rolloverRequestWrapper = async (
  method: string,
  url: string,
  data?: any,
  contentType?: string
) => {
  const headers = {
    "Content-Type": contentType || "application/json",
  };

  try {
    const response = await axiosInstance({
      method,
      url: getRolloverBaseUrl(url),
      headers,
      data,
    });

    return response.data;
  } catch (error: any) {
    // console.log("This is error => ", error);
    const Extracterror = error.response.data.ExceptionDetails;
    console.log(
      "This is error from requestWrapper => ",
      error.response.data.ExceptionDetails.ErrorDescription
    );
    throw new Error(error.response.data.ExceptionDetails.ErrorDescription);
    // return `${Extracterror ? Extracterror : error.message}`;
  }
};

//testing wrapper
const blobRequestWrapper = async (
  method: string,
  url: string,
  data?: any,
  contentType?: string
) => {
  const headers = {
    "Content-Type": contentType || "application/json",
  };

  try {
    const response = await axiosInstance({
      method,
      url: getRolloverBaseUrl(url),
      headers,
      data,
      responseType: "blob", // Ensure we get raw binary data
    });

    // Extract content type and disposition from headers
    const contentTypeHeader = response.headers["content-type"];
    const contentDispositionHeader = response.headers["content-disposition"];

    // Get the file name from the Content-Disposition header
    let fileName = "downloaded_file";
    if (contentDispositionHeader) {
      const match = contentDispositionHeader.match(/filename="?(.+)"?/);
      if (match && match[1]) {
        fileName = decodeURIComponent(match[1]);
      }
    }

    // Create a Blob and trigger the download
    const blob = new Blob([response.data], { type: contentTypeHeader });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link); // Append to the DOM for the click event
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up

    return { success: true, message: "File downloaded successfully" };
  } catch (error: any) {
    const apiError =
      error?.response?.data?.message?.ExceptionDetails?.ErrorDescription;
    throw new Error(`${apiError ? apiError : error.message}`);
  }
};

// ending testing wrapper
// const blobRequestWrapper = async (
//   method: string,
//   url: string,
//   data?: any,
//   contentType?: string
// ) => {
//   const headers = {
//     "Content-Type": contentType || "application/json",
//   };

//   try {
//     const response = await axiosInstance({
//       method,
//       url: getRolloverBaseUrl(url),
//       headers,
//       data,
//       responseType: "blob",
//     });

//     return response.data;
//   } catch (error: any) {
//     const apiError =
//       error?.response?.data?.message?.ExceptionDetails?.ErrorDescription;
//     throw new Error(`${apiError ? apiError : error.message}`);
//   }
// };
export const RolloverPost = (url: string, data: any) =>
  rolloverRequestWrapper(requestMethods.POST, url, data);
export const downloadBlobPost = (url: string, data: any) =>
  blobRequestWrapper(requestMethods.POST, url, data);
