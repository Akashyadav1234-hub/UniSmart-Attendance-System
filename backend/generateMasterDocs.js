const { Client } = require("@notionhq/client");
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = process.env.NOTION_PAGE_ID;

// Chunk 1: PRD and Architecture
const part1 = [
    { object: 'block', type: 'heading_1', heading_1: { rich_text: [{ type: 'text', text: { content: "🚀 Smart Attendance System: Complete PRD & Architecture" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "This document serves as the master Product Requirements Document (PRD) and technical specification for the MERN-stack based Smart Attendance System." } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "1. Product Requirements Document (PRD)" } }] } },
    { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: "Problem Statement" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "Traditional attendance tracking is prone to human error, data redundancy, and lacks real-time visibility. Faculty spend excessive time managing spreadsheets rather than teaching." } }] } },
    { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: "Proposed Solution & Scope" } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "An automated, RBAC (Role-Based Access Control) web application." } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Admins can ingest bulk student data via Excel/CSV." } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Faculty can view assigned batches and mark daily attendance via a state-driven calendar interface." } }] } },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "2. Technology Stack & Architecture" } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Frontend: React.js, Tailwind CSS, Vite." } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Backend: Node.js, Express.js (RESTful API)." } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Database: MongoDB Atlas (Document-oriented NoSQL)." } }] } },
    { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "DevOps & Automation: Notion API Integration for self-documenting deployment logs." } }] } }
];

// Chunk 2: Database Schema & Implementations
const part2 = [
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "3. Core Implementation & Database Schema" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "The system utilizes a referencing pattern to map relational data (students to batches) within a NoSQL environment." } }] } },
    { object: 'block', type: 'code', code: { language: 'javascript', rich_text: [{ type: 'text', text: { content: "const StudentSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  rollNumber: { type: Number, required: true, unique: true },\n  email: { type: String, required: true },\n  batch: { type: String, required: true }\n});" } }] } },
    { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: "Data Ingestion Pipeline (Excel to MongoDB)" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "A custom mapping function sanitizes bulk uploads. It flattens hyperlink objects in the email column and enforces strict schema validation before executing Student.insertMany()." } }] } }
];

// Chunk 3: AI Prompt Engineering & Live Logs
const part3 = [
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "4. AI Prompt Engineering Log (Antigravity IDE)" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "Throughout development, AI agents were utilized to accelerate debugging and code generation. Below are the critical prompts used to resolve complex backend validation errors." } }] } },
    { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: "Prompt 1: Resolving Mongoose ValidationError for Emails" } }] } },
    { object: 'block', type: 'code', code: { language: 'markdown', rich_text: [{ type: 'text', text: { content: "The bulk upload is failing with a Mongoose ValidationError: `Cast to string failed for value... at path \"email\"`. The xlsx parser is extracting hyperlinked emails as objects (e.g., { text: [Object], hyperlink: 'mailto:student@gmail.com' }) instead of plain strings. Update the mapping logic in adminController.js to flatten the email field. If student.email is an object, extract the string by removing the 'mailto:' prefix. Ensure the final email value is a clean string." } }] } },
    { object: 'block', type: 'heading_3', heading_3: { rich_text: [{ type: 'text', text: { content: "Prompt 2: Forcing Payload Structure & Retaining Batch Data" } }] } },
    { object: 'block', type: 'code', code: { language: 'markdown', rich_text: [{ type: 'text', text: { content: "Stop making assumptions. The `adminController.js` bulk upload function is failing at `Student.insertMany()` with `ValidationError: batch is required`. The parsed Excel data correctly contains the `batch` property, but your mapping logic is stripping it out before insertion. Ensure the final mapped object explicitly includes: { name, rollNumber, email, batch }. Do not drop the batch variable." } }] } },
    { object: 'block', type: 'divider', divider: {} },
    { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ type: 'text', text: { content: "📡 Live System Logs" } }] } },
    { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ type: 'text', text: { content: "The following entries are autonomously generated by the backend API upon successful deployment or database modification." } }] } }
];

async function generateCompleteDocumentation() {
    console.log("Commencing Master Documentation Generation...");
    try {
        // We await each push so Notion processes them in the correct order
        console.log("Pushing PRD & Architecture...");
        await notion.blocks.children.append({ block_id: PAGE_ID, children: part1 });

        console.log("Pushing Database Schemas...");
        await notion.blocks.children.append({ block_id: PAGE_ID, children: part2 });

        console.log("Pushing AI Prompts & Logs...");
        await notion.blocks.children.append({ block_id: PAGE_ID, children: part3 });

        console.log("✅ BOOM! Complete documentation generated successfully!");
    } catch (err) {
        console.error("❌ Failed to build documentation:", err.body || err);
    }
}

generateCompleteDocumentation();