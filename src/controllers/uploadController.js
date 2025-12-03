exports.uploadFile = (req, res) => {
    
    res.json({
        message: "File uploaded successfully!",
        file: req.file
    });
};

exports.uploadMultiple = (req, res) => {
    res.json({
        message: "Files uploaded successfully!",
        files: req.files
    });
};

exports.uploadFeilds = (req,res) => {
    res.json({
        message:"Files uploaded successfully!",
        files: req.files
    });
};