class GeneralHelper {
  static withoutKeys<T extends object>(
    obj: T,
    keys: Array<keyof T>
  ): Partial<T> {
    for (const key in obj) {
      if (keys.includes(key as keyof T)) {
        delete obj[key];
      }
    }
    return obj;
  }
}

export default GeneralHelper;
