import { marked, options } from "marked";

document.getElementById("copy-button")?.addEventListener("click", async () => {
    const charaHtml = marked.parse((document.getElementById("md-text") as HTMLInputElement)?.value || "",);
    let json = {
        "kind": "character",
        "data": {
            "name": "",
            "memo": "",
            "initiative": 0,
            "externalUrl": "",
            "status": [
                {
                    "label": "HP",
                    "value": 0,
                    "max": 0
                },
                {
                    "label": "MP",
                    "value": 0,
                    "max": 0
                },
                {
                    "label": "防護",
                    "value": 0,
                    "max": 0
                },
                {
                    "label": "魔術防御",
                    "value": 0,
                    "max": 0
                }

            ],
            "params": [
                {
                    "label": "グレード",
                    "value": ""
                },
                {
                    "label": "科学技術力",
                    "value": ""
                },
                {
                    "label": "魔術熟知",
                    "value": ""
                },
                {
                    "label": "戦闘能力",
                    "value": ""
                },
                {
                    "label": "魔力",
                    "value": ""
                },
                {
                    "label": "精神",
                    "value": ""
                },
                {
                    "label": "肉体",
                    "value": ""
                }

            ],
            "iconUrl": "",
            "faces": [],
            "x": 0,
            "y": 0,
            "angle": 0,
            "width": 4,
            "height": 4,
            "active": true,
            "secret": false,
            "invisible": false,
            "hideStatus": false,
            "color": "#888888",
            "commands": "",
            "owner": ""
        }
    }
    const parser = new DOMParser();
    let charaDOM;
    if (typeof charaHtml === 'string') {
        charaDOM = parser.parseFromString(charaHtml, 'text/html');
    } else {
        charaDOM = parser.parseFromString(await charaHtml, 'text/html');
    }
    let statusIndex = 0;
    charaDOM.documentElement.childNodes[1].childNodes.forEach((node, index) => {
        if (node.textContent === "ステータス") {
            statusIndex = index + 2;
        }
    });
    let statusText = charaDOM.documentElement.childNodes[1].childNodes[statusIndex].childNodes[0].nodeValue as string;

    const pattern = /(\S+)(：|:)([\d]+)/g;
    let matches;
    const data = {};

    while ((matches = pattern.exec(statusText)) !== null) {
        const key = matches[1];
        const value = matches[3];
        json.data.params.forEach((state) => {
            if (state.label === key) {
                state.value = value;
            }
        });
        json.data.status.forEach((state) => {
            if (state.label === key) {
                state.value = Number(value);
                state.max = Number(value);
            }
        });
    };

    json.data.status[2].value = parseInt(json.data.params[6].value);
    json.data.status[2].max = parseInt(json.data.params[6].value);

    json.data.status[3].value = parseInt(json.data.params[5].value);
    json.data.status[3].max = parseInt(json.data.params[5].value);

    let damageDice = 1 + Math.floor(parseInt(json.data.params[0].value) / 5);

    json.data.commands = "2d6+{戦闘能力} 先制判定\n2d6+{魔術熟知} 生体知識判定\n2d6+{科学技術力} 非生体知識判定\nーーーーーー\n通常攻撃 対象：\n2d6+{戦闘能力} 命中判定\n" + damageDice + "d6+{肉体}+{グレード}  物理ダメージ\n2d6+{戦闘能力} 回避判定\nーーーーーー\n基本魔術魔術Lv.〇 対象：\n基本回復魔術Lv.〇 対象：\n2d6+{魔術熟知}+{精神}/2U  魔術行使判定\n" + damageDice + "d6+{魔力}+〇 基本攻撃魔術Lv.〇\n" + damageDice + "d6+{魔力}+〇 基本回復魔術Lv.〇\n2d6+{精神} 抵抗判定 ";

    navigator.clipboard.writeText(JSON.stringify(json));
    alert("コピーしました");
});

document.getElementById("delete-button")?.addEventListener("click", async () => {
    (document.getElementById("md-text") as HTMLInputElement).value = "";
    const textarea = document.getElementById('md-text') as HTMLTextAreaElement;
    // 高さをリセット
    textarea.style.height = 'auto';
    // 内容に合わせて高さを設定
    textarea.style.height = textarea.scrollHeight + 'px';
});

const textarea = document.getElementById('md-text') as HTMLTextAreaElement;

textarea.addEventListener('input', function() {
    // 高さをリセット
    textarea.style.height = 'auto';
    // 内容に合わせて高さを設定
    textarea.style.height = textarea.scrollHeight + 'px';
    
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});