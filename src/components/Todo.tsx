import { ChangeEvent, useState, useRef, useMemo } from "react";
import "./todo.css";

interface TodoItem {
  id: string;
  title: string;
  hasDone: boolean;
}

enum Tag {
  ALL,
  ACTIVE,
  COMPLETED,
}

function Todo() {
  const [list, setList] = useState<TodoItem[]>([]);
  const [tag, setTag] = useState<Tag>(Tag.ALL);

  const inputRef = useRef(null);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setList([
        ...list,
        {
          id: Math.random().toString(),
          title: (e.target as any).value,
          hasDone: false,
        },
      ]);
      if (inputRef?.current) {
        (inputRef.current as HTMLInputElement).value = "";
      }
    }
  };

  const toggleTodo = (e: ChangeEvent, id: string) => {
    setList(
      list.map((v) => {
        if (v.id === id) {
          return {
            ...v,
            hasDone: !v.hasDone,
          };
        }
        return v;
      })
    );
  };

  const showList = useMemo(() => {
    if (tag === Tag.ALL) return list;
    return list.filter((v) => (tag === Tag.ACTIVE ? !v.hasDone : v.hasDone));
  }, [list, tag]);

  const countLeft = useMemo(() => {
    return list.filter((v) => !v.hasDone).length;
  }, [list]);

  const clearCompleted = () => {
    setList(list.filter((v) => !v.hasDone));
  };

  return (
    <div className="todo">
      <div className="w-full flex justify-between">
        <h1 className="text-white font-bold text-3xl">TODO</h1>
      </div>
      <div className="w-full h-12 rounded-lg bg-white mt-12 flex items-center py-2 px-4">
        <div className="rounded-full h-5 w-5 bg-white border border-gray-200" />
        <input
          className="ml-4 placeholder-gray-700 flex-grow-1 border-none bg-transparent outline-none"
          type="text"
          placeholder="Create a new todo..."
          onKeyUp={handleEnter}
          ref={inputRef}
        />
      </div>
      <div className="w-full h-auto rounded-lg bg-white mt-4 shadow-md">
        {showList.length ? (
          showList.map((v) => (
            <div
              className="w-full h-12 flex items-center px-4 py-2 border-b-2"
              key={v.id}
            >
              <input
                type="checkbox"
                checked={v.hasDone}
                className="checkbox"
                onChange={(e) => toggleTodo(e, v.id)}
              />
              <div
                className={
                  v.hasDone
                    ? "line-through text-gray-300 ml-4"
                    : "text-gray-700 ml-4"
                }
              >
                {v.title}
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-36 flex items-center justify-center px-4 py-2 border-b-2">
            <div className="text-gray-700 ml-4 font-bold text-2xl">
              No todos yet.
            </div>
          </div>
        )}
        <div className="w-full h-12 flex items-center bg-white px-4 justify-between rounded-b-lg">
          <span className="text-gray-700">{countLeft} items left</span>
          <span
            className={
              tag === Tag.ALL
                ? "text-gray-700 ml-6 cursor-pointer font-bold"
                : "text-gray-700 ml-6 cursor-pointer"
            }
            onClick={() => setTag(Tag.ALL)}
          >
            All
          </span>
          <span
            className={
              tag === Tag.ACTIVE
                ? "text-gray-700 ml-2 cursor-pointer font-bold"
                : "text-gray-700 ml-2 cursor-pointer"
            }
            onClick={() => setTag(Tag.ACTIVE)}
          >
            Active
          </span>
          <span
            className={
              tag === Tag.COMPLETED
                ? "text-gray-700 ml-2 cursor-pointer font-bold"
                : "text-gray-700 ml-2 cursor-pointer"
            }
            onClick={() => setTag(Tag.COMPLETED)}
          >
            Completed
          </span>
          <span
            className="text-gray-700 ml-6 cursor-pointer"
            onClick={clearCompleted}
          >
            Clear Completed
          </span>
        </div>
      </div>
    </div>
  );
}

export default Todo;
