const services = require('../services');
const Tour = require('../models');
const { validateTourBody } = require('../validator');
const messages = require('../utils/constants');
const exceljs = require('exceljs');
const path = require('path');
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

exports.getAllToursToExcel = async (req,res) => {
    try {
        const tours = await services.tourService.getAllTours(req);

        const filetittle = 'Tours Data: ' + new Data().toISOString();
        const workbook = new exceljs.Workbook();
        worksheet = workbook.addWorksheet('Tours');

        const columns = [
            {header: "ID", key: "_id", width:30 },
            {header: "name", key: "name", width:30 },
            {header: "destination", key: "destination", width:30 },
            {header: "duration", key: "duration", width:30 },
            {header: "groupSize", key: "groupSize", width:30 },
            {header: "difficulty", key: "difficulty", width:30 },
            {header: "price", key: "price", width:30 },
            {header: "price", key: "price", width:30 },
        ];

        worksheet.columns = columns;
        worksheet.addRows(users);
        worksheet.autoFilter = 'A1:H1';
        res.setHeader('Content-type',"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader('Content-Description',`attachment; filename = ${filetittle}.xlsx`);
        const uploadDir = Path.join(__dirname, '..', 'Excel-exports');
        const filepath = path.join(uploadDir,`${filetittle}.xlsx`);
        await workbook.xlsx.writeFile(filepath);

        res.status(200).json({
            status: "success",
            message: `Excel file generated successfully!`,
            filePath: filepath
        });
    }catch (err){
        next(err); 
    }
}
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


