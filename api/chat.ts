import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY_HERE';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history } = req.body ?? {};

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!API_KEY || API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            console.error('Gemini API key not configured');
            return res.status(500).json({ error: 'API key not configured. Please add GEMINI_API_KEY to your environment variables.' });
        }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const models = ['gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-2.5-pro'];
        let lastError: any = null;

        for (const modelName of models) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const context = history?.slice(-6).map((m: any) => `${m.role}: ${m.content}`).join('\n') || '';
                const prompt = `You are a helpful assistant for InsightEdge, a Smart Cities career guidance platform. Be concise and helpful.\n\n${context}\nuser: ${message}\nassistant:`;

                const result = await model.generateContent(prompt);
                const response = result.response.text();
                return res.status(200).json({ response });
            } catch (modelError: any) {
                lastError = modelError;
            }
        }
        throw lastError;
    } catch (error: any) {
        console.error('Gemini API error:', error?.message || error);
        if (error?.message?.includes('quota') || error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
            return res.status(429).json({ error: 'API rate limit reached. Please wait a moment and try again.' });
        }
        return res.status(500).json({ error: error?.message || 'Failed to get response from AI' });
    }
}