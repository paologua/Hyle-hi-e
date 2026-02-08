import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai'; // oppure Groq, Gemini, etc.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // o GROQ_API_KEY, GEMINI_API_KEY...
  baseURL: 'https://api.groq.com/openai/v1', // se usi Groq
});

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: 'Idea mancante' }, { status: 400 });
    }

    // Fase 1: Sensor
    const sensorRes = await openai.chat.completions.create({
      model: 'llama-3.1-70b-versatile', // o mixtral, gemini-1.5-flash, etc.
      messages: [
        { role: 'system', content: sensorPrompt },
        { role: 'user', content: idea }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const sensorData = JSON.parse(sensorRes.choices[0].message.content || '{}');

    // Fase 2: Processor (passa output sensor)
    const processorRes = await openai.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: processorPrompt },
        { role: 'user', content: `Idea: ${idea}\nSensor output: ${JSON.stringify(sensorData)}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const processorData = JSON.parse(processorRes.choices[0].message.content || '{}');

    // Fase 3: Actuator
    const actuatorRes = await openai.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [
        { role: 'system', content: actuatorPrompt },
        { role: 'user', content: `Idea: ${idea}\nSensor: ${JSON.stringify(sensorData)}\nProcessor: ${JSON.stringify(processorData)}` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });

    const actuatorData = JSON.parse(actuatorRes.choices[0].message.content || '{}');

    // Risultato finale
    const report = {
      sensor: sensorData,
      processor: processorData,
      actuator: actuatorData,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
