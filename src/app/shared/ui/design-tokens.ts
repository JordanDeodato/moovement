export type ColorVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

export const progressColorClasses: Record<ColorVariant, string> = {
  primary: 'bg-gradient-to-r from-primary to-primary-container',
  secondary: 'bg-gradient-to-r from-secondary to-secondary-container',
  tertiary: 'bg-gradient-to-r from-tertiary to-tertiary-container',
  surface: 'bg-gradient-to-r from-surface to-surface-container'
};

export const cardGlowClasses: Record<ColorVariant, string> = {
  primary: 'shadow-[0_0_28px_rgba(196,192,255,0.24)]',
  secondary: 'shadow-[0_0_28px_rgba(255,179,176,0.24)]',
  tertiary: 'shadow-[0_0_28px_rgba(255,183,133,0.24)]',
  surface: 'shadow-[0_0_28px_rgba(81,86,112,0.18)]'
};
