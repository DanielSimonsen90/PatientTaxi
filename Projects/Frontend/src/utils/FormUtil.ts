export function serializeForm<T extends object>(form: HTMLFormElement) {
  const children = Array.from(form.children);
  children.pop(); // remove submit button

  return children.reduce((acc, child) => {
    // Find the next element after label; expected to be input or select
    const element = child.querySelector('label + *') as HTMLInputElement | HTMLSelectElement;
    if (!element) {
      console.warn('serializeForm: element is null', {child});
      return acc;
    }

    const name = element.getAttribute('name');
    if (!name) throw new Error('name attribute is required');

    const value = element.value;
    if (value === null) console.warn(`${name}.value returned null`, {element});
    
    return { ...acc, [name]: value } as T;
  }, {} as T);
}