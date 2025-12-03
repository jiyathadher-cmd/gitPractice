const remove_double_quotes = (string) => {
    if (!string) return "";
    return string.toString().replace(/['"]+/g, '');
};

const validate = (schema, data) => {
    // Validate the incoming data (NOT req)
    const { error } = schema.validate(data, { abortEarly: false });

    // If no validation errors
    if (!error) {
        return { success: true };
    }

    // Format validation errors
    const message = remove_double_quotes(
        error.details.map(i => i.message).join(", ")
    );

    return {
        success: false,
        message
    };
};

module.exports = {
    validate
};
