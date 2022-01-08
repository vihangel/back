const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `https://www.detran.mt.gov.br/`;

class GetUserByBot {
  // retorna um josn com os dados da pagina
  async collectDataFromBrowser(Renach = `646632256`, cpf = `04157908163`) {
    console.log(`Pupeeter`);

    const browser = await puppeteer.launch({
      headless: false,
      //executablePath:
      //"/Users/aroldogoulart/workspace/personal/scrap/Chromium.app/Contents/MacOS/Chromium",
    });

    let page = await browser.newPage();
    await page.goto(BASE_URL);
    await page.waitForTimeout(2000);

    // pressionar em input principal
    await page.click('input[name="Renach"]');
    await page.keyboard.type(`${Renach}`);

    await page.click('input[name="CPF"]');
    await page.keyboard.type(`${cpf}`);

    await page.keyboard.press("Enter");
    console.log("apertou");
    await page.waitForTimeout(1000);

    const pages = await browser.pages();
    await page.waitForTimeout(2000);

    if (pages.length > 2) {
      page = pages[2];
    }

    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("table tr td"));
      return tds.map((td) => td.innerText);
    });

    const response = data.map((item) => {
      const newItem = item
        .replace(/\t/g, "")
        .replace(/\n/g, " ")
        .replace(/([a-z](?=[0-9]))/g, "$1 ")
        .replace(/([A-Z](?=[0-9]))/g, "$1 ")
        .replace(/([a-z](?=[A-Z]))/g, "$1 ")
        .trim();

      if (newItem.length != 0) {
        return newItem;
      }
      return null;
    });

    var split;
    //CFC APENAS VERIFICA SE TA VAzio
    //[2] - Dados
    //Taxas abre e fecha
    var user = {};
    var campos = [
      "CFC",
      "Nome",
      "Identidade",
      "Data Nascimento",
      "Categoria",
      "TAXA",
    ];
    var entrada = [];

    const newJson2 = response.filter((item) => item != null);
    console.log(newJson2);
    const dadosNovos = [];
    let flagD = false;
    let flagTaxa = false;
    for (let i = 0; i < newJson2.length; i++) {
      if (newJson2[i].indexOf("CFC:") > -1 && entrada[0] == null) {
        split = newJson2[i].split(" ");
        entrada[0] = " ";
        for (let index = 4; index < split.length; index++) {
          entrada[0] += split[index] + " ";
        }
        console.log("CFC: " + entrada[0]);
      }
      if (newJson2[i].indexOf("Nome") > -1 && flagD) {
        if (entrada[1] == null) {
          split = newJson2[i].split(" ");
          entrada[1] = " ";
          for (let index = 1; index < split.length; index++) {
            entrada[1] += split[index] + " ";
          }

          console.log("Nome: " + entrada[1]);
        }
      }

      if (
        newJson2[i].indexOf("Identidade") > -1 &&
        flagD &&
        entrada[2] == null
      ) {
        split = newJson2[i].split(" ");
        entrada[2] = split[1].substring(0, 9);
        console.log("Identidade: " + entrada[2]);
      }
      if (newJson2[i].indexOf("Data Nascimento") > -1 && flagD) {
        split = newJson2[i].split(" ");
        console.log("Data Nascimento " + split[2]);
        entrada[3] = split[2];
      }

      if (
        newJson2[i].indexOf("Categoria Pretendida") > -1 &&
        entrada[4] == null
      ) {
        split = newJson2[i].split(" ");
        for (let index = 1; index < split.length; index++) {
          if (split[index] == "Pretendida") {
            entrada[4] = split[index + 1].substring(0, 2);
          }
        }
        console.log("Categoria Pretendida: " + entrada[4]);
      }
      if (newJson2[i] == "Dados Pessoais") {
        console.log("Dados Pessoais");
        flagD = true;
      }
      if (newJson2[i].indexOf("TAXA") > -1 && !flagTaxa) {
        flagTaxa = true;
        entrada[5] = "Taxa aberta";
      }
      if (newJson2[i] == "Pago consolidado") {
        flagTaxa = false;
        entrada[5] = "Taxa fechada";
        console.log("TAXA " + entrada[5]);
      }
    }
    //console.log("Vai" + newJson2.toString());

    browser.close();
    // return newJson2;

    return entrada;
  }

  readAndCleanJson(file) {
    //{
    //LER arquivo json
    // const fs = require("fs");
    // const data = fs.readFileSync(file);
    // const json = JSON.parse(data);
    //}

    const json = file;
    const newJson = json.map((item) => {
      const newItem = item
        .replace(/\t/g, "")
        .replace(/\n/g, " ")
        .replace(/([a-z](?=[0-9]))/g, "$1 ")
        .replace(/([A-Z](?=[0-9]))/g, "$1 ")
        .replace(/([a-z](?=[A-Z]))/g, "$1 ")
        .trim();

      if (newItem.length != 0) {
        return newItem;
      }
      return null;
    });

    // remove null values of array
    const newJson2 = newJson.filter((item) => item != null);
    console.log(newJson2);
    return newJson2;
  }
}

module.exports = new GetUserByBot();
