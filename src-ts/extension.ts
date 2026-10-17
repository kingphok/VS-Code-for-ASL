import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
    console.log('[ASL] All function of extension have been activated!');
//    vscode.window.showInformationMessage('[ASL] All function of extension have been activated!');
}

export async function deactivate() {
    console.log('[ASL] Extension has been deactivated.');
//    vscode.window.showInformationMessage('[ASL] Extension has been deactivated.');
}
