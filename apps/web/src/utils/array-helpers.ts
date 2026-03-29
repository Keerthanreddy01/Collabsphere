/**
 * Array and Object Utility Functions
 * Common operations for client-side data manipulation
 */

/**
 * Chunk array into smaller arrays of specified size
 * @param array - Array to chunk
 * @param size - Size of each chunk
 * @returns Array of chunks
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Remove duplicate items from array
 * @param array - Array with potential duplicates
 * @param key - Optional key to check for duplicates (for objects)
 * @returns Array with unique items
 */
export const removeDuplicates = <T>(array: T[], key?: keyof T): T[] => {
  if (key) {
    const seen = new Set();
    return array.filter((item) => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }

  return Array.from(new Set(array));
};

/**
 * Find array difference (items in first array but not in second)
 * @param arrayA - First array
 * @param arrayB - Second array
 * @returns Items in arrayA but not in arrayB
 */
export const arrayDifference = <T>(arrayA: T[], arrayB: T[]): T[] => {
  const setB = new Set(arrayB);
  return arrayA.filter((item) => !setB.has(item));
};

/**
 * Flatten nested array
 * @param array - Nested array
 * @param depth - Depth to flatten (default: Infinity)
 * @returns Flattened array
 */
export const flattenArray = <T>(array: T[], depth: number = Infinity): any[] => {
  return array.flat(depth);
};

/**
 * Group array items by key
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Object with grouped items
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as Record<string, T[]>
  );
};

/**
 * Sort array by property
 * @param array - Array to sort
 * @param key - Property to sort by
 * @param order - Sort order ('asc' or 'desc')
 * @returns Sorted array
 */
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA === valueB) return 0;

    const comparison = valueA < valueB ? -1 : 1;
    return order === 'asc' ? comparison : -comparison;
  });
};

/**
 * Paginate array
 * @param array - Array to paginate
 * @param page - Page number (1-indexed)
 * @param pageSize - Items per page
 * @returns Paginated result
 */
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number
): { items: T[]; totalPages: number; currentPage: number } => {
  const totalPages = Math.ceil(array.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = array.slice(startIndex, startIndex + pageSize);

  return { items, totalPages, currentPage: page };
};

/**
 * Find first item matching condition
 * @param array - Array to search
 * @param predicate - Condition function
 * @returns First matching item or undefined
 */
export const findFirst = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
  return array.find(predicate);
};

/**
 * Find last item matching condition
 * @param array - Array to search
 * @param predicate - Condition function
 * @returns Last matching item or undefined
 */
export const findLast = <T>(array: T[], predicate: (item: T) => boolean): T | undefined => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      return array[i];
    }
  }
  return undefined;
};

/**
 * Check if all items match condition
 * @param array - Array to check
 * @param predicate - Condition function
 * @returns true if all items match
 */
export const allMatch = <T>(array: T[], predicate: (item: T) => boolean): boolean => {
  return array.every(predicate);
};

/**
 * Check if any item matches condition
 * @param array - Array to check
 * @param predicate - Condition function
 * @returns true if any item matches
 */
export const anyMatch = <T>(array: T[], predicate: (item: T) => boolean): boolean => {
  return array.some(predicate);
};

/**
 * Count items matching condition
 * @param array - Array to count
 * @param predicate - Condition function
 * @returns Count of matching items
 */
export const countMatches = <T>(array: T[], predicate: (item: T) => boolean): number => {
  return array.filter(predicate).length;
};

/**
 * Deep merge objects
 * @param target - Target object
 * @param source - Source object
 * @returns Merged object
 */
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
          result[key] = deepMerge(targetValue, sourceValue);
        } else {
          result[key] = sourceValue;
        }
      } else {
        result[key] = sourceValue;
      }
    }
  }

  return result;
};

/**
 * Filter object by keys
 * @param obj - Object to filter
 * @param keys - Keys to keep
 * @returns Filtered object
 */
export const filterObjectByKeys = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
): Partial<T> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Partial<T>);
};

/**
 * Omit keys from object
 * @param obj - Object to filter
 * @param keys - Keys to omit
 * @returns Object without omitted keys
 */
export const omitKeys = <T extends Record<string, any>>(
  obj: T,
  keys: (keyof T)[]
): Partial<T> => {
  const keysToRemove = new Set(keys);
  return Object.keys(obj).reduce((result, key) => {
    if (!keysToRemove.has(key as keyof T)) {
      result[key as keyof T] = obj[key as keyof T];
    }
    return result;
  }, {} as Partial<T>);
};

/**
 * Get nested value from object
 * @param obj - Object to traverse
 * @param path - Dot-separated path (e.g., 'user.profile.name')
 * @returns Value or undefined
 */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

/**
 * Set nested value in object
 * @param obj - Object to modify
 * @param path - Dot-separated path
 * @param value - Value to set
 */
export const setNestedValue = (obj: any, path: string, value: any): void => {
  const keys = path.split('.');
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!(key in current)) {
      current[key] = {};
    }
    return current[key];
  }, obj);

  target[lastKey] = value;
};
