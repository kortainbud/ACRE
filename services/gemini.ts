
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface MarketInsight {
  propertyType: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  predictedFloor: string;
  reasoning: string;
}

export interface SectorDetail {
  id: string;
  name: string;
  lore: string;
  topography: string;
  yieldPotential: string;
  owner: string;
  price: string;
}

export const getYokaiInsights = async (): Promise<MarketInsight[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate 3 real-time market insights for the Yokaiverse virtual real estate market. The properties are themed around Japanese spirits and high-tech futurism. Include property type, market sentiment, predicted floor price in $ACRE, and a short reason based on 'current' digital trends.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              propertyType: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['Bullish', 'Bearish', 'Neutral'] },
              predictedFloor: { type: Type.STRING },
              reasoning: { type: Type.STRING },
            },
            required: ["propertyType", "sentiment", "predictedFloor", "reasoning"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to fetch market insights:", error);
    return [
      {
        propertyType: "Spirit Shrines",
        sentiment: "Bullish",
        predictedFloor: "4,500 $ACRE",
        reasoning: "Increasing demand for ritual-based staking mechanisms."
      },
      {
        propertyType: "Cyber-Dojos",
        sentiment: "Neutral",
        predictedFloor: "2,200 $ACRE",
        reasoning: "Market stabilization after the Phase 2 expansion rollout."
      }
    ];
  }
};

export const getSectorAnalysis = async (sectorId: string): Promise<SectorDetail> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate detailed lore and spatial data for a virtual real estate plot with ID ${sectorId} in the Yokaiverse. 
      The theme is high-tech Japanese folklore. 
      Include a evocative Name, 2-sentence Lore, Topography description (e.g. jagged peaks, neon plains), Yield potential (High/Med/Low), Owner (a cool futuristic name), and Price in $ACRE (between 1000 and 50000).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            lore: { type: Type.STRING },
            topography: { type: Type.STRING },
            yieldPotential: { type: Type.STRING },
            owner: { type: Type.STRING },
            price: { type: Type.STRING },
          },
          required: ["id", "name", "lore", "topography", "yieldPotential", "owner", "price"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Failed to fetch sector analysis:", error);
    return {
      id: sectorId,
      name: `Quadrant ${sectorId}`,
      lore: "A mysterious region where neon spirits are said to gather during the solar shift.",
      topography: "Jagged obsidian mountains with crimson data streams.",
      yieldPotential: "High",
      owner: "Akira_2077",
      price: "12,400 $ACRE"
    };
  }
};
