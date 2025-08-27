const carTypes = [
  {label: 'Sedan', value: 'sedan'},
  {label: 'Arazi-SUV', value: 'arazisuv'},
  {label: 'Cabrio', value: 'cabrio'},
  {label: 'Camli Van', value: 'camlivan'},
  {label: 'Crossover', value: 'crossover'},
  {label: 'Coupe (Otomobil)', value: 'coupeotomobil'},
  {label: 'Coupe (SUV)', value: 'coupesuv'},
  {label: 'Hatchback 3 Kapi', value: 'hatchback3kapi'},
  {label: 'Hatchback 3 Kapi', value: 'hatchback5kapi'},
  {label: 'Midibus', value: 'midibus'},
  {label: 'Mini Camli Van', value: 'minicamlivan'},
  {label: 'Mini Van', value: 'minivan'},
  {label: 'Mini', value: 'mini'},
  {label: 'Panelvan', value: 'panelvan'},
  {label: 'Pickup', value: 'pickup'},
  {label: 'Roadster', value: 'roadster'},
  {label: 'Station Wagon', value: 'station_wagon'},
];

const staticTypes = {
  sedan: {
    uri1: 'sedan-1.png',
    uri2: 'sedan-2.png',
    uri3: 'sedan-3.png',
    uri4: 'sedan-4.png',
    uri5: 'sedan-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/sedan.png',
  },
  arazisuv: {
    uri1: 'arazi-suv-1.png',
    uri2: 'arazi-suv-2.png',
    uri3: 'arazi-suv-3.png',
    uri4: 'arazi-suv-4.png',
    uri5: 'arazi-suv-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/arazi-suv.png',
  },
  cabrio: {
    uri1: 'cabrio-1.png',
    uri2: 'cabrio-2.png',
    uri3: 'cabrio-3.png',
    uri4: 'cabrio-4.png',
    uri5: 'cabrio-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/cabrio.png',
  },
  crossover: {
    uri1: 'crossover-1.png',
    uri2: 'crossover-2.png',
    uri3: 'crossover-3.png',
    uri4: 'crossover-4.png',
    uri5: 'crossover-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/crossover.png',
  },
  camlivan: {
    uri1: 'camli-van-1.png',
    uri2: 'camli-van-2.png',
    uri3: 'camli-van-3.png',
    uri4: 'camli-van-4.png',
    uri5: 'camli-van-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/camli-van.png',
  },
  coupeotomobil: {
    uri1: 'coupe-1.png',
    uri2: 'coupe-2.png',
    uri3: 'coupe-3.png',
    uri4: 'coupe-4.png',
    uri5: 'coupe-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/coupe.png',
  },
  coupesuv: {
    uri1: 'coupe-1.png',
    uri2: 'coupe-2.png',
    uri3: 'coupe-3.png',
    uri4: 'coupe-4.png',
    uri5: 'coupe-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/coupe.png',
  },
  hatchback3kapi: {
    uri1: 'hatchback-3-kapi-1.png',
    uri2: 'hatchback-3-kapi-2.png',
    uri3: 'hatchback-3-kapi-3.png',
    uri4: 'hatchback-3-kapi-4.png',
    uri5: 'hatchback-3-kapi-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/hatchback-3-kapi.png',
  },
  hatchback5kapi: {
    uri1: 'hatchback-5-kapi-1.png',
    uri2: 'hatchback-5-kapi-2.png',
    uri3: 'hatchback-5-kapi-3.png',
    uri4: 'hatchback-5-kapi-4.png',
    uri5: 'hatchback-5-kapi-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/hatchback-5-kapi.png',
  },
  midibus: {
    uri1: 'midibus-1.png',
    uri2: 'midibus-2.png',
    uri3: 'midibus-3.png',
    uri4: 'midibus-4.png',
    uri5: 'midibus-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/midibus.png',
  },
  minicamlivan: {
    uri1: 'mini-camli-van-1.png',
    uri2: 'mini-camli-van-2.png',
    uri3: 'mini-camli-van-3.png',
    uri4: 'mini-camli-van-4.png',
    uri5: 'mini-camli-van-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/mini-camli-van.png',
  },

  minivan: {
    uri1: 'mini-van-1.png',
    uri2: 'mini-van-2.png',
    uri3: 'mini-van-3.png',
    uri4: 'mini-van-4.png',
    uri5: 'mini-van-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/mini-van.png',
  },

  mini: {
    uri1: 'mini-1.png',
    uri2: 'mini-2.png',
    uri3: 'mini-3.png',
    uri4: 'mini-4.png',
    uri5: 'mini-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/mini.png',
  },

  panelvan: {
    uri1: 'panelvan-1.png',
    uri2: 'panelvan-2.png',
    uri3: 'panelvan-3.png',
    uri4: 'panelvan-4.png',
    uri5: 'panelvan-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/panelvan.png',
  },
  pickup: {
    uri1: 'pickup-1.png',
    uri2: 'pickup-2.png',
    uri3: 'pickup-3.png',
    uri4: 'pickup-4.png',
    uri5: 'pickup-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/pickup.png',
  },
  roadster: {
    uri1: 'roadster-1.png',
    uri2: 'roadster-2.png',
    uri3: 'roadster-3.png',
    uri4: 'roadster-4.png',
    uri5: 'roadster-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/roadster.png',
  },
  station_wagon: {
    uri1: 'station-wagon-1.png',
    uri2: 'station-wagon-2.png',
    uri3: 'station-wagon-3.png',
    uri4: 'station-wagon-4.png',
    uri5: 'station-wagon-5.png',
    topRightButton:
      'https://test.garantiliarabam.com/assets/imgs/kasa-ikon/station-wagon.png',
  },
};

