"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
// app.get("/", (req: express.Request, res: express.Response) => {
//   res.send("Hello Word");
// });
app.use((0, cors_1.default)({ origin: "http://localhost:517" }));
app.use(express_1.default.json());
app.get("/", async (req, res) => {
    console.log("リクエストを受け付けました");
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });
    console.log(data, error);
    return res.status(200).json({ todos: data });
});
app.post("/add", async (req, res) => {
    console.log(req.body);
    const { todo, status } = req.body;
    const { data, error } = await supabase
        .from("todos")
        .insert([{ todo, status }])
        .select();
    if (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add todo", error });
    }
    return res.status(200).json(data[0]);
});
app.post("/update-status", async (req, res) => {
    const { id, status } = req.body;
    const { data, error } = await supabase
        .from("todos")
        .update({ status })
        .eq("id", id);
    if (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
    return res.status(200).json({ data });
});
app.listen(port, () => {
    console.log(`port ${port} でサーバー起動中`);
});
