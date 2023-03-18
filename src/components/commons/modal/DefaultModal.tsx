import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, UseDisclosureReturn } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { DEFAULT_STYLES } from '../../../config/styles/theme'

export type DefaultModalProps = {
    size?: string,
    title: string,
    Body: ReactNode,
    Footer?: ReactNode,
    disclosure: UseDisclosureReturn
}

export function DefaultModal({ title, Body, Footer, size, disclosure }: DefaultModalProps) {
    return <Modal isOpen={disclosure.isOpen || false} isCentered closeOnOverlayClick={false} onClose={onClose} size={size || 'md'}>
        <ModalOverlay
            backdropFilter='auto'
            backdropBlur='8px'
        />
        <ModalContent bgColor={DEFAULT_STYLES.styles.global.body.bg}>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
                {Body}
            </ModalBody>
            <ModalFooter>
                {Footer}
            </ModalFooter>
        </ModalContent>
    </Modal>

    function onClose() {
        disclosure.onClose()
    }
}