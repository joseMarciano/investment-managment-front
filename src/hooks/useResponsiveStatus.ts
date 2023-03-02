import { useBreakpointValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"

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
    const [isLarge, setIsLarge] = useState(verifyStatus(variant, ResponsiveStatus.LARGE));
    const [isMedium, setIsMedium] = useState(verifyStatus(variant, ResponsiveStatus.MEDIUM));
    const [isSmall, setIsSmall] = useState(verifyStatus(variant, ResponsiveStatus.BASE));

    useEffect(refreshStatus, [variant]);

    return {
        isLarge,
        isMedium,
        isSmall
    }

    function refreshStatus() {
        setIsLarge(verifyStatus(variant, ResponsiveStatus.LARGE));
        setIsMedium(verifyStatus(variant, ResponsiveStatus.MEDIUM));
        setIsSmall(verifyStatus(variant, ResponsiveStatus.BASE));
    }

    function verifyStatus(status: ResponsiveStatus | undefined, expectedStatus: ResponsiveStatus) {
        return status === expectedStatus;
    }
}