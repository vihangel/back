const puppeteer = require("puppeteer");
const { once } = require("events");

const BASE_URL = `https://www.detran.mt.gov.br/`;

class GetUserByBot {
  // retorna um josn com os dados da pagina
  async collectDataFromBrowser(  Renach,  cpf) {
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


/*
1 -Eu acho que esse Header na verdade as coisas dele podiam ser movidas pro Home Controller 
apagar esse Header
Angel ´_^ — Ieri alle 18:47
eu tinha pensando nisso
renan_ctorres — Ieri alle 18:48
2 - Evitar usar StatefulWidget e usar StatelessWidget, evitar colocar funções fora dos controllers, quando você precisar mudar algo na tela usa o Observer remetendo ao valor de dentro do controller
3 - Esse dropdown widget seria bom você abstrair ele ao máximo, não colocar controllers nele
Angel ´_^ — Ieri alle 18:51
como eu passo os valores dos controllers sem usar o controller dentro dele?
renan_ctorres — Ieri alle 18:58
tipo assim
Immagine
aí na página que vc vai usar vc vai usar o observer e o controller relacionada aquela página
esse dropdown é pra selecionar o que mesmo?
Angel ´_^ — Ieri alle 19:05
a listinha da header
aquele que fica "casa"
renan_ctorres — Ieri alle 19:06
sei
vc pode colocar pra criar essa lista em um controller e instanciar esse controller nas outras páginas pra atualizar ele
Angel ´_^ — Ieri alle 19:08
ok eu acho q entendi sksk
renan_ctorres — Ieri alle 19:08
uhauahuahua
aí sempre lembrar de usar StatelessWidget, sem usar esse setState, usar o Observer pra alterar
e as funções sempre dentro do controller
qualquer coisa to aqui, demoro um pouco mas to aqui kkkkk

*/
