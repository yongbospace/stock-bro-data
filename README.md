# 주식형님 - 공개 데이터

주식형님 앱에서 사용하는 공개 데이터 저장소입니다.

## 📁 구조

```
stock-bro-data/
├── stocks/
│   └── kr_stocks.json    # 한국 상장 종목 전체 데이터
└── policies/
    ├── privacy_policy.md # 개인정보처리방침
    └── terms.md          # 이용약관
```

## 📊 종목 데이터

### kr_stocks.json

- **출처**: 한국거래소(KRX)
- **업데이트**: 수동 (신규 상장 시)
- **종목 수**: 2,764개 (KOSPI + KOSDAQ)
- **Raw URL**: `https://raw.githubusercontent.com/yongbospace/stock-bro-data/main/stocks/kr_stocks.json`

### 데이터 형식

```json
{
  "updated_at": "2025-10-02T11:03:20.837931",
  "count": 2764,
  "stocks": [
    {
      "code": "005930",
      "name": "삼성전자",
      "market": "KOSPI"
    }
  ]
}
```

## 🔄 데이터 업데이트

### 설치
```bash
pnpm install
```

### 종목 데이터 업데이트
```bash
# 데이터 가져오기만
pnpm fetch

# 데이터 가져오기 + Git commit + push
pnpm update
```

## 📜 라이선스

이 저장소의 데이터는 공개 데이터이며, 주식형님 앱에서 사용하기 위한 목적으로 제공됩니다.

## ⚠️ 면책조항

- 본 데이터는 정보 제공 목적으로만 사용됩니다
- 투자 판단의 책임은 사용자에게 있습니다
- 데이터의 정확성을 보장하지 않습니다

## policy
https://raw.githubusercontent.com/yongbospace/stock-bro-data/main/policy.md
