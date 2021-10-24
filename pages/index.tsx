import { Todo } from "../utils/types"
import Link from "next/link"

//define components props
interface IndexProps {
  todos: Array<Todo>
}

//page component
function Index(props: IndexProps) {
  const { todos } = props

  return (
    <div>
      <h1>My Todo List</h1>
    </div>
  )
}

export default Index
