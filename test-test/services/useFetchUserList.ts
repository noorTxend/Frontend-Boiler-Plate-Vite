import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LIST_USERS } from "@/services/api/userService";
import { PortfolioTypeId } from "@/types";

const useFetchUserList = (
  PortfolioTypeId: PortfolioTypeId,
  PortfolioPermId?: any
) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const defaultPortfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const idToUse = PortfolioPermId ? PortfolioPermId : defaultPortfolioPermId;
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const fetchUsers = async () => {
    try {
      const listAdministrators = await LIST_USERS(
        idToUse,
        PortfolioTypeId,
        AccessCode,
        partnerPermId,
        apiKey
      );
      const data = listAdministrators.InternalPortfolioInqRs.PortfolioData;
      // console.log("Listing administrators => ", data);
      setUsers(data);
      setLoading(false);
    } catch (err: any) {
      // console.log("This is error from user list => ", err);
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, refetch: fetchUsers };
};

export default useFetchUserList;
