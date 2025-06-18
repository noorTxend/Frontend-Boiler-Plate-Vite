import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTransactionData } from "@/redux/slices/transactionSlice";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";
import { TRANSACTION_INQ_RQ } from "@/services/api/userService";

const useFetchTransaction = (PortfolioPermID: any) => {
  const dispatch = useDispatch();
  const [userTransaction, setUserTransaction] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultPortfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  useEffect(() => {
    const effectiveId = Number(PortfolioPermID) || defaultPortfolioPermId;
    if (effectiveId) {
      const today = new Date();
      const endDate = today.toISOString().split("T")[0];
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      const startDate = lastYear.toISOString().split("T")[0];

      // console.log({
      //   startDate: startDate,
      //   endDate: endDate,
      // });

      TRANSACTION_INQ_RQ(
        effectiveId,
        startDate,
        endDate,
        AccessCode,
        partnerPermId,
        apiKey
      )
        .then((data) => {
          setUserTransaction(data.TransactionInqRs);
          dispatch(setTransactionData(data.TransactionInqRs));
          setLoading(false);
        })
        .catch((err) => {
          console.error(ERROR_MESSAGES.FETCH_TRANS_FAILED, err);
          setError(err.message);
          setUserTransaction(null);
          setLoading(false);
        });
    }
  }, [PortfolioPermID, defaultPortfolioPermId]);

  return { userTransaction, loading, error };
};

export default useFetchTransaction;
