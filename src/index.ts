import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const API_BASE = "https://api.edgeshop.ai";
const USER_AGENT = "ai-humanizer-mcp-server/1.0";

const AiDetectArgumentSchema = z
  .object({
    type: z.enum(["general"]),
    text: z.string(),
    detectionTypeList: z.array(
      z.enum(["COPYLEAKS", "HEMINGWAY", "GRAMMARLY", "AI_SYNTAGMAS"])
    ),
  })
  .required();

const server = new Server(
  {
    name: "ai-humanlize",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
        {
            name: "detect",
            description: "Detect whether the text is AI-generated",
            inputSchema: {
              type: "object",
              properties: {
                type: {
                  type: "string",
                  enum: ["general"],
                },
                text: {
                  type: "string",
                },
                detectionTypeList: {
                  type: "array",
                  items: {
                    type: "string",
                    enum: ["COPYLEAKS", "HEMINGWAY", "GRAMMARLY"],
                  },
                },
              },
              required: ["type", "text", "detectionTypeList"],
            },
          }
    ],
  };
});

async function makeRequest<T>(url: string, data?: any): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making request:", error);
    return null;
  }
}

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "detect") {
      const argument = AiDetectArgumentSchema.parse(args);

      const detectUrl = `${API_BASE}/rewrite/text-detection`;
      const detectData = await makeRequest<AiDetectResponse>(detectUrl, argument);

      if (!detectData) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve alerts data",
            },
          ],
        };
      }

      const responseData = {
        ...detectData,
        detectionResult: {
          ...detectData.detectionResult
        }
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(responseData),
          },
        ],
      };
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid arguments: ${error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw error;
  }
});

interface AiDetectResponse {
  detectionType: 'COPYLEAKS' | 'HEMINGWAY' | 'GRAMMARLY' | 'AI_SYNTAGMAS';
  detectionResult: CopyleaksResult | HemingwayResult | GrammarlyResult | AiSyntagmasResult;
}

interface CopyleaksResult {
  totalWords: string;
  creationTime: string;
  modelVersion: string;
  probability: string;
  scanId: string;
  ai: string;
  classification: string;
  human: string;
}

interface HemingwayResult {
  sentences: string;
  grade: string;
  words: string;
  letters: string;
}

interface GrammarlyResult {
  score: string;
}

interface AiSyntagmasResult {
  markedText: string;
}

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("ai-detect MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
  
