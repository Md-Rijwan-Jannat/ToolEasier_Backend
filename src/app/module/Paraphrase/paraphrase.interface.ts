export interface TParaphraseRequest {
  text: string;
}

export interface TParaphraseResponse {
  paraphrased: string;
}

export interface THuggingFaceResponse {
  generated_text: string;
}
