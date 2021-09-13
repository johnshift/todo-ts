import React, { useState } from 'react';

import {
  Button, IconButton, Icon,
  FormControl, Textarea, FormLabel,
  AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
  useDisclosure,
} from '@chakra-ui/react';

import moment from 'moment';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';

import { FaEdit } from 'react-icons/fa';
import { Todo } from './types';

import { useAppDispatch } from '../../app/hooks';
import { updateTodo } from './todoListSlice';

interface Props {
  todo: Todo;
}

export const UpdateTodo = ({ todo }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const cancelRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [description, setDescription] = useState(todo.description);
  const [date, setDate] = useState(new Date());
  return (
    <>
      <IconButton
        aria-label="update-todo"
        size="xs"
        colorScheme="green"
        variant="solid"
        isRound
        icon={<Icon as={FaEdit} />}
        onClick={() => {
          onOpen();
        }}
        mr={5}
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
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Textarea
                size="lg"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Target Date:</FormLabel>
              <SingleDatepicker
                name="date-input"
                date={date}
                onDateChange={setDate}
              />
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="cyan"
              onClick={() => {
                dispatch(updateTodo({
                  ...todo,
                  description,
                  targetDate: moment(date).toISOString(),
                }));
                onClose();
              }}
            >
              Update
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
