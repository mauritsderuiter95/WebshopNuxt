/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default async function checkFormErrors(observer: any) {
  const errorRef = <HTMLElement>document.querySelector('.error');

  let errors: Boolean = false;
  const errorFields: { [key: string]: string[] } = {};

  const entries = Object.entries(observer.refs);

  for (const entry in entries) {
    const key: string = entries[entry][0];
    const ref: any = entries[entry][1];

    await ref.validate().then((res: any) => {
      if (!res.valid) {
        errors = true;
        errorFields[key] = ['Hier ging iets mis'];
      }
    });
  }

  observer.setErrors(errorFields);

  if (errors) {
    errorRef.style.display = 'block';
    errorRef.textContent = 'Er zijn fouten aangetroffen in het formulier.';
    return false;
  }
  return true;
}
