var crypto = require("crypto");
import { Request, Response } from "express";
import fetch from "node-fetch";
const elmApplicationKey: string = "fdf1b77e-ef0c-4f1f-9635-017f97b91a17";
const HMACkey: string = "99ea84b2-f551-4ad0-87aa-781e598e437d";

const myScriptServer = "https://cloud.myscript.com";
const myscriptBatchEndPoint = "/api/v4.0/iink/batch";

export async function recognisePath(req: Request, res: Response) {
  const { languageISO, recognitionType, jsonData } = req.body;
  const strokeArray = JSON.parse(jsonData).paths;

  // The strokeArray format from the Lynx client will look like this
  // 		[
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			},
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			},
  // 			{
  // 							x: [123, 112, 445, 334],
  // 							y: [923, 612, 845, 734],
  // 			}
  // 		]

  // TODO: Construct the requestBody object to post to MyScript based on their API:
  // https://swaggerui.myscript.com/#/Batch_mode/batch

  const requestBody = {};

  // Authentication step for API access - No need to alter these two lines
  const strData = JSON.stringify(requestBody);
  const hmacData = computeHmac(strData, elmApplicationKey, HMACkey);

  // TODO: Place hmac signature into headers before posting

  const response = await fetch(myScriptServer + myscriptBatchEndPoint, {
    headers: {
      applicationKey: elmApplicationKey,
      Accept: "application/vnd.myscript.jiix,application/json",
      "Content-Type": "application/json",
    },
    body: strData,
    method: "POST",
  });

  // TODO: Send back correct data from response to pass unit test

  res.status(200);
}

function computeHmac(input, applicationKey: string, hmacKey: string): string {
  const jsonInput = typeof input === "object" ? JSON.stringify(input) : input;
  return crypto
    .createHmac("sha512", applicationKey + hmacKey)
    .update(jsonInput)
    .digest("hex");
}
