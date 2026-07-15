import type { Stats } from '@shared/types/game'
export class StatisticsTracker {
private startTime: number
private piecesPlaced: number
private linesCleared: number
private elapsed: number
private running: boolean
constructor() {
this.startTime = Date.now()
this.piecesPlaced = 0
this.linesCleared = 0
this.elapsed = 0
this.running = true
}
start(): void {
this.running = true
this.startTime = Date.now()
}
stop(): void {
this.running = false
this.elapsed += (Date.now() - this.startTime) / 1000
}
reset(): void {
this.startTime = Date.now()
this.piecesPlaced = 0
this.linesCleared = 0
this.elapsed = 0
this.running = true
}
recordPiecePlaced(): void {
this.piecesPlaced++
}
recordLinesCleared(count: number): void {
this.linesCleared += count
}
getStats(): Stats {
const now = this.running ? Date.now() : this.startTime
const totalSeconds = this.elapsed + (this.running ? (now - this.startTime) / 1000 : 0)
const efficiency = this.piecesPlaced > 0
? (this.linesCleared / this.piecesPlaced) * 100
: 0
return {
time: Math.floor(totalSeconds),
piecesPlaced: this.piecesPlaced,
linesCleared: this.linesCleared,
efficiency: Math.min(efficiency, 100),
}
}
}