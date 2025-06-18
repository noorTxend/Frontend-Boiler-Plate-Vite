import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { GET_WIDGET_LABELS } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchWidgetLabelsList = (componentId: string, widgetType: string) => {
  const [widgetLabelsList, setWidgetLabelsList] = useState<any>(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgetLabelsList = async () => {
    try {
      const widgetLabelsList = await GET_WIDGET_LABELS(componentId, widgetType);
      if (widgetLabelsList) {
        const data = widgetLabelsList;
        setFetching(true);
        setWidgetLabelsList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setFetching(false);
    } catch (err: any) {
      console.log("Failed to fetch component label list:", err);
      setError(err.message);
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchWidgetLabelsList();
  }, [componentId]);

  return {
    widgetLabelsList,
    fetching,
    error,
    refetch: fetchWidgetLabelsList,
  };
};

export default useFetchWidgetLabelsList;
