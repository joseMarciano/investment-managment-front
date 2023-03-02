import { Box, Button, Icon } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useMenuContext } from "../../context/MenuContext"


export function MenuButtons() {
    const { responsiveStatus: { isLarge }, MENU_BUTTONS, selectedButton, sideBarDisclosure } = useMenuContext();

    return <>
        {(!isLarge) && !sideBarDisclosure.isOpen && <SoftMenuButtons />}
        {((!isLarge && sideBarDisclosure.isOpen) || (isLarge)) && <CompleteMenuButtons />}
    </>;

    function CompleteMenuButtons() {
        return <>
            {MENU_BUTTONS.map(button => (<Box key={button.key} color={getColor(button.key)} >
                <Button leftIcon={<button.icon />} alignSelf={'flex-start'} variant={"unstyled"} border={"none"} size="md" bg="none" onClick={button.onClick.bind(button)}>
                    {button.description}
                </Button>
            </Box>))}
        </>
    }

    function SoftMenuButtons() {
        return <>
            <Button variant={"unstyled"} border={"none"} size="md" bg="none" onClick={sideBarDisclosure.onOpen}>
                <Icon as={GiHamburgerMenu} />
            </Button>
            {MENU_BUTTONS.map(button => (<Button key={button.key} color={getColor(button.key)} variant={"unstyled"} border={"none"} size="md" bg="none" onClick={button.onClick.bind(button)}>
                <Icon as={button.icon} />
            </Button>))}
        </>;
    }

    function getColor(key: string): string {
        return selectedButton === key ? '#007AFF' : ''
    }



}

