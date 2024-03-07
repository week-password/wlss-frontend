abstract class AbstractPrioritizer<T> {
  protected abstract priorities: Array<T>;
  private sourceElements: Array<T> = [];

  constructor(elements: Array<T>) {
    this.sourceElements = elements.slice();
  }

  get elements(): Array<T> {
    return this.sourceElements.slice().sort((x: T, y: T) =>
      this.getPriority(x) - this.getPriority(y),
    );
  }

  private getPriority = (element: T): number => {
    const lowestPriority = Infinity;
    const elementPriority = this.priorities.indexOf(element);
    const hasPriority = elementPriority !== -1;
    return hasPriority ? elementPriority : lowestPriority;
  };
}

abstract class ObjectKeysPrioritizer extends AbstractPrioritizer<string> {
  constructor(object: object) {
    super(Object.keys(object));
  }
}

export class ErrorsPrioritizer extends ObjectKeysPrioritizer {
  protected priorities = [
    'required',
    'pattern',
    'minlength',
    'maxlength',
    'unavailablelogin',
    'unavailableemail',
    'passwordsmatch',
    'fileformat',
    'filemaxsize',
  ];
}
