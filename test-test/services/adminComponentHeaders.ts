import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { GET_WIDGET_LABELS } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchWidgetHeadersList = (componentId: string, widgetType: string) => {
  const [widgetHeadersList, setWidgetHeadersList] = useState<any>(null);
  const [fetchingHeaders, setFetchingHeaders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgetHeadersList = async () => {
    try {
      const widgetHeadersList = await GET_WIDGET_LABELS(
        componentId,
        widgetType
      );
      if (widgetHeadersList) {
        const data = widgetHeadersList;
        setFetchingHeaders(true);
        setWidgetHeadersList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setFetchingHeaders(false);
    } catch (err: any) {
      console.log("Failed to fetch component label list:", err);
      setError(err.message);
      setFetchingHeaders(false);
    }
  };

  useEffect(() => {
    fetchWidgetHeadersList();
  }, [componentId]);

  return {
    widgetHeadersList,
    fetchingHeaders,
    error,
    refetch: fetchWidgetHeadersList,
  };
};

export default useFetchWidgetHeadersList;
