// gardenList에 요청 queryString: (numOfRows) 217
// 위 응답 중에서 response>body>item>cntntsNo 값을 반복문으로 추출하여 list 배열에 저장
// 배열을 반복하며 gardenDtl에 요청 queryString: (cntntsNo)
import { toJson } from 'xml2json';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPEN_API_KEY;

// /gardenList
const gardenListUrl = `http://api.nongsaro.go.kr/service/garden/gardenList?apiKey=${apiKey}&numOfRows=217`;
const gardenListResponse = await fetch(gardenListUrl);

const gardenListText = await gardenListResponse.text();
const gardenListjson = toJson(gardenListText);
const gardenListObj = JSON.parse(gardenListjson);
const list = gardenListObj.response.body.items.item;

// 실내정원용 식물 상세
const plantList = [];

for (const element of list) {
  const url = `http://api.nongsaro.go.kr/service/garden/gardenDtl?apiKey=${apiKey}&cntntsNo=${element.cntntsNo}`;
  const response = await fetch(url);
  const text = await response.text();
  const json = toJson(text);
  const gardenDtlResponse = JSON.parse(json);
  const plant = {
    ...gardenDtlResponse.response.body.item,
    ...element,
    // distbNm: gardenDtlResponse.response.body.item.distbNm ?? element.cntntsSj,
  };
  plantList.push(plant);
}

// plantList를 JSON으로 저장
const plantListJson = JSON.stringify(plantList, null, 2);
fs.writeFile('plantList.json', plantListJson, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('JSON data has been saved to plantList.json');
  }
});
