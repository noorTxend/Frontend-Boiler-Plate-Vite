import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

import { setDocIds } from "@/redux/slices/getDocListSlice";
import { GET_PORTFOLIO_DOC } from "./api/userService";

const useFetchDocs = () => {
  const [docsLoading, setDocsLoading] = useState<any>(false);
  const [error, setError] = useState<string | null>(null);

  const AccessCode = useSelector((state: RootState) => state.auth.AccessCode);
  const partnerPermId = useSelector(
    (state: RootState) => state.partner.partnerPermId
  );
  const apiKey = useSelector((state: RootState) => state.partner.apiKey);
  const dispatch = useDispatch<AppDispatch>();

  const portfolioPermId = useSelector(
    (state: RootState) => state.auth.PortfolioPermId
  );

  const fetchDocs = useCallback(
    async (Required?: any) => {
      setDocsLoading(true);
      try {
        const response = await GET_PORTFOLIO_DOC(
          portfolioPermId,
          Required,
          AccessCode,
          partnerPermId,
          apiKey
        );
        setDocsLoading(false);
        const docIds = response.Documents.map(
          (doc: { DocumentPermId: any }) => doc.DocumentPermId
        );
        dispatch(setDocIds(docIds));
        return response.Documents;
      } catch (err: any) {
        setError(err.message);
        setDocsLoading(false);
        return [];
      }
    },
    [AccessCode, portfolioPermId]
  );

  useEffect(() => {
    fetchDocs();
  }, []);

  return { fetchDocs, docsLoading, error, refetch: fetchDocs };
};

export default useFetchDocs;
