const services = require('../services');
const Tour = require('../models');
const { validateTourBody } = require('../validator');
const messages = require('../utils/constants');

exports.createTour = async (req, res, next) => {
    try {
        console.log("Request body:", req.body);
        const validation = validateTourBody(req.body);
        if (!validation.success) {
            return res.status(400).json({
                status: 'fail',
                message: validation.message
            });
        }

        const newTour = await services.tourService.createTour(req.body);

        res.status(201).json({
            status: 'success',
            message: messages.TOUR_MESSAGES.CREATE_SUCCESS,
            data: { tour: newTour }
        });
    } catch (error) {
        console.log("Error in createTour:", error);
        next(error);
    }
};

exports.getAllTours = async (req, res, next) => {
    try {
        const tours = await services.tourService.getAllTours(req);

        res.status(200).json({
            status: 'success',
            message: messages.TOUR_MESSAGES.FETCH_ALL_SUCCESS,
            result: tours.length,
            data: tours,
            meta: tours.meta
        });
    } catch (error) {
        console.log("Error in getAllTours:", error);
        next(error);
    }
};

exports.getTour = async (req, res, next) => {
    try {
        const tour = await services.tourService.getTourById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: messages.TOUR_MESSAGES.NOT_FOUND
            });
        }

        res.status(200).json({
            status: 'success',
            message: messages.TOUR_MESSAGES.FETCH_ONE_SUCCESS,
            data: { tour }
        });
    } catch (error) {
        console.log("Error in getTour:", error);
        next(error);
    }
};

exports.updateTour = async (req, res, next) => {
    try {
        const validation = validateTourBody(req.body);
        if (!validation.success) {
            return res.status(400).json({
                status: 'fail',
                message: validation.message
            });
        }

        const tour = await services.tourService.updateTour(req.params.id, req.body);

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: messages.TOUR_MESSAGES.NOT_FOUND
            });
        }

        res.status(200).json({
            status: 'success',
            message: messages.TOUR_MESSAGES.UPDATE_SUCCESS,
            data: { tour }
        });
    } catch (error) {
        console.log("Error in updateTour:", error);
        next(error);
    }
};

exports.deleteTour = async (req, res, next) => {
    try {
        const tour = await services.tourService.deleteTour(req.params.id);

        if (!tour) {
            return res.status(404).json({
                status: 'fail',
                message: messages.TOUR_MESSAGES.NOT_FOUND
            });
        }

        res.status(200).json({
            status: 'success',
            message: messages.TOUR_MESSAGES.DELETE_SUCCESS,
            data: null
        });
    } catch (error) {
        console.log("Error in deleteTour:", error);
        next(error);
    }
};
