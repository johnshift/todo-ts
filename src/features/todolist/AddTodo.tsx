import React, { useState } from 'react';

import {
  Box, IconButton, Icon, Center,
  useDisclosure, Button,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, AlertDialogCloseButton,
  FormControl, Input,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import moment from 'moment';

import { useAppDispatch } from '../../app/hooks';

import { addTodo } from './todoListSlice';

export const AddTodo = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState('');

  return (

    <>
      <Box style={{ position: 'fixed', bottom: 30, right: 30 }}>
        <IconButton
          aria-label="add-todo"
          icon={<Icon as={FaPlus} />}
          colorScheme="purple"
          onClick={onOpen}
        />
      </Box>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Add Todo</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>

            <Center>
              <FormControl>
                <Input
                  placeholder="Description ..."
                  size="lg"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
            </Center>

          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="green"
              ml={3}
              onClick={() => {
                dispatch(addTodo({
                  id: -1,
                  description,
                  isDone: false,
                  targetDate: moment(new Date()).toISOString(),
                }));
                onClose();
              }}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
