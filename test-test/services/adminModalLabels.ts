import { useEffect, useState } from "react";
import { MODAL_INPUTS_LIST } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchModalLabelsList = (modalId: string) => {
  const [modalLabelsList, setModalLabelsList] = useState<any>(null);
  const [fetchingModalLabels, setFetchingModalLabels] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModalLabelsList = async () => {
    try {
      const modalLabelsList = await MODAL_INPUTS_LIST(modalId);
      if (modalLabelsList) {
        const data = modalLabelsList;
        setFetchingModalLabels(true);
        setModalLabelsList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setFetchingModalLabels(false);
    } catch (err: any) {
      console.log("Failed to fetch modal input list:", err);
      setError(err.message);
      setFetchingModalLabels(false);
    }
  };

  useEffect(() => {
    fetchModalLabelsList();
  }, [modalId]);

  return {
    modalLabelsList,
    fetchingModalLabels,
    error,
    refetch: fetchModalLabelsList,
  };
};

export default useFetchModalLabelsList;
