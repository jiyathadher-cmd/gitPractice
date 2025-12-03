module.exports = {
    AUTH_MESSAGES: {
        SIGNUP_SUCCESS: 'User registered successfully',
        LOGIN_SUCCESS: 'Login successful',
        ACCOUNT_INACTIVE: 'Account inactive. Contact admin.',
    },

    USER_MESSAGES: {
        FETCH_ALL_SUCCESS: 'All users fetched successfully',
        FETCH_ONE_SUCCESS: 'User fetched successfully',
        NOT_FOUND: 'User not found',
        UPDATE_SUCCESS: 'User data updated successfully',
        DELETE_SUCCESS: 'User deleted successfully',
        ACCESS_DENIED: 'Access denied. Admins only.',
        ACCESS_DENIED_UPDATE: 'Access denied. You can only update your own account.'
    },

    TOUR_MESSAGES: {
        CREATE_SUCCESS: 'Tour created successfully',
        FETCH_ALL_SUCCESS: 'All tours fetched successfully',
        FETCH_ONE_SUCCESS: 'Tour fetched successfully',
        NOT_FOUND: 'No tour found with that ID',
        UPDATE_SUCCESS: 'Tour updated successfully',
        DELETE_SUCCESS: 'Tour deleted successfully'
    },
    
    ERROR_MESSAGES: {
        VALIDATION_FAILED: 'Validation failed',
        INTERNAL_ERROR: 'Internal server error'
    }
};
