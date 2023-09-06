class Mountain {

    constructor(id, name, height) {
      this.id = id;
      this.name = name;
      this.height = height;
    } 
}

const mountains = [
  new Mountain(1, 'Mount Everest', 8848),
  new Mountain(2, 'K2', 8611),
  new Mountain(3, 'Kangchenjunga', 8586) ,
  new Mountain(4, 'Lhotse', 8516),
  new Mountain(5, 'Makalu', 8485),
  new Mountain(6, 'Cho Oyu', 8188),
  new Mountain(7, 'Dhaulagiri', 8167),
  new Mountain(8, 'Manaslu', 8163),
  new Mountain(9, 'Nanga Parbat', 8126),
  new Mountain(10, 'Annapurna', 8091)
];
  
module.exports = Mountain;