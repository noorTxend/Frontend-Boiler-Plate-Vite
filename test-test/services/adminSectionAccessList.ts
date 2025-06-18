import { useEffect, useState } from "react";
import { COMPONENT_ACCESS_LIST } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchComponentAccessList = (componentId: string) => {
  const [componentAccessList, setComponentAccessList] = useState<any>(null);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchcomponentAccessList = async () => {
    try {
      const componentAccessList = await COMPONENT_ACCESS_LIST(componentId);
      if (componentAccessList) {
        const data = componentAccessList;
        setLoadingPermissions(true);
        setComponentAccessList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setLoadingPermissions(false);
    } catch (err: any) {
      console.log("Failed to fetch component access list:", err);
      setError(err.message);
      setLoadingPermissions(false);
    }
  };

  useEffect(() => {
    fetchcomponentAccessList();
  }, [componentId]);

  return {
    componentAccessList,
    loadingPermissions,
    error,
    refetch: fetchcomponentAccessList,
  };
};

export default useFetchComponentAccessList;
