import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { INTERNAL_PARTNER_TODO_ARCHIVE_RQ } from "./api/userService";

const useArchivedTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const accessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const portfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const archiveTask = async (toDoPermId: number[]) => {
    setLoading(true);
    try {
      const data = await INTERNAL_PARTNER_TODO_ARCHIVE_RQ(
        portfolioPermId,
        toDoPermId,
        accessCode,
        partnerPermId,
        apiKey
      );
      setLoading(false);
      return data.InternalPartnerToDoArchiveRs;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { archiveTask, loading, error };
};

export default useArchivedTask;
