import pool from '../database/conexion.js'

export const getUsers = async (req, res) => {
    try {
        const [result] = await pool.query('select * from usuarios')

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay usuarios' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const createUser = async (req, res) =>{
    try {
        const {nombre, cedula, email, password, telefono, rol} = req.body
        const [result] = await pool.query('insert into usuarios (nombre, cedula, email, password, telefono, rol) values (?, ?, ?, ?, ?, ?)', [nombre, cedula, email, password, telefono, rol])
        if(result.affectedRows>0){
        return res.status(201).json({message: 'Usuario creado con éxito'})
        }
        else{
            return res.status(404).json({message: 'No se pudo crear el usuario'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query('select * from usuarios where id = ?', [id])

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay usuarios con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const updateUser = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre, cedula, email, password, telefono, rol} = req.body
        const [oldUser] = await pool.query('select * from usuarios where id = ?', [id])
        const data = {
            nombre: nombre ? nombre : oldUser[0].nombre,
            cedula : cedula ? cedula : oldUser[0].cedula,
            email : email ? email : oldUser[0].email,
            password : password ? password : oldUser[0].password,
            telefono : telefono ? telefono : oldUser[0].telefono,
            rol : rol ? rol : oldUser[0].rol
        }
        const [result] = await pool.query('update usuarios set ? where id = ?', [data, id])
        if(result.affectedRows>0){
        return res.status(201).json({message: 'usuario actualizado con éxito'})
        }
        else{
            return res.status(404).json({message: 'No se pudo actuaizar el usuario'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query('delete from usuarios where id = ?', [id])

        if (result.affectedRows > 0) {
            return res.status(200).json({message: 'Se elimino el usuario'})
        }
        else {
            return res.status(404).json({ message: 'No hay un usuario con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 
