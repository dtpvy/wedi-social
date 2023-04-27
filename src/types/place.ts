export type Place = {
  predictions: Prediction[];
  execution_time: string;
  status: string;
};

export type Prediction = {
  description: string;
  matched_substrings: any[];
  place_id: string;
  reference: string;
  structured_formatting: StructuredFormatting;
  has_children: boolean;
  plus_code: PlusCode;
  compound: Compound;
  terms: Term[];
  types: string[];
  distance_meters: null;
};

export type Compound = {
  district: string;
  commune: string;
  province: string;
};

export type PlusCode = {
  compound_code: string;
  global_code: string;
};

export type StructuredFormatting = {
  main_text: string;
  main_text_matched_substrings: any[];
  secondary_text: string;
  secondary_text_matched_substrings: any[];
};

export type Term = {
  offset: number;
  value: string;
};

export type PlaceResponse = {
  result: Result;
  reqid: string;
};

export type Result = {
  poi: Poi[];
  ads: any[];
};

export type Poi = {
  gps: Gps;
  is_promoted: boolean;
  hash: string;
  title: string;
  brand: string;
  address: string;
  category: string;
  rating: number;
  description: string;
  img: string;
  img_big: string;
  no_image: boolean;
  phone: string;
  email: string;
  facebook: string;
  url: string;
  count_reviews: number;
  photos: any[];
};

export type Gps = {
  latitude: number;
  longitude: number;
};
