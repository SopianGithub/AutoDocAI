
/**
 * Imports the express library for creating a web server.
 */
import express from 'express';
/**
 * Imports functions for generating documentation.
 */
import { generateJSDoc, createReadme, documentApiEndpoints, generateUsageExamples } from '../docs-generator';

/**
 * Creates an Express application instance.
 */
const app = express();
/**
 * Sets the port number for the server to listen on.
 */
const port = 3000;

/**
 * Middleware to parse JSON request bodies.
 */
app.use(express.json());

/**
 * Endpoint to generate JSDoc comments from a given file path.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.post('/generate-jsdoc', (req, res) => {
    /**
     * Extracts the filePath from the request body.
     */
    const { filePath } = req.body;
    /**
     * Checks if filePath is provided. Returns a 400 error if not.
     */
    if (!filePath) {
        return res.status(400).send('filePath is required');
    }

    try {
        /**
         * Generates JSDoc comments using the provided filePath.
         */
        generateJSDoc(filePath);
        /**
         * Sends a 200 OK response indicating successful generation.
         */
        res.status(200).send('JSDoc comments generated successfully');
    } catch (error) {
        /**
         * Sends a 500 Internal Server Error response if an error occurs.
         */
        res.status(500).send(`Error generating JSDoc comments: ${error.message}`);
    }
});

/**
 * Endpoint to create a README file for a given project name.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.post('/create-readme', (req, res) => {
    /**
     * Extracts the projectName from the request body.
     */
    const { projectName } = req.body;
    /**
     * Checks if projectName is provided. Returns a 400 error if not.
     */
    if (!projectName) {
        return res.status(400).send('projectName is required');
    }

    try {
        /**
         * Creates a README file using the provided projectName.
         */
        createReadme(projectName);
        /**
         * Sends a 200 OK response indicating successful creation.
         */
        res.status(200).send('README file created successfully');
    } catch (error) {
        /**
         * Sends a 500 Internal Server Error response if an error occurs.
         */
        res.status(500).send(`Error creating README file: ${error.message}`);
    }
});

/**
 * Endpoint to generate API documentation from provided API data.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.post('/document-api', async (req, res) => {
    /**
     * Extracts the apiData from the request body.
     */
    const { apiData } = req.body;
    /**
     * Checks if apiData is provided. Returns a 400 error if not.
     */
    if (!apiData) {
        return res.status(400).send('apiData is required');
    }

    try {
        /**
         * Generates API documentation using the provided apiData.
         */
        await documentApiEndpoints(apiData);
        /**
         * Sends a 200 OK response indicating successful generation.
         */
        res.status(200).send('API documentation generated successfully');
    } catch (error) {
        /**
         * Sends a 500 Internal Server Error response if an error occurs.
         */
        res.status(500).send(`Error generating API documentation: ${error.message}`);
    }
});

/**
 * Endpoint to generate usage examples.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
app.post('/generate-usage-examples', (req, res) => {
    try {
        /**
         * Generates usage examples.
         */
        generateUsageExamples();
        /**
         * Sends a 200 OK response indicating successful generation.
         */
        res.status(200).send('Usage examples generated successfully');
    } catch (error) {
        /**
         * Sends a 500 Internal Server Error response if an error occurs.
         */
        res.status(500).send(`Error generating usage examples: ${error.message}`);
    }
});

/**
 * Starts the Express server and listens on the specified port.
 */
app.listen(port, () => {
    console.log(`Docs Generator API is running at http://localhost:${port}`);
});
