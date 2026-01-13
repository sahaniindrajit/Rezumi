// Minimal type declarations to hide puppeteer errors
declare module 'puppeteer-core' {
  interface LaunchOptions {
    headless?: boolean;
    args?: string[];
  }

  interface PDFOptions {
    format?: string;
    printBackground?: boolean;
    margin?: {
      top?: string;
      right?: string;
      bottom?: string;
      left?: string;
    };
  }

  interface Page {
    goto(url: string, options?: { waitUntil?: string }): Promise<void>;
    pdf(options?: PDFOptions): Promise<Buffer>;
  }

  interface Browser {
    newPage(): Promise<Page>;
    close(): Promise<void>;
  }

  interface Puppeteer {
    launch(options?: LaunchOptions): Promise<Browser>;
  }

  const puppeteer: Puppeteer;
  export default puppeteer;
}
