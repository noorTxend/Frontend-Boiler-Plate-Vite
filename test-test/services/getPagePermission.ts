import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PAGE_PERMISSION } from "@/services/api/userService";

const getPagePermissionList = (siteId: any, pageId: any) => {
  const [currentPagePermission, setPagePermission] = useState<any>(null);
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const fetchPermission = async () => {
    try {
      const data = await PAGE_PERMISSION(
        siteId,
        pageId,
        AccessCode,
        partnerPermId,
        apiKey
      );
      setPagePermission(data.PagePermission);
    } catch (err: any) {
      setPagePermission(null);
    }
  };

  useEffect(() => {
    fetchPermission();
  }, []);

  return currentPagePermission;
};

export default getPagePermissionList;
