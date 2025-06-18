import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { INTERNAL_PARNTER_TODO_COMPLETE_RQ } from "./api/userService";

const useCompleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const portfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const accessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const completeTask = async (toDoPermId: number[]) => {
    setLoading(true);
    try {
      const data = await INTERNAL_PARNTER_TODO_COMPLETE_RQ(
        portfolioPermId,
        toDoPermId,
        accessCode,
        partnerPermId,
        apiKey
      );
      setLoading(false);
      return data?.InternalPartnerToDoCompleteRs;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { completeTask, loading, error };
};

export default useCompleteTask;
