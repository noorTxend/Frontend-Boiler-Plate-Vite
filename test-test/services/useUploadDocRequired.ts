import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { INTERNAL_UPLOAD_REQUIRED_DOCUMENT_RQ } from "./api/userService";
import { toast } from "react-hot-toast";
import { fileToBase642 } from "@/utils/helpers";
import { SUCCESS_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useUploadrequiredDocs = (
  file: File | null,
  docPermId: any,
  closeModal: () => void
) => {
  const [uploadRequiredDocs, setUploadRequiredDocs] = useState<
    (() => void) | null
  >(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const portfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const accessCode = useSelector(
    (state: RootState) => state.auth.AccessCode as string
  );
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const uploadFile = async () => {
    if (file && portfolioPermId && docPermId) {
      setLoading(true);
      try {
        const bufferData = await fileToBase642(file);
        const apiBody = {
          DocumentName: file.name,
          DocumentPermId: docPermId,
          FileData: bufferData,
          PortfolioPermId: Number(portfolioPermId),
        };
        // console.log("This is API body => ", bufferData);
        await INTERNAL_UPLOAD_REQUIRED_DOCUMENT_RQ(
          apiBody,
          accessCode,
          partnerPermId,
          apiKey
        );
        toast.success(SUCCESS_MESSAGES.FILE_UPLOADED);
        closeModal();
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setUploadRequiredDocs(() => uploadFile);
  }, [file, portfolioPermId, docPermId]);
  return { uploadRequiredDocs, loading, error };
};

export default useUploadrequiredDocs;
