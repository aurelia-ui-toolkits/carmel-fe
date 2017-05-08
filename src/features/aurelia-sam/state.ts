export class AureliaSamState {
  public render(data, next) {
    this.representation(data, next);
    this.nextAction(data);
  }

  private representation(data, next) {}
  private nextAction(data) {}
}
