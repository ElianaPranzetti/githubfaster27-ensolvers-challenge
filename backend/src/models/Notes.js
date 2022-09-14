import { DataTypes } from "sequelize";
import{ sequelize } from '../database/database.js'

export const Note = sequelize.define('notes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    }, 
    description: {
        type: DataTypes.STRING
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: true
})