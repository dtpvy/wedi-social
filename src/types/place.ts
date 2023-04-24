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
