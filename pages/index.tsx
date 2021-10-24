/* eslint-disable @next/next/link-passhref */
import { Todo } from "../utils/types"
import Link from "next/link"

//define components props
interface IndexProps {
  todos: Array<Todo>
}

//page component
function Index(props: IndexProps) {
  const { todos } = props
  console.log(todos)

  return (
    <div>
      <h1>My Todo List</h1>
      <h2>Click on Todo to see it individually</h2>
      {todos.map((todo) => (
        <div key={todo._id}>
          <Link href={`/todos/${todo._id}`}>
            <h3 style={{ cursor: "pointer" }}>
              {todo.item} - {todo.completed ? "completed" : "incomplete"}
            </h3>
          </Link>
        </div>
      ))}
    </div>
  )
}

//get props from db through server side rendering
export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL as string)
  const todos = await res.json()

  return {
    props: { todos },
  }
}

export default Index
