import  {Pool} from "pg";

const pool = new Pool({
  user: process.env.DB_USER ?? "wewatch",
  host: process.env.DB_HOST ?? "dpg-cffq1m9gp3jjse9lmslg-a.frankfurt-postgres.render.com",
  database: process.env.DB_DATABASE ?? "test",
  password: process.env.DB_PASSWORD ?? "gQaCUzvO6wCq9V6Tq3NtgJ14HwtVcTGA",
  port: Number(process.env.DB_PORT),
  ssl:true
});


const db = async (text: string, params: any) => {   
  let response = await pool.query(text, params);
  return response.rows;
};

export default db