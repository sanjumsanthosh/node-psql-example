const express = require("express")
const {Pool} = require("pg")


const connection = {
    "user": "postgres",
    "password": "postgres",
    "database": "postgres",
    "host":"localhost",
    "port":"5432"
}



// const {connection} = require("./const")

const pool = new Pool(connection);

// utils 

const verifyCreateRequestBody = (body)=>{
    if(!body || !body?.name || !body?.age || !body?.email){
        throw new Error("requried data not provided")
    }
}



// crud operations

async function createTable(pool){
    const createUsername = "Create table if not exist usernames (ID serial primary key, name varchar(20), age int, email varchar(20))";
    const createPasswords = "Create table if not exist password (ID serial primary key, "
    
    await pool.query(createUsername)
}

async function addUser(pool, name, age, email){
    const query = "Insert into usernames (name, age, email) values ($1,$2,$3) returning *";
    return await pool.query(query,[name, age, email])
}

async function getAllUsers(pool){
    const query = "select * from usernames";
    return await pool.query(query)
}

async function getAUser(pool, userid){
    const query = "select * from usernames where id=$1";
    return await pool.query(query,[userid])
}

async function updateUser(pool, userid, name, age, email){
    const query = "Update usernames SET NAME=$1, age=$2, email=$3 where id=$4 returning *";
    return await pool.query(query,[name, age, email,userid])
}

async function deleteUser(pool, userId) {
    const query = "DELETE from usernames where id=$1";
    return await pool.query(query, [userId]);
}

// api ops
app = express();
app.use(express.json())

app.post("/db/init", async (req, resp)=>{
    try {
        const response = await createTable(pool);
        resp.status(201).json({"message":"database created !"});
    }catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})

app.get("/users", async (req, resp)=>{
    try {
        const response = await getAllUsers(pool);
        resp.status(200).json(response);
    } catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})

app.get("/users/:id", async (req, resp)=>{
    try {
        const userId = req.params.id
        const response = await getAUser(pool, userId)
        resp.status(200).json(response)
    }catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})



app.post("/users", async (req, resp)=>{
    try {
        const body = req.body;
        verifyCreateRequestBody(body)
        const response = await addUser(pool, body.name, body.age, body.email);
        resp.status(200).json(response);
    } catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})


app.put("/users/:id", async (req, resp)=>{
    try {
        const body = req.body;
        const userId = req.params.id;
        verifyCreateRequestBody(body)
        const response = await updateUser(pool,userId,  body.name, body.age, body.email);
        resp.status(200).json(response);
    } catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})


app.delete("/users/:id", async (req, resp)=>{
    try {
        const userId = req.params.id;
        const response = await deleteUser(pool,userId);
        resp.status(200).json(response);
    } catch(e){
        console.log(`console log ${e}`)
        resp.status(500).json({message: e.toString()});
    }
})





// starting service
app.listen(8080, ()=>{console.log("Service started in http://localhost:8080")})