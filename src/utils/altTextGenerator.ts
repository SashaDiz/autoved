import { CarCard } from './adminData';

/**
 * Генерирует описательный alt-текст для изображения автомобиля
 * @param car - объект автомобиля
 * @returns строка с описательным alt-текстом
 */
export function generateCarAltText(car: CarCard): string {
  const parts = [car.title];
  
  if (car.year) {
    parts.push(car.year + ' года');
  }
  
  if (car.engine) {
    parts.push(car.engine);
  }
  
  if (car.drive) {
    parts.push(car.drive);
  }
  
  if (car.modification) {
    parts.push(car.modification);
  }
  
  return parts.join(' - ');
}

/**
 * Генерирует alt-текст для изображения автомобиля на основе отдельных параметров
 * @param title - название автомобиля
 * @param year - год выпуска
 * @param engine - двигатель
 * @param drive - привод
 * @param modification - модификация
 * @returns строка с описательным alt-текстом
 */
export function generateCarAltTextFromParams(
  title: string,
  year?: string,
  engine?: string,
  drive?: string,
  modification?: string
): string {
  const parts = [title];
  
  if (year) {
    parts.push(year + ' года');
  }
  
  if (engine) {
    parts.push(engine);
  }
  
  if (drive) {
    parts.push(drive);
  }
  
  if (modification) {
    parts.push(modification);
  }
  
  return parts.join(' - ');
}
