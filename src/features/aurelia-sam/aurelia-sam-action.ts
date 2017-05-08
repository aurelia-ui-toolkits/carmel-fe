export interface IAureliaSamAction {
  intent: string;
  execute(data): any;
}
