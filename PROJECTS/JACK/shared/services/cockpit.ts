export interface CockpitMessage {
  type: 'STATE' | 'COMMAND' | 'LOG';
  payload: any;
}

export class CockpitService {
  private eventBus = new EventTarget();

  sendState(state: any) {
    // Envoi vers le Cockpit (via Event Bus ou API)
    const event = new CustomEvent('cockpit:state', { detail: state });
    this.eventBus.dispatchEvent(event);
  }

  onCommand(callback: (command: any) => void) {
    this.eventBus.addEventListener('cockpit:command', (e: CustomEvent) => {
      callback(e.detail);
    });
  }
}
3. Stockage Local (IndexedDB)