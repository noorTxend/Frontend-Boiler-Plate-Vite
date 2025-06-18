import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-hot-toast";
import { DOWNLOAD_DOCS } from "./api/userService";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/layouts/skeletons/toastUtils";

const useDownloadDocs = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const portfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const downloadDocument = async (DocumentPermId: string) => {
    setLoading((prev) => ({ ...prev, [DocumentPermId]: true }));
    try {
      // Call the API to download the document
      const response = await DOWNLOAD_DOCS(
        portfolioPermId,
        DocumentPermId,
        AccessCode,
        partnerPermId,
        apiKey
      );

      setLoading((prev) => ({ ...prev, [DocumentPermId]: false }));

      // Check if the wrapper returned a success message
      if (response?.success) {
        toast.success(SUCCESS_MESSAGES.DOCS_DOWNLOADED);
      } else {
        toast.error(ERROR_MESSAGES.DOCS_NOT_FOUND);
      }
    } catch (error: any) {
      setLoading((prev) => ({ ...prev, [DocumentPermId]: false }));

      const errorMessage =
        error.response?.data?.message || ERROR_MESSAGES.DOCS_DOWN_FAILED;
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return { downloadDocument, loading, error };
};

export default useDownloadDocs;
