import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const configPath = join(process.cwd(), 'config', 'mission.json');
    const configData = readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    
    if (!config.active) {
      return NextResponse.json({ 
        error: 'Missão não está ativa no momento' 
      }, { status: 400 });
    }
    
    return NextResponse.json({
      postId: config.postId,
      fluffyBearsUsername: config.fluffyBearsUsername,
      requirements: config.requirements
    });
  } catch (error) {
    console.error('Erro ao carregar configuração da missão:', error);
    return NextResponse.json({ 
      error: 'Erro ao carregar configuração da missão' 
    }, { status: 500 });
  }
}