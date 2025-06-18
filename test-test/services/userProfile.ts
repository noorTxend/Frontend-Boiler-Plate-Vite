import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import {
  INTERNAL_PORTFOLIO_INQ,
  PORTFOLIO_INQ,
} from "@/services/api/userService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchProfile = (effectId?: any) => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fethingProfile, setFethingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);

  const defaultId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );
  const effectiveId = effectId ? effectId : defaultId;

  const fetchUserProfile = async () => {
    try {
      const InternalPortfolio = await INTERNAL_PORTFOLIO_INQ(
        Number(effectiveId),
        AccessCode,
        partnerPermId,
        apiKey
      );

      if (InternalPortfolio?.InternalPortfolioInqRs?.Avatar) {
        const base64Image = InternalPortfolio.InternalPortfolioInqRs.Avatar;
        setAvatar(`data:image/png;base64,${base64Image}`);
      } else {
        setAvatar(null);
      }

      const Portfolio = await PORTFOLIO_INQ(
        Number(effectiveId),
        AccessCode,
        partnerPermId,
        apiKey
      );

      if (InternalPortfolio && Portfolio) {
        const data = {
          InternalPortfolio:
            InternalPortfolio.InternalPortfolioInqRs.PortfolioData,
          Portfolio: Portfolio.PortfolioInqRs.PortfolioData,
        };
        // console.log(data);
        setLoading(true);
        setFethingProfile(true);
        setUserProfile(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }

      // localStorage.setItem("userProfile", JSON.stringify(data));
      setLoading(false);
      setFethingProfile(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      setFethingProfile(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return {
    userProfile,
    loading,
    fethingProfile,
    error,
    avatar,
    refetch: fetchUserProfile,
  };
};

export default useFetchProfile;
