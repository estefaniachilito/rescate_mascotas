import pool from '../database/conexion.js'

export const getPets = async (req, res) => {
    try {
        const [result] = await pool.query('select * from animales')

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay mascotas' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const createPets = async (req, res) =>{
    try {
        const {nombre, edad, cantidad, raza, nombre_propietario, telefono_propietario, direccion_propietario} = req.body
        const [result] = await pool.query('insert into animales (nombre, edad, cantidad, raza, nombre_propietario, telefono_propietario, direccion_propietario) values (?, ?, ?, ?, ?, ?, ?)', [nombre, edad, cantidad, raza, nombre_propietario, telefono_propietario, direccion_propietario])
        if(result.affectedRows>0){
        return res.status(201).json({message: 'Mascota creada con éxito'})
        }
        else{
            return res.status(404).json({message: 'No se pudo crear la mascota'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getPet = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query('select * from animales where id = ?', [id])

        if (result.length > 0) {
            return res.status(200).json(result)
        }
        else {
            return res.status(404).json({ message: 'No hay mascota con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 

export const updatePet = async (req, res) =>{
    try {
        const {id} = req.params
        const {nombre, edad, cantidad, raza, nombre_propietario, telefono_propietario, direccion_propietario} = req.body
        const [oldPet] = await pool.query('select * from animales where id = ?', [id])
        const data = {
            nombre: nombre ? nombre : oldPet[0].nombre,
            edad : edad ? edad : oldPet[0].edad,
            cantidad : cantidad ? cantidad : oldPet[0].cantidad,
            raza : raza ? raza : oldPet[0].raza,
            nombre_propietario : nombre_propietario ? nombre_propietario : oldPet[0].nombre_propietario,
            telefono_propietario : telefono_propietario ? telefono_propietario : oldPet[0].telefono_propietario,
            direccion_propietario : direccion_propietario ? direccion_propietario : oldPet[0].direccion_propietario
        }
        const [result] = await pool.query('update animales set ? where id = ?', [data, id])
        if(result.affectedRows>0){
        return res.status(201).json({message: 'Mascota actualizada con éxito'})
        }
        else{
            return res.status(404).json({message: 'No se pudo actuaizar la mascota'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deletePet = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query('delete from animales where id = ?', [id])

        if (result.affectedRows > 0) {
            return res.status(200).json({message: 'Se elimino la mascota'})
        }
        else {
            return res.status(404).json({ message: 'No hay mascota con ese ID' })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
} 
