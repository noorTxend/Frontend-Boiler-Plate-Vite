import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { COMPONENT_LIST } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchComponentList = (pageId: any) => {
  const [componentList, setComponentList] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const whiteLabelPartnerId = useSelector(
    (state: RootState) => state.partner.whiteLabelPartnerId
  );

  const fetchcomponentList = async () => {
    try {
      const componentList = await COMPONENT_LIST(pageId, whiteLabelPartnerId);
      if (componentList) {
        const data = componentList;
        setLoading(true);
        setComponentList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setLoading(false);
    } catch (err: any) {
      console.log("Failed to fetch component list:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcomponentList();
  }, []);

  return { componentList, loading, error, refetch: fetchcomponentList };
};

export default useFetchComponentList;
