import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { uid } from "uid";

dotenv.config();

const app: express.Express = express();
const port = 8000;

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("Hello Word");
// });

app.use(cors({ origin: "http://localhost:5174"}));
app.use(express.json());

app.get("/", async (req: express.Request, res: express.Response) => {
  console.log("リクエストを受け付けました");
  

  const { data, error } = await supabase
     .from("todos")
     .select("*")
     .order("created_at", { ascending: false });
  
    console.log(data,error)

  return res.status(200).json({ todos:data });
})

app.post("/add", async (req: express.Request, res: express.Response) => {
  console.log(req.body);

  const { todo } = req.body;

  const { data, error } = await supabase
    .from("todos")
    .insert([{todo}])
    .select();

    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to add todo", error });
    }


    return res.status(200).json(data[0]);
  });



app.listen(port, () => {
  console.log(`port ${port} でサーバー起動中`);
});

