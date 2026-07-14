export class AudioService {
private context: AudioContext | null = null;
private sounds: Map<string, AudioBuffer> = new Map();
private initialized = false;

async init(): Promise<void> {
if (this.initialized) return;

try {
this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
await this.loadSounds();
this.initialized = true;
} catch (error) {
console.warn('AudioService initialization failed:', error);
}
}

private async loadSounds(): Promise<void> {
const soundFiles = ['pop', 'tink', 'ping', 'buzz', 'fanfare'];

for (const name of soundFiles) {
try {
const response = await fetch(/sounds/${name}.mp3);
if (!response.ok) {
console.warn(Sound ${name} not found, using generated fallback);
await this.generateFallbackSound(name);
continue;
}
const arrayBuffer = await response.arrayBuffer();
const buffer = await this.context!.decodeAudioData(arrayBuffer);
this.sounds.set(name, buffer);
} catch (error) {
console.warn(Failed to load sound ${name}:, error);
await this.generateFallbackSound(name);
}
}
}

private async generateFallbackSound(name: string): Promise<void> {
if (!this.context) return;

const duration = 0.1;
const sampleRate = this.context.sampleRate;
const samples = duration * sampleRate;
const buffer = this.context.createBuffer(1, samples, sampleRate);
const data = buffer.getChannelData(0);

for (let i = 0; i < samples; i++) {
const t = i / samples;
let value = 0;
switch (name) {
case 'pop':
value = Math.sin(t * 20) * Math.exp(-t * 10);
break;
case 'tink':
value = Math.sin(t * 40) * Math.exp(-t * 8);
break;
case 'ping':
value = Math.sin(t * 60) * Math.exp(-t * 6);
break;
case 'buzz':
value = (Math.random() * 2 - 1) * Math.exp(-t * 5);
break;
case 'fanfare':
value = Math.sin(t * 30) * Math.sin(t * 2) * Math.exp(-t * 4);
break;
default:
value = Math.sin(t * 30) * Math.exp(-t * 10);
}
data[i] = value * 0.3;
}

this.sounds.set(name, buffer);
}

play(name: string): void {
if (!this.context || !this.sounds.has(name)) return;

try {
const source = this.context.createBufferSource();
source.buffer = this.sounds.get(name)!;
source.connect(this.context.destination);
source.start(0);
} catch (error) {
console.warn(Failed to play sound ${name}:, error);
}
}

resume(): void {
if (this.context && this.context.state === 'suspended') {
this.context.resume();
}
}

isReady(): boolean {
return this.initialized && this.context !== null;
}
}