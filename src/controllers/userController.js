const message = require('../utils/constants.js');
const User = require('../models');
const services = require('../services');
const path = require('path');
const { validateSignup, validateLogin } = require('../validator');
const Email = require('../email/onboardingemail.js');
const exceljs = require('exceljs');

const signup = async (req, res, next) => {

    if (!req.file) {
        return res.status(400).json({ message: "Profile image is required" });
    }

    const validation = await validateSignup(req.body);
    if (!validation.success) {
        console.log('wrong')
        return res.status(400).json({ errors: validation.message });
    }

    try {
        const newUserData = {
            ...req.body,
            profileImage: req.file.filename 
        };
        const newUser = await services.userService.signupService(newUserData);

        const email_payload = {
            email: req.body.email,
            name: req.body.name,
        };
        await Email.verification(email_payload);

        res.status(201).json({
            message: message.AUTH_MESSAGES.SIGNUP_SUCCESS,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                regNumber: newUser.regNumber,
                phone: newUser.phone,
                role: newUser.role,
                status: newUser.status,
                profileImage: newUser.profileImage
            }
        });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    const validation = await validateLogin(req.body);
    if (!validation.success) {
        return res.status(400).json({ errors: validation.errors });
    }

    try {
        const { user, token } = await services.userService.loginService(req.body);

        if (user.status !== 'active') {
            return res.status(403).json({ message: message.AUTH_MESSAGES.ACCOUNT_INACTIVE });
        }

        res.status(200).json({
            message: message.AUTH_MESSAGES.LOGIN_SUCCESS,
            user: { name: user.name, email: user.email, role: user.role },
            token
        });
    } catch (err) {
        next(err);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const users = await services.userService.getAllUsersService(req.body);

        const aggregation = await User.User.aggregate([
            { $match: { isDeleted: false } },
            { $group: { _id: '$status', total: { $sum: 1 } } }
        ]);

        res.status(200).json({
            status: 'success',
            message: message.USER_MESSAGES.FETCH_ALL_SUCCESS,
            totalUsers: users.length,
            aggregation,
            users
        });
    } catch (err) {
        next(err);
    }
};
const exportsUsersToExcel = async (req, res, next) => {
    try {
        const users = await services.userService.getAllUsersService(req.query);

        const fileTitle = 'User Data: ' + new Date().toISOString();
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Users');
        const columns = [
            { header: "ID", key: "_id", width: 30 },
            { header: "Name", key: "name", width: 25 },
            { header: "Email", key: "email", width: 30 },
            { header: "Role", key: "role", width: 15 },
            { header: "Status", key: "status", width: 15 },
        ];

        worksheet.columns = columns;

        worksheet.addRows(users); 
        worksheet.autoFilter = 'A1:E1';

        res.setHeader("Content-type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${fileTitle}.xlsx`);
        const uploadDir = path.join(__dirname, '..', 'Excel-Exports');
        const filepath = path.join(uploadDir, `${fileTitle}.xlsx`);
        await workbook.xlsx.writeFile(filepath);

        res.status(200).json({
            status: 'success',
            message: `Excel file generated successfully`,
            filePath: filepath
        });

    } catch (err) {
        next(err);
    }
}

const getOneUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await services.userService.getOneUserService(id);

        if (!user) {
            return res.status(404).json({ message: message.USER_MESSAGES.NOT_FOUND });
        }


        res.status(200).json({
            message: message.USER_MESSAGES.FETCH_ONE_SUCCESS,
            user
        });
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (req.user && req.user.role !== 'admin' && req.user._id.toString() !== id) {
            return res.status(403).json({ message: message.USER_MESSAGES.ACCESS_DENIED_UPDATE });
        }
        if (req.user && req.user.role !== 'admin') {
            delete req.body.role;
            delete req.body.status;
        }

        const updatedUser = await services.userService.updateUserService(id, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: message.USER_MESSAGES.NOT_FOUND });
        }

        res.status(200).json({
            message: message.USER_MESSAGES.UPDATE_SUCCESS,
            user: updatedUser
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: message.USER_MESSAGES.ACCESS_DENIED });
        }

        const { id } = req.params;
        const user = await services.userService.deleteUserService(id);

        if (!user) {
            return res.status(404).json({ message: message.USER_MESSAGES.NOT_FOUND });
        }

        res.status(200).json({ message: message.USER_MESSAGES.DELETE_SUCCESS });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    exportsUsersToExcel,
    signup,
    login,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser
};
