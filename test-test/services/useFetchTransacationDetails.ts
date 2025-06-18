import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FETCH_TRANSACATION_DETAIL } from "@/services/api/userService";

const useFetchTransactionDetails = (
  portfolioPermId: any,
  transactionPermId: any
) => {
  const [transactionDetail, setTransactionDetail] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      if (!portfolioPermId || !transactionPermId) {
        setLoading(false);
        return;
      }

      try {
        const data = await FETCH_TRANSACATION_DETAIL(
          Number(portfolioPermId),
          transactionPermId,
          AccessCode,
          partnerPermId,
          apiKey
        );
        setTransactionDetail(data.TransactionDetailInqRs);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [portfolioPermId, transactionPermId]);

  return { transactionDetail, loading, error };
};

export default useFetchTransactionDetails;
