import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true }); // Enable detailed error messages
addFormats(ajv); // Add support for formats like email, date, etc.

/**
 * Validate data against a schema
 * @param {Object} schema - The JSON schema to validate against
 * @param {Object} data - The input data to be validated
 * @returns {Object} - { valid: boolean, errors: Array }
 */
export function validateSchema(schema, data) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    return valid ? { valid: true } : { valid: false, errors: validate.errors };
}
