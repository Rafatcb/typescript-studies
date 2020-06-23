import React from 'react';
import { Todo } from '../todo.model';

import './TodoList.css';

interface TodoListProps {
    items: Todo[];
    onDeleteTodo: (todoId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
    return (
        <ul>
            {items.map(todo => (
                <li key={todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => onDeleteTodo(todo.id)}>DELETE</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
