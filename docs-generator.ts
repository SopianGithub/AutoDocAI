// Import necessary modules
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

// Execute the main function
dotenv.config();
// Ensure the API key is defined
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Function to generate JSDoc comments
export function generateJSDoc(filePath: string, jsDocComments: string): void {
    // Remove any TypeScript code block markers
    const cleanedComments = jsDocComments.replace(/```typescript/g, '').replace(/```/g, '');
    // Overwrite the file with the generated JSDoc comments
    fs.writeFileSync(filePath, cleanedComments);
}

// Function to create README files
export function createReadme(projectName: string): void {
    const readmeContent = `# ${projectName}
    
    ## Overview
    This project is designed to automate the generation of documentation for your codebase. It includes features for generating JSDoc comments, creating README files, documenting API endpoints, and generating usage examples.

    ## Features
    - **Generate JSDoc Comments**: Automatically generate JSDoc comments for your TypeScript files.
    - **Create README**: Generate a comprehensive README file for your project.
    - **Document API Endpoints**: Create detailed documentation for your API endpoints.
    - **Generate Usage Examples**: Provide usage examples for your code.

    ## Installation
    To install the necessary dependencies, run:
    \`\`\`bash
    npm install
    \`\`\`

    ## Usage
    To start the documentation generator, run:
    \`\`\`bash
    npx ts-node code-docs-gen/docs-generator.ts
    \`\`\`

    ## Configuration
    Ensure you have a \`.env.local\` file with the necessary API keys:
    \`\`\`env
    GEMINI_API_KEY=your_gemini_api_key_here
    \`\`\`

    ## Contributing
    Contributions are welcome! Please fork the repository and submit a pull request.

    ## License
    This project is licensed under the MIT License.

    ## Contact
    For any questions or issues, please contact [Your Name] at [Your Email].
    `;

    fs.writeFileSync('README.md', readmeContent);
}

// Function to document API endpoints
export function documentApiEndpoints(apiData: string): void {
    // Parse the structured document into sections
    const sections = apiData.split('## ').filter((section: string) => section.trim() !== '');

    // Format each section into markdown
    const formattedDocs = sections.map((section: string) => {
        const [title, ...content] = section.split('\n').filter((line: string) => line.trim() !== '');
        return `## ${title.trim()}\n\n${content.join('\n').trim()}\n`;
    }).join('\n');

    // Write the formatted documentation to a file
    fs.writeFileSync('API_DOCUMENTATION.md', formattedDocs);
}

// Function to generate usage examples
export function generateUsageExamples(): void {
    const examples = `// Usage example
    // ... existing code ...
    `;
    fs.writeFileSync('USAGE_EXAMPLES.md', examples);
}

// Main function to orchestrate documentation creation
export async function createDocumentation() {
    // Read the script from src/index.ts
    const scriptPath = 'src/index.ts';
    const scriptContent = fs.readFileSync(scriptPath, 'utf-8');

    // Use the Gemini model to generate JSDoc comments
    const jsDocPrompt = `
        Generate JSDoc comments for the following TypeScript code:
        ${scriptContent}
    `;
    const jsDocResult = await model.generateContent(jsDocPrompt);
    const jsDocComments = jsDocResult.response.text(); // Adjust based on actual response structure

    // Overwrite the src/index.ts with the new JSDoc comments
    generateJSDoc(scriptPath, jsDocComments);
    // createReadme('Automated Documentation Creator');
}

createDocumentation().catch(console.error);