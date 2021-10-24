import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type as a key of ResponseFuncs to reduce typing
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //error catching
  const catcher = (error: Error) => res.status(400).json({ error })

  //grab id from req.query
  const id: string = req.query.id as string

  //potential responses
  const handleCase: ResponseFuncs = {
    //GET
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect()
      res.json(await Todo.findById(id).catch(catcher))
    },
    //PUT
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect()
      res.json(
        await Todo.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      )
    },
    //DELETE
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Todo } = await connect()
      res.json(await Todo.findByIdAndRemove(id).catch(catcher))
    },
  }

  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No response for this request" })
}

export default handler
