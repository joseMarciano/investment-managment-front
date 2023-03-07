import { useBreakpointValue } from "@chakra-ui/react"
import { useMemo } from "react"

export type UseResponsiveStatus = {
    isLarge: boolean
    isMedium: boolean
    isSmall: boolean
}

enum ResponsiveStatus {
    BASE,
    MEDIUM,
    LARGE
};


export function useResponsiveStatus(): UseResponsiveStatus {

    const variant = useBreakpointValue({ base: ResponsiveStatus.BASE, md: ResponsiveStatus.MEDIUM, lg: ResponsiveStatus.LARGE });
    const isLarge = useMemo(() => verifyStatus(variant, ResponsiveStatus.LARGE), [variant]);
    const isMedium =  useMemo(() => verifyStatus(variant, ResponsiveStatus.MEDIUM), [variant]);
    const isSmall = useMemo(() => verifyStatus(variant, ResponsiveStatus.BASE), [variant]);

    return {
        isLarge,
        isMedium,
        isSmall
    }

    function verifyStatus(status: ResponsiveStatus | undefined, expectedStatus: ResponsiveStatus) {
        return status === expectedStatus;
    }
}