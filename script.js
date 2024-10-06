(function () { C4Fire(); })();
function C4Fire() {
    /*     C4 Bookmarklet (Copy CCFOLIA Character to Clipboard Bookmarklet) v0.5     for CCFOLIA v1.28.3     ※本ブックマークレットは、あくまでも非公式の制作物です。       お使いの環境やココフォリア様のアップデートで動作しなくなることが予想されます。       その場合の動作の保証はしかねますので、ご利用の際は自己責任でお願いいたします。       また、ココフォリア公式様へのお問い合わせ等はお控え下さいませ。     (C) スピアール https://twitter.com/Spealthon     */
    let sourceURL = window.document.location;
    let validPattern = /^http(s)?:\/\/ccfolia\.com\//;
    if (validPattern.test(sourceURL) == false) {
        alert("ココフォリア上で実行してください。");
        return;
    }


    /* 入力した文字列をクリップボードにコピーする関数 */
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                alert("キャラクターデータをクリップボードにコピーしました。");
            });
        } else { alert("対応していません。"); }
        return;
    }


    /* 特定のHTMLコレクションの中から指定したname要素を探して返す関数 */
    function searchElementByName(elements, htmlName) {
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            if (element.name == htmlName) {
                return element;
            }
        }
        return null;
    }

    /* ここからメイン処理 */
    {
        let jsonData = {
            "kind": "character",
            "data": {
                "name": "",
                "memo": "",
                "initiative": 0,
                "externalUrl": "",
                "status": [],
                "params": [],
                "iconUrl": "",
                "faces": [],
                "x": 0,
                "y": 0,
                "angle": 0,
                "width": 4,
                "height": 0,
                "active": true,
                "secret": false,
                "invisible": false,
                "hideStatus": false,
                "color": "#888888",
                "commands": "",
                "owner": ""
            }
        };

        /* フォーム情報の取得 */
        let dialogElements = document.getElementsByClassName("MuiDialogContent-root");
        let div;
        for (let index = 0; index < dialogElements.length; index++) {
            const dialog = dialogElements[index];
            let foo; foo = dialog.previousSibling;
            if (foo != undefined) {
                foo = foo.firstChild;
                if (foo != undefined) {
                    foo = foo.firstChild;
                    if (foo != undefined) {
                        if (foo.textContent == "キャラクター編集") {
                            div = dialog;
                            break;
                        }
                    }
                }
            }
        }
        if (div == undefined) {
            alert("キャラクター編集画面を開いて実行してください。");
            return;
        }
        let inputHtmlElements = div.getElementsByTagName("input");


        /* 名前 name */
        {
            let nameElement = searchElementByName(inputHtmlElements, "name");
            if (nameElement != null) {
                jsonData.data.name = nameElement.value;
            }
        }


        /* メモ memo */
        {
            let nameElement = searchElementByName(inputHtmlElements, "initiative");
            let memoElement = nameElement.parentNode.parentNode.parentNode.nextSibling.lastChild.firstChild;
            jsonData.data.memo = memoElement.value;
        }


        /* イニシアティブ initiative */
        {
            let initiativeElement = searchElementByName(inputHtmlElements, "initiative");
            if (initiativeElement != null) {
                jsonData.data.initiative = parseFloat(initiativeElement.value, 10);
            }
        }


        /* 参照URL externalUrl */
        {
            let externalUrlElement = searchElementByName(inputHtmlElements, "externalUrl");
            if (externalUrlElement != null) {
                jsonData.data.externalUrl = externalUrlElement.value;
            }
        }


        /* ステータス status */
        {
            let statusArray = Array();
            for (let index = 0; ; index++) {
                let labelName = "status." + index + ".label";
                let statusLabelElement = searchElementByName(inputHtmlElements, labelName);
                let valueName = "status." + index + ".value";
                let statusValueElement = searchElementByName(inputHtmlElements, valueName);
                let maxName = "status." + index + ".max"; let statusMaxElement = searchElementByName(inputHtmlElements, maxName);
                if (statusLabelElement == null || statusValueElement == null || statusMaxElement == null) {
                    break;
                }
                let status = {
                    "label": statusLabelElement.value,
                    "value": parseInt(statusValueElement.value, 10),
                    "max": parseInt(statusMaxElement.value, 10)
                };
                statusArray.push(status);
            }
            jsonData.data.status = statusArray;
        }


        /* パラメータ params */
        {
            let paramsArray = Array();
            for (let index = 0; ; index++) {
                let labelName = "params." + index + ".label";
                let paramsLabelElement = searchElementByName(inputHtmlElements, labelName);
                let valueName = "params." + index + ".value";
                let paramsValueElement = searchElementByName(inputHtmlElements, valueName);
                if (paramsLabelElement == null || paramsValueElement == null) {
                    break;
                }
                let params = {
                    "label": paramsLabelElement.value,
                    "value": paramsValueElement.value
                };
                paramsArray.push(params);
            }
            jsonData.data.params = paramsArray;
        }


        /* キャラクター画像 iconUrl */
        {
            let nameElement = searchElementByName(inputHtmlElements, "name");
            let iconUrlElement = nameElement.parentNode.parentNode.previousSibling.firstChild.firstChild;
            jsonData.data.iconUrl = iconUrlElement.src;
        }


        /* 立ち絵・差分 faces */
        {
            let facesArray = Array();
            for (let index = 0; ; index++) {
                let labelName = "faces[" + index + "].label";
                let facesLabelElement = searchElementByName(inputHtmlElements, labelName); if (facesLabelElement == null) { break; } let facesIconUrlElement = facesLabelElement.parentNode.parentNode.previousSibling.firstChild.firstChild; if (facesIconUrlElement == null) { break; } let faces = { "iconUrl": facesIconUrlElement.src, "label": facesLabelElement.value }; facesArray.push(faces);
            } jsonData.data.faces = facesArray;
        }


        /* x座標 x ※今は無効 */
        {
            let xElement = searchElementByName(inputHtmlElements, "x");
            if (xElement != null) { 
                jsonData.data.x = parseInt(xElement.value, 10); 
            }
        }                  
        
        
        /* y座標 y ※今は無効 */         
        { 
            let yElement = searchElementByName(inputHtmlElements, "y"); 
            if (yElement != null) { 
                jsonData.data.y = parseInt(yElement.value, 10); 
            } 
        }                  
        
        
        /* 角度 angle ※面倒なのでデフォルト0から変更しない */         
        { }
                  
        
        /* 幅（駒サイズ） width ※キャラクターコマでは駒サイズに対応 */         
        { 
            let widthElement = searchElementByName(inputHtmlElements, "width"); 
            if (widthElement != null) { 
                jsonData.data.width = parseFloat(widthElement.value, 10); 
            } 
        }          
        
        
        /* 高さ height ※駒サイズに準拠 */         
        { 
            let widthElement = searchElementByName(inputHtmlElements, "width"); 
            if (widthElement != null) { 
                jsonData.data.height = parseFloat(widthElement.value, 10); 
            } 
        }          
        
        
        /* アクティブ active ※今は無効？ */         
        { }
                  
        
        /* ステータスを非公開にする secret */         
        { 
            let secretElement = searchElementByName(inputHtmlElements, "secret"); 
            if (secretElement != null) { 
                jsonData.data.secret = secretElement.checked; 
            } 
        }          
        
        
        /* 発言時キャラクターを表示しない invisible */         
        { 
            let invisibleElement = searchElementByName(inputHtmlElements, "invisible"); 
            if (invisibleElement != null) { 
                jsonData.data.invisible = invisibleElement.checked; 
            } 
        }          
        
        
        /* 盤面キャラクター一覧に表示しない hideStatus */         
        { 
            let hideStatusElement = searchElementByName(inputHtmlElements, "hideStatus"); 
            if (hideStatusElement != null) { 
                jsonData.data.hideStatus = hideStatusElement.checked; 
            } 
        }                  
        
        
        /* キャラクターカラー color ※取得が面倒なので反映していない */         
        { }                  
        
        
        /* チャットパレット commands */         
        { 
            let secretElement = searchElementByName(inputHtmlElements, "secret"); 
            let commandsElement = secretElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild.previousSibling.lastChild.lastChild.firstChild;
            jsonData.data.commands = commandsElement.value; 
        }                  
        
        
        /* 所有者 owner ※空欄 */         
        { } 
        
        let jsonText = JSON.stringify(jsonData); 
        copyToClipboard(jsonText);
    }
};