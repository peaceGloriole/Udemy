import { getSettings } from "../../services/apiSettings";
import { useQuery } from "react-query";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: [`settings`],
    queryFn: getSettings,
  });

  return {
    isLoading,
    error,
    settings,
  };
}
