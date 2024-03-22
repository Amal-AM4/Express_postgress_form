const pool = require("../db");

// insert
async function insertData (name, age, gender, place) {
    const query = `
        insert into people (name, age, gender, place) values ($1, $2, $3, $4)
    `;
    try {
        await pool.query(query, [name, age, gender, place]);
        console.log('data inserted successfully');
    } catch(error) {
        console.error(error);
    }
}

// display
async function seleteData () {  
    const query = `
        select * from "people"
    `;
    try {
        const result = await pool.query(query);
        console.log('Data will display here...');
        return result;
        
    } catch (error) {
        console.log(error);
    }
    
}

// single data
async function seleteDataOfPerson (id) {  
    const query = `
        select * from people where id = $1
    `;
    try {
        const result = await pool.query(query, [id]);
        console.log('single data will display here...');
        return result;
        
    } catch (error) {
        console.log(error);
    }
    
}

// single data removal
async function removeDataOfPerson (id) {  
    const query = `
        delete from people where id = $1
    `;
    try {
        await pool.query(query, [id]);
        console.log('data is removed successufully...');
    } catch (error) {
        console.log(error);
    }
    
}

// insert
async function updateData (id, name, age, gender, place) {
    const query = `
        UPDATE people
        SET name=$1, age=$2, gender=$3, place=$4
        WHERE id=$5; 
    `;

    try {
        await pool.query(query, [name, age, gender, place, id]);
        console.log('data updated successfully');
    } catch(error) {
        console.error(error);
    }
}

module.exports = { insertData, seleteData, seleteDataOfPerson, removeDataOfPerson, updateData }