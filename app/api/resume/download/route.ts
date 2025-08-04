// src/app/api/resume/download/route.ts
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

import type { ResumeData } from '@/types/resume.type';

export async function POST(request: NextRequest) {  
  try {
    const resumeData: ResumeData = await request.json();

    // 1. Encode the data to safely pass it in a URL
    const dataStr = JSON.stringify(resumeData);
    const encodedData = Buffer.from(dataStr).toString('base64');

    // 2. Construct the URL to our print-only page
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/resume/print?data=${encodedData}`;

    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      // Important for running in production environments (like Vercel)
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    // 4. Go to the page and wait for it to be ready
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 5. Generate the PDF
    const pdf = await page.pdf({
      format: 'a4',
      printBackground: true, // Important to include your CSS background colors
      margin: {
        top: '1px',
        right: '1px',
        bottom: '1px',
        left: '1px',
      },
    });

    // 6. Close the browser
    await browser.close();

    // 7. Send the PDF back to the user
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.name.replace(' ', '_')}_Resume.pdf"`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF with Puppeteer:', error);
    return new NextResponse('Failed to generate PDF', { status: 500 });
  }
}