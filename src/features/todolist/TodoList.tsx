import React from 'react';

import {
  Center,
  Table, Thead, Tbody, Tr, Th, Td, Icon, IconButton,
} from '@chakra-ui/react';
import { FaEdit } from 'react-icons/fa';

import { Todo } from './types';

import { DeleteTodo } from './DeleteTodo';

import { useAppSelector } from '../../app/hooks';

export const TodoList = (): JSX.Element => {
  const { todoList }: {todoList: Todo[]} = useAppSelector((state) => state.todoList);

  return (
    <Center>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Description</Th>
            <Th>Done</Th>
            <Th>Target Date</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {todoList.map((todo: Todo): JSX.Element => (
            <Tr key={todo.id}>
              <Td>{todo.id}</Td>
              <Td>{todo.description}</Td>
              <Td>{todo.isDone.toString()}</Td>
              <Td>{todo.targetDate}</Td>
              <Td>
                <IconButton
                  aria-label="edit-todo"
                  size="xs"
                  variant="solid"
                  colorScheme="green"
                  isRound
                  mr={5}
                  icon={<Icon as={FaEdit} />}
                />

                <DeleteTodo todo={todo} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Center>
  );
};
