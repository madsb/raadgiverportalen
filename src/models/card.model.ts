export interface CardElementModel {
  billede?: BilledeModel;
  showBilleder?: boolean;
  label?: string;
  overskrift: string;
  linkText?: string;
  link: Link;
  manchet: string;
}

export interface BilledeModel {
  url: string;
  label?: string;
}

export interface Link {
  href: string;
  title: string;
  external: boolean;
}
