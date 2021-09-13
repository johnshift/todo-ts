import React from 'react';

import {
  Center, Heading, Button, IconButton, Icon,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';

import { FaTimes } from 'react-icons/fa';
import { Todo } from './types';

import { useAppDispatch } from '../../app/hooks';
import { deleteTodo } from './todoListSlice';

interface Props {
  todo: Todo;
}

export const DeleteTodo = ({ todo }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const cancelRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="delete-todo"
        size="xs"
        colorScheme="red"
        variant="solid"
        isRound
        icon={<Icon as={FaTimes} />}
        onClick={() => {
          onOpen();
        }}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Todo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Center>
              <Heading size="2xl">Are you sure?</Heading>
            </Center>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                dispatch(deleteTodo(todo));
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
