#!/usr/bin/env python3
"""
KRX(한국거래소)에서 전체 상장 종목 데이터를 가져와서 JSON 파일로 저장
"""

import requests
import json
from datetime import datetime

def fetch_krx_stocks():
    """KRX 상장 종목 전체 조회"""

    # KRX 상장 종목 정보 API
    url = "http://data.krx.co.kr/comm/bldAttendant/getJsonData.cmd"

    headers = {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'http://data.krx.co.kr/contents/MDC/MDI/mdiLoader/index.cmd?menuId=MDC0201'
    }

    # KOSPI 조회
    kospi_params = {
        'bld': 'dbms/MDC/STAT/standard/MDCSTAT01901',
        'mktId': 'STK',  # KOSPI
        'share': '1',
        'csvxls_isNo': 'false',
    }

    # KOSDAQ 조회
    kosdaq_params = {
        'bld': 'dbms/MDC/STAT/standard/MDCSTAT01901',
        'mktId': 'KSQ',  # KOSDAQ
        'share': '1',
        'csvxls_isNo': 'false',
    }

    stocks = []

    try:
        # KOSPI 종목 가져오기
        print("Fetching KOSPI stocks...")
        response = requests.post(url, headers=headers, data=kospi_params)
        if response.status_code == 200:
            data = response.json()
            if 'OutBlock_1' in data:
                for item in data['OutBlock_1']:
                    stocks.append({
                        'code': item.get('ISU_SRT_CD', ''),
                        'name': item.get('ISU_ABBRV', ''),
                        'market': 'KOSPI'
                    })

        # KOSDAQ 종목 가져오기
        print("Fetching KOSDAQ stocks...")
        response = requests.post(url, headers=headers, data=kosdaq_params)
        if response.status_code == 200:
            data = response.json()
            if 'OutBlock_1' in data:
                for item in data['OutBlock_1']:
                    stocks.append({
                        'code': item.get('ISU_SRT_CD', ''),
                        'name': item.get('ISU_ABBRV', ''),
                        'market': 'KOSDAQ'
                    })

        # 결과 정리
        stocks = [s for s in stocks if s['code'] and s['name']]

        print(f"Total stocks fetched: {len(stocks)}")

        # JSON 파일로 저장
        output = {
            'updated_at': datetime.now().isoformat(),
            'count': len(stocks),
            'stocks': stocks
        }

        with open('stocks.json', 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        print(f"Saved to stocks.json")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    fetch_krx_stocks()
