import {
  TParaphraseRequest,
  TParaphraseResponse,
} from "./paraphrase.interface";

const paraphraseText = async (
  payload: TParaphraseRequest
): Promise<TParaphraseResponse> => {
  try {
    // Hugging Face API call
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
        body: JSON.stringify({
          inputs: payload.text,
          parameters: {
            max_length: 150,
            min_length: 50,
            do_sample: true,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      paraphrased: data[0]?.generated_text || payload.text,
    };
  } catch (error) {
    throw new Error(
      `Paraphrase service error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const ParaphraseServices = {
  paraphraseText,
};
