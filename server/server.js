    const express = require("express");
    const app = express();
    const PORT = 8000;

    express()

    .get("/api", (req, res) => {
res.status(200).json({status:200, message: "hello react"})    })

    .listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
    });
