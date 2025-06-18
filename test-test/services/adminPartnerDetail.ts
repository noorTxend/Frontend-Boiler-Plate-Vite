import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";
import { PARTNERS_DETAIL } from "./api/adminService";

const useFetchPartnerDetail = (subDomainName: string) => {
  const [partnerDetails, setPartnerDetails] = useState<any>(null);
  const [fetching, setfetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartnerDetails = async () => {
    try {
      const partnerDetails = await PARTNERS_DETAIL(subDomainName);
      if (partnerDetails) {
        const data = partnerDetails;
        setfetching(true);
        setPartnerDetails(data);
      } else {
        throw new Error("Failed to fetch partner details");
      }
      setfetching(false);
    } catch (err: any) {
      console.log("Failed to fetch partner details:", err);
      setError(err.message);
      setfetching(false);
    }
  };

  useEffect(() => {
    fetchPartnerDetails();
  }, []);

  return { partnerDetails, fetching, error, refetch: fetchPartnerDetails };
};

export default useFetchPartnerDetail;
