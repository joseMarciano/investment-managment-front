import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, Heading, UseDisclosureProps, VStack } from "@chakra-ui/react"
import { DEFAULT_STYLES } from "../../config/styles/theme";
import { MenuButtons } from "./MenuButtons";
import { MenuContextProvider, useMenuContext } from "../../context/MenuContext";
import { useEffect } from "react";
import { UseResponsiveStatus } from "../../hooks/useResponsiveStatus";

type BigMenuProps = {
    sideBarDisclosure: UseDisclosureProps,
    responsiveStatus: UseResponsiveStatus
}

export function Menu() {
    return <>
        <MenuContextProvider>
            <MenuControl />
        </MenuContextProvider>
    </>

    function MenuControl() {
        const { responsiveStatus: { isLarge, isMedium, isSmall }, sideBarDisclosure } = useMenuContext();

        useEffect(() => {
            if (isLarge) sideBarDisclosure.onOpen && sideBarDisclosure.onOpen();
            else sideBarDisclosure.onClose && sideBarDisclosure.onClose()

        }, [isLarge])

        return <>
            {(!isLarge) && !sideBarDisclosure.isOpen && <SmallMenu />}
            {isLarge && <BigMenu />}
            {((!isLarge && sideBarDisclosure.isOpen) || (isMedium)) && <BigResponsiveMenu sideBarDisclosure={sideBarDisclosure} responsiveStatus={{ isLarge, isMedium, isSmall }} />}
        </>
    }

    function SmallMenu() {
        return <VStack pt={2} gap={1} as="aside" bg="blackAlpha.300" w="3rem" h="100vh" >
            <MenuButtons />
        </VStack>
    }

    function BigMenu() {


        return <VStack height={'100vh'} w={'320px'} justifyContent={'flex-start'} >
            <Heading width={'100%'} fontSize={20} p={'16px'} textAlign={'start'}>
                Menu
            </Heading>
            <Box>
                <VStack alignItems={'flex-start'} gap={2}>
                    <MenuButtons />
                </VStack>
            </Box>
        </VStack>
    }

    function BigResponsiveMenu({ sideBarDisclosure, responsiveStatus: { isLarge } }: BigMenuProps) {
        return <Drawer
            isOpen={!!sideBarDisclosure.isOpen}
            placement='left'
            onClose={sideBarDisclosure.onClose as () => void}
            size={'xs'}
            closeOnEsc={!isLarge}
            closeOnOverlayClick={!isLarge}

        >
            <DrawerContent bgColor={DEFAULT_STYLES.styles.global.body.bg}>
                {!isLarge && < DrawerCloseButton />}
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody >
                    <VStack justifyContent={'flex-start'} >
                        <VStack alignItems={'flex-start'} gap={2}>
                            <MenuButtons />
                        </VStack>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    }




}