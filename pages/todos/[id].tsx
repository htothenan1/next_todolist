import { Todo } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"

//prop interface
interface ShowProps {
  todo: Todo
  url: string
}

//component
function Show(props: ShowProps) {
  //we need router to use router.push later
  const router = useRouter()

  const [todo, setTodo] = useState<Todo>(props.todo)

  //function for completing todo
  const handleComplete = async () => {
    if (!todo.completed) {
      //make copy of todo, with completed set as true
      const newTodo: Todo = { ...todo, completed: true }

      //make api call to change completed in db
      await fetch(props.url + "/" + todo._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        //send copy of todo with property
        body: JSON.stringify(newTodo),
      })
      //once data is updated, update it in state without need to refresh
      setTodo(newTodo)
    }
  }
  //function for deleting tasks
  const handleDelete = async () => {
    await fetch(props.url + "/" + todo._id, {
      method: "delete",
    })
    //push user back to main page after deleting
    router.push("/")
  }

  return (
    <div>
      <h1>{todo.item}</h1>
      <h2>{todo.completed ? "completed" : "incomplete"}</h2>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back Home
      </button>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  //fetch single todo through context.query.id
  const res = await fetch(process.env.API_URL + "/" + context.query.id)
  const todo = await res.json()

  return {
    props: { todo, url: process.env.API_URL },
  }
}

export default Show
