import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { INTERNAL_PARTICIPANT_UPLOAD_RQ } from "./api/userService";
import { toast } from "react-hot-toast";
import { UploadParticipantBodySchema } from "@/constants/validations";
import {
  fileToBase64,
} from "@/utils/helpers";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from "@/layouts/skeletons/toastUtils";

const useUploadParticipant = (
  file: File | null,  
  closeModal: () => void,
   tmpport:any| null
  ) =>{
  const [uploadParticipant, setUploadParticipant] = useState<
    (() => void) | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const portfolioPermId =tmpport?? useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const agentPermId = useSelector(
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
    if (file && portfolioPermId && agentPermId) {
      setLoading(true);
      try {
        const bufferData = await fileToBase64(file);
        const apiBody = {
          FileName: file.name,
          FileData: bufferData,
          PortfolioPermId: Number(portfolioPermId),
          AgentPermId: Number(agentPermId),
        };
        const validateBody = UploadParticipantBodySchema.parse(apiBody);
        await INTERNAL_PARTICIPANT_UPLOAD_RQ(
          apiBody,
          accessCode,
          partnerPermId,
          apiKey
        );
        toast.success(SUCCESS_MESSAGES.FILE_UPLOADED);
        setTimeout(() => {
          location.reload();
        }, 3000);
        // console.log(response.data);
        closeModal();
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message;
        // console.log("This is error => ", err);
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setUploadParticipant(() => uploadFile);
  }, [file, portfolioPermId, agentPermId]);
  return { uploadParticipant, loading, error };
};

export default useUploadParticipant;
