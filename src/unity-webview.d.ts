// unity-webview.d.ts
interface UnityWebView {
    call(message: string): void;
}

declare global {
    interface Window {
        Unity?: UnityWebView;
    }
    
    const Unity: UnityWebView | undefined;
}

export {};