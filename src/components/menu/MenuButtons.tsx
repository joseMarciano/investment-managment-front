import { Box, Button, Icon } from "@chakra-ui/react"
import { GiHamburgerMenu } from "react-icons/gi"
import { useMenuContext } from "./context/MenuContext"
import { Link } from "react-router-dom"


export function MenuButtons() {
    const { responsiveStatus: { isLarge }, MENU_BUTTONS, selectedButton, sideBarDisclosure } = useMenuContext();

    return <>
        {(!isLarge) && !sideBarDisclosure.isOpen && <SoftMenuButtons />}
        {((!isLarge && sideBarDisclosure.isOpen) || (isLarge)) && <CompleteMenuButtons />}
    </>;

    function CompleteMenuButtons() {
        return <>
            {MENU_BUTTONS.map(button => (<Box key={button.key} color={getColor(button.key)} >
                <Link key={button.key} to={button.route}>
                    <Button leftIcon={<button.icon />} alignSelf={'flex-start'} variant={"unstyled"} border={"none"} size="md" bg="none" onClick={button.onClick.bind(button)}>
                        {button.description}
                    </Button>
                </Link>
            </Box>))}
        </>
    }

    function SoftMenuButtons() {
        return <>
            <Button variant={"unstyled"} border={"none"} size="md" bg="none" onClick={sideBarDisclosure.onOpen}>
                <Icon as={GiHamburgerMenu} />
            </Button>
            {MENU_BUTTONS.map(button => (
                <Link key={button.key} to={button.route}>
                    <Button color={getColor(button.key)} variant={"unstyled"} border={"none"} size="md" bg="none" onClick={button.onClick.bind(button)}>
                        <Icon as={button.icon} />
                    </Button>
                </Link>))}
        </>;
    }

    function getColor(key: string): string {
        return selectedButton === key ? '#007AFF' : ''
    }



}

