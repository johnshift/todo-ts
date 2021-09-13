import React, { useEffect } from 'react';

import {
  Center, Spinner, Flex, Heading,
  Table, Thead, Tbody, Tr, Th, Td, useToast,
} from '@chakra-ui/react';

import { Todo } from './types';

import { UpdateTodo } from './UpdateTodo';
import { DeleteTodo } from './DeleteTodo';
import { AddTodo } from './AddTodo';

import { setTodoList } from './todoListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useGetAllTodosMutation } from './todoApi';

export const TodoList = (): JSX.Element => {
  const { todoList }: {todoList: Todo[]} = useAppSelector((state) => state.todoList);

  const [getAllTodos, { isLoading, isError }] = useGetAllTodosMutation();
  const dispatch = useAppDispatch();

  const toast = useToast();

  useEffect(() => {
    getAllTodos('username1').unwrap()
      .then((data) => {
        toast({
          title: 'Successfully fetched data',
          status: 'success',
          duration: 1800,
        });
        dispatch(setTodoList(data));
      })
      .catch(() => {
        toast({
          title: 'Error fetching data',
          status: 'error',
          duration: 1800,
        });
      });
  }, [getAllTodos, dispatch, toast]);

  return (
    <>
      <Flex align="center" justify="center" h="100vh">
        <Center>
          {((): JSX.Element => {
            if (isLoading) {
              return <Spinner size="xl" />;
            } if (isError) {
              return <Heading size="xl">Something went wrong :(</Heading>;
            }
            return (
              <>
                <AddTodo />
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
                            <UpdateTodo
                              todo={todo}
                            />

                            <DeleteTodo todo={todo} />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Center>
              </>
            );
          })()}
        </Center>
      </Flex>
    </>
  );
};
