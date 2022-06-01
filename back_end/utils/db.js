const mongoose = require('mongoose');

function connectToDB () {
    const connectionString = process.env.CONNECTION_STRING;

    if( !connectionString ){
        console.error('Connect string not defined.');
        // 人为非正常退出
        process.exit(1);
    }

    const db = mongoose.connection;

    // 监听事件
    db.on('connected', () => {
        console.log(`DB connected to ${connectionString} `);
    });

    db.on('error', (error) => {
        console.error(error.message);
        process.exit(2);
    })

    db.on('disconnected', () => {
        console.log(`DB disconnected.`);
    });

    return mongoose.connect(connectionString);
}

module.exports = { connectToDB };
