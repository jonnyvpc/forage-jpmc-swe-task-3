import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number;
  price_def: number;
  ratio: number;
  lower_bound: number;
  upper_bound: number;
  trigger_alert: number | undefined; // Allow undefined for no alert
  timestamp: Date;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = serverResponds[0].top_ask.price || 0;
    const priceDEF = serverResponds[1].top_ask.price || 0;
    const ratio = priceABC / priceDEF;
    const lowerBound = 0.95; // Example value, can be configured
    const upperBound = 1.05; // Example value, can be configured
    const triggerAlert = (ratio > upperBound || ratio < lowerBound) ? ratio : undefined;

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio: ratio,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      trigger_alert: triggerAlert,
      timestamp: new Date(serverResponds[0].timestamp), // Assuming both have the same timestamp
    };
  }
}
