import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type as a key of ResponseFuncs to reduce typing
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //error catching function
  const catcher = (error: Error) => res.status(400).json({ error })

  //potential responses
  const handleCase: ResponseFuncs = {
    //GET
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      //connect to db
      const { Todo } = await connect()
      res.json(await Todo.find({}).catch(catcher))
    },
    //POST
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      //connect to db
      const { Todo } = await connect()
      res.json(await Todo.create(req.body).catch(catcher))
    },
  }

  //check for response. if it is found, invoke it. otherwise, throw error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No response for this request" })
}

export default handler
