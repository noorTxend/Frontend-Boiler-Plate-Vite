import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { INTERNAL_PARTNER_TODO_INQ_RQ } from "./api/userService";
import { useParams } from "react-router-dom";

const useFetchReminders = (status?: any) => {
  // console.log("This is status ====> ", status);
  const [currentStatus, setStatus] = useState(status);
  const [reminders, setReminders] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);
  const defaultId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const effectiveId = id || defaultId;

  const fetchReminders = async () => {
    setStatus(currentStatus);
    setLoading(true);
    try {
      if (effectiveId !== null) {
        const response = await INTERNAL_PARTNER_TODO_INQ_RQ(
          Number(effectiveId),
          10,
          1,
          Number(status),
          accessCode,
          partnerPermId,
          apiKey
        );
        const data = response?.InternalPartnerToDoInqRs?.Todo;
        setReminders(data);
        setLoading(false);
      }
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchReminders();
  }, [Number(effectiveId), status]);

  return { reminders, loading, error, fetchReminders };
};

export default useFetchReminders;
