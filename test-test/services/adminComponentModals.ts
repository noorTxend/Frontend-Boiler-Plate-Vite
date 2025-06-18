import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";
import { MODAL_LIST } from "./api/adminService";

const useFetchComponentModalList = (componentId: string) => {
  const [componentModalList, setComponentModalList] = useState<any>(null);
  const [fetchingModal, setfetchingModal] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchcomponentModalList = async () => {
    try {
      const componentModalList = await MODAL_LIST(componentId);
      if (componentModalList) {
        const data = componentModalList;
        setfetchingModal(true);
        setComponentModalList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setfetchingModal(false);
    } catch (err: any) {
      console.log("Failed to fetch component access list:", err);
      setError(err.message);
      setfetchingModal(false);
    }
  };

  useEffect(() => {
    fetchcomponentModalList();
  }, [componentId]);

  return {
    componentModalList,
    fetchingModal,
    error,
    refetch: fetchcomponentModalList,
  };
};

export default useFetchComponentModalList;
