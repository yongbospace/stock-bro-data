#!/usr/bin/env ts-node
/**
 * KRX(한국거래소)에서 전체 상장 종목 데이터를 가져와서 JSON 파일로 저장
 */

import * as fs from 'fs';
import * as path from 'path';

interface Stock {
  code: string;
  name: string;
  market: 'KOSPI' | 'KOSDAQ';
}

interface StockData {
  updated_at: string;
  count: number;
  stocks: Stock[];
}

interface KRXResponse {
  OutBlock_1?: Array<{
    ISU_SRT_CD?: string;
    ISU_ABBRV?: string;
  }>;
}

async function fetchKRXStocks() {
  const url = 'http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd';

  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const stocks: Stock[] = [];

  try {
    // KOSPI 조회
    console.log('Fetching KOSPI stocks...');
    const kospiParams = new URLSearchParams({
      bld: 'dbms/MDC/STAT/standard/MDCSTAT01901',
      mktId: 'STK',
      share: '1',
      csvxls_isNo: 'false',
    });

    const kospiResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: kospiParams,
    });

    if (kospiResponse.ok) {
      const data = await kospiResponse.json() as KRXResponse;
      if (data.OutBlock_1) {
        for (const item of data.OutBlock_1) {
          if (item.ISU_SRT_CD && item.ISU_ABBRV) {
            stocks.push({
              code: item.ISU_SRT_CD,
              name: item.ISU_ABBRV,
              market: 'KOSPI',
            });
          }
        }
      }
    }

    // KOSDAQ 조회
    console.log('Fetching KOSDAQ stocks...');
    const kosdaqParams = new URLSearchParams({
      bld: 'dbms/MDC/STAT/standard/MDCSTAT01901',
      mktId: 'KSQ',
      share: '1',
      csvxls_isNo: 'false',
    });

    const kosdaqResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: kosdaqParams,
    });

    if (kosdaqResponse.ok) {
      const data = await kosdaqResponse.json() as KRXResponse;
      if (data.OutBlock_1) {
        for (const item of data.OutBlock_1) {
          if (item.ISU_SRT_CD && item.ISU_ABBRV) {
            stocks.push({
              code: item.ISU_SRT_CD,
              name: item.ISU_ABBRV,
              market: 'KOSDAQ',
            });
          }
        }
      }
    }

    // ETF 조회 (KOSPI)
    console.log('Fetching KOSPI ETFs...');
    const etfKospiParams = new URLSearchParams({
      bld: 'dbms/MDC/STAT/standard/MDCSTAT04601',
      mktId: 'STK',
      share: '1',
      csvxls_isNo: 'false',
    });

    const etfKospiResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: etfKospiParams,
    });

    if (etfKospiResponse.ok) {
      const data = await etfKospiResponse.json() as KRXResponse;
      if (data.OutBlock_1) {
        for (const item of data.OutBlock_1) {
          if (item.ISU_SRT_CD && item.ISU_ABBRV) {
            stocks.push({
              code: item.ISU_SRT_CD,
              name: item.ISU_ABBRV,
              market: 'KOSPI',
            });
          }
        }
      }
    }

    // ETF 조회 (KOSDAQ)
    console.log('Fetching KOSDAQ ETFs...');
    const etfKosdaqParams = new URLSearchParams({
      bld: 'dbms/MDC/STAT/standard/MDCSTAT04601',
      mktId: 'KSQ',
      share: '1',
      csvxls_isNo: 'false',
    });

    const etfKosdaqResponse = await fetch(url, {
      method: 'POST',
      headers,
      body: etfKosdaqParams,
    });

    if (etfKosdaqResponse.ok) {
      const data = await etfKosdaqResponse.json() as KRXResponse;
      if (data.OutBlock_1) {
        for (const item of data.OutBlock_1) {
          if (item.ISU_SRT_CD && item.ISU_ABBRV) {
            stocks.push({
              code: item.ISU_SRT_CD,
              name: item.ISU_ABBRV,
              market: 'KOSDAQ',
            });
          }
        }
      }
    }

    console.log(`Total stocks fetched: ${stocks.length}`);

    // JSON 파일로 저장
    const output: StockData = {
      updated_at: new Date().toISOString(),
      count: stocks.length,
      stocks,
    };

    const outputPath = path.join(__dirname, '..', 'stocks', 'kr_stocks.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`Saved to ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fetchKRXStocks();
