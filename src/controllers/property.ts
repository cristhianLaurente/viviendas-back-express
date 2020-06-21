import { Request, Response } from 'express';
import { Property } from '../db/mongoose';

export const getProperties = (req: Request, res: Response) => {
    Property.find()
            .exec((err, properties) => {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        error: {
                            title: 'database error',
                            message: err
                        }
                    })
                }

                res.status(200).json({
                    success: true,
                    data: properties
                })
            })
}

export const addProperty = (req: Request, res: Response) => {
    let {body, query} = req;

    let propertyObject = new Property({
        title: body.title,
        type: body.type,
        address: body.address,
        rooms: body.rooms,
        price: body.price,
        area: body.area,
        user: query.user._id
    })

    propertyObject.save((err, propertyDB) => {
        if(err) {
            return res.status(500).json({
                success: false,
                error: {
                    title: 'database error',
                    message: err
                }
            })
        }

        if(!propertyDB) {
            return res.status(400).json({
                success: false,
                error: {
                    title: 'Bad Request',
                    message: 'id is invalid'
                }
            })
        }

        res.status(201).json({
            success: true,
            data: propertyDB
        })

    })

}

export const editProperty = (req: Request, res: Response) => {
    let { body, params } = req;

    const options = { new: true }

    Property.findByIdAndUpdate(params.id, body, options , (err, propertyDB) => {
        if(err) {
            return res.status(500).json({
                success: false,
                error: {
                    title: 'database error',
                    message: err
                }
            })
        }

        if(!propertyDB) {
            return res.status(400).json({
                success: false,
                error: {
                    title: 'Bad Request',
                    message: 'id is invalid'
                }
            })
        }

        res.status(200).json({
            success: true,
            data: propertyDB
        })
    })
    

}

export const deleteProperty = (req: Request, res: Response) => {
    let { id } = req.params;

    Property.findByIdAndRemove(id, (err, propertyDB) => {
        if(err) {
            return res.status(500).json({
                success: false,
                error: {
                    title: 'database error',
                    message: err
                }
            })
        }

        if(!propertyDB) {
            return res.status(400).json({
                success: false,
                error: {
                    title: 'Bad Request',
                    message: 'id is invalid'
                }
            })
        }

        res.status(200).json({
            success: true,
            message: 'it was removed correctly'
        })
    })

}

export const getSortedProperties = (req: Request, res: Response) => {
    Property.find()
            .sort('price')
            .exec((err, properties) => {
                if(err) {
                    return res.status(500).json({
                        success: false,
                        error: {
                            title: 'database error',
                            message: err
                        }
                    })
                }

                res.status(200).json({
                    success: true,
                    data: properties
                })
            })
}