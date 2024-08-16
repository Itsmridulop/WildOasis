import { useQuery } from "@tanstack/react-query"
import { getSettings } from "../../services/apiSettings"

export const useSettings = () => {
    const { data: settings, isLoading: isSettingLoading } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings
    })

    return { settings, isSettingLoading }
}