const staticPartTypes = [
  {label: 'Orjinal Değişmiş', value: 'KPT_OD'},
  {label: 'Çıta Altı Boyalı', value: 'KPT_BC'},
  {label: 'Boyalı', value: 'KPT_BY'},
  {label: 'Hatasız', value: 'KPT_XX'},
  {label: 'Yarım Boyalı ', value: 'KPT_YB'},
  {label: 'Çizikten Boyalı ', value: 'KPT_CB'},
  {label: 'Cam Tavan', value: 'KPT_CT'},
  {label: 'Değişmiş', value: 'KPT_DE'},
  {label: 'Plastik', value: 'KPT_PL'},
  {label: 'Kaplama Var', value: 'KPT_KP'},
  {label: 'Kalın Boyalı', value: 'KPT_KB'},
  {label: 'Sökülüp Takılmış Van', value: 'KPT_ST'},
  {label: 'Dolu İzi var', value: 'KPT_DL'},
  {label: 'Kapı Saçı Değişmiş', value: 'KPT_KS'},
  {label: 'Bakılmadı', value: 'KPT_BX'},
  {label: 'Ezik Var', value: 'KPT_EV'},
  {label: 'Lokal Boyalı', value: 'KPT_LB'},
  {label: 'Çizik Var', value: 'KPT_CV'},
  {label: 'Rötuş Yapılmış', value: 'KPT_RY'},
  {label: 'Boyasız Düzeltme', value: 'KPT_BD'},
  {label: 'Vernik', value: 'KPT_VNK'},
  {label: 'İşlem Görmüş', value: 'KPT_IG'},
];

const staticPartTypesObject = {
  KPT_OD: 'Orjinal Değişmiş',
  KPT_BC: 'Çıta Altı Boyalı',
  KPT_BY: 'Boyalı',
  KPT_XX: 'Hatasız',
  KPT_YB: 'Yarım Boyalı ',
  KPT_CB: 'Çizikten Boyalı ',
  KPT_CT: 'Cam Tavan',
  KPT_DE: 'Değişmiş',
  KPT_PL: 'Plastik',
  KPT_KP: 'Kaplama Var',
  KPT_KB: 'Kalın Boyalı',
  KPT_ST: 'Sökülüp Takılmış Van',
  KPT_DL: 'Dolu İzi var',
  KPT_KS: 'Kapı Saçı Değişmiş',
  KPT_BX: 'Bakılmadı',
  KPT_EV: 'Ezik Var',
  KPT_LB: 'Lokal Boyalı',
  KPT_CV: 'Çizik Var',
  KPT_RY: 'Rötuş Yapılmış',
  KPT_BD: 'Boyasız Düzeltme',
  KPT_VNK: 'Vernik',
  KPT_IG: 'İşlem Görmüş',
};

const defaultKaportaSearchState = {
  bagaj: null,
  tavan: null,
  kaput: null,
  solsaseucu: null,
  sagsaseucu: null,
  onpanel: null,
  ontampon: null,
  arkapanel: null,
  arkatampon: null,

  sagarkadirek: null,
  sagortadirek: null,
  sagondirek: null,
  sagarkacamurluk: null,
  sagarkakapi: null,
  sagonkapi: null,
  sagoncamurluk: null,
  sagmarspiyel: null,
  solondirek: null,
  solortadirek: null,
  solarkadirek: null,
  soloncamurluk: null,
  solonkapi: null,
  solarkakapi: null,
  solarkacamurluk: null,
  solmarspiyel: null,
};

export {
  carTypes,
  staticTypes,
  staticPartTypes,
  staticPartTypesObject,
  defaultKaportaSearchState,
};
