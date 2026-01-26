type Listener<T = any> = (newValue: T, oldValue?: T) => void;

interface Subscription {
  unsubscribe: () => void;
}

class StateNotifier {
  private listeners: Map<string, Set<Listener>> = new Map();

  subscribe(key: string, listener: Listener): Subscription {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);

    return {
      unsubscribe: () => {
        this.listeners.get(key)?.delete(listener);
      },
    };
  }

  
  notify(key: string, newValue: any, oldValue?: any): void {

    this.listeners.get(key)?.forEach((listener) => {
      listener(newValue, oldValue);
    });

  }

  
  getListeners(key: string): number {
    return this.listeners.get(key)?.size ?? 0;
  }

  clearAllListeners(): void {
    this.listeners.clear();
  }
}

export const stateNotifier = new StateNotifier();
