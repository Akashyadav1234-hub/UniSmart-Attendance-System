const { Client } = require("@notionhq/client");
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const PAGE_ID = process.env.NOTION_PAGE_ID;

async function buildCompleteDocumentation() {
    console.log("Constructing Master Documentation in Notion...");

    try {
        await notion.blocks.children.append({
            block_id: PAGE_ID,
            children: [
                {
                    object: 'block',
                    type: 'heading_1',
                    heading_1: { rich_text: [{ type: 'text', text: { content: "Smart Attendance System: Master Architecture" } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ type: 'text', text: { content: "A high-performance, role-based attendance tracking platform designed to streamline institutional data management. Built with a scalable micro-architecture prioritizing data integrity and automated reporting." } }] }
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: { rich_text: [{ type: 'text', text: { content: "1. Core Technology Stack" } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Frontend: React.js, Tailwind CSS, Vite (State-driven dynamic UI)" } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Backend: Node.js, Express.js (RESTful API architecture)" } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Database: MongoDB Atlas, Mongoose ODM (NoSQL Document mapping)" } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Infrastructure: Notion API (Self-documenting automated logs)" } }] }
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: { rich_text: [{ type: 'text', text: { content: "2. Key Engineering Features" } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Custom Data Ingestion Pipeline: An automated parser that sanitizes bulk Excel/CSV uploads, stripping hyperlink objects and strictly formatting batch data before MongoDB insertion." } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Role-Based Access Control (RBAC): JWT-secured routes ensuring strict separation of concerns between Admin (Upload/Manage) and Faculty (View/Mark Attendance) privileges." } }] }
                },
                {
                    object: 'block',
                    type: 'bulleted_list_item',
                    bulleted_list_item: { rich_text: [{ type: 'text', text: { content: "Self-Documenting Architecture: Event-driven webhooks that push live deployment logs and system updates directly to this Notion workspace." } }] }
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: { rich_text: [{ type: 'text', text: { content: "3. Database Schema Mapping" } }] }
                },
                {
                    object: 'block',
                    type: 'code',
                    code: {
                        language: 'javascript',
                        rich_text: [{ type: 'text', text: { content: "// Student Collection\n{\n  name: { type: String, required: true },\n  rollNumber: { type: Number, required: true, unique: true },\n  email: { type: String, required: true },\n  batch: { type: String, required: true }\n}\n\n// Attendance Collection\n{\n  date: { type: Date, required: true },\n  batch: { type: String, required: true },\n  records: [{\n    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },\n    status: { type: String, enum: ['Present', 'Absent'] }\n  }]\n}" } }]
                    }
                },
                {
                    object: 'block',
                    type: 'divider',
                    divider: {}
                },
                {
                    object: 'block',
                    type: 'heading_2',
                    heading_2: { rich_text: [{ type: 'text', text: { content: "📡 Live System Logs" } }] }
                },
                {
                    object: 'block',
                    type: 'paragraph',
                    paragraph: { rich_text: [{ type: 'text', text: { content: "The following entries are autonomously generated by the Node.js backend upon successful database events." } }] }
                }
            ],
        });
        console.log("✅ BOOM! Complete documentation generated successfully!");
    } catch (err) {
        console.error("❌ Failed to build documentation:", err.body || err);
    }
}

buildCompleteDocumentation();