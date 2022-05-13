interface Props {
  id: number;
  todo: string;
  tag: string;
  onRemoveTodo: (id: number) => void;
}

const TodoItem = ({ id, todo, tag, onRemoveTodo }: Props) => (
  <div>
    <button onClick={() => onRemoveTodo(id)}>✓</button>
    {todo} <span style={{ color: "red" }}>Tag: {tag}</span>
  </div>
);

export default TodoItem;