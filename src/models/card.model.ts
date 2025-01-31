export interface CardElementModel {
  titel: string;
  header: string;
  billede?: BilledeModel;
  manchet: string;
  label?: string;
  linkText?: string;
  external?: boolean;
}

export interface BilledeModel {
  url: string;
  label?: string;
}
