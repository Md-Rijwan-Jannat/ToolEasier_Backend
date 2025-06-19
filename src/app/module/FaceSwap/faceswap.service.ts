import {
  TFaceSwapRequest,
  TFaceSwapResponse,
  TReplicateResponse,
} from "./faceswap.interface";

const performFaceSwap = async (
  payload: TFaceSwapRequest
): Promise<TFaceSwapResponse> => {
  try {
    // Convert image to base64
    const imageBuffer = payload.image.buffer;
    const base64Image = imageBuffer.toString("base64");
    const dataUrl = `data:${payload.image.mimetype};base64,${base64Image}`;

    // Call Replicate API for face swap
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "c2d783366e8d32e6e82c40682fab6b4d23db9e9586c7873d9176c63d7e7442fc",
        input: {
          source_image: dataUrl,
          target_image: dataUrl,
          face_restore: true,
          background_enhance: true,
          face_upsample: true,
          upscale: 1,
          codeformer_fidelity: 0.7,
          output_format: "png",
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`);
    }

    const prediction: TReplicateResponse = await response.json();

    // Poll for completion
    let result: TReplicateResponse;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      result = await statusResponse.json();
    } while (result.status === "processing" || result.status === "starting");

    if (result.status === "failed" || result.error) {
      throw new Error(`Face swap failed: ${result.error || "Unknown error"}`);
    }

    if (!result.output || !result.output[0]) {
      throw new Error("No output image received from Replicate");
    }

    return {
      imageUrl: result.output[0],
    };
  } catch (error) {
    throw new Error(
      `Face swap service error: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const FaceSwapServices = {
  performFaceSwap,
};
