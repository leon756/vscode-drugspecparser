// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "drugspecparser" is now active!');

	type SpecPattern = {
		id: number;
		regExp: RegExp;
	  };
	const patternArray: SpecPattern[] = [
		{id: 0, regExp: new RegExp('^([0-9.]+)ml[;；：:]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)[ ]?$') },
		{id: 1,  regExp: new RegExp('^([0-9.]+)ml[;；：:]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)[ \(].*$')},
	
		{id: 10, regExp: new RegExp('^([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)[;；：: ]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)[/*×x;:]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)')},
		{id: 11, regExp: new RegExp('^([0-9.]+)ml[;:]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)$')},
	
		{id: 20, regExp: new RegExp('^([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)[*x×X/]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)')},
		{id: 21, regExp: new RegExp('^([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)[/|]([μa-zA-Z\u4e00-\u9fa5]+)$')},
		{id: 22, regExp: new RegExp('^([0-9.]+)g/支/盒$')},
		{id: 23, regExp: new RegExp('^([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)[ ]?[*（]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)')},
	
		{id: 30, regExp: new RegExp('^([0-9.]+)ml[;:；： ]([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)')},
		{id: 31, regExp: new RegExp('^([0-9.]+)ml/瓶')},
	
		{id: 40, regExp: new RegExp('^([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)$')},
		{id: 43, regExp: new RegExp('([0-9]+)揿')},
		{id: 41, regExp: new RegExp('([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)/([μa-zA-Z\u4e00-\u9fa5]+)')},
		{id: 42, regExp: new RegExp('([0-9.]+)([μa-zA-Z\u4e00-\u9fa5]+)[\(（].*[）\)]/([μa-zA-Z\u4e00-\u9fa5]+)')},
		{id: 44, regExp: new RegExp('([0-9]+)([μa-zA-Z\u4e00-\u9fa5]+)')}
	
	  ];

	function matchPatten(spec: string) {
		spec = spec.trim();
		for (let p of patternArray) {
			const regExp = p.regExp;
			const matcheArr = regExp.exec(spec);
			if(matcheArr) {
				return {code: p.id, matches: matcheArr};
			}
		}
	}

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('drugspecparser.list', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from DrugSpecParser!');

		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;
			let selection = editor.selection;
			// Get the word within the selection
			let word = document.getText(selection);

			if(word.length === 0) {
				vscode.window.showInformationMessage('请先选中要解析的文本!');
				return;
			}
			
			let result = '容量数|容量单位|成分含量数|成分单位|最小规格数|最小规格单位\n';
			let successCount = 0;
			let failCount = 0;
			let specArray = word.split("\n");
			for(let spec of specArray) {
				let r1 = "";
				let r2 = "";
				let r3 = "";
				let r4 = "";
				let r5 = "";
				let r6 = "";

				const matchResult = matchPatten(spec);
				let matched = false;
				if(matchResult?.matches) {
					matched = true;
					const matchCode = matchResult.code;
					const matches = matchResult.matches;
					switch(matchCode) {
						case 0: 
						case 1:
							r1 = matches[1];
							r2 = "ml";
							r3 = matches[2];
							r4 = matches[3];
							r5 = "1";
							r6 = matches[4];
							break;
						case 10:
							r1 = matches[1];
							r2 = matches[2];
							r3 = matches[3];
							r4 = matches[4];
							r5 = matches[5];
							r6 = matches[6];
							break;
						case 11:
							r1 = matches[1];
							r2 = "ml";
							r3 = matches[2];
							r4 = matches[3];
							r5 = "1";
							r6 = matches[4];
							break;
						case 20:
							r3 = matches[1];
							r4 = matches[2];
							r5 = matches[3];
							r6 = matches[4];
							break;
						case 21:
							r3 = matches[1];
							r4 = matches[2];
							r5 = '1';
							r6 = matches[3];
							break;
						case 22:
							r3 = matches[1];
							r4 = "g";
							r5 = '1';
							r6 = "支";
							break;
						case 23:
							r3 = matches[1];
							r4 = matches[2];
							r5 = matches[4];
							r6 = matches[5];
							break;
						case 30:
							r1 = matches[1];
							r2 = "ml";
							r5 = matches[2];
							r6 = matches[3];
							break;
						case 31:
							r1 = matches[1];
							r2 = "ml";
							r5 = '1';
							r6 = "瓶";
							break;
						case 40:
							r5 = matches[1];
							r6 = matches[2];
							break;
						case 41 | 42:
							r5 = matches[1];
							r6 = matches[2];
							break;
						case 43:
							r5 = matches[1];
							r6 = "揿";
							break;
						case 44:
							r5 = matches[1];
							r6 = matches[2];
							break;
						case -1:
							matched = false;
							break;
						default:
							matched = false;
							console.warn("unsupported match code {}", matchCode);
					}
				}	 	
				if(matched) {
					successCount++;
				} else {
					failCount++;
				}
				result = result + r1 + "|" + r2 + "|" + r3 + "|" + r4 + "|" + r5 + "|" + r6 + "\n";
			}

			vscode.env.clipboard.writeText(result);
			vscode.window.showInformationMessage(`解析完毕，成功【${successCount}】条，失败【${failCount}】条，已复制到剪贴板。`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
