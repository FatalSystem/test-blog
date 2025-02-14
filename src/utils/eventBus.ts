type Listener = (data: any) => void

class EventBus {
  private listeners: { [key: string]: Listener[] } = {}

  subscribe(event: string, callback: Listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
    
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  publish(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data))
    }
  }
}

export const eventBus = new EventBus()
