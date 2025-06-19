export interface TFaceSwapRequest {
  image: Express.Multer.File;
  celebrity: string;
}

export interface TFaceSwapResponse {
  imageUrl: string;
}

export interface TReplicateResponse {
  id: string;
  status: string;
  output?: string[];
  error?: string;
}
