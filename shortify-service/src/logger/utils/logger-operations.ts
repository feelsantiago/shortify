const DatabaseLoggerOperations = {
    DATABASE_CREATE_ATTEMPT: 'DATABASE_CREATE_OPERATION_ATTEMPT',
    DATABASE_READ_ATTEMPT: 'DATABASE_READ_OPERATION_ATTEMPT',
    DATABASE_UPDATE_ATTEMPT: 'DATABASE_UPDATED_OPERATION_ATTEMPT',
    DATABASE_DELETE_ATTEMPT: 'DATABASE_DELETE_OPERATION_ATTEMPT',

    DATABASE_CREATE_SUCCESSFUL: 'DATABASE_CREATE_OPERATION_SUCCESSFUL',
    DATABASE_READ_SUCCESSFUL: 'DATABASE_READ_OPERATION_SUCCESSFUL',
    DATABASE_UPDATE_SUCCESSFUL: 'DATABASE_UPDATED_OPERATION_SUCCESSFUL',
    DATABASE_DELETE_SUCCESSFUL: 'DATABASE_DELETE_OPERATION_SUCCESSFUL',
};

const ServiceLoggerOperations = {
    SHORTIFY_OPERATION: 'START_SHORTIFY_OPERATION',
    REDIRECT_OPERATION: 'START_REDIRECT_OPERATION',
    GENERATE_TRACK_ID: 'GENERATE_TRACK_ID',
    LINK_NOT_FOUND: 'LINK_NOT_FOUND',
};

export const LoggerOperations = { ...DatabaseLoggerOperations, ...ServiceLoggerOperations };
