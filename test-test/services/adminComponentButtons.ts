import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { GET_WIDGET_LABELS } from "@/services/api/adminService";
import { ERROR_MESSAGES } from "@/layouts/skeletons/toastUtils";

const useFetchWidgetButtonsList = (componentId: string, widgetType: string) => {
  const [widgetButtonsList, setWidgetButtonsList] = useState<any>(null);
  const [fetchingButtons, setFetchingButtons] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWidgetButtonsList = async () => {
    try {
      const widgetButtonsList = await GET_WIDGET_LABELS(
        componentId,
        widgetType
      );
      if (widgetButtonsList) {
        const data = widgetButtonsList;
        setFetchingButtons(true);
        setWidgetButtonsList(data);
      } else {
        throw new Error(ERROR_MESSAGES.FETCH_PROFILE_FAILED);
      }
      setFetchingButtons(false);
    } catch (err: any) {
      console.log("Failed to fetch component label list:", err);
      setError(err.message);
      setFetchingButtons(false);
    }
  };

  useEffect(() => {
    fetchWidgetButtonsList();
  }, [componentId]);

  return {
    widgetButtonsList,
    fetchingButtons,
    error,
    refetch: fetchWidgetButtonsList,
  };
};

export default useFetchWidgetButtonsList;
