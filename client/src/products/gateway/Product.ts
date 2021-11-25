export default class Product {
  static properties: { [key: string]: { label: string; unit: string } } = {
    description: { label: 'description', unit: 'm' },
    price: { label: 'Product Price', unit: 'eur' },
    key: { label: 'Product Key', unit: 'kg' },
    //age: { label: 'Alter', unit: 'Jahre' },
    //offspring: { label: 'Nachkommen', unit: '' },
    //speed: { label: 'Geschwindigkeit', unit: 'km/h' },
  };

  public id?: number;

  constructor(
    public name: string,
    public image: string,
    public description: string,
    public price: string,
    public key: string
    
  ) {}
}

