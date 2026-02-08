import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { actuatorPrompt, processorPrompt, sensorPrompt } from '@/lib/prompts';

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea?.trim()) {
      return NextResponse.json({ error: 'Inserisci un\'idea valida' }, { status: 400 });
    }

    // Inizializza Gemini
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY non configurata su Vercel');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash', // veloce e gratuito
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 800,
        responseMimeType: 'application/json',
      },
    });

    // Fase 1: SENSOR
    const sensorPromptFull = `${sensorPrompt}\n\nIdea da analizzare: ${idea}`;
    const sensorRes = await model.generateContent(sensorPromptFull);
    const sensorText = sensorRes.response.text();

    let sensorData;
    try {
      sensorData = JSON.parse(sensorText);
    } catch (parseErr) {
      console.error('Errore parsing Sensor:', parseErr);
      sensorData = { error: 'Errore nel parsing della risposta Sensor' };
    }

    // Fase 2: PROCESSOR
    const processorPromptFull = `${processorPrompt}\n\nIdea: ${idea}\n\nOutput Sensor:\n${JSON.stringify(sensorData, null, 2)}`;
    const processorRes = await model.generateContent(processorPromptFull);
    const processorText = processorRes.response.text();

    let processorData;
    try {
      processorData = JSON.parse(processorText);
    } catch (parseErr) {
      console.error('Errore parsing Processor:', parseErr);
      processorData = { error: 'Errore nel parsing della risposta Processor' };
    }

    // Fase 3: ACTUATOR
    const actuatorPromptFull = `${actuatorPrompt}\n\nIdea: ${idea}\n\nSensor:\n${JSON.stringify(sensorData, null, 2)}\n\nProcessor:\n${JSON.stringify(processorData, null, 2)}`;
    const actuatorRes = await model.generateContent(actuatorPromptFull);
    const actuatorText = actuatorRes.response.text();

    let actuatorData;
    try {
      actuatorData = JSON.parse(actuatorText);
    } catch (parseErr) {
      console.error('Errore parsing Actuator:', parseErr);
      actuatorData = { error: 'Errore nel parsing della risposta Actuator' };
    }

    // Risultato finale
    return NextResponse.json({
      sensor: sensorData,
      processor: processorData,
      actuator: actuatorData,
      timestamp: new Date().toISOString(),
      modelUsed: 'gemini-1.5-flash'
    });
  } catch (error: any) {
    console.error('Errore generale API:', error);
    return NextResponse.json(
      { error: error.message || 'Errore durante l\'analisi. Controlla GEMINI_API_KEY.' },
      { status: 500 }
    );
  }
}
