import { useDisclosure, UseDisclosureProps } from "@chakra-ui/react"
import { createContext, ReactNode, useContext, useState } from "react"
import { IconType } from "react-icons"
import { AiOutlineEye } from "react-icons/ai"
import { BsNewspaper, BsWallet2 } from "react-icons/bs"
import { FiSettings } from "react-icons/fi"
import { UseResponsiveStatus, useResponsiveStatus } from "../hooks/useResponsiveStatus"

type MenuContextProviderProps = {
    children: ReactNode
}

type MenuContextProps = {
    responsiveStatus: UseResponsiveStatus
    sideBarDisclosure: UseDisclosureProps,
    selectedButton: string,
    setSelectedButton: (key: string) => void,
    MENU_BUTTONS: MenuButton[]
}

export type MenuButton = {
    key: string,
    description: string,
    icon: IconType,
    route: string
    onClick: (param: any) => void
}

const MenuContext = createContext({} as MenuContextProps)

export function MenuContextProvider({ children }: MenuContextProviderProps) {
    const responsiveStatus = useResponsiveStatus();
    const sideBarDisclosure = useDisclosure({ id: 'Menu-Side-Bar', defaultIsOpen: responsiveStatus.isLarge });
    const MENU_BUTTONS = initializeMenuButtons();
    const [selectedButton, setSelectedButton] = useState(MENU_BUTTONS[0].key);


    return (
        <MenuContext.Provider value={{ responsiveStatus, sideBarDisclosure, MENU_BUTTONS, selectedButton, setSelectedButton }}>
            {children}
        </MenuContext.Provider>
    )


    function initializeMenuButtons(): MenuButton[] {
        return [
            {
                key: 'WALLETS',
                description: "Wallets",
                icon: BsWallet2,
                route: '/wallet',
                onClick: function () {
                    setSelectedButton(this.key);
                }
            },
            {
                key: 'STOCK_RADAR',
                description: "Radar de ativos",
                icon: AiOutlineEye,
                route: '/',
                onClick: function () {
                    setSelectedButton(this.key);
                }
            },
            {
                key: 'NEWS',
                description: "Notícias",
                icon: BsNewspaper,
                route: '/',
                onClick: function () {
                    setSelectedButton(this.key);
                }
            },
            {
                key: 'SETTINGS',
                description: "Configurações",
                icon: FiSettings,
                route: '/',
                onClick: function () {
                    setSelectedButton(this.key);
                }
            }
        ]
    }
}

export function useMenuContext() {
    return useContext(MenuContext)
}