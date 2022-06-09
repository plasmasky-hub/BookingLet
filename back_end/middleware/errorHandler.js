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

    if (error.name === 'MongooseError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(500).json({ error: error.message});	
        }
        return res.status(500).json(error);
    }

    if (error.name === 'DisconnectedError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(408).json({ error: error.message});	
        }
        return res.status(408).json(error);
    }

    if (error.name === 'DivergentArrayError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(416).json({ error: error.message});	
        }
        return res.status(416).json(error);
    }

    if (error.name === 'MissingSchemaError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(412).json({ error: error.message});	
        }
        return res.status(412).json(error);
    }

    if (error.name === 'DocumentNotFoundError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(404).json({ error: error.message});	
        }
        return res.status(404).json(error);
    }

    if (error.name === 'ValidatorError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'ObjectExpectedError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'ObjectParameterError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'OverwriteModelError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(406).json({ error: error.message});	
        }
        return res.status(406).json(error);
    }

    if (error.name === 'ParallelSaveError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(406).json({ error: error.message});	
        }
        return res.status(406).json(error);
    }

    if (error.name === 'StrictModeError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(400).json({ error: error.message});	
        }
        return res.status(400).json(error);
    }

    if (error.name === 'VersionError') {
        if(process.env.NODE_ENV === 'production'){
            return res.status(404).json({ error: error.message});	
        }
        return res.status(404).json(error);
    }





    console.log(error);
    return res.status(500).json({
        error: 'An Unknown error occurred! Please try later',
        'error name': error.name
    });

}