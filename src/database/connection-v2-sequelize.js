import Sequelize from "sequelize";
import values from "../const/conts.js";

const sequelize = new Sequelize(
    values.DATABASE,
    values.USER,
    values.PASSWORD,
    {
        host: values.HOST,
        dialect: "mysql",
        define: {
            timestamps: false,
        },
    }
);

sequelize.authenticate().then(() => {
    console.log("Conexión establecida");
}).catch(err => {
    console.error("Error de conexión: ", err);
});

