const codes = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'You have no privilege to this resource',
    UNPROCESSED_ENTITY: 'Fields required',
    FORBIDDEN: 'Request not allowed',
    INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again or contact support.',
    SERVICE_UNAVAILABLE: 'Service Unavailable. Please try again later',
    RESOURCE_NOT_FOUND: (resource): string => `${resource} not found`,
    NO_MESSAGE: ''
};

export default codes;