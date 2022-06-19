module.exports = (error, req, res, next) => {

    if (error.name === 'CastError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'ValidationError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'SyntaxError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'ReferenceError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(500).json({ error: error.message});	
        }
        return res.status(500).json(error);
    }

    if (error.name === 'TypeError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(500).json({ error: error.message});	
        }
        return res.status(500).json(error);
    }

    



    console.log(error);
    return res.status(500).json({
        error: 'An Unknown error occurred! Please try later',
        'error name': error.name
    });

}