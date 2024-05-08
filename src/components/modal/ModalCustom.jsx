import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react'

export default function ModalCustom({ children, title, modalName, color, buttonStyle }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                buttonStyle ? <button onClick={onOpen} className={`w-24 ${buttonStyle}`}>{title}</button> : <Button colorScheme={color ? color : null} onClick={onOpen} className={`w-24 ${buttonStyle}`}>{title}</Button>
            }

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